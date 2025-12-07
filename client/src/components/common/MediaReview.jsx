import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { Send, Trash2, ThumbsUp, ThumbsDown } from "lucide-react";
import reviewApi from "../../api/modules/review.api";
import Container from "./Container";
import TextAvatar from "./TextAvatar";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ReviewItem = ({ review, onRemoved }) => {
  const { user } = useSelector((state) => state.user);

  const [onRequest, setOnRequest] = useState(false);
  const [likesCount, setLikesCount] = useState(review.likes ? review.likes.length : 0);
  const [dislikesCount, setDislikesCount] = useState(review.dislikes ? review.dislikes.length : 0);
  const [userLiked, setUserLiked] = useState(user ? review.likes?.includes(user.id) : false);
  const [userDisliked, setUserDisliked] = useState(user ? review.dislikes?.includes(user.id) : false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const { response, err } = await reviewApi.remove({ reviewId: review.id });

    if (err) toast.error(err.message);
    if (response) onRemoved(review.id);

    setOnRequest(false);
  };

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like reviews");
      return;
    }

    setOnRequest(true);

    if (userLiked) {
      setLikesCount(prev => prev - 1);
      setUserLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setUserLiked(true);
      if (userDisliked) {
        setDislikesCount(prev => prev - 1);
        setUserDisliked(false);
      }
    }

    const { response, err } = await reviewApi.like({ reviewId: review.id });

    if (err) {
      toast.error(err.message);
      setLikesCount(review.likes ? review.likes.length : 0);
      setDislikesCount(review.dislikes ? review.dislikes.length : 0);
      setUserLiked(user ? review.likes?.includes(user.id) : false);
      setUserDisliked(user ? review.dislikes?.includes(user.id) : false);
    } else if (response) {
      setLikesCount(response.likes);
      setDislikesCount(response.dislikes);
    }

    setOnRequest(false);
  };

  const handleDislike = async () => {
    if (!user) {
      toast.error("Please login to dislike reviews");
      return;
    }

    setOnRequest(true);

    if (userDisliked) {
      setDislikesCount(prev => prev - 1);
      setUserDisliked(false);
    } else {
      setDislikesCount(prev => prev + 1);
      setUserDisliked(true);
      if (userLiked) {
        setLikesCount(prev => prev - 1);
        setUserLiked(false);
      }
    }

    const { response, err } = await reviewApi.dislike({ reviewId: review.id });

    if (err) {
      toast.error(err.message);
      setLikesCount(review.likes ? review.likes.length : 0);
      setDislikesCount(review.dislikes ? review.dislikes.length : 0);
      setUserLiked(user ? review.likes?.includes(user.id) : false);
      setUserDisliked(user ? review.dislikes?.includes(user.id) : false);
    } else if (response) {
      setLikesCount(response.likes);
      setDislikesCount(response.dislikes);
    }

    setOnRequest(false);
  };

  return (
    <div className={`p-4 rounded-md relative hover:bg-muted/50 transition-colors ${onRequest ? "opacity-60" : "opacity-100"}`}>
      <div className="flex flex-row gap-4">
        <TextAvatar text={review.user?.username} />
        <div className="flex flex-col gap-2 flex-grow">
          <div className="flex flex-col gap-1">
            <h6 className="font-bold text-lg">
              {review.user?.username}
            </h6>
            <span className="text-xs text-muted-foreground">
              {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
            </span>
          </div>
          <p className="text-justify text-sm sm:text-base">
            {review.content}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2 items-start sm:items-center">
            <div className="flex flex-row gap-2 items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                disabled={onRequest}
                className={userLiked ? "text-primary" : "text-muted-foreground"}
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                {likesCount}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleDislike}
                disabled={onRequest}
                className={userDisliked ? "text-destructive" : "text-muted-foreground"}
              >
                <ThumbsDown className="mr-2 h-4 w-4" />
                {dislikesCount}
              </Button>
            </div>
          </div>

          {user && user.id === review.user.id && (
            <Button
              variant="destructive"
              size="sm"
              disabled={onRequest}
              onClick={onRemove}
              className="relative sm:absolute sm:right-2 sm:top-2 w-max mt-2 sm:mt-0"
            >
              {onRequest ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
              remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const MediaReview = ({ media, slug }) => {
  const mediaId = media._id || media.id;
  const { user } = useSelector((state) => state.user);
  const [listReviews, setListReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [onRequest, setOnRequest] = useState(false);
  const [content, setContent] = useState("");
  const [reviewCount, setReviewCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const skip = 4;

  const fetchReviews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { response, err } = await reviewApi.getReviewsByMediaId(mediaId);
      if (err) {
        setError(err.message || "Không thể tải bình luận");
        setListReviews([]);
        setFilteredReviews([]);
        setReviewCount(0);
      } else if (response) {
        const mainReviews = response.results || [];
        setListReviews(mainReviews);
        setFilteredReviews(mainReviews.slice(0, skip));
        setReviewCount(mainReviews.length);
      }
    } catch (error) {
      setError("Có lỗi xảy ra khi tải bình luận");
      setListReviews([]);
      setFilteredReviews([]);
      setReviewCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (media) {
      fetchReviews();
    }
  }, [media]);

  const onAddReview = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const body = {
      content,
      mediaId: media._id || media.id,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path || media.poster_url || media.thumb_url,
      mediaSlug: slug
    };
    const { response, err } = await reviewApi.add(body);

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      toast.success("Post review success");
      setContent("");
      fetchReviews();
    }
  };

  const onLoadMore = () => {
    setFilteredReviews([...filteredReviews, ...[...listReviews].slice(page * skip, (page + 1) * skip)]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    if (listReviews.findIndex(e => e.id === id) !== -1) {
      const newListReviews = [...listReviews].filter(e => e.id !== id);
      setListReviews(newListReviews);
      setFilteredReviews([...newListReviews].slice(0, page * skip));
    } else {
      setFilteredReviews([...filteredReviews].filter(e => e.id !== id));
    }
    setReviewCount(reviewCount - 1);
    toast.success("Review removed successfully");
  };

  return (
    <Container header={`Reviews (${reviewCount})`}>
      {isLoading ? (
        <p>Đang tải bình luận...</p>
      ) : error ? (
        <p className="text-destructive p-4">{error}. Thử lại sau.</p>
      ) : (
        <div className="flex flex-col gap-8 mb-8">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((item) => (
              item.user ? (
                <div key={item.id || item._id}>
                  <ReviewItem review={item} onRemoved={onRemoved} />
                  <Separator className="my-4 md:hidden" />
                </div>
              ) : null
            ))
          ) : (
            <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
          )}

          {filteredReviews.length < listReviews.length && (
            <Button onClick={onLoadMore} variant="outline" className="w-max mx-auto">Xem thêm</Button>
          )}
        </div>
      )}

      {user && (
        <>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <TextAvatar text={user.username} />
            <div className="flex flex-col gap-4 flex-grow">
              <h6 className="font-bold text-lg">
                {user.username}
              </h6>
              <Texta
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Viết bình luận của bạn"
                rows={4}
                className="resize-none"
              />
              <Button
                size="lg"
                className="w-max"
                onClick={onAddReview}
                disabled={onRequest}
              >
                {onRequest ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Đăng
              </Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default MediaReview;