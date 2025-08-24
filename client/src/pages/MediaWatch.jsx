import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "../components/common/Container";
import ImageHeader from "../api/configs/ImageHeader";

import uiConfigs from "../api/configs/ui.configs";
import { useDetail } from "../api/modules/media.api";
import RecommendSlide from "../components/common/RecommendSlide";
import MediaPlayer from "../components/common/MediaPlayer";
import EpisodeList from "../components/common/EpisodeList";
import { resetSelectedEpisode, setEpisode } from "../redux/features/episodeSlice";
import getTMDBImages from "../api/configs/images.config";
import GlobalLoading from "../components/common/GlobalLoading";

const MediaDetail = () => {
    const dispatch = useDispatch();
    const { slug } = useParams();
    const iframeRef = useRef(null);
    const playerRef = useRef(null);

    const [posters, setPosters] = useState([]);
    const { isLoading, data } = useDetail({ slug });

    const media = data?.item;
    const episodes = useMemo(() => media?.episodes?.[0]?.server_data || [], [media]);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(resetSelectedEpisode());
        if (media && episodes.length > 0) {
            dispatch(setEpisode(episodes[0]));
        }

        // Xử lý cuộn xuống player khi có hash #player trong URL
        if (window.location.hash === '#player' && playerRef.current) {
            setTimeout(() => {
                playerRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 100); // Đợi 500ms để đảm bảo player đã render
        }
    }, [slug, dispatch, media, episodes]);
    useEffect(() => {
        const fetchImages = async () => {
            if (media) {
                const { posters } = await getTMDBImages(media);
                setPosters(posters);
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



    if (isLoading) {
        return <GlobalLoading isLoading={isLoading} />
    }
    return (
        <>
            <ImageHeader imgPath={thumbUrl} />
            <Box sx={{  ...uiConfigs.style.mainContent, }}>
                {/* media content */}
                <Box sx={{ marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" } }}>
                    <Box sx={{ display: "flex", flexDirection: { md: "row", xs: "column" } }}>
                        {/* poster */}
                        <Box sx={{ width: { xs: "70%", sm: "50%", md: "40%" }, marginX: "auto", }}>
                            <Box
                                component="img"
                                src={posterPath}
                                alt="Poster"
                                sx={{
                                    width: {
                                        xs: 250,   // màn nhỏ
                                        sm: 300,   // màn vừa
                                        md: 350,   // màn lớn
                                        lg: 400,   // màn rất lớn
                                    },
                                    height: {
                                        xs: 300,
                                        sm: 350,
                                        md: 400,
                                        lg: 550,
                                    },
                                    objectFit: 'cover',
                                    borderRadius: 2,
                                }}
                            />
                        </Box>

                        {/* media info */}
                        <Box sx={{ width: { xs: "100%", md: "60%" }, color: "text.primary" }}>
                            <Stack spacing={5}>
                                {/* title */}
                                <Stack spacing={1}>
                                    <Typography
                                        variant="h4"
                                        fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                                        fontWeight="700"
                                        sx={{ textAlign: "left",
                                            display: "-webkit-box",
                                            overflow: "hidden",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 2,}}
                                    >
                                        {`${title}`}
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

                                {/* rate and genres */}
                                <Stack direction="row" spacing={1} alignItems="center">

                                    <Divider orientation="vertical" />
                                    {/* genres */}
                                    {genres.map((theLoai, index) => (
                                        <Chip variant="filled" color="primary" key={index} label={theLoai.name} />
                                    ))}
                                </Stack>
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
                                <Typography variant="body1" >
                                    {content}
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
                <Container header="Watch now">
                    <div ref={playerRef}>
                        <MediaPlayer />
                    </div>
                </Container>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <EpisodeList episodes={episodes} />
            </Box>
            <Container header="you may also like">
                <RecommendSlide category={media.category[0].slug} country={media.country[0].slug} />
            </Container>

        </>
    );
};

export default MediaDetail;