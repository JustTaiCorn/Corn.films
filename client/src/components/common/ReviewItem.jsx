import {useState} from "react";
import reviewApi from "@/api/modules/review.api.js";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {routesGen} from "@/routes/routes.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Loader2, Star, Trash2} from "lucide-react";
import dayjs from "dayjs";
export const ReviewItem = ({ review, onRemoved }) => {
    const [onRequest, setOnRequest] = useState(false);

    const onRemove = async () => {
        if (onRequest) return;
        setOnRequest(true);
        const { response, err } = await reviewApi.remove({ reviewId: review.id });
        setOnRequest(false);

        if (err) toast.error(err.message);
        if (response) {
            toast.success("Đã xóa review");
            onRemoved(review.id);
        }
    };

    return (
        <div className="group relative bg-background rounded-xl p-4 hover:bg-accent transition-all duration-300 border border-border hover:border-accent">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Poster */}
                <Link
                    to={routesGen.mediaDetail(review.mediaSlug)}
                    className="w-full md:w-32 shrink-0"
                >
                    <div
                        className="relative pt-[140%] md:pt-[150%] bg-cover bg-center rounded-lg overflow-hidden shadow-lg  transition-transform duration-300"
                        style={{ backgroundImage: `url(https://img.ophim.live/uploads/movies/${review.mediaPoster})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </Link>

                {/* Content */}
                <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                        <Link
                            to={routesGen.mediaDetail(review.mediaSlug)}
                            className="hover:text-primary transition-colors"
                        >
                            <h3 className="text-lg md:text-xl font-semibold group-hover:text-primary transition-colors">
                                {review.mediaTitle}
                            </h3>
                        </Link>

                        <Button
                            size="icon"
                            variant="ghost"
                            className="shrink-0 h-9 w-9 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                            onClick={onRemove}
                            disabled={onRequest}
                        >
                            {onRequest ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Trash2 className="h-4 w-4" />
                            )}
                        </Button>
                    </div>

                    <span className="text-xs text-zinc-500 flex items-center gap-2">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        {dayjs(review.createdAt).format("DD/MM/YYYY • HH:mm")}
          </span>

                    <p className="text-xl  leading-relaxed line-clamp-3 mt-1">
                        {review.content}
                    </p>
                </div>
            </div>
        </div>
    );
};