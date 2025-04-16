import privateClient from "../client/private.client";
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

  reply: async ({ reviewId, content }) => {
    try {
      const response = await privateClient.post(`reviews/reply/${reviewId}`, {
        content,
      });

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

export default reviewApi;
