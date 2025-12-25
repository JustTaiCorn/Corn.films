// import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import routes from "./routes/routes";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useEffect, useState } from "react";
import GlobalLoading from "./components/common/GlobalLoading";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, refreshToken } from "@/redux/features/userThunks.js";
import PageWrapper from "@/components/common/PageWrapper.jsx";
import MainLayout from "@/components/layout/MainLayout.jsx";
const queryClient = new QueryClient();
const App = () => {
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!accessToken) {
      dispatch(refreshToken());
    }
    if (accessToken && !user) {
      dispatch(checkAuth());
    }
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return <GlobalLoading isLoading={true} />;
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        {/* <SplashCursor /> */}

        {/* config toastify */}
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
        />

        {/* app routes */}
        <Suspense fallback={<GlobalLoading isLoading={true} />}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                {routes.map((route, index) => (
                  route.index ? (
                    <Route
                      index
                      key={index}
                      element={
                        <PageWrapper>{route.element}</PageWrapper>
                      }
                    />
                  ) : (
                    <Route
                      path={route.path}
                      key={index}
                      element={<PageWrapper>{route.element}</PageWrapper>}
                    />
                  )
                ))}
              </Route>
            </Routes>
          </BrowserRouter>
        </Suspense>

      </QueryClientProvider>
    </>
  );

};

export default App;
