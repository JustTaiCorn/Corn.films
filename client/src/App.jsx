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
import ChatWidget from "@/components/common/ChatWidget.jsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 5 * 60 * 1000, // 5 phút
        },
    },
});

const App = () => {
    const dispatch = useDispatch();
    const { accessToken, user } = useSelector((state) => state.user);
    const [authChecked, setAuthChecked] = useState(false);
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                if (!accessToken) {
                    await dispatch(refreshToken());
                }
                if (accessToken && !user) {
                    await dispatch(checkAuth());
                }
            } catch (error) {
                console.log("Auth initialization failed:", error);
            } finally {
                setAuthChecked(true);
            }
        };

        initializeAuth();
    }, [dispatch, accessToken, user]);
    if (!authChecked) {
        return <GlobalLoading />;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover
            />

            {/* Loading cho lazy load các page riêng biệt */}
            <Suspense fallback={<GlobalLoading isLoading={true} />}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            {routes.map((route, index) =>
                                route.index ? (
                                    <Route
                                        index
                                        key={index}
                                        element={<PageWrapper>{route.element}</PageWrapper>}
                                    />
                                ) : (
                                    <Route
                                        path={route.path}
                                        key={index}
                                        element={<PageWrapper>{route.element}</PageWrapper>}
                                    />
                                )
                            )}
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Suspense>

            <ChatWidget />
        </QueryClientProvider>
    );
};

export default App;