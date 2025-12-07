import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, Loader2 } from "lucide-react";
import Input from "../components/common/Input";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/features/userThunks";
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

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm"
            >
                <div className="bg-zinc-800/90 backdrop-blur-md rounded-lg shadow-xl p-6 sm:p-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
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
                                className="text-xs sm:text-sm text-red-500 hover:underline"
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

                        <div className="bg-zinc-800/50 p-4 rounded text-center mt-4">
                            <p className="text-xs sm:text-sm text-gray-400">
                                Don't have an account?{" "}
                                <Link
                                    to="/sign-up"
                                    className="text-red-500 hover:underline"
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