import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, Loader2 } from "lucide-react";
import Input from "../components/common/Input";
import { useSelector, useDispatch } from "react-redux";
import { login, googleLogin } from "../redux/features/userThunks";
import { toast } from "react-toastify";
import { setError } from "../redux/features/userSlice";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.user);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            dispatch(setError("Vui lòng nhập đầy đủ thông tin"));
            return;
        }

        try {
            await dispatch(login(email, password));
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Đăng nhập thất bại");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await dispatch(googleLogin());
            navigate("/");
        } catch (error) {
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm"
            >
                <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-xl p-6 sm:p-8 dark:bg-zinc-800/90">
                    <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-black">
                        Welcome Back
                    </h1>

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <Input
                            icon={Mail}
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            icon={Lock}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="flex justify-start">
                            <Link
                                to="/forgot-password"
                                className="text-xs sm:text-sm text-black hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 text-sm sm:text-base"
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                "Login"
                            )}
                        </Button>

                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500 dark:bg-zinc-800">
                                    hoặc
                                </span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Sign in with Google
                        </Button>

                        <div className="text-center mt-4">
                            <p className="text-xs sm:text-sm text-black dark:text-white">
                                Don't have an account?{" "}
                                <Link
                                    to="/sign-up"
                                    className="text-black hover:underline"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;