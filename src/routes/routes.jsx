import { lazy } from "react";
const HomePage = lazy(() => import("../pages/HomePage"));
const MediaDetail = lazy(() => import("../pages/MediaDetail"));
const MediaList = lazy(() => import("../pages/MediaList"));
const MediaSearch = lazy(() => import("../pages/MediaSearch"));
const MediaWatch = lazy(() => import("../pages/MediaWatch"));

export const routesGen = {
  home: "/",
  mediaList: (type) => `/${type}`,
  mediaDetail: (slug) => `/chi-tiet-phim/${slug}`,
  mediaSearch: "/search",
  mediaWatch: (slug) => `/xem-phim/${slug}`,
};



const routes = [
  {
    index: true,
    element: <HomePage />,
    state: "home"
  },
  {
    path: "/search",
    element: <MediaSearch />,
    state: "search"
  },
  {
    path: "/:type",
    element: <MediaList />,
  },
  {
    path: "/chi-tiet-phim/:slug",
    element: <MediaDetail />,
  },
  {
    path: "/xem-phim/:slug",
    element: <MediaWatch />,
  }
];

export default routes;