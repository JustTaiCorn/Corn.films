import privateClient from "../client/private.client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const reviewApi = {
  add: async ({ mediaId, mediaTitle, mediaPoster, content, mediaSlug }) => {
    try {
      const response = await privateClient.post("reviews", {
        mediaId,
        mediaTitle,
        mediaPoster,
        content,
        mediaSlug,
      });

      return { response: response.data };
    } catch (err) {
      return { err };
    }
  },

  remove: async ({ reviewId }) => {
    try {
      const response = await privateClient.delete(`reviews/${reviewId}`);

      return { response: response.data };
    } catch (err) {
      return { err };
    }
  },
  // Get reviews của user hiện tại
  getList: async () => {
    try {
      const response = await privateClient.get("reviews");

      return { response: response.data };
    } catch (err) {
      return { err };
    }
  },

  getReviewsByMediaId: async (mediaId) => {
    try {
      const response = await privateClient.get(`reviews/media/${mediaId}`);
      return { response: response.data };
    } catch (err) {
      return { err };
    }
  },

  like: async ({ reviewId }) => {
    try {
      const response = await privateClient.post(`reviews/like/${reviewId}`);

      return { response: response.data };
    } catch (err) {
      return { err };
    }
  },
  dislike: async ({ reviewId }) => {
    try {
      const response = await privateClient.post(`reviews/dislike/${reviewId}`);

      return { response: response.data };
    } catch (err) {
      return { err };
    }
  },
};

export const useReviews = ({ mediaId }) => {
  return useQuery({
    queryKey: ["reviews", mediaId],
    queryFn: () => reviewApi.getReviewsByMediaId(mediaId),
    enabled: !!mediaId,
  });
};

export const useAddReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reviewApi.add,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["reviews", variables.mediaId]);
    },
  });
};

export const useRemoveReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reviewApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

export const useLikeReview = () => {
  return useMutation({
    mutationFn: reviewApi.like,
  });
};

export const useDislikeReview = () => {
  return useMutation({
    mutationFn: reviewApi.dislike,
  });
};

export default reviewApi;
