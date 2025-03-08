import { motion } from "framer-motion";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Link,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/features/userThunks";

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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={8}
          sx={{
            maxWidth: 400,
            width: "100%",
            backgroundColor: "rgba(33, 33, 33, 0.8)", // bg-gray-800 bg-opacity-50
            backdropFilter: "blur(10px)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: 4 }}>
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
              Forgot Password
            </Typography>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ color: "gray", mb: 3 }}
                >
                  Enter your email address and we will send you a link to reset your password.
                </Typography>
                <TextField
                  fullWidth
                  type="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variant="outlined"
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#424242",
                      color: "white",
                      "& fieldset": { borderColor: "#616161" },
                      "&:hover fieldset": { borderColor: "#" },
                      "&.Mui-focused fieldset": { borderColor: "#fb5a5a" },
                    },
                    "& .MuiInputLabel-root": { color: "gray" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#fb5a5a" },
                  }}
                />
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isLoading}
                    sx={{
                      py: 1.5,
                      background: "linear-gradient(to right, #fb5a5a, #fb5a5a)",
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      textTransform: "none",
                      "&:hover": {
                        background: "linear-gradient(to right, #a83333, #fb5a5a)",
                      },
                      "&:disabled": { opacity: 0.5 },
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </motion.div>
              </form>
            ) : (
              <Box sx={{ textAlign: "center" }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      backgroundColor: "#fb5a5a",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                  </Box>
                </motion.div>
                <Typography variant="body2" sx={{ color: "gray", mb: 3 }}>
                  If an account exists for {email}, you will receive a password reset link shortly.
                </Typography>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              px: 4,
              py: 2,
              backgroundColor: "rgba(33, 33, 33, 0.5)", // bg-gray-900 bg-opacity-50
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link
              component={RouterLink}
              to="/log-in"
              sx={{
                color: "##fb5a5a",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Back to Login
            </Link>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default ForgotPasswordPage;