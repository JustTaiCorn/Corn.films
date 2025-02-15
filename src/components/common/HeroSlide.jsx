import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Chip, Divider, Stack, Typography, useTheme } from "@mui/material";
import { Autoplay } from 'swiper/modules';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { routesGen } from "../../routes/routes";
import uiConfigs from "../../configs/ui.configs";
import CircularRate from "./CircularRate";
import { useList } from "../../api/modules/media.api";
import { useEffect } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const HeroSlide = ({ mediaType }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { isLoading, data } = useList({
    mediaType,
    page: 1
  });

  // Cập nhật globalLoading khi isLoading thay đổi
  useEffect(() => {
    dispatch(setGlobalLoading(isLoading));
  }, [isLoading, dispatch]);

  // Đảm bảo movies luôn là một mảng
  const movies = data?.items || [];

  return (
    <Box sx={{
      position: "relative",
      color: "primary.contrastText",
      "&::before": {
        content: '""',
        width: "100%",
        height: "30%",
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 2,
        pointerEvents: "none",
        ...uiConfigs.style.gradientBgImage[theme.palette.mode]
      }
    }}>
      <Swiper
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        style={{ width: "100%", height: "max-content" }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
      >
        {movies.length > 0 ? (
          movies.map((movie, index) => {
            const thumbUrl = movie.thumb_url
              ? `https://img.ophim.live/uploads/movies/${movie.thumb_url}`
              : "https://via.placeholder.com/500x750";
            return (
              <SwiperSlide key={index}>
                <Box sx={{
                  paddingTop: {
                    xs: "130%",
                    sm: "80%",
                    md: "60%",
                    lg: "45%"
                  },
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundImage: `url(${thumbUrl})`
                }} />
                <Box sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  ...uiConfigs.style.horizontalGradientBgImage[theme.palette.mode]
                }} />
                <Box sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  paddingX: { sm: "10px", md: "5rem", lg: "10rem" }
                }}>
                  <Box sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    paddingX: "30px",
                    color: "text.primary",
                    width: { sm: "unset", md: "30%", lg: "40%" }
                  }}>
                    <Stack spacing={4} direction="column">
                      {/* title */}
                      <Typography
                        variant="h4"
                        fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                        fontWeight="700"
                        sx={{
                          ...uiConfigs.style.typoLines(2, "left")
                        }}
                      >
                        {movie.name}
                      </Typography>
                      {/* title */}

                      <Stack direction="row" spacing={1} alignItems="center">
                        {/* rating */}
                        <CircularRate value={movie?.tmdb?.vote_average} />
                        {/* rating */}

                        <Divider orientation="vertical" />
                        {/* genres */}
                        {movie?.category?.map((theLoai, index) => (
                          <Chip
                            variant="filled"
                            color="primary"
                            key={index}
                            label={theLoai?.name}
                          />
                        ))}
                        {/* genres */}
                      </Stack>

                      {/* buttons */}
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Button
                          variant="contained"
                          size="large"
                          startIcon={<PlayArrowIcon />}
                          component={Link}
                          to={routesGen.mediaWatch(movie.slug)}
                          sx={{ width: "max-content" }}
                        >
                          watch now
                        </Button>

                        <Button variant="outlined" size="large" color="primary" component={Link} to={routesGen.mediaDetail(movie.slug)}
                          sx={{ width: "max-content" }}
                          endIcon={<ArrowForwardIosIcon />}>
                          Xem chi tiết
                        </Button>
                      </Stack>
                      {/* buttons */}
                    </Stack>
                  </Box>
                </Box>
              </SwiperSlide>
            );
          })
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center", py: 4 }}>
            Không có dữ liệu
          </Typography>
        )}
      </Swiper>
    </Box>
  );
};

export default HeroSlide;