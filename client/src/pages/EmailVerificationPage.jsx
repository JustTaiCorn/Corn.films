import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { verifyEmail } from "../redux/features/userThunks";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const { error, isLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleChange = (index, value) => {
        const newCode = [...code];

        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        try {
            await dispatch(verifyEmail(verificationCode));
            navigate("/");
            toast.success("Email verified successfully");
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Verification failed");
        }
    };

    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            handleSubmit(new Event("submit"));
        }
    }, [code]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-black/10">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm px-4"
            >
                <div className="bg-zinc-800/80 backdrop-blur-md rounded-lg shadow-xl p-8 w-full">
                    <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                        Verify Your Email
                    </h2>
                    <p className="text-center text-gray-400 mb-6 text-sm">
                        Enter the 6-digit code sent to your email address.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-between gap-2 mb-6">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    maxLength="6"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-10 h-12 text-center text-xl font-bold bg-zinc-700 text-white border-2 border-zinc-600 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                                />
                            ))}
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm mb-4 font-medium text-center">
                                {error}
                            </p>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading || code.some((digit) => !digit)}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-red-500/20 transition-all disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                "Verify Email"
                            )}
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default EmailVerificationPage;