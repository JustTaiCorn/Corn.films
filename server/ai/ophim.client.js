import axios from "axios";

const ophimClient = axios.create({
  baseURL: "https://ophim1.com/v1/api/",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

ophimClient.interceptors.response.use(
  (response) => (response && response.data ? response.data : response),
  (err) => {
    const message =
      err?.response?.data?.message || err?.message || "Lỗi gọi ophim";
    throw new Error(message);
  },
);

export const buildQuery = (params = {}) => {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    search.append(key, String(value));
  }
  const str = search.toString();
  return str ? `?${str}` : "";
};

export const slimMovie = (item) => {
  if (!item) return null;
  return {
    name: item.name,
    slug: item.slug,
    origin_name: item.origin_name,
    year: item.year,
    type: item.type,
    poster_url: item.poster_url,
    thumb_url: item.thumb_url,
    country: Array.isArray(item.country)
      ? item.country.map((c) => c?.name).filter(Boolean)
      : [],
    category: Array.isArray(item.category)
      ? item.category.map((c) => c?.name).filter(Boolean)
      : [],
    episode_current: item.episode_current,
    episode_total: item.episode_total,
    quality: item.quality,
    lang: item.lang,
    time: item.time,
    sub_docquyen: item.sub_docquyen,
  };
};

export const slimMovieDetail = (movie, episodes) => {
  if (!movie) return null;
  const compact = slimMovie(movie);
  const seasons = Array.isArray(episodes)
    ? episodes.map((srv) => ({
        server_name: srv?.server_name,
        episode_count: Array.isArray(srv?.server_data)
          ? srv.server_data.length
          : 0,
      }))
    : [];
  return {
    ...compact,
    content: movie?.content,
    actor: Array.isArray(movie?.actor) ? movie.actor.slice(0, 8) : [],
    director: Array.isArray(movie?.director) ? movie.director : [],
    status: movie?.status,
    seasons,
  };
};

export const slimPagination = (params) => {
  const p = params?.pagination;
  if (!p) return null;
  return {
    totalItems: p.totalItems,
    totalItemsPerPage: p.totalItemsPerPage,
    currentPage: p.currentPage,
    totalPages: p.totalItems
      ? Math.ceil(p.totalItems / (p.totalItemsPerPage || 10))
      : undefined,
  };
};

export default ophimClient;
