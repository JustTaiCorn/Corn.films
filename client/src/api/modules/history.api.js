import privateClient from "../client/private.client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const historyApi = {
  add: async ({
    mediaId,
    mediaType,
    title,
    poster,
    progress,
    episode,
    season,
    slug,
  }) => {
    try {
      const response = await privateClient.post(
        "history",
        {
          mediaId,
          mediaType,
          title,
          poster,
          progress,
          episode,
          season,
          slug,
        },
        { withCredentials: true },
      );

      return { response: response.data };
    } catch (err) {
      return { err };
    }
  },

  remove: async ({ historyId }) => {
    try {
      const response = await privateClient.delete(`history/${historyId}`, {
        withCredentials: true,
      });

      return { response: response.data };
    } catch (err) {
      return { err };
    }
  },
  getList: async () => {
    try {
      const response = await privateClient.get("history", {
        withCredentials: true,
      });

      return { response: response.data };
    } catch (err) {
      return { err };
    }
  },

  clear: async () => {
    try {
      const response = await privateClient.delete("history", {
        withCredentials: true,
      });

      return { response: response.data };
    } catch (err) {
      return { err };
    }
  },
};

export const useHistory = () => {
  return useQuery({
    queryKey: ["history"],
    queryFn: () => historyApi.getList(),
  });
};

export const useAddHistory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: historyApi.add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
};

export const useRemoveHistory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: historyApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
};

export const useClearHistory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: historyApi.clear,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
};

export default historyApi;
