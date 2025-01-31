import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

const main = [
  {
    display: "trang chủ",
    path: "/",
    icon: <HomeOutlinedIcon />,
    state: "trang chu",
  },
  {
    display: "phim lẻ",
    path: "/phim-le",
    icon: <SlideshowOutlinedIcon />,
    state: "phim le",
  },
  {
    display: "phim bộ",
    path: "/phim-bo",
    icon: <LiveTvOutlinedIcon />,
    state: "phim bo",
  },
  {
    display: "tìm kiếm",
    path: "/search",
    icon: <SearchOutlinedIcon />,
    state: "tim kiem",
  },
  {
    display: "tv shows",
    path: "/tv-shows",
    icon: <LiveTvOutlinedIcon />,
    state: "tv-show",
  },
  {
    display: "hoạt hình",
    path: "/hoat-hinh",
    icon: <SlideshowOutlinedIcon />,
    state: "hoat hinh",
  },
  {
    display: "quốc gia",
    path: "/quoc-gia",
    icon: <PublicOutlinedIcon />,
    state: "quoc gia",
  },
  {
    display: "thể loại",
    path: "/the-loai",
    icon: <CategoryOutlinedIcon />,
    state: "the loai",
  },
];

const menuConfigs = { main };

export default menuConfigs;
