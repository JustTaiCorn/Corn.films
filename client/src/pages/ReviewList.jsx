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
import { Loader2, Trash2 } from "lucide-react";

const ReviewItem = ({ review, onRemoved }) => {
  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, err } = await reviewApi.remove({ reviewId: review.id });
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      toast.success("Remove review success");
      onRemoved(review.id);
    }
  };

  return (
    <div className={`relative flex flex-col md:flex-row p-4 gap-4 hover:bg-zinc-800 rounded-md transition-colors ${onRequest ? "opacity-60" : "opacity-100"}`}>
      <div className="w-full md:w-[10%] shrink-0">
        <Link
          to={routesGen.mediaDetail(review.mediaSlug)}
        >
          <div
            className="pt-[160%] bg-cover bg-center rounded-md"
            style={{ backgroundImage: `url(https://img.ophim.live/uploads/movies/${review.mediaPoster})` }}
          />
        </Link>
      </div>

      <div className="w-full md:w-[80%] flex flex-col gap-2">
        <Link
          to={routesGen.mediaDetail(review.mediaSlug)}
          className="hover:text-primary transition-colors text-foreground"
        >
          <h6 className="text-xl font-bold">{review.mediaTitle}</h6>
        </Link>
        <span className="text-xs text-muted-foreground">
          {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
        </span>
        <p className="text-gray-300 line-clamp-3">{review.content}</p>
      </div>

      <Button
        className="md:absolute right-4 top-4 w-max bg-red-600 hover:bg-red-700"
        onClick={onRemove}
        disabled={onRequest}
      >
        {onRequest ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
        remove
      </Button>
    </div>
  );
};

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();
  const skip = 2;

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
    <div className="mt-20 max-w-[1366px] mx-auto px-5 md:px-0 text-foreground">
      <Container header={`Your reviews (${count})`}>
        <div className="flex flex-col gap-4">
          {filteredReviews.map((item) => (
            <div key={item.id}>
              <ReviewItem review={item} onRemoved={onRemoved} />
              <Separator className="my-4 md:hidden" />
            </div>
          ))}
          {filteredReviews.length < reviews.length && (
            <div className="flex justify-center mt-8">
              <Button variant="secondary" onClick={onLoadMore}>load more</Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ReviewList;