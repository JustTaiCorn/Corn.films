import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Stack,
    CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { verifyEmail } from "../redux/features/userThunks";
import { setUser } from "../redux/features/userSlice";

const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const { error, isLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleChange = (index, value) => {
        const newCode = [...code];

        // Handle pasted content
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
            const response = await verifyEmail(verificationCode);
            dispatch(setUser(response.user));
            navigate("/");
            toast.success("Email verified successfully");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Verification failed");
        }
    };

    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            handleSubmit(new Event("submit"));
        }
    }, [code]);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.1)", // Giữ hiệu ứng backdrop mờ
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Paper
                    elevation={8}
                    sx={{
                        padding: 4,
                        maxWidth: 400,
                        width: "100%",
                        backgroundColor: "rgba(33, 33, 33, 0.8)", // Tương tự bg-gray-800 bg-opacity-50
                        backdropFilter: "blur(10px)",
                        borderRadius: 2,
                    }}
                >
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{
                            fontWeight: "bold",
                            background: "#fb5a5a",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            mb: 2,
                        }}
                    >
                        Verify Your Email
                    </Typography>
                    <Typography
                        variant="body2"
                        align="center"
                        sx={{ color: "gray", mb: 3 }}
                    >
                        Enter the 6-digit code sent to your email address.
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Stack direction="row" spacing={2} justifyContent="space-between">
                            {code.map((digit, index) => (
                                <TextField
                                    key={index}
                                    inputRef={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputProps={{ maxLength: 1 }}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        width: 50,
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "8px",
                                            backgroundColor: "#424242",
                                            color: "white",
                                            fontWeight: "bold",
                                            "& fieldset": {
                                                borderColor: "#616161",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "#fb5a5a",
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "#fb5a5a",
                                            },
                                        },
                                        "& .MuiInputBase-input": {
                                            textAlign: "center",
                                            fontSize: "1.5rem",
                                        },
                                    }}
                                />
                            ))}
                        </Stack>

                        {error && (
                            <Typography
                                variant="body2"
                                sx={{ color: "red", mt: 2, fontWeight: "medium" }}
                            >
                                {error}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isLoading || code.some((digit) => !digit)}
                            sx={{
                                mt: 3,
                                py: 1.5,
                                background: "linear-gradient(to right, #4caf50, #00c853)", //
                                color: "white",
                                fontWeight: "bold",
                                borderRadius: "8px",
                                textTransform: "none",
                                "&:hover": {
                                    background: "linear-gradient(to right, #388e3c, #00a544)",
                                },
                                "&:focus": {
                                    ring: "2px solid rgba(76, 175, 80, 0.5)",
                                },
                                "&:disabled": {
                                    opacity: 0.5,
                                },
                            }}
                        >
                            {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Verify Email"
                            )}
                        </Button>
                    </form>
                </Paper>
            </motion.div>
        </Box>
    );
};

export default EmailVerificationPage;