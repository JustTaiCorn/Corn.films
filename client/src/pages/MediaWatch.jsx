import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "../components/common/Container";
import ImageHeader from "../api/configs/ImageHeader";
import { useDetail } from "../api/modules/media.api";
import RecommendSlide from "../components/common/RecommendSlide";
import MediaPlayer from "../components/common/MediaPlayer";
import EpisodeList from "../components/common/EpisodeList";
import { resetSelectedEpisode, setEpisode } from "../redux/features/episodeSlice";
import getTMDBImages from "../api/configs/images.config";
import GlobalLoading from "../components/common/GlobalLoading";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const MediaWatch = () => {
    const dispatch = useDispatch();
    const { slug } = useParams();
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

        if (window.location.hash === '#player' && playerRef.current) {
            setTimeout(() => {
                playerRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 100);
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
    if (isLoading) {
        return <GlobalLoading isLoading={isLoading} />
    }

    const quality = media.quality || "HD";
    const actor = media.actor.length === 1 && media.actor[0] === "" ? "Chưa cập nhật" : media.actor;
    const actorsString = actor === "Chưa cập nhật" ? "Chưa cập nhật" : actor.join(", ");
    const director =
        media.director.length === 1 && media.director[0] === ""
            ? "Chưa cập nhật"
            : media.director;
    const title = media.title || media.name || "No Title";
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
            <div className="text-foreground max-w-[1366px] mx-auto px-5 md:px-0 mt-[-10rem] md:mt-[-15rem] lg:mt-[-20rem] relative">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* poster */}
                    <div className="w-[70%] md:w-[40%] mx-auto md:mx-0 shrink-0">
                        <img
                            src={posterPath}
                            alt="Poster"
                            className="w-full h-auto object-cover rounded-xl shadow-lg aspect-[2/3]"
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

                        <p className="text-base leading-relaxed text-wrap">
                            {content}
                        </p>
                    </div>
                </div>

                <Container header="Watch now">
                    <div ref={playerRef} className="w-full">
                        <MediaPlayer />
                    </div>
                </Container>
            </div>

            <div className="flex justify-center w-full px-5 md:px-0">
                <EpisodeList episodes={episodes} />
            </div>

            <div className="max-w-[1366px] mx-auto px-5 md:px-0">
                <Container header="you may also like">
                    <RecommendSlide category={media.category?.[0]?.slug} country={media.country?.[0]?.slug} />
                </Container>
            </div>
        </>
    );
};

export default MediaWatch;