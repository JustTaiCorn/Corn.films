import {
  Home,
  Clapperboard,
  Tv,
  MonitorPlay,
  Projector,
  Globe,
  LayoutGrid,
  Heart,
  MessageSquare,
  User,
  Search,
    Clock
} from "lucide-react";

const main = [
  {
    display: "Trang chủ",
    path: "/",
    icon: <Home size={24} />,
    state: "trang chu",
  },
  {
    display: "Phim lẻ",
    path: "/phim-le",
    icon: <Clapperboard size={24} />,
    state: "phim le",
  },
  {
    display: "Phim bộ",
    path: "/phim-bo",
    icon: <Tv size={24} />,
    state: "phim bo",
  },
  {
    display: "Tv Shows",
    path: "/tv-shows",
    icon: <MonitorPlay size={24} />,
    state: "tv-show",
  },
  {
    display: "Hoạt hình",
    path: "/hoat-hinh",
    icon: <Projector size={24} />,
    state: "hoat hinh",
  },
  {
    display: "Quốc gia",
    path: "/quoc-gia",
    icon: <Globe size={24} />,
    state: "quoc gia",
  },
  {
    display: "Thể loại",
    path: "/the-loai",
    icon: <LayoutGrid size={24} />,
    state: "the loai",
  },
  {
    display: "Tìm kiếm",
    path: "/search",
    icon: <Search size={24} />,
    state: "tim kiem",
  }
];

const user = [
  {
    display: "Yêu thích",
    path: "/favorites",
    icon: <Heart size={24} />,
  },
  {
    display: "Đánh giá",
    path: "/reviews",
    icon: <MessageSquare size={24} />,
  },
  {
    display: "Tài khoản",
    path: "/profile",
    icon: <User size={24} />,
  },
  {
    display: "Lịch sử xem",
    path: "/history",
    icon: <Clock size={24} />,
  }
];

const menuConfigs = { main, user };

export default menuConfigs;
