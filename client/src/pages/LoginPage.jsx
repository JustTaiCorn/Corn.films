import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import {
    Box,
    Button,
    Typography,
    Container,
    Paper,
    CircularProgress,
    Alert,
} from "@mui/material";
import { Lock, Mail } from "@mui/icons-material";
import Input from "../components/common/Input"; // Using the same Input component
import { useSelector, useDispatch } from "react-redux"; // Added useDispatch
import { login } from "../redux/features/userThunks";
import { toast } from "react-toastify";
import { setError } from "../redux/features/userSlice";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Added useDispatch
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
        <Container
            maxWidth="sm"
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: { xs: 2, sm: 3 },
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: "100%" }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 2, sm: 3, md: 4 },
                        backgroundColor: "rgba(66, 66, 66, 0.9)",
                        backdropFilter: "blur(10px)",
                        borderRadius: 2,
                        maxWidth: 480,
                        mx: "auto",
                    }}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{
                            mb: { xs: 2, sm: 4 },
                            fontWeight: "bold",
                            background: "red",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontSize: { xs: "1.5rem", sm: "2rem" },
                        }}
                    >
                        Welcome Back
                    </Typography>

                    <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
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

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                mb: { xs: 2, sm: 3 },
                            }}
                        >
                            <Link
                                to="/forgot-password"
                                style={{ textDecoration: "none" }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "red",
                                        "&:hover": { textDecoration: "underline" },
                                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                    }}
                                >
                                    Forgot password?
                                </Typography>
                            </Link>
                        </Box>
                        <Button
                            component={motion.button}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isLoading}
                            sx={{
                                mt: { xs: 2, sm: 3 },
                                mb: 2,
                                py: { xs: 1, sm: 1.5 },
                                background: "red",
                                "&:hover": {
                                    background: "red",
                                },
                                fontSize: { xs: "0.875rem", sm: "1rem" },
                            }}
                        >
                            {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Login"
                            )}
                        </Button>

                        <Box
                            sx={{
                                textAlign: "center",
                                mt: { xs: 1, sm: 2 },
                                py: 2,
                                bgcolor: "rgba(33, 33, 33, 0.5)",
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                            >
                                Don't have an account?{" "}
                                <Link
                                    to="/sign-up"
                                    style={{ color: "red", textDecoration: "none" }}
                                >
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: "red",
                                            "&:hover": { textDecoration: "underline" },
                                            fontSize: "inherit",
                                        }}
                                    >
                                        Sign up
                                    </Typography>
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default LoginPage;