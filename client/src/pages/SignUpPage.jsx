import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, User, Loader2 } from "lucide-react";
import Input from "../components/common/Input";
import PasswordStrengthMeter from "../components/common/PasswordStrengthMeter";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/features/userThunks";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";

const SignUpPage = () => {
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.user);

    const validatePassword = (pass) => {
        const errors = [];

        if (pass.length < 6) {
            errors.push("Password must be at least 6 characters");
        }
        if (!/[A-Z]/.test(pass)) {
            errors.push("Password must contain at least one uppercase letter");
        }
        if (!/[a-z]/.test(pass)) {
            errors.push("Password must contain at least one lowercase letter");
        }
        if (!/\d/.test(pass)) {
            errors.push("Password must contain at least one number");
        }
        if (!/[^A-Za-z0-9]/.test(pass)) {
            errors.push("Password must contain at least one special character");
        }

        return errors;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");

        if (!username || !email || !password) {
            setError("Please fill in all fields");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        const passwordErrors = validatePassword(password);
        if (passwordErrors.length > 0) {
            setError(passwordErrors[0]);
            return;
        }


        try {
            await dispatch(signup(email, password, username));
            navigate("/verify-email");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="mt-20 min-h-[70vh] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm"
            >
                <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-xl p-6 sm:p-8 dark:bg-zinc-800/90">
                    <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-black">
                        Create Account
                    </h1>

                    <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                        <Input
                            icon={User}
                            type="text"
                            placeholder="Full Name"
                            value={username}
                            onChange={(e) => setName(e.target.value)}
                        />

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

                        {(error) && (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}

                        <PasswordStrengthMeter password={password} />

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 text-sm sm:text-base mt-2"
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                "Sign Up"
                            )}
                        </Button>

                        <div className="text-center mt-4">
                            <p className="text-xs sm:text-sm text-black dark:text-white">
                                Already have an account?{" "}
                                <Link
                                    to="/log-in"
                                    className="text-black hover:underline"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUpPage;