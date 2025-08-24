import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Chip, Divider, Stack, Typography, useTheme } from "@mui/material";
import { Autoplay, Thumbs, Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { routesGen } from "../../routes/routes";
import uiConfigs from "../../api/configs/ui.configs";
import { useList } from "../../api/modules/media.api";
import { useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GlobalLoading from "../common/GlobalLoading";

const HeroSlide = ({ mediaType }) => {
  const theme = useTheme();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  const { isLoading, data } = useList({
    mediaType,
    page: 1
  });


  // Đảm bảo movies luôn là một mảng
  const movies = data?.items || [];
  if (isLoading) {
    return (
      <GlobalLoading isLoading={isLoading} />
    );
  }

  return (
    <><Box sx={{
      position: "relative",
    }}>
      <Swiper
        grabCursor={true}
        loop={true}
        modules={[Autoplay, Thumbs, Navigation]}
        navigation={false}
        style={{ width: "100%", height: "max-content" }}
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={{
          delay: 10000,
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
                    xs: "70%",
                    sm: "70%",
                    md: "60%",
                    lg: "45%"
                  },
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundAttachment: "fixed",
                  backgroundImage: `url(${thumbUrl})`,
                }} />
                <Box sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 50,
                  left: 0,
                  ml: { xs: 3, md: 0 },
                  paddingX: { sm: "10px", md: "5rem", lg: "5rem" }
                }}>
                  <Box sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    color: "text.primary",
                    width: { xs: "90%", md: "30%", lg: "40%" },
                  }}>
                    <Stack spacing={{ xs: 0.5, sm: 2 }} direction="column">
                      {/* title */}
                      <Typography
                        variant="h3"
                        fontSize={{ xs: "0.75rem", md: "1rem", lg: "2rem" }}
                        fontWeight="700"
                      >
                        {movie.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        fontSize={{ xs: "0.65rem", md: "0.8rem", lg: "1rem" }}
                        fontWeight="400"
                      >
                        {movie.origin_name}
                      </Typography>
                      <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        flexWrap: "wrap",
                      }}>

                        <Chip
                          label={movie.quality}
                          color="primary"
                          variant="outlined"
                          size="small"
                          sx={{
                            fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' },
                            height: { xs: '24px', sm: '28px', md: '32px' },
                            '& .MuiChip-label': {
                              padding: { xs: '0 6px', sm: '0 8px', md: '0 12px' }
                            }
                          }}
                        />
                        <Chip
                          label={movie.year}
                          color="primary"
                          variant="outlined"
                          size="small"
                          sx={{
                            fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' },
                            height: { xs: '24px', sm: '28px', md: '32px' },
                            '& .MuiChip-label': {
                              padding: { xs: '0 6px', sm: '0 8px', md: '0 12px' }
                            }
                          }}
                        />
                        <Chip
                          label={movie.lang}
                          color="primary"
                          variant="outlined"
                          size="small"
                          sx={{
                            fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' },
                            height: { xs: '24px', sm: '28px', md: '32px' },
                            '& .MuiChip-label': {
                              padding: { xs: '0 6px', sm: '0 8px', md: '0 12px' }
                            }
                          }}
                        />
                        <Chip
                          label={movie.episode_current}
                          color="primary"
                          variant="outlined"
                          size="small"
                          sx={{
                            fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' },
                            height: { xs: '24px', sm: '28px', md: '32px' },
                            '& .MuiChip-label': {
                              padding: { xs: '0 6px', sm: '0 8px', md: '0 12px' }
                            }
                          }}
                        />


                      </Box>
                      <Stack direction="row" spacing={1} alignItems="center">
                        {/* rating */}
                        <Divider orientation="vertical" />
                        {/* genres */}
                        {movie?.category?.map((theLoai, index) => (
                          <Chip
                            variant="filled"
                            color="primary"
                            key={index}
                            label={theLoai?.name}
                            sx={{
                              fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' },
                              height: { xs: '24px', sm: '28px', md: '32px' },
                              '& .MuiChip-label': {
                                padding: { xs: '0 6px', sm: '0 8px', md: '0 12px' }
                              }
                            }}
                          />
                        ))}
                      </Stack>
                      {/* buttons */}
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Button
                          variant="contained"
                          size="large"
                          startIcon={<PlayArrowIcon />}
                          component={Link}
                          to={`${routesGen.mediaWatch(movie.slug)}#player`}
                          sx={{
                            width: "max-content",
                            fontSize: { xs: '0.5rem', sm: '0.8rem', md: '0.9rem' },
                            padding: { xs: '2px 4px', sm: '6px 10px', md: '8px 16px' }
                          }}
                        >
                          watch now
                        </Button>
                        <Button
                          variant="outlined"
                          size="large"
                          color="primary"
                          component={Link}
                          to={routesGen.mediaDetail(movie.slug)}
                          sx={{
                            width: "max-content",
                            fontSize: { xs: '0.5rem', sm: '0.8rem', md: '0.9rem' },
                            padding: { xs: '2px 4px', sm: '6px 10px', md: '8px 16px' },

                          }}
                          endIcon={<ArrowForwardIosIcon />}
                        >
                          Xem chi tiết
                        </Button>
                      </Stack>
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

      <Box sx={{
        display: { xs: "none", md: "block" },
        position: "absolute",
        right: 0,
        bottom: 50,
        mr: 2,
        width: "40%",
        height: "50px",
        backgroundColor: "transparent",
        zIndex: 100,
        borderRadius: "5px 0 0 5px",

      }}>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Thumbs]}
          loop={true}

        >

          {movies.map((movie, index) => {
            const thumbUrl = movie.thumb_url
              ? `https://img.ophim.live/uploads/movies/${movie.thumb_url}`
              : "https://via.placeholder.com/500x750";
            return (
              <SwiperSlide key={index}
                active={index === activeIndex}
                onClick={() => handleThumbnailClick(index)}
              ><Box
                sx={{
                  border: "2px solid transparent",
                  "&:hover": {
                    border: "2px solid #fff",
                    borderRadius: "4px",

                  }
                }}
              >
                  <img src={thumbUrl} alt={movie.name}
                    style={{
                      width: "100%",
                      height: "50px",
                      objectFit: "cover",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                  />
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Box></>
  );
};

export default HeroSlide;