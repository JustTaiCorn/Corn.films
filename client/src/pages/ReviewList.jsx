import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import reviewApi from "../api/modules/review.api";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { Button } from "@/components/ui/button";
import {ReviewItem} from "@/components/common/ReviewItem.jsx";
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