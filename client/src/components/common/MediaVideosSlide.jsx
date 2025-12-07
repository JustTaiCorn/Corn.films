import { useEffect, useRef, useState } from "react";
import { SwiperSlide } from "swiper/react";
import NavigationSwiper from "./NavigationSwiper";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

const MediaVideo = ({ video }) => {
  const iframeRef = useRef();

  useEffect(() => {
    const updateIframeHeight = () => {
      if (iframeRef.current) {
        const height = iframeRef.current.offsetWidth * 9 / 16 + "px";
        iframeRef.current.setAttribute("height", height);
      }
    };

    updateIframeHeight();
    window.addEventListener("resize", updateIframeHeight);

    return () => window.removeEventListener("resize", updateIframeHeight);
  }, [video]);

  return (
    <div className="h-max">
      <iframe
        key={video.id.videoId}
        src={`https://www.youtube.com/embed/${video.id.videoId}`}
        ref={iframeRef}
        width="100%"
        title={video.snippet.title}
        style={{ border: 0 }}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const MediaVideosSlide = ({ slug }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "AIzaSyBZ7D6i-Zlhs6Ua7Fp9kOcsbCaLyLLSNcs"; // Replace with your API key

  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      try {
        setLoading(true);
        setError("");

        const { data } = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              maxResults: 3,
              q: slug,
              key: API_KEY,
              type: "video",
              relevanceLanguage: "vi"
            }
          }
        );

        setVideos(data.items);
      } catch (err) {
        setError(err.response?.data?.error?.message || "Lỗi tải video");
        console.error("Lỗi YouTube API:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchYouTubeVideos();
  }, [slug]);

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-2">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        videos.length > 0 && (
          <NavigationSwiper>
            {videos.map((video, index) => (
              <SwiperSlide key={index}>
                <MediaVideo video={video} />
              </SwiperSlide>
            ))}
          </NavigationSwiper>
        )
      )}
    </>
  );
};

export default MediaVideosSlide;