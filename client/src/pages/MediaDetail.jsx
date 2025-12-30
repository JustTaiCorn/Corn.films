import { Play, Heart, HeartOff, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";
import Container from "../components/common/Container";
import ImageHeader from "../components/common/ImageHeader.jsx"; // Need to refactor this too
import { useDetail } from "../api/modules/media.api";

import RecommendSlide from "../components/common/RecommendSlide";
import { resetSelectedEpisode } from "../redux/features/episodeSlice";
import BackdropSlide from "../components/common/BackdropSlide";
import PosterSlide from "../components/common/PosterSlide";
import getTMDBImages from "../api/configs/images.config";
import MediaReview from "../components/common/MediaReview";
import favoriteApi from "../api/modules/favorite.api";
import { addFavorite, removeFavorite, setListFavorites } from "../redux/features/userSlice";
import { toast } from "react-toastify";
import MovieShareModal from "../components/common/MovieShareModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

const MediaDetail = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [posters, setPosters] = useState([]);
  const [backdrops, setBackdrops] = useState([]);
  const { isLoading, data } = useDetail({ slug });
  const { user, listFavorites } = useSelector((state) => state.user);
  const [onRequest, setOnRequest] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [movieUrl, setMovieUrl] = useState("");
  const location = useLocation();
  const media = data?.item;
  const Slug = data?.params.slug;

  useEffect(() => {
    const baseUrl = window.location.origin;
    const path = location.pathname;
    setMovieUrl(`${baseUrl}${path}`);
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetSelectedEpisode());
  }, [slug, dispatch]);



  useEffect(() => {
    if (Array.isArray(listFavorites) && listFavorites.length > 0 && media) {
      const foundFavorite = listFavorites.find(
        (favorite) => favorite.mediaId === media._id
      );
      setIsFavorite(!!foundFavorite);
    }
  }, [listFavorites, media]);

  useEffect(() => {
    const loadFavorites = async () => {
      if (user && (!Array.isArray(listFavorites) || listFavorites.length === 0)) {
        const { response } = await favoriteApi.getList();
        if (response && Array.isArray(response.data.favorites)) {
          dispatch(setListFavorites(response.data.favorites));
        } else {
          dispatch(setListFavorites([]));
        }
      }
    };

    loadFavorites();
  }, [dispatch, user, listFavorites]);

  useEffect(() => {
    const fetchImages = async () => {
      if (media) {
        const { posters, backdrops } = await getTMDBImages(media);
        setPosters(posters);
        setBackdrops(backdrops);
      }
    };

    fetchImages();
  }, [media]);

  if (!media) return null;
  const quality = media.quality || "HD";
  const actor = media.actor.length === 1 && media.actor[0] === "" ? "Chưa cập nhật" : media.actor;
  const actorsString = actor === "Chưa cập nhật" ? "Chưa cập nhật" : actor;
  const director =
    media.director?.length === 1 && media.director[0] === ""
      ? "Chưa cập nhật"
      : media.director;
  const title = media.title || media.name || "No Title";
  const genres = media.category || [];
  const content = media.content.replace(/<\/?p>/g, '') || "No content available";
  const thumbUrl = media.thumb_url
    ? `https://img.ophim.live/uploads/movies/${media.thumb_url}`
    : "https://via.placeholder.com/500x750";
  const posterPath =
    `https://img.ophim.live/uploads/movies/${media.poster_url}`;

  const onFavoriteClick = async () => {
    if (!user) {
      toast.warning("Vui lòng đăng nhập để thêm vào yêu thích");
      return;
    }

    if (onRequest || !media) return;
    setOnRequest(true);

    try {
      if (isFavorite && Array.isArray(listFavorites)) {
        const favorite = listFavorites.find(
          (item) => item.mediaId === media._id
        );
        if (favorite) {
          const { response, err } = await favoriteApi.remove({ favoriteId: favorite.mediaId });

          if (response) {
            dispatch(removeFavorite({ mediaId: media._id }));
            setIsFavorite(false);
            toast.success("Đã xóa khỏi danh sách yêu thích");
          } else if (err) {
            toast.error("Lỗi khi xóa khỏi yêu thích");
          }
        }
      } else {
        const alreadyFavorited = Array.isArray(listFavorites) &&
          listFavorites.some(item => item.mediaId === media._id);

        if (alreadyFavorited) {
          setIsFavorite(true);
          setOnRequest(false);
          return;
        }

        const body = {
          mediaId: media._id,
          mediaTitle: media.title || media.name || "Không tiêu đề",
          mediaPoster: media.poster_url || media.thumb_url || "",
          mediaRate: media.vote_average || 0,
          mediaSlug: Slug || "",
          mediaYear: media.year || "",
          mediaTime: media.time || "",
        };

        const { response, err } = await favoriteApi.add(body);

        if (response && response.data) {
          dispatch(addFavorite(response.data));
          setIsFavorite(true);
          toast.success("Đã thêm vào danh sách yêu thích");
        } else if (err) {
          toast.error("Lỗi khi thêm vào yêu thích");
        }
      }
    } catch (error) {
      console.error("Favorite action error:", error);
      toast.error("Có lỗi xảy ra");
    } finally {
      setOnRequest(false);
    }
  };

  return (
    <>
      <ImageHeader imgPath={thumbUrl} />
      <div className="text-foreground w-full max-w-[1366px] mt-[-5rem] mx-auto px-5 relative ">
        <div className="flex flex-col md:flex-row gap-8">
          {/* poster */}
          <div className="w-[70%]  md:w-[40%] mx-auto md:mx-0 shrink-0">
            <img
              src={posterPath}
              alt="Poster"
              className="w-full h-auto object-cover rounded-xl aspect-[2/3]"
            />
          </div>

          {/* media info */}
          <div className="w-full md:w-[60%] flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold line-clamp-2 leading-tight">
                {title}
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">{media.origin_name}</h2>
              <Badge variant="outline" className="w-max px-2 py-1 text-xs border-primary text-foreground">{quality}</Badge>
            </div>

            <div className="flex flex-row items-center gap-2">
              <Separator orientation="vertical" className="h-6 bg-primary" />
              {genres.map((theLoai, index) => (
                <Badge key={index} className="bg-primary hover:bg-primary/90 text-primary-foreground">{theLoai.name}</Badge>
              ))}
            </div>

            <div className="flex flex-col gap-2 text-sm text-gray-300">
              {[
                { label: "Đang phát", value: media.episode_current },
                { label: "Tổng số tập", value: media.episode_total },
                { label: "Thời lượng", value: media.time },
                { label: "Quốc gia", value: media.country?.[0]?.name },
                { label: "Diễn viên", value: actorsString },
                { label: "Đạo diễn", value: director },
                { label: "Lượt xem", value: media.view }
              ].map((item, index) => (
                <div className="flex flex-row gap-4" key={index}>
                  <span className="min-w-[100px] text-muted-foreground font-medium">{item.label}:</span>
                  <span className="text-foreground line-clamp-1">{item.value}</span>
                </div>
              ))}
            </div>

            <p className="text-base leading-relaxed ">
              {content}
            </p>

            <div className="flex flex-row gap-3 flex-wrap">
              <Button size="lg" asChild className="uppercase font-bold">
                <Link to={`/xem-phim/${media.slug}#player`}>
                  <Play className="mr-2 h-5 w-5 fill-current" />
                  Watch Now
                </Link>
              </Button>

              <Button
                size="lg"
                variant={isFavorite ? "default" : "secondary"}
                onClick={onFavoriteClick}
                disabled={onRequest}
                className="uppercase font-bold min-w-[150px]"
              >
                {onRequest ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : isFavorite ? (
                  <Heart className="mr-2 h-5 w-5 fill-current" />
                ) : (
                  <Heart className="mr-2 h-5 w-5" />
                )}
                {isFavorite ? "Đã yêu thích" : "Yêu thích"}
              </Button>

              <MovieShareModal movieUrl={movieUrl} />
            </div>
          </div>
        </div>

        {backdrops?.length > 0 && (
          <Container header="backdrops">
            <BackdropSlide backdrops={backdrops} />
          </Container>
        )}

        {posters?.length > 0 && (
          <Container header="posters">
            <PosterSlide posters={posters} />
          </Container>
        )}

        <MediaReview media={media} slug={Slug} />

        <Container header="you may also like">
          <RecommendSlide category={media.category?.[0]?.slug} country={media.country?.[0]?.slug} />
        </Container>
      </div>
    </>
  );
};

export default MediaDetail;