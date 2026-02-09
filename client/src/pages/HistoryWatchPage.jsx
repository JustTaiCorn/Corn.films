import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import { useHistory, useRemoveHistory, useClearHistory } from "../api/modules/history.api";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Play, Clock, X, CalendarDays } from "lucide-react";
import { routesGen } from "@/routes/routes";
import dayjs from "dayjs";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const HistoryItem = ({ media, onRemoved }) => {
    const removeHistory = useRemoveHistory();

    const onRemove = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        removeHistory.mutate(
            { historyId: media._id },
            {
                onSuccess: () => {
                    toast.success("Đã xóa khỏi lịch sử");
                    onRemoved(media._id);
                },
                onError: (err) => {
                    toast.error(err.message || "Có lỗi xảy ra");
                },
            }
        );
    };

    const posterUrl = media.poster
        ? `https://img.ophim.live/uploads/movies/${media.poster}`
        : "https://via.placeholder.com/300x450";

    const watchedDate = dayjs(media.watchedAt)
        .locale("vi")
        .format("DD/MM/YYYY");

    return (
        <Card className="group flex flex-col">
            <Link
                to={`${routesGen.mediaWatch(media.slug)}#player`}
                className="relative block"
            >
                <div className="relative aspect-[2/3] overflow-hidden rounded-t-xl border border-border/50 shadow-lg">
                    <img
                        src={posterUrl}
                        alt={media.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* HD Badge */}
                    <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm text-foreground text-[10px] font-bold px-2 py-0.5 rounded border border-border">
                        HD
                    </div>

                    {/* Play overlay on hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                            <Play className="w-5 h-5 text-primary-foreground ml-0.5" fill="currentColor" />
                        </div>
                    </div>


                    <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 left-2 w-7 h-7
    opacity-100 sm:opacity-0 sm:group-hover:opacity-100
    transition-opacity
"
                        onClick={onRemove}
                        disabled={removeHistory.isPending}
                    >
                        {removeHistory.isPending ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                            <X className="w-3.5 h-3.5" />
                        )}
                    </Button>
                </div>
                <div className="flex flex-col gap-1 mt-2 px-1 py-2 items-center">
                    <CardTitle className="text-lg uppercase">{media.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-muted-foreground">
                        <CalendarDays className="w-3 h-3 " />
                        <span className="text-sm">{watchedDate}</span>
                    </CardDescription>
                </div>
            </Link>


        </Card>
    );
};

export default function HistoryWatchPage() {
    const dispatch = useDispatch();
    const { data, isLoading } = useHistory();
    const clearHistory = useClearHistory();

    const [medias, setMedias] = useState([]);
    const [filteredMedias, setFilteredMedias] = useState([]);
    const [page, setPage] = useState(1);
    const skip = 12;

    useEffect(() => {
        dispatch(setGlobalLoading(isLoading));
    }, [isLoading, dispatch]);

    useEffect(() => {
        if (data?.response?.history) {
            const sortedHistory = [...data.response.history].sort(
                (a, b) => new Date(b.watchedAt) - new Date(a.watchedAt)
            );
            setMedias(sortedHistory);
            setFilteredMedias(sortedHistory.slice(0, skip));
        }
    }, [data]);

    const onLoadMore = () => {
        const nextPage = page + 1;
        setFilteredMedias(medias.slice(0, nextPage * skip));
        setPage(nextPage);
    };

    const onRemoved = (id) => {
        const newMedias = medias.filter((m) => m._id !== id);
        setMedias(newMedias);
        setFilteredMedias(newMedias.slice(0, page * skip));
    };

    const handleClearAll = () => {
        if (!window.confirm("Bạn có chắc muốn xóa toàn bộ lịch sử xem?")) return;

        clearHistory.mutate(undefined, {
            onSuccess: () => {
                toast.success("Đã xóa toàn bộ lịch sử");
                setMedias([]);
                setFilteredMedias([]);
            },
            onError: (err) => {
                toast.error(err.message || "Có lỗi xảy ra");
            },
        });
    };

    return (
        <div className="mt-20 max-w-[1366px] mx-auto px-5 md:px-0 text-foreground">
            <Container
                header={
                    <div className="flex items-center justify-between w-full">
                        <span>Lịch sử xem ({medias.length})</span>
                        {medias.length > 0 && (
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={handleClearAll}
                                disabled={clearHistory.isPending}
                            >
                                {clearHistory.isPending ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Trash2 className="mr-2 h-4 w-4" />
                                )}
                                Xóa tất cả
                            </Button>
                        )}
                    </div>
                }
            >
                {medias.length === 0 && !isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                        <Clock className="w-16 h-16 mb-4 opacity-50" />
                        <p className="text-lg">Chưa có lịch sử xem</p>
                        <p className="text-sm">Các phim bạn đã xem sẽ xuất hiện ở đây</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {filteredMedias.map((media) => (
                                <HistoryItem key={media._id} media={media} onRemoved={onRemoved} />
                            ))}
                        </div>

                        {filteredMedias.length < medias.length && (
                            <div className="flex justify-center mt-8">
                                <Button variant="secondary" onClick={onLoadMore}>
                                    Xem thêm
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
}