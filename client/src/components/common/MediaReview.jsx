import { LoadingButton } from "@mui/lab";
import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import Container from "./Container";
import reviewApi from "../../api/modules/review.api";
import TextAvatar from "./TextAvatar";

const ReviewItem = ({ review, onRemoved }) => {
  const { user } = useSelector((state) => state.user);

  const [onRequest, setOnRequest] = useState(false);
  const [likesCount, setLikesCount] = useState(review.likes ? review.likes.length : 0);
  const [dislikesCount, setDislikesCount] = useState(review.dislikes ? review.dislikes.length : 0);
  const [userLiked, setUserLiked] = useState(user ? review.likes?.includes(user.id) : false);
  const [userDisliked, setUserDisliked] = useState(user ? review.dislikes?.includes(user.id) : false);
  const [replyContent, setReplyContent] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);

  const [replyLoading, setReplyLoading] = useState(false);

  useEffect(() => {
    // Ensure replies is always an array
    const replyArray = Array.isArray(review.replies) ? review.replies : [];

    // Filter out any undefined or null replies 
    setReplies(replyArray.filter(reply => reply));

    // If there are replies, expand them by default for non-logged in users
    if (!user && replyArray.length > 0) {
      setShowReplies(true);
    }
  }, [review, user]);

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

    // Optimistic UI update
    if (userLiked) {
      // User is unliking
      setLikesCount(prev => prev - 1);
      setUserLiked(false);
    } else {
      // User is liking
      setLikesCount(prev => prev + 1);
      setUserLiked(true);

      // If user previously disliked, remove dislike
      if (userDisliked) {
        setDislikesCount(prev => prev - 1);
        setUserDisliked(false);
      }
    }

    const { response, err } = await reviewApi.like({ reviewId: review.id });

    if (err) {
      toast.error(err.message);
      // Revert on error
      setLikesCount(review.likes ? review.likes.length : 0);
      setDislikesCount(review.dislikes ? review.dislikes.length : 0);
      setUserLiked(user ? review.likes?.includes(user.id) : false);
      setUserDisliked(user ? review.dislikes?.includes(user.id) : false);
    } else if (response) {
      // Update with server data to be sure
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

    // Optimistic UI update
    if (userDisliked) {
      // User is un-disliking
      setDislikesCount(prev => prev - 1);
      setUserDisliked(false);
    } else {
      // User is disliking
      setDislikesCount(prev => prev + 1);
      setUserDisliked(true);

      // If user previously liked, remove like
      if (userLiked) {
        setLikesCount(prev => prev - 1);
        setUserLiked(false);
      }
    }

    const { response, err } = await reviewApi.dislike({ reviewId: review.id });

    if (err) {
      toast.error(err.message);
      // Revert on error
      setLikesCount(review.likes ? review.likes.length : 0);
      setDislikesCount(review.dislikes ? review.dislikes.length : 0);
      setUserLiked(user ? review.likes?.includes(user.id) : false);
      setUserDisliked(user ? review.dislikes?.includes(user.id) : false);
    } else if (response) {
      // Update with server data to be sure
      setLikesCount(response.likes);
      setDislikesCount(response.dislikes);
    }

    setOnRequest(false);
  };

  const handleSubmitReply = async () => {
    if (!user) {
      toast.error("Please login to reply");
      return;
    }

    if (!replyContent.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }

    setReplyLoading(true);

    const { response, err } = await reviewApi.reply({
      reviewId: review.id,
      content: replyContent
    });

    if (err) {
      toast.error(err.message);
    } else if (response) {
      // Add the new reply to the list with user data
      const newReply = {
        ...response,
        user: { username: user.username }
      };
      setReplies([...replies, newReply]);
      setReplyContent("");
      setShowReplyForm(false);
      setShowReplies(true);
      toast.success("Reply added successfully");
    }

    setReplyLoading(false);
  };

  return (
    <Box sx={{
      padding: 2,
      borderRadius: "5px",
      position: "relative",
      opacity: onRequest ? 0.6 : 1,
      "&:hover": { backgroundColor: "background.paper" }
    }}>
      <Stack direction="row" spacing={2}>
        {/* avatar */}
        <TextAvatar text={review.user?.username} />
        {/* avatar */}
        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight="700">
              {review.user?.username}
            </Typography>
            <Typography variant="caption">
              {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
            </Typography>
          </Stack>
          <Typography variant="body1" textAlign="justify">
            {review.content}
          </Typography>

          {/* Like/Dislike/Reply buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            sx={{ mt: 2 }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                startIcon={userLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                onClick={handleLike}
                color={userLiked ? "primary" : "inherit"}
                disabled={onRequest}
              >
                {likesCount}
              </Button>

              <Button
                startIcon={userDisliked ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
                onClick={handleDislike}
                color={userDisliked ? "error" : "inherit"}
                disabled={onRequest}
              >
                {dislikesCount}
              </Button>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                startIcon={<ReplyIcon />}
                onClick={() => user ? setShowReplyForm(!showReplyForm) : toast.error("Please login to reply")}
                sx={{ minWidth: '90px' }}
              >
                Reply
              </Button>

              {replies && replies.length > 0 && (
                <Button
                  startIcon={showReplies ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  onClick={() => setShowReplies(!showReplies)}
                  sx={{
                    minWidth: '120px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {replies.length} {replies.length === 1 ? "reply" : "replies"}
                </Button>
              )}
            </Stack>
          </Stack>

          {/* Reply form */}
          {showReplyForm && user && (
            <Box sx={{ mt: 2, pl: 2, borderLeft: "2px solid", borderColor: "divider" }}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <TextAvatar text={user.username} sx={{ width: 32, height: 32 }} />
                <Stack spacing={1} flexGrow={1}>
                  <TextField
                    multiline
                    rows={2}
                    placeholder="Write your reply"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    size="small"
                    fullWidth
                  />
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setShowReplyForm(false)}
                    >
                      Cancel
                    </Button>
                    <LoadingButton
                      variant="contained"
                      size="small"
                      loading={replyLoading}
                      onClick={handleSubmitReply}
                    >
                      Reply
                    </LoadingButton>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          )}

          {/* Replies list */}
          {showReplies && replies && replies.length > 0 && (
            <Box sx={{ mt: 2, pl: 2, borderLeft: "2px solid", borderColor: "divider" }}>
              <Stack spacing={2}>
                {replies.map((reply, index) => {
                  // Skip rendering if the reply doesn't have user info
                  if (!reply || !reply.user) return null;

                  return (
                    <Stack key={reply.id || reply._id || index} direction="row" spacing={1}>
                      <TextAvatar text={reply.user?.username} sx={{ width: 32, height: 32 }} />
                      <Stack spacing={0.5} flexGrow={1}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="subtitle2" fontWeight="700">
                            {reply.user?.username}
                          </Typography>
                          <Typography variant="caption">
                            {dayjs(reply.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                          </Typography>
                        </Stack>
                        <Typography variant="body2">{reply.content}</Typography>
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>
            </Box>
          )}

          {user && user.id === review.user.id && (
            <LoadingButton
              variant="contained"
              startIcon={<DeleteIcon />}
              loadingPosition="start"
              loading={onRequest}
              onClick={onRemove}
              sx={{
                position: { xs: "relative", md: "absolute" },
                right: { xs: 0, md: "10px" },
                marginTop: { xs: 2, md: 0 },
                width: "max-content"
              }}
            >
              remove
            </LoadingButton>
          )}
        </Stack>
      </Stack>
    </Box>
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

  const skip = 4;

  const fetchReviews = async () => {
    setIsLoading(true);
    const { response, err } = await reviewApi.getReviewsByMediaId(mediaId);
    setIsLoading(false);

    if (err) {
      console.log(err);
      return;
    }

    if (response) {

      const mainReviews = response.results || [];

      setListReviews(mainReviews);
      setFilteredReviews(mainReviews.slice(0, skip));
      setReviewCount(mainReviews.length);
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
      // Refresh reviews after adding new one
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
    <>
      <Container header={`Reviews (${reviewCount})`}>
        {isLoading ? (
          <Typography>Loading reviews...</Typography>
        ) : (
          <Stack spacing={4} marginBottom={2}>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((item) => (
                item.user ? (
                  <Box key={item.id || item._id}>
                    <ReviewItem review={item} onRemoved={onRemoved} />
                    <Divider sx={{ display: { xs: "block", md: "none" } }} />
                  </Box>
                ) : null
              ))
            ) : (
              <Typography>No reviews yet. Be the first to review!</Typography>
            )}

            {filteredReviews.length < listReviews.length && (
              <Button onClick={onLoadMore}>load more</Button>
            )}
          </Stack>
        )}
        {user && (
          <>
            <Divider />
            <Stack direction="row" spacing={2} mt={2}>
              <TextAvatar text={user.username} />
              <Stack spacing={2} flexGrow={1}>
                <Typography variant="h6" fontWeight="700">
                  {user.username}
                </Typography>
                <TextField
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  multiline
                  rows={4}
                  placeholder="Write your review"
                  variant="outlined"
                />
                <LoadingButton
                  variant="contained"
                  size="large"
                  sx={{ width: "max-content" }}
                  startIcon={<SendOutlinedIcon />}
                  loadingPosition="start"
                  loading={onRequest}
                  onClick={onAddReview}
                >
                  post
                </LoadingButton>
              </Stack>
            </Stack>
          </>
        )}
      </Container>
    </>
  );
};

export default MediaReview;