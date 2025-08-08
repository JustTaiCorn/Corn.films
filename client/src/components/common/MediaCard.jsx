import { Box, Stack, Typography, } from '@mui/material';
import { useList } from '../../api/modules/media.api';
import { Swiper, SwiperSlide } from 'swiper/react';
const MediaCard = ({ mediaType }) => {
    const { data } = useList({
        mediaType,
        page: 1
    });
    const medias = data?.items || [];

    return (
        <Box sx={{
            "& .swiper-slide": {
                width: {
                    xs: "50%",
                    sm: "50%",
                    md: "50%",
                    lg: "32.5%"
                }
            }
        }}>
            <Swiper
                slidesPerView="auto"
                spaceBetween={10}
            >
                {medias?.map((media, index) => (
                    <SwiperSlide key={index}>
                        <Box sx={{
                            position: 'relative',
                            width: '100%',
                            height: { xs: "100px", md: "280px" }, // Tăng chiều cao để chứa poster
                            cursor: 'pointer',
                        }}>

                            {/* Thumbnail làm background */}
                            <Box sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: { xs: "100px", md: "200px" }, // Chiều cao thumbnail cố định
                                borderRadius: '8px',
                                overflow: 'hidden',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
                                    '& img': {
                                        filter: 'brightness(0.85)',
                                        transform: 'scale(1.05)',
                                    }
                                }
                            }}>
                                <img
                                    src={`https://img.ophim.live/uploads/movies/${media.thumb_url}`}
                                    alt={media.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'filter 0.3s ease, transform 0.3s ease',
                                    }}
                                />
                            </Box>

                            {/* Poster và thông tin chồng lên thumbnail */}
                            <Box sx={{
                                position: 'absolute',
                                bottom: 20,
                                left: 10,
                                right: 10,
                                zIndex: 5,
                                display: { xs: "none", md: "block" }
                            }}>
                                <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{
                                    backgroundColor: "transparent", // Background mờ
                                    padding: '10px',
                                    borderRadius: '8px',

                                }}>
                                    {/* Poster nhỏ */}
                                    <Box sx={{
                                        position: 'relative',
                                        flexShrink: 0,
                                    }}>
                                        <img
                                            src={`https://img.ophim.live/uploads/movies/${media.poster_url}`}
                                            alt={`${media.name} poster`}
                                            style={{
                                                width: '60px',
                                                height: '80px',
                                                objectFit: 'cover',
                                                borderRadius: '6px',
                                                border: '2px solid rgba(255,255,255,0.3)',
                                            }}
                                        />
                                    </Box>

                                    {/* Thông tin phim */}
                                    <Stack spacing={0.5} sx={{ backgroundColor: "rgba(0,0,0,0.5)", padding: "10px", borderRadius: "8px", width: "100%" }}

                                    >
                                        <Typography sx={{
                                            color: '#fff',
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                        }}>
                                            {media.name}
                                        </Typography>
                                        <Typography sx={{
                                            color: '#ddd',
                                            fontSize: '12px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                        }}>
                                            {media.origin_name || media.subtitle || ''}
                                        </Typography>
                                        <Stack direction="row" spacing={1} sx={{
                                            flexWrap: 'wrap',
                                            gap: 0.5,
                                        }}>
                                            <Typography sx={{ color: '#bbb', fontSize: '11px' }}>
                                                {media.episode_current}
                                            </Typography>
                                            <Typography sx={{ color: '#bbb', fontSize: '11px' }}>
                                                {media.year}
                                            </Typography>
                                            <Typography sx={{ color: '#bbb', fontSize: '11px' }}>
                                                {media.time}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};

export default MediaCard;