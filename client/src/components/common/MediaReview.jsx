import { useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import {Send, Trash2, ThumbsUp, ThumbsDown, Loader2, InfoIcon} from "lucide-react";
import { useReviews, useAddReview, useRemoveReview, useLikeReview, useDislikeReview } from "../../api/modules/review.api";
import Container from "./Container";
import TextAvatar from "./TextAvatar";
import { Button } from "@/components/ui/button";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.jsx";

const ReviewItem = ({ review, user }) => {
  const [likes, setLikes] = useState(review.likes?.length || 0);
  const [dislikes, setDislikes] = useState(review.dislikes?.length || 0);
  const [isLiked, setIsLiked] = useState(review.likes?.includes(user?.id));
  const [isDisliked, setIsDisliked] = useState(review.dislikes?.includes(user?.id));

  const { mutateAsync: removeReview, isPending: isRemoving } = useRemoveReview();
  const { mutateAsync: likeReview } = useLikeReview();
  const { mutateAsync: dislikeReview } = useDislikeReview();

  const handleRemove = async () => {
    const { response, err } = await removeReview({ reviewId: review.id });
    if (err) return toast.error(err.message);
  };

  const handleVote = async (type) => {
    if (!user) return toast.error("Vui lòng đăng nhập để đánh giá");

    const isLike = type === 'like';
    const currentVote = isLike ? isLiked : isDisliked;
    const oppositeVote = isLike ? isDisliked : isLiked;

    // Optimistic update
    if (isLike) {
      setLikes(prev => currentVote ? prev - 1 : prev + 1);
      setIsLiked(!currentVote);
      if (oppositeVote) {
        setDislikes(prev => prev - 1);
        setIsDisliked(false);
      }
    } else {
      setDislikes(prev => currentVote ? prev - 1 : prev + 1);
      setIsDisliked(!currentVote);
      if (oppositeVote) {
        setLikes(prev => prev - 1);
        setIsLiked(false);
      }
    }

    const { response, err } = await (type === 'like' ? likeReview : dislikeReview)({ reviewId: review.id });

    if (err) {
      toast.error(err.message);
      // Revert on error
      setLikes(review.likes?.length || 0);
      setDislikes(review.dislikes?.length || 0);
      setIsLiked(review.likes?.includes(user.id));
      setIsDisliked(review.dislikes?.includes(user.id));
    } else if (response) {
      // Sync with server response if needed
      setLikes(response.likes);
      setDislikes(response.dislikes);
    }
  };

  return (
    <div className="p-4 border-b">
      <div className="flex gap-3">
        <TextAvatar text={review.user?.username} />
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-semibold">{review.user?.username}</p>
              <p className="text-xs text-gray-500">
                {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
              </p>
            </div>
          </div>
          <p className="mb-3">{review.content}</p>
          <div className="flex gap-4 items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote('like')}
              className={isLiked ? "text-blue-600" : ""}
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              {likes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote('dislike')}
              className={isDisliked ? "text-red-600" : ""}
            >
              <ThumbsDown className="w-4 h-4 mr-1" />
              {dislikes}
            </Button>
            {user?.id === review.user?.id && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                disabled={isRemoving}
              >
                {isRemoving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MediaReview = ({ media, slug }) => {
  const { user } = useSelector((state) => state.user);
  const [content, setContent] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  const { data: reviewsData, isPending: isLoading } = useReviews({ mediaId: media?._id || media?.id });
  const { mutateAsync: addReview, isPending: isSubmitting } = useAddReview();

  const reviews = reviewsData?.response?.results || [];

  const handleSubmit = async () => {
    if (!content.trim()) return;

    const { response, err } = await addReview({
      content,
      mediaId: media._id || media.id,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path || media.poster_url || media.thumb_url,
      mediaSlug: slug
    });

    if (err) return toast.error(err.message);
    if (response) {
      toast.success("Đăng bình luận thành công");
      setContent("");
    }
  };

  const visibleReviews = reviews.slice(0, visibleCount);

  return (
    <>
      <Container header={`Bình luận (${reviews.length})`}>
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
            <Alert className="m-4 p-5 mx-auto">
                <InfoIcon className="h-4 w-4" />
                <AlertTitle className="font-bold">Thông báo</AlertTitle>
                <AlertDescription>
                    Hãy là người đầu tiên bình luận về tác phẩm này!
                </AlertDescription>
            </Alert>

        ) : (
          <>
            {visibleReviews.map(review =>
              review.user && <ReviewItem key={review.id} review={review} user={user} />
            )}
            {visibleCount < reviews.length && (
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => setVisibleCount(prev => prev + 4)}
              >
                Xem thêm
              </Button>
            )}
          </>
        )}
      </Container>

      {user && (
        <Container header="Viết bình luận">
          <div className="flex gap-3 p-4">
            <TextAvatar text={user.username} />
            <div className="flex-1">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Viết bình luận của bạn..."
                rows={4}
                className="w-full p-3 border rounded-lg resize-none"
              />
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !content.trim()}
                className="mt-2"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                Đăng
              </Button>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default MediaReview;