import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CalendarMonth } from "@mui/icons-material";
const main = [
  {
    display: "Trang chủ",
    path: "/",
    icon: <HomeOutlinedIcon />,
    state: "trang chu",
  },
  {
    display: "Phim lẻ",
    path: "/phim-le",
    icon: <SlideshowOutlinedIcon />,
    state: "phim le",
  },
  {
    display: "Phim bộ",
    path: "/phim-bo",
    icon: <LiveTvOutlinedIcon />,
    state: "phim bo",
  },

  {
    display: "Tv Shows",
    path: "/tv-shows",
    icon: <LiveTvOutlinedIcon />,
    state: "tv-show",
  },
  {
    display: "Hoạt hình",
    path: "/hoat-hinh",
    icon: <SlideshowOutlinedIcon />,
    state: "hoat hinh",
  },
  {
    display: "Quốc gia",
    path: "/quoc-gia",
    icon: <PublicOutlinedIcon />,
    state: "quoc gia",
  },
  {
    display: "Thể loại",
    path: "/the-loai",
    icon: <CategoryOutlinedIcon />,
    state: "the loai",
  },
  {
    display: "Lịch chiếu",
    path: "/lich-chieu",
    icon: <CalendarMonth />,
  }
];

const user = [
  {
    display: "favorites",
    path: "/favorites",
    icon: <FavoriteBorderOutlinedIcon />,
  },
  {
    display: "reviews",
    path: "/reviews",
    icon: <RateReviewOutlinedIcon />,
  },
  {
    display: "profile",
    path: "/profile",
    icon: <AccountCircleIcon />,
  },

  // {
  //   display: "password update",
  //   path: "/password-update",
  //   icon: <LockResetOutlinedIcon />,
  //   state: "password.update"
  // }
];

const menuConfigs = { main, user };

export default menuConfigs;
