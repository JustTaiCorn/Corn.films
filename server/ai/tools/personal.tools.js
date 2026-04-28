import { toolDefinition } from "@tanstack/ai";
import favoriteModel from "../../models/favorite.model.js";
import historyModel from "../../models/history.model.js";

const getUserFavoritesDef = toolDefinition({
  name: "get_user_favorites",
  description:
    "Lấy danh sách phim yêu thích đã lưu của người dùng đang đăng nhập. Dùng khi người dùng muốn 'gợi ý cho tôi' hoặc nhắc tới 'phim yêu thích của tôi' để hiểu sở thích.",
  inputSchema: {
    type: "object",
    properties: {
      limit: {
        type: "number",
        description: "Số lượng tối đa muốn lấy (mặc định 30).",
      },
    },
  },
});

const getUserHistoryDef = toolDefinition({
  name: "get_user_history",
  description:
    "Lấy lịch sử xem phim gần đây của người dùng đang đăng nhập. Dùng để biết user hay xem thể loại/quốc gia gì, từ đó gợi ý phim tương tự. KHÔNG dùng để liệt kê dữ liệu cá nhân lại cho user trừ khi họ yêu cầu rõ.",
  inputSchema: {
    type: "object",
    properties: {
      limit: {
        type: "number",
        description: "Số lượng tối đa muốn lấy (mặc định 20).",
      },
    },
  },
});

export const createPersonalTools = (userId) => {
  const getUserFavorites = getUserFavoritesDef.server(async (args) => {
    if (!userId) {
      return {
        items: [],
        note: "Người dùng chưa đăng nhập, không có dữ liệu yêu thích.",
      };
    }
    const limit = Math.min(Math.max(args?.limit ?? 30, 1), 50);
    const favorites = await favoriteModel
      .find({ user: userId })
      .sort("-createdAt")
      .limit(limit)
      .lean();

    return {
      items: favorites.map((f) => ({
        title: f.mediaTitle,
        slug: f.mediaSlug,
        year: f.mediaYear,
        poster: f.mediaPoster,
        rate: f.mediaRate,
        time: f.mediaTime,
      })),
    };
  });

  const getUserHistory = getUserHistoryDef.server(async (args) => {
    if (!userId) {
      return {
        items: [],
        note: "Người dùng chưa đăng nhập, không có lịch sử xem.",
      };
    }
    const limit = Math.min(Math.max(args?.limit ?? 20, 1), 50);
    const history = await historyModel
      .find({ userId })
      .sort("-watchedAt")
      .limit(limit)
      .lean();

    return {
      items: history.map((h) => ({
        title: h.title,
        slug: h.slug,
        mediaType: h.mediaType,
        episode: h.episode,
        season: h.season,
        progress: h.progress,
        watchedAt: h.watchedAt,
        poster: h.poster,
      })),
    };
  });

  return [getUserFavorites, getUserHistory];
};
