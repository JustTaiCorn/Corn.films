import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../redux/features/userThunks";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

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
		<div className="mt-20 min-h-[70vh] flex items-center justify-center px-4">
			<div className="bg-zinc-800/90 backdrop-blur-md rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-sm">
				<h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
					Reset Password
				</h2>
				{error && (
					<p className="text-red-500 text-center text-sm mb-4">
						{error}
					</p>
				)}
				{message && (
					<p className="text-green-500 text-center text-sm mb-4">
						{message}
					</p>
				)}

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<Input
						type="password"
						placeholder="New Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="bg-zinc-700 border-zinc-600 text-white focus:border-red-500"
					/>
					<Input
						type="password"
						placeholder="Confirm New Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						className="bg-zinc-700 border-zinc-600 text-white focus:border-red-500"
					/>

					<Button
						type="submit"
						disabled={isLoading}
						className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 mt-2"
					>
						{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Set New Password"}
					</Button>
				</form>
			</div>
		</div>
	);
};

export default ResetPasswordPage;