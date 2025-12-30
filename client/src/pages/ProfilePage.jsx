import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile, updatePassword } from "../redux/features/userThunks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Camera, User, Mail, Calendar, Shield } from "lucide-react";
import { Label } from "@/components/ui/label.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
    const { user, isLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [username, setUsername] = useState(user?.username || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorProfile, setErrorProfile] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setErrorProfile("");

        if (!username.trim()) {
            setErrorProfile("Username is required");
            return;
        }

        try {
            await dispatch(updateProfile({ username, avatarUrl }));
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

        if (newPassword.length < 6) {
            setErrorPassword("Password must be at least 6 characters");
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
        }
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    return (
        <Card className="min-h-screen p-6">
            <CardHeader>
                <CardTitle className="text-4xl font-bold mb-2">Quản lý tài khoản</CardTitle>
                <CardDescription>Quản lý thông tin của bạn và bảo mật</CardDescription>
            </CardHeader>
            <CardContent>
                <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-0">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-8">
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center mb-6">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-full overflow-hidden p-1">
                                            <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden">
                                                {avatarUrl ? (
                                                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-4xl font-bold">
                                                        {name?.charAt(0).toUpperCase() || "U"}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <Label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 transition-colors p-2 rounded-full cursor-pointer shadow-lg z-50">
                                            <Camera className="w-5 h-5 text-primary-foreground" />
                                        </Label>
                                        <Input
                                            id="avatar-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleAvatarUpload}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 border-t pt-6">
                                    <div className="flex items-start gap-3">
                                        <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                                        <div className="space-y-1 flex flex-col">
                                            <Label htmlFor="username" className="text-muted-foreground uppercase text-xs">Tên người dùng</Label>
                                            <p id="username" className="font-medium">{user?.username || "N/A"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                                        <div className="space-y-1 flex flex-col">
                                            <Label htmlFor="email" className="text-muted-foreground uppercase text-xs">Email</Label>
                                            <p id="email" className="font-medium break-all">{user?.email || "N/A"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                                        <div className="space-y-1 flex flex-col">
                                            <Label htmlFor="createdAt" className="text-muted-foreground uppercase text-xs">Là thành viên từ</Label>
                                            <p id="createdAt" className="font-medium">{formatDate(user?.createdAt)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
                                        <div className="space-y-2 flex flex-col">
                                            <Label htmlFor="accountStatus" className="text-muted-foreground uppercase text-xs">Trạng thái tài khoản</Label>
                                            <p id="accountStatus" className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-600 dark:text-green-400 w-fit">
                                                {user.isVerified ? "Đã xác minh" : "Chưa xác minh"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Profile Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl font-bold">Thông tin cá nhân</CardTitle>
                                <CardDescription>Cập nhật thông tin chi tiết của bạn</CardDescription>
                            </CardHeader>

                            {errorProfile && (
                                <Alert variant="destructive" className="mx-6 mb-4">
                                    <AlertDescription>{errorProfile}</AlertDescription>
                                </Alert>
                            )}

                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email-input" className="text-muted-foreground uppercase text-xs">Email</Label>
                                    <Input
                                        id="email-input"
                                        value={user?.email}
                                        disabled
                                    />
                                    <p className="text-xs text-muted-foreground">Email không thể thay đổi</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="username-input" className="text-muted-foreground uppercase text-xs">Tên người dùng</Label>
                                    <Input
                                        id="username-input"
                                        placeholder="Nhập tên người dùng"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Button
                                        onClick={handleUpdateProfile}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Password Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl font-bold">Bảo mật</CardTitle>
                                <CardDescription>Cập nhật mật khẩu để bảo mật tài khoản của bạn</CardDescription>
                            </CardHeader>

                            {errorPassword && (
                                <Alert variant="destructive" className="mx-6 mb-4">
                                    <AlertDescription>{errorPassword}</AlertDescription>
                                </Alert>
                            )}

                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword" className="text-muted-foreground uppercase text-xs">Mật khẩu hiện tại</Label>
                                    <Input
                                        id="currentPassword"
                                        type="password"
                                        placeholder="Nhập mật khẩu hiện tại"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="newPassword" className="text-muted-foreground uppercase text-xs">Mật khẩu mới</Label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        placeholder="Nhập mật khẩu mới"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground">Phải có ít nhất 6 ký tự</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-muted-foreground uppercase text-xs">Xác nhận mật khẩu mới</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Nhập lại mật khẩu mới"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Button
                                        onClick={handleUpdatePassword}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </CardContent>
        </Card>
    );
}