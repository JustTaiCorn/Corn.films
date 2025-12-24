import { motion } from "framer-motion";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/features/userThunks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword(email));
    setIsSubmitted(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm px-4"
      >
        <div className="backdrop-blur-md rounded-lg shadow-xl overflow-hidden w-full">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Forgot Password
            </h2>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <p className="text-center text-gray-400 mb-2 text-sm">
                  Enter your email address and we will send you a link to reset your password.
                </p>
                <div className="flex flex-col gap-2">
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className=" border-zinc-600 text-black focus:border-red-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 mt-2"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </motion.div>
                <p className="text-gray-400 mb-6 text-sm">
                  If an account exists for {email}, you will receive a password reset link shortly.
                </p>
              </div>
            )}
          </div>

          <div className="px-8 py-4 border-border border-t flex justify-center">
            <RouterLink
              to="/log-in"
              className="text-red-500 hover:underline flex items-center text-sm"
            >
              Back to Login
            </RouterLink>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;