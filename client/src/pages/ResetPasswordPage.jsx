import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Box, Typography, CircularProgress, Container, Paper } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../redux/features/userThunks";
import { toast } from "react-toastify";
import uiConfigs from "../configs/ui.configs";
const ResetPasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const { error, message, isLoading } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		try {
			await dispatch(resetPassword(token, password));

			toast.success("Password reset successfully, redirecting to login page...");
			setTimeout(() => {
				navigate("/log-in");
			}, 2000);
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Error resetting password");
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
			<Paper
				elevation={3}
				sx={{
					p: { xs: 2, sm: 3, md: 4 },
					backgroundColor: "rgba(66, 66, 66, 0.9)",
					backdropFilter: "blur(10px)",
					borderRadius: 2,
					maxWidth: 480,
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
					Reset Password
				</Typography>
				{error && (
					<Typography color="error" variant="body2" textAlign="center" mb={2}>
						{error}
					</Typography>
				)}
				{message && (
					<Typography color="success" variant="body2" textAlign="center" mb={2}>
						{message}
					</Typography>
				)}

				<form onSubmit={handleSubmit}>
					<TextField
						fullWidth
						type="password"
						label="New Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
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
					<TextField
						fullWidth
						type="password"
						label=" Corfirm New Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
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
					<Button
						fullWidth
						type="submit"
						variant="contained"
						color="success"
						size="large"
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
						{isLoading ? <CircularProgress size={24} color="inherit" /> : "Set New Password"}
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default ResetPasswordPage;