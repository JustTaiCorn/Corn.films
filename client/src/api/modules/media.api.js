import publicClient from "../client/public.client";
import { useQuery } from "@tanstack/react-query";
const mediaEndpoints = {
  list: ({ mediaType, currPage }) => `danh-sach/${mediaType}?page=${currPage}`,
  detail: ({ slug }) => `phim/${slug}`,
  search: ({ query }) => `tim-kiem?keyword=${query}&page=1`,
  listByCategory: ({ category, currPage }) =>
    `the-loai/${category}?page=${currPage || 1}`,
  listByCountry: ({ country, currPage }) =>
    `quoc-gia/${country}?page=${currPage || 1}`,
};
// Hàm return url dựa vào params
const buildUrl = (params) => {
  const {
    category = "",
    country = "",
    year = "",
    sort_field = "",
    page = "",
    type = "",
  } = params;
  const baseUrl = "https://ophim1.com/v1/api/danh-sach/";

  const queryParams = new URLSearchParams();
  if (type) queryParams.append("type", type);
  if (category) queryParams.append("category", category);
  if (country) queryParams.append("country", country);
  if (year) queryParams.append("year", year);
  if (sort_field) queryParams.append("sort_field", sort_field);
  if (page) queryParams.append("page", page);

  return `${baseUrl}?${queryParams.toString()}`;
};

// Hàm lấy danh sách phim đã sắp xếp

const mediaApi = {
  getList: async ({ mediaType, currPage }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.list({ mediaType, currPage })
      );

      return response.data;
    } catch (err) {
      return { err };
    }
  },
  getDetail: async ({ slug }) => {
    try {
      const response = await publicClient.get(mediaEndpoints.detail({ slug }));

      return response.data;
    } catch (err) {
      return { err };
    }
  },
  search: async ({ query }) => {
    try {
      const response = await publicClient.get(mediaEndpoints.search({ query }));

      return response.data;
    } catch (err) {
      return { err };
    }
  },
  getCategory: async () => {
    try {
      const response = await publicClient.get("the-loai");

      return response.data;
    } catch (err) {
      return { err };
    }
  },
  getListByCategory: async ({ category, currPage }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.listByCategory({ category, currPage })
      );

      return response.data;
    } catch (err) {
      return { err };
    }
  },
  getCoutry: async () => {
    try {
      const response = await publicClient.get("quoc-gia/");
      return response.data;
    } catch (err) {
      return { err };
    }
  },

  getListByCountry: async ({ country, currPage }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.listByCountry({ country, currPage })
      );

      return response.data;
    } catch (err) {
      return { err };
    }
  },
  getSortedMovies: async (params) => {
    try {
      const url = buildUrl(params);
      const response = await publicClient.get(url);

      return response.data;
    } catch (err) {
      return { err };
    }
  },
};

export const useList = ({ mediaType, currPage }) => {
  return useQuery({
    queryKey: ["danhsach", { mediaType, currPage }],
    queryFn: () => mediaApi.getList({ mediaType, currPage }),
  });
};

export const useDetail = ({ slug }) => {
  return useQuery({
    queryKey: ["detail", { slug }],
    queryFn: () => mediaApi.getDetail({ slug }),
    enabled: !!slug,
  });
};

export const useSearch = ({ query }) => {
  return useQuery({
    queryKey: ["search", { query }],
    queryFn: () => mediaApi.search({ query }),
    enabled: !!query,
  });
};

export const useListByCategory = ({ category, currPage }) => {
  return useQuery({
    queryKey: ["listByCategory", { category, currPage }],
    queryFn: () =>
      mediaApi.getListByCategory({
        category,
        currPage,
      }),
    enabled: !!category,
  });
};

export const useListByCountry = ({ country, currPage }) => {
  return useQuery({
    queryKey: ["listByCountry", { country, currPage }],
    queryFn: () => mediaApi.getListByCountry({ country, currPage }),
    enabled: !!country,
  });
};

export const useSortedMovies = ({
  category,
  country,
  year,
  sort_field,
  page,
  type,
}) => {
  return useQuery({
    queryKey: [
      "sortedMovies",
      { category, country, year, sort_field, page, type },
    ],
    queryFn: () =>
      mediaApi.getSortedMovies({
        category,
        country,
        year,
        sort_field,
        page,
        type,
      }),
  });
};

export default mediaApi;
