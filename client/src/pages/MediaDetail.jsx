import FavoriteIcon from "@mui/icons-material/Favorite";
import LoadingButton from "@mui/lab/LoadingButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";
import CircularRate from "../components/common/CircularRate";
import Container from "../components/common/Container";
import ImageHeader from "../components/common/ImageHeader";

import uiConfigs from "../configs/ui.configs";
import { useDetail } from "../api/modules/media.api";

import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import MediaVideosSlide from "../components/common/MediaVideosSlide";
import RecommendSlide from "../components/common/RecommendSlide";
import { resetSelectedEpisode } from "../redux/features/episodeSlice";
import BackdropSlide from "../components/common/BackdropSlide";
import PosterSlide from "../components/common/PosterSlide";
import getTMDBImages from "../api/configs/images.config";
import MediaReview from "../components/common/MediaReview";
import favoriteApi from "../api/modules/favorite.api";
import { addFavorite, removeFavorite, setListFavorites } from "../redux/features/userSlice";
import { toast } from "react-toastify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Movie } from "@mui/icons-material";
import MovieShareModal from "../components/common/MovieShareModal";
const MediaDetail = () => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const { slug } = useParams();
  const [posters, setPosters] = useState([]);
  const [backdrops, setBackdrops] = useState([]);
  const { isLoading, data } = useDetail({ slug });
  const { user, listFavorites } = useSelector((state) => state.user);
  const [onRequest, setOnRequest] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [movieUrl, setMovieUrl] = useState("");
  const [movieTitle, setMovieTitle] = useState("Check out this movie!");
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
    dispatch(setGlobalLoading(isLoading));
  }, [isLoading, dispatch]);

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
  const actorsString = actor === "Chưa cập nhật" ? "Chưa cập nhật" : actor.join(", ");
  const director =
    media.director?.length === 1 && media.director[0] === ""
      ? "Chưa cập nhật"
      : media.director;
  const title = media.title || media.name || "No Title";
  const year = media.year ? `(${media.year})` : "";
  const genres = media.category || [];
  const content = media.content.replace(/<\/?p>/g, '') || "No content available";
  const thumbUrl = media.thumb_url
    ? `https://img.ophim.live/uploads/movies/${media.thumb_url}`
    : "https://via.placeholder.com/500x750";
  const posterPath = posters[0]?.file_path
    ? `https://image.tmdb.org/t/p/w500${posters[0].file_path}`
    : `https://img.ophim.live/uploads/movies/${media.poster_url}`;

  const onFavoriteClick = async () => {
    if (!user) {
      toast.warning("Vui lòng đăng nhập để thêm vào yêu thích");
      return;
    }

    if (onRequest || !media) return;
    setOnRequest(true);

    try {
      if (isFavorite && Array.isArray(listFavorites)) {
        // Tìm favorite cần xóa
        const favorite = listFavorites.find(
          (item) => item.mediaId === media._id
        );
        if (favorite) {
          const { response, err } = await favoriteApi.remove({ favoriteId: favorite.mediaId });

          if (response) {
            // Sửa chỗ này để truyền đúng định dạng mà reducer mong đợi
            dispatch(removeFavorite({ mediaId: media._id }));
            setIsFavorite(false);
            toast.success("Đã xóa khỏi danh sách yêu thích");
          } else if (err) {
            toast.error("Lỗi khi xóa khỏi yêu thích");
          }
        }
      } else {
        // Kiểm tra trong danh sách hiện tại trước khi gọi API
        const alreadyFavorited = Array.isArray(listFavorites) &&
          listFavorites.some(item => item.mediaId === media._id);

        if (alreadyFavorited) {
          setIsFavorite(true);
          setOnRequest(false);
          return; // Không gọi API nếu đã có trong danh sách
        }

        // Thêm vào favorites
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

  const renderFavoriteButton = () => (
    <LoadingButton
      variant="contained"
      size="large"
      startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      loadingPosition="start"
      loading={onRequest}
      onClick={onFavoriteClick}
      sx={{
        bgcolor: isFavorite ? "primary.main" : "secondary.main",
        "& .MuiButton-startIcon": { marginRight: 1 },
        fontSize: { xs: "0.875rem", sm: "1rem" },
        padding: { xs: "6px 12px", sm: "8px 16px", md: "10px 20px" },
        minWidth: { xs: "120px", sm: "150px", md: "180px" },
        "& .MuiSvgIcon-root": {
          fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
        },
      }}
    >
      {isFavorite ? "Đã yêu thích" : "Yêu thích"}
    </LoadingButton>
  );

  return (
    <>
      {/* <ImageHeader imgPath={thumbUrl} /> */}
      <Box sx={{ color: "primary.contrastText", ...uiConfigs.style.mainContent, mt: '30rem' }}>
        {/* media content */}
        <Box sx={{ marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" } }}>
          <Box sx={{ display: "flex", flexDirection: { md: "row", xs: "column" } }}>
            {/* poster */}
            <Box sx={{ width: { xs: "70%", sm: "50%", md: "40%" }, margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" } }}>
              <Box sx={{ paddingTop: "140%", ...uiConfigs.style.backgroundImage(posterPath) }} />
            </Box>
            {/* poster */}

            {/* media info */}
            <Box sx={{ width: { xs: "100%", md: "60%" }, color: "text.primary" }}>
              <Stack spacing={5}>
                {/* title */}
                <Stack spacing={1}>
                  <Typography
                    variant="h4"
                    fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                    fontWeight="700"
                    sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                  >
                    {`${title} ${year}`}
                  </Typography>
                  <Typography variant="h5" fontWeight="500" sx={{ color: "text.secondary" }}
                    fontSize={{ xs: "1rem", md: "1rem", lg: "3rem" }}>{media.origin_name}</Typography>
                  <Chip
                    sx={{
                      width: "max-content",
                      color: "white",
                      py: 0.5,
                      fontSize: "0.75rem",
                      textAlign: "center"
                    }}
                    variant="outlined"
                    label={quality}
                  />
                </Stack>
                {/* title */}

                {/* rate and genres */}
                <Stack direction="row" spacing={1} alignItems="center">
                  {/* rate */}
                  <CircularRate value={media.vote_average} />
                  {/* rate */}
                  <Divider orientation="vertical" />
                  {/* genres */}
                  {genres.map((theLoai, index) => (
                    <Chip variant="filled" color="primary" key={index} label={theLoai.name} />
                  ))}
                  {/* genres */}
                </Stack>
                {/* rate and genres */}
                <Stack direction="column" spacing={1} alignItems="left">
                  <Stack direction="row" spacing={5} alignItems="left">
                    <Typography variant="body1" sx={{ color: grey[500] }}>Đang phát:</Typography>
                    <Typography variant="body1" sx={{ pl: "0.5rem" }}>{media.episode_current}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={5} alignItems="left">
                    <Typography variant="body1" sx={{ color: grey[500] }}>Tổng số tập:</Typography>
                    <Typography variant="body1">{media.episode_total}</Typography>
                  </Stack>

                  <Stack direction="row" spacing={5} alignItems="left">
                    <Typography variant="body1" sx={{ color: grey[500] }}>Thời lượng:</Typography>
                    <Typography variant="body1" sx={{ pl: "0.5rem" }}>{media.time}</Typography>
                  </Stack>
                  <Stack direction="row" spacing={5} alignItems="left">
                    <Typography variant="body1" sx={{ color: grey[500] }}>Quốc gia:</Typography>
                    <Typography variant="body1" sx={{ pl: "1.25rem" }}>{media.country[0].name}</Typography>
                  </Stack>

                  <Stack direction="row" spacing={5} alignItems="left">
                    <Typography variant="body1" sx={{ color: grey[500], whiteSpace: 'nowrap' }}>Diễn viên:</Typography>
                    <Typography variant="body1" sx={{ pl: "1.25rem" }}>{actorsString}</Typography>
                  </Stack>

                  <Stack direction="row" spacing={5} alignItems="left">
                    <Typography variant="body1" sx={{ color: grey[500] }}>Đạo diễn:</Typography>
                    <Typography variant="body1" sx={{ pl: "1.25rem" }}>{director}</Typography>
                  </Stack>

                  <Stack direction="row" spacing={5} alignItems="left">
                    <Typography variant="body1" sx={{ color: grey[500] }}>Lượt xem:</Typography>
                    <Typography variant="body1" sx={{ pl: "1.25rem" }}>{media.view}</Typography>
                  </Stack>
                </Stack>
                {/* overview */}
                <Typography variant="body1" sx={{ ...uiConfigs.style.typoLines(5) }}>
                  {content}
                </Typography>

                {/* overview */}

                {/* buttons */}
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    sx={{ width: "max-content" }}
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    LinkComponent={Link} to={`/xem-phim/${media.slug}`}
                  >
                    watch now
                  </Button>

                  {renderFavoriteButton()}
                  <MovieShareModal movieUrl={movieUrl} movieTitle={movieTitle} />

                </Stack>
                {/* buttons */}
              </Stack>
            </Box>
            {/* media info */}
          </Box>
        </Box>
        {/* media content */}
        {/* media watch */}
        {/* media episodes */}
        {/* media backdrop */}
        {backdrops?.length > 0 && (
          <Container header="backdrops">
            <BackdropSlide backdrops={backdrops} />
          </Container>
        )}
        {/* media backdrop */}
        {/* media posters */}
        {posters?.length > 0 && (
          <Container header="posters">
            <PosterSlide posters={posters} />
          </Container>
        )}
        {/* media posters */}


        {/* media videos */}
        <div ref={videoRef} style={{ paddingTop: "2rem" }}>
          <Container header="Video in Youtube">
            <MediaVideosSlide slug={media.slug} />
          </Container>
        </div>
        {/* media videos */}
        <MediaReview media={media} slug={Slug} />
        {/* media recommendation */}
        <Container header="you may also like">
          <RecommendSlide category={media.category[0].slug} country={media.country[0].slug} />
        </Container>
        {/* media recommendation */}
      </Box>
    </>
  );
};

export default MediaDetail;