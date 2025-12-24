import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import reviewApi from "../api/modules/review.api";
import Container from "../components/common/Container";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { routesGen } from "../routes/routes";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, Trash2, Star } from "lucide-react";

const ReviewItem = ({ review, onRemoved }) => {
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
            className="relative pt-[140%] md:pt-[150%] bg-cover bg-center rounded-lg overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300"
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

          <p className="text-sm text-zinc-300 leading-relaxed line-clamp-3 mt-1">
            {review.content}
          </p>
        </div>
      </div>
    </div>
  );
};

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();
  const skip = 4;

  useEffect(() => {
    const getReviews = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await reviewApi.getList();
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        setCount(response.reviews.length);
        setReviews([...response.reviews]);
        setFilteredReviews([...response.reviews].splice(0, skip));
      }
    };

    getReviews();
  }, []);

  const onLoadMore = () => {
    setFilteredReviews([...filteredReviews, ...[...reviews].splice(page * skip, skip)]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newReviews = [...reviews].filter(e => e.id !== id);
    setReviews(newReviews);
    setFilteredReviews([...newReviews].splice(0, page * skip));
    setCount(count - 1);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Reviews của bạn
          </h1>
          <p className="text-muted-foreground">
            {count} đánh giá
          </p>
        </div>

        <div className="space-y-4">
          {filteredReviews.length > 0 ? (
            <>
              {filteredReviews.map((item) => (
                <ReviewItem key={item.id} review={item} onRemoved={onRemoved} />
              ))}

              {filteredReviews.length < reviews.length && (
                <div className="flex justify-center pt-6">
                  <Button
                    onClick={onLoadMore}
                    className="bg-background hover:bg-accent text-foreground px-8"
                  >
                    Xem thêm
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              Chưa có review nào
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;