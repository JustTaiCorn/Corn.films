import { lazy, useEffect, useState } from "react";
import MediaCategory from "../pages/MediaCategory";
import MediaCoutries from "../pages/MediaCoutries";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";
import EmailVerificationPage from "../pages/EmailVerificationPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import MediaListByRequest from "../pages/MediaListByRequest";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import FavoriteList from "../pages/FavoriteList";
import ReviewList from "../pages/ReviewList";
import ProfilePage from "../pages/ProfilePage";
import ScheduleMedia from "../pages/ScheduleMedia";
import { checkAuth, refreshToken } from "@/redux/features/userThunks";
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

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (isAuthenticated && user && user.isVerified) {
    return <Navigate to='/' replace />;
  }

  return children;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useSelector((state) => state.user);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 text-lg font-medium">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/log-in" replace />;
  }

  if (user && !user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const routes = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: "/search",
    element: <MediaSearch />,
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
  },
  {
    path: "/quoc-gia",
    element: <MediaCoutries />,
  },
  {
    path: "/the-loai/:slug",
    element: <MediaListByRequest />
  },
  {
    path: "/quoc-gia/:slug",
    element: <MediaListByRequest />
  }
  ,
  {
    path: "/the-loai",
    element: <MediaCategory />,
  },


  {
    path: "/sign-up",
    element: <RedirectAuthenticatedUser><SignUpPage /></RedirectAuthenticatedUser>
  },
  {
    path: "/log-in",
    element: (
      <RedirectAuthenticatedUser>
        <LoginPage />
      </RedirectAuthenticatedUser>
    ),
  },
  {
    path: "/verify-email",
    element: <RedirectAuthenticatedUser><EmailVerificationPage /></RedirectAuthenticatedUser>
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />
  },
  {
    path: "reset-password/:token",
    element: <ResetPasswordPage />
  },
  {
    path: "/favorites",
    element: (
      <ProtectedRoute>
        <FavoriteList />
      </ProtectedRoute>
    ),
    state: "favorites"
  },
  {
    path: "/reviews",
    element: (
      <ProtectedRoute>
        <ReviewList />
      </ProtectedRoute>
    ),
    state: "reviews"
  },
  {
    path: "/profile",
    element: <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  },
];

export default routes;