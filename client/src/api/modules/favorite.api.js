import privateClient from "../client/private.client";

const favoriteApi = {
  getList: async () => {
    try {
      const response = await privateClient.get("user/favorites", {
        withCredentials: true,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },

  add: async ({
    mediaId,
    mediaTitle,
    mediaPoster,
    mediaRate,
    mediaSlug,
    mediaTime,
    mediaYear,
  }) => {
    try {
      const response = await privateClient.post(
        "user/favorites",
        {
          mediaId,
          mediaTitle,
          mediaPoster,
          mediaRate,
          mediaSlug,
          mediaTime,
          mediaYear,
        },
        { withCredentials: true }
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  remove: async ({ favoriteId }) => {
    try {
      const response = await privateClient.delete(
        `user/favorites/${favoriteId}`,
        { withCredentials: true }
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default favoriteApi;
