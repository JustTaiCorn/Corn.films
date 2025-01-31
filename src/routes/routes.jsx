import HomePage from "../pages/HomePage";
import MediaDetail from "../pages/MediaDetail";
import MediaList from "../pages/MediaList";
import MediaSearch from "../pages/MediaSearch";
import MediaWatch from "../pages/MediaWatch";

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