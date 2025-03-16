import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Typography,
    Container,
    Paper,
    CircularProgress,
    Alert,
} from "@mui/material";
import { Lock, Mail, Person } from "@mui/icons-material";
import Input from "../components/common/Input";
import PasswordStrengthMeter from "../components/common/PasswordStrengthMeter";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/features/userThunks";

const SignUpPage = () => {
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [localError, setLocalError] = useState(""); // Thêm state để xử lý lỗi local
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, isLoading } = useSelector((state) => state.user);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLocalError(""); // Reset local error

        // Validation
        if (!username || !email || !password) {
            setLocalError("Please fill in all fields");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setLocalError("Please enter a valid email address");
            return;
        }

        // Password validation
        if (password.length < 6) {
            setLocalError("Password must be at least 6 characters long");
            return;
        }

        try {
            await dispatch(signup(email, password, username));
            navigate("/verify-email");
        } catch (error) {
            console.log(error);
            // Error từ server sẽ được xử lý bởi Redux
        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                mt: 10,
                minHeight: "70vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: "100%" }} // Ensure it takes full available width
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 2, sm: 3, md: 4 },
                        backgroundColor: "white",
                        backdropFilter: "blur(10px)",
                        borderRadius: 2,
                        maxWidth: 480,
                    }}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{
                            mb: { xs: 2, sm: 4 }, // Responsive margin bottom
                            fontWeight: "bold",
                            color: "red",
                            fontSize: { xs: "1.5rem", sm: "2rem" }, // Responsive font size
                        }}
                    >
                        Create Account
                    </Typography>

                    <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1 }}>
                        <Input
                            icon={Person}
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
                        {/* Hiển thị lỗi local hoặc lỗi từ server */}
                        {(localError || error) && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {localError || error}
                            </Alert>
                        )}

                        <PasswordStrengthMeter password={password} />

                        <Button
                            component={motion.button}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isLoading}
                            sx={{
                                mt: { xs: 2, sm: 3 }, // Responsive margin top
                                mb: 2,
                                py: { xs: 1, sm: 1.5 }, // Responsive padding
                                background: "red",
                                "&:hover": {
                                    background: "red",
                                },
                                fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
                            }}
                        >
                            {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Sign Up"
                            )}
                        </Button>

                        <Box sx={{ textAlign: "center", mt: { xs: 1, sm: 2 } }}>
                            <Typography
                                variant="body2"
                                color="black"
                                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }} // Responsive font size
                            >
                                Already have an account?{" "}
                                <Link
                                    to="/log-in"
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
                                        Login
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

export default SignUpPage;