import { Box, CircularProgress, Alert } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { SwiperSlide } from "swiper/react";
import NavigationSwiper from "./NavigationSwiper";
import axios from "axios";

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
    <Box sx={{ height: "max-content" }}>
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
    </Box>
  );
};

const MediaVideosSlide = ({ slug }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "AIzaSyBZ7D6i-Zlhs6Ua7Fp9kOcsbCaLyLLSNcs"; // Thay thế API key của bạn ở đây

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
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
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