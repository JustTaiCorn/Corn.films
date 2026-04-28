import { toolDefinition } from "@tanstack/ai";
import ophimClient, {
  buildQuery,
  slimMovie,
  slimMovieDetail,
  slimPagination,
} from "../ophim.client.js";

const wrapList = (data, limit) => {
  const payload = data?.data ?? data ?? {};
  const items = Array.isArray(payload?.items) ? payload.items : [];
  const sliced = typeof limit === "number" ? items.slice(0, limit) : items;
  return {
    items: sliced.map(slimMovie).filter(Boolean),
    pagination: slimPagination(payload?.params),
  };
};

const searchMoviesDef = toolDefinition({
  name: "search_movies",
  description:
    "Tìm phim trong kho ophim theo từ khoá (tên phim, từ trong tên, tên diễn viên...). Dùng khi người dùng nhắc đến tên phim cụ thể hoặc một keyword cụ thể.",
  inputSchema: {
    type: "object",
    properties: {
      keyword: {
        type: "string",
        description: "Từ khoá tìm kiếm. Ví dụ: 'spider-man', 'conan', 'parasite'.",
      },
      page: {
        type: "number",
        description: "Trang kết quả (mặc định 1).",
      },
    },
    required: ["keyword"],
  },
});

const filterMoviesDef = toolDefinition({
  name: "filter_movies",
  description:
    "Lọc phim trong kho ophim theo nhiều tiêu chí: loại phim, thể loại, quốc gia, năm, cách sắp xếp. Đây là tool MẶC ĐỊNH cho mọi yêu cầu kiểu 'phim X năm Y của nước Z'. Tất cả tham số đều optional, nhưng nên truyền ít nhất 1.",
  inputSchema: {
    type: "object",
    properties: {
      type: {
        type: "string",
        enum: ["phim-le", "phim-bo", "hoat-hinh", "tv-shows"],
        description:
          "Loại phim: phim-le (phim chiếu rạp/1 tập), phim-bo (nhiều tập), hoat-hinh (anime/hoạt hình), tv-shows.",
      },
      category: {
        type: "string",
        description:
          "Slug thể loại, ví dụ: 'hanh-dong', 'tinh-cam', 'kinh-di'. Nếu không chắc, gọi list_categories trước.",
      },
      country: {
        type: "string",
        description:
          "Slug quốc gia, ví dụ: 'viet-nam', 'han-quoc', 'au-my'. Nếu không chắc, gọi list_countries trước.",
      },
      year: {
        type: "string",
        description: "Năm phát hành dạng chuỗi, ví dụ: '2024'.",
      },
      sort_field: {
        type: "string",
        enum: ["modified.time", "year", "_id"],
        description:
          "Cách sắp xếp: 'modified.time' (mới cập nhật), 'year' (năm), '_id' (mới nhất).",
      },
      page: {
        type: "number",
        description: "Trang (mặc định 1).",
      },
    },
  },
});

const getMoviesByCategoryDef = toolDefinition({
  name: "get_movies_by_category",
  description:
    "Lấy danh sách phim của một thể loại theo slug. Dùng khi người dùng hỏi 'phim hành động', 'phim kinh dị', 'phim tình cảm'... và không cần lọc thêm năm/quốc gia.",
  inputSchema: {
    type: "object",
    properties: {
      slug: {
        type: "string",
        description: "Slug thể loại, ví dụ 'hanh-dong'. Gọi list_categories nếu không chắc.",
      },
      page: { type: "number" },
    },
    required: ["slug"],
  },
});

const getMoviesByCountryDef = toolDefinition({
  name: "get_movies_by_country",
  description:
    "Lấy danh sách phim của một quốc gia theo slug. Dùng khi người dùng hỏi 'phim Hàn', 'phim Trung', 'phim Mỹ' mà không cần thêm tiêu chí khác.",
  inputSchema: {
    type: "object",
    properties: {
      slug: {
        type: "string",
        description: "Slug quốc gia, ví dụ 'han-quoc'. Gọi list_countries nếu không chắc.",
      },
      page: { type: "number" },
    },
    required: ["slug"],
  },
});

const getLatestMoviesDef = toolDefinition({
  name: "get_latest_movies",
  description:
    "Lấy phim mới cập nhật theo loại. Dùng khi người dùng hỏi 'phim mới', 'phim bộ mới', 'anime mới'.",
  inputSchema: {
    type: "object",
    properties: {
      type: {
        type: "string",
        enum: ["phim-le", "phim-bo", "hoat-hinh", "tv-shows"],
      },
      page: { type: "number" },
    },
    required: ["type"],
  },
});

const getMovieDetailDef = toolDefinition({
  name: "get_movie_detail",
  description:
    "Lấy chi tiết một phim theo slug: nội dung, diễn viên, đạo diễn, số tập, các server phát. Dùng khi người dùng hỏi cụ thể về một phim đã biết slug.",
  inputSchema: {
    type: "object",
    properties: {
      slug: { type: "string" },
    },
    required: ["slug"],
  },
});

const listCategoriesDef = toolDefinition({
  name: "list_categories",
  description:
    "Liệt kê toàn bộ thể loại có trong kho ophim kèm slug. Gọi tool này nếu bạn không chắc slug thể loại trước khi dùng filter_movies/get_movies_by_category.",
  inputSchema: {
    type: "object",
    properties: {},
  },
});

const listCountriesDef = toolDefinition({
  name: "list_countries",
  description:
    "Liệt kê toàn bộ quốc gia có trong kho ophim kèm slug. Gọi tool này nếu bạn không chắc slug quốc gia.",
  inputSchema: {
    type: "object",
    properties: {},
  },
});

const searchMovies = searchMoviesDef.server(async (args) => {
  const { keyword, page = 1 } = args || {};
  const data = await ophimClient.get(
    `tim-kiem${buildQuery({ keyword, page })}`,
  );
  return wrapList(data, 15);
});

const filterMovies = filterMoviesDef.server(async (args) => {
  const { type, category, country, year, sort_field, page = 1 } = args || {};
  const data = await ophimClient.get(
    `danh-sach${buildQuery({ type, category, country, year, sort_field, page })}`,
  );
  return wrapList(data, 15);
});

const getMoviesByCategory = getMoviesByCategoryDef.server(async (args) => {
  const { slug, page = 1 } = args || {};
  const data = await ophimClient.get(`the-loai/${slug}${buildQuery({ page })}`);
  return wrapList(data, 15);
});

const getMoviesByCountry = getMoviesByCountryDef.server(async (args) => {
  const { slug, page = 1 } = args || {};
  const data = await ophimClient.get(`quoc-gia/${slug}${buildQuery({ page })}`);
  return wrapList(data, 15);
});

const getLatestMovies = getLatestMoviesDef.server(async (args) => {
  const { type, page = 1 } = args || {};
  const data = await ophimClient.get(`danh-sach/${type}${buildQuery({ page })}`);
  return wrapList(data, 15);
});

const getMovieDetail = getMovieDetailDef.server(async (args) => {
  const { slug } = args || {};
  const data = await ophimClient.get(`phim/${slug}`);
  const item = data?.data?.item || null;
  const movie = data?.movie || item;
  const episodes =
    data?.episodes || item?.episodes || data?.data?.episodes || [];
  return slimMovieDetail(movie, episodes) || { error: "Không tìm thấy phim" };
});

const extractTaxonomyItems = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.items)) return data.data.items;
  if (Array.isArray(data?.items)) return data.items;
  return [];
};

const listCategories = listCategoriesDef.server(async () => {
  const data = await ophimClient.get(`the-loai`);
  const items = extractTaxonomyItems(data);
  return {
    items: items
      .map((c) => ({ name: c?.name, slug: c?.slug }))
      .filter((c) => c.slug),
  };
});

const listCountries = listCountriesDef.server(async () => {
  const data = await ophimClient.get(`quoc-gia`);
  const items = extractTaxonomyItems(data);
  return {
    items: items
      .map((c) => ({ name: c?.name, slug: c?.slug }))
      .filter((c) => c.slug),
  };
});

export const ophimTools = [
  searchMovies,
  filterMovies,
  getMoviesByCategory,
  getMoviesByCountry,
  getLatestMovies,
  getMovieDetail,
  listCategories,
  listCountries,
];
