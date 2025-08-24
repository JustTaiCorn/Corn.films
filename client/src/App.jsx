import { ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import routes from "./routes/routes";
import themeConfigs from "./api/configs/theme.configs";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense, lazy, useEffect } from "react";
import GlobalLoading from "./components/common/GlobalLoading";
import { checkAuth } from "./redux/features/userThunks";
const MainLayout = lazy(() => import("./components/layout/MainLayout"));
const PageWrapper = lazy(() => import("./components/common/PageWrapper"));

const queryClient = new QueryClient();
const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await dispatch(checkAuth());
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };
    initializeAuth();
  }, [dispatch]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        {/* <SplashCursor /> */}
        <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
          {/* config toastify */}
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover
            theme={themeMode}
          />
          {/* mui reset css */}
          <CssBaseline />

          {/* app routes */}
          <Suspense fallback={<GlobalLoading />}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  {routes.map((route, index) => (
                    route.index ? (
                      <Route
                        index
                        key={index}
                        element={route.state ? (
                          <PageWrapper state={route.state}>{route.element}</PageWrapper>
                        ) : route.element}
                      />
                    ) : (
                      <Route
                        path={route.path}
                        key={index}
                        element={route.state ? (
                          <PageWrapper state={route.state}>{route.element}</PageWrapper>
                        ) : route.element}
                      />
                    )
                  ))}
                </Route>
              </Routes>
            </BrowserRouter>
          </Suspense>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );

};

export default App;
