import { useState } from "react";
import { Avatar, Box, Button, Divider, Paper, Stack, TextField, Typography, Alert, CircularProgress } from "@mui/material";
import TextAvatar from "../components/common/TextAvatar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile, updatePassword } from "../redux/features/userThunks";

export default function ProfilePage() {
    const { user, isLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [username, setUsername] = useState(user?.username || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorProfile, setErrorProfile] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setErrorProfile("");

        // Validate
        if (!username.trim()) {
            setErrorProfile("Username is required");
            return;
        }

        try {
            await dispatch(updateProfile(username));
            toast.success("Profile updated successfully");
        } catch (error) {
            setErrorProfile(error.response?.data?.message || "Failed to update profile");
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setErrorPassword("");

        // Validate
        if (!currentPassword) {
            setErrorPassword("Current password is required");
            return;
        }

        if (!newPassword) {
            setErrorPassword("New password is required");
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorPassword("Passwords do not match");
            return;
        }

        try {
            await dispatch(updatePassword(currentPassword, newPassword));
            toast.success("Password updated successfully");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {

            setErrorPassword(error.response?.data?.message || "Failed to update password");
            console.log(error);
        }
    };

    return (
        <Paper sx={{ width: "90%", mt: 10, mx: "auto", p: 2, bgcolor: "grey.900" }}>
            <Stack spacing={2} direction={{ xs: "column", md: "row" }} alignItems="center">
                <Box sx={{ textAlign: "center", width: { xs: "100%", md: "30%" } }}>
                    <Typography sx={{ fontSize: 28, fontWeight: "bold", color: "white", mb: 2, textTransform: "uppercase" }}>
                        Profile avatar
                    </Typography>
                    <Avatar sx={{ width: 200, height: 200, bgcolor: "grey.700", mx: "auto" }}>
                        <TextAvatar text={user?.username?.charAt(0) || "U"} />
                    </Avatar>
                    <Button variant="contained" color="primary" size="small" sx={{ mt: 2, display: "block", mx: "auto" }}>
                        Change avatar
                    </Button>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
                <Box sx={{ width: { xs: "100%", md: "70%" }, mt: { xs: 4, md: 0 } }}>
                    {/* Form 1: Profile Info */}
                    <form onSubmit={handleUpdateProfile}>
                        <Typography sx={{ fontSize: 28, fontWeight: "bold", color: "white", mb: 2, textTransform: "uppercase" }}>
                            Update your Profile info
                        </Typography>

                        {errorProfile && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {errorProfile}
                            </Alert>
                        )}

                        <Paper sx={{ p: 4, bgcolor: "grey.800", mb: 4 }}>
                            <Stack spacing={2} direction="column">
                                <Stack spacing={2} direction={{ xs: "column", sm: "row" }} alignItems="center">
                                    <Typography sx={{ fontSize: 18, color: "white", fontWeight: "bold", width: { xs: "100%", sm: "30%" } }}>
                                        Email Address
                                    </Typography>
                                    <TextField
                                        placeholder="Email"
                                        disabled
                                        fullWidth
                                        value={user?.email}
                                    />
                                </Stack>
                                <Stack spacing={2} direction={{ xs: "column", sm: "row" }} alignItems="center">
                                    <Typography sx={{ fontSize: 18, color: "white", fontWeight: "bold", width: { xs: "100%", sm: "30%" } }}>
                                        Username
                                    </Typography>
                                    <TextField
                                        placeholder="Username"
                                        fullWidth
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}

                                    />
                                </Stack>
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{ mt: 1 }}
                                        disabled={isLoading}
                                    >
                                        Update Profile
                                    </Button>
                                </Box>
                            </Stack>
                        </Paper>
                    </form>

                    {/* Form 2: Password Update */}
                    <form onSubmit={handleUpdatePassword}>
                        <Typography sx={{ fontSize: 28, fontWeight: "bold", color: "white", mb: 2, textTransform: "uppercase" }}>
                            Update your Password
                        </Typography>

                        {errorPassword && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {errorPassword}
                            </Alert>
                        )}

                        <Paper sx={{ p: 4, bgcolor: "grey.800" }}>
                            <Stack spacing={4} direction="column">
                                <Stack spacing={2} direction={{ xs: "column", sm: "row" }} alignItems="center">
                                    <Typography sx={{ fontSize: 18, color: "white", fontWeight: "bold", width: { xs: "100%", sm: "30%" } }}>
                                        Current Password
                                    </Typography>
                                    <TextField
                                        type="password"
                                        placeholder="Enter current password"
                                        fullWidth
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}

                                    />
                                </Stack>
                                <Stack spacing={2} direction={{ xs: "column", sm: "row" }} alignItems="center">
                                    <Typography sx={{ fontSize: 18, color: "white", fontWeight: "bold", width: { xs: "100%", sm: "30%" } }}>
                                        New Password
                                    </Typography>
                                    <TextField
                                        type="password"
                                        placeholder="Enter new password"
                                        fullWidth
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}

                                    />
                                </Stack>
                                <Stack spacing={2} direction={{ xs: "column", sm: "row" }} alignItems="center">
                                    <Typography sx={{ fontSize: 18, color: "white", fontWeight: "bold", width: { xs: "100%", sm: "30%" } }}>
                                        Confirm Password
                                    </Typography>
                                    <TextField
                                        type="password"
                                        placeholder="Confirm new password"
                                        fullWidth
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}

                                    />
                                </Stack>
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{ mt: 1 }}
                                        disabled={isLoading}
                                    >
                                        Update Password
                                    </Button>
                                </Box>
                            </Stack>
                        </Paper>
                    </form>
                </Box>
            </Stack>
        </Paper>
    );
}
