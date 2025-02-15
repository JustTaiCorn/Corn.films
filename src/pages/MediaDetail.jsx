import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
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

const MediaDetail = () => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const { slug } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetSelectedEpisode());

  }, [slug, dispatch]);

  const [posters, setPosters] = useState([]);
  const [backdrops, setBackdrops] = useState([]);
  const { isLoading, data } = useDetail({ slug });

  useEffect(() => {
    dispatch(setGlobalLoading(isLoading));
  }, [isLoading, dispatch]);

  const media = data?.item;

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
    media.director.length === 1 && media.director[0] === ""
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
  return (
    <>
      <ImageHeader imgPath={thumbUrl} />
      <Box sx={{ color: "primary.contrastText", ...uiConfigs.style.mainContent }}>
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