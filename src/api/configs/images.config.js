import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = "310b00e6212f54f33cab0bc5406e0bae";

const API_OPTION = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const getTMDBImages = async (media) => {
  const { id, type, season } = media.tmdb;
  console.log(media.tmdb);
  try {
    let endpoint = "";

    if (type === "movie") {
      endpoint = `${TMDB_BASE_URL}/movie/${id}/images`;
    } else if (type === "tv") {
      if (season !== null && season !== undefined) {
        endpoint = `${TMDB_BASE_URL}/tv/${id}/season/${season}/images`;
      } else {
        endpoint = `${TMDB_BASE_URL}/tv/${id}/images`;
      }
    }

    // Gọi API TMDB
    const response = await axios.get(endpoint, {
      params: { api_key: API_KEY, API_OPTION },
    });
    console.log(response);
    const posters = response.data.posters || [];
    const backdrops = response.data.backdrops || [];

    return { posters, backdrops };
  } catch (error) {
    console.error("Lỗi khi gọi TMDB API:", error.message);
    return { posters: [], backdrops: [] };
  }
};

export default getTMDBImages;
