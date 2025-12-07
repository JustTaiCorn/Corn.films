import { useState } from "react";
import TextAvatar from "../components/common/TextAvatar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile, updatePassword } from "../redux/features/userThunks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "../components/ui/alert";

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
        <div className="w-[90%] mt-20 mx-auto p-4 md:p-8 bg-zinc-900 rounded-lg shadow-lg text-foreground">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar Section */}
                <div className="w-full md:w-[30%] flex flex-col items-center gap-4">
                    <h2 className="text-2xl font-bold uppercase mb-2">Profile avatar</h2>
                    <div className="w-[200px] h-[200px] bg-zinc-700 rounded-full flex items-center justify-center overflow-hidden">
                        <div className="scale-[5.0]"> {/* Scale up text avatar for larger size */}
                            <TextAvatar text={user?.username?.charAt(0) || "U"} />
                        </div>
                    </div>
                    {/* Placeholder for change avatar logic if needed */}
                    {/* <Button variant="default" size="sm">Change avatar</Button> */}
                </div>

                <div className="hidden md:block h-auto self-stretch border-r border-zinc-700" />
                <Separator className="md:hidden" />

                {/* Forms Section */}
                <div className="w-full md:w-[70%] flex flex-col gap-12">
                    {/* Form 1: Profile Info */}
                    <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold uppercase mb-2">Update your Profile info</h2>

                        {errorProfile && (
                            <Alert variant="destructive">
                                <AlertDescription>{errorProfile}</AlertDescription>
                            </Alert>
                        )}

                        <div className="p-6 bg-zinc-800 rounded-lg flex flex-col gap-6">
                            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                                <span className="text-lg font-bold w-full sm:w-[30%]">Email Address</span>
                                <Input
                                    value={user?.email}
                                    disabled
                                    className="bg-zinc-700 border-none text-gray-300"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                                <span className="text-lg font-bold w-full sm:w-[30%]">Username</span>
                                <Input
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="bg-zinc-700 border-transparent focus:border-primary"
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" disabled={isLoading}>Update Profile</Button>
                            </div>
                        </div>
                    </form>

                    {/* Form 2: Password Update */}
                    <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold uppercase mb-2">Update your Password</h2>

                        {errorPassword && (
                            <Alert variant="destructive">
                                <AlertDescription>{errorPassword}</AlertDescription>
                            </Alert>
                        )}

                        <div className="p-6 bg-zinc-800 rounded-lg flex flex-col gap-6">
                            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                                <span className="text-lg font-bold w-full sm:w-[30%]">Current Password</span>
                                <Input
                                    type="password"
                                    placeholder="Enter current password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="bg-zinc-700 border-transparent focus:border-primary"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                                <span className="text-lg font-bold w-full sm:w-[30%]">New Password</span>
                                <Input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="bg-zinc-700 border-transparent focus:border-primary"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                                <span className="text-lg font-bold w-full sm:w-[30%]">Confirm Password</span>
                                <Input
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="bg-zinc-700 border-transparent focus:border-primary"
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" disabled={isLoading}>Update Password</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
