import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile, updatePassword, uploadAvatar } from "../redux/features/userThunks";
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
    const [errorPassword, setErrorPassword] = useState("");
    const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!username || username.trim() === "") {
            toast.error("Vui lòng nhập tên người dùng");
            return;
        }

        try {
            await dispatch(updateProfile({ username }));
            toast.success("Cập nhật thông tin thành công");
        } catch (error) {
            toast.error(error.response?.data?.message || "Cập nhật thất bại");
            console.error(error);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setErrorPassword(""); // Clear previous errors

        if (!currentPassword) {
            setErrorPassword("Vui lòng nhập mật khẩu hiện tại");
            return;
        }

        if (!newPassword) {
            setErrorPassword("Vui lòng nhập mật khẩu mới");
            return;
        }

        if (newPassword.length < 6) {
            setErrorPassword("Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorPassword("Mật khẩu xác nhận không khớp");
            return;
        }

        try {
            // ✅ Đúng: tham số đầu là password (current), thứ hai là newPassword
            await dispatch(updatePassword(currentPassword, newPassword));
            toast.success("Cập nhật mật khẩu thành công");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setErrorPassword("");
        } catch (error) {
            setErrorPassword(error.response?.data?.message || "Cập nhật mật khẩu thất bại");
        }
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('Vui lòng chọn file ảnh hợp lệ');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Kích thước ảnh không được vượt quá 5MB');
                return;
            }

            // Preview ảnh
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarUrl(reader.result);
            };
            reader.readAsDataURL(file);

            // Upload immediately
            try {
                await dispatch(uploadAvatar(file));
                toast.success("Avatar updated successfully");
            } catch (error) {
                console.error(error);
                toast.error("Failed to upload avatar");
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Quản lý tài khoản</h1>
                    <p className="text-muted-foreground">Quản lý thông tin của bạn và bảo mật</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-8">
                            <CardContent className="pt-6">
                                    <div className="flex flex-col items-center mb-6">
                                        <div className="relative group">
                                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-muted">
                                                <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden">
                                                    {avatarUrl ? (
                                                        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-4xl font-bold">
                                                            {user?.username?.charAt(0).toUpperCase() || "U"}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <Label
                                                htmlFor="avatar-upload"
                                                className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 transition-colors p-2 rounded-full cursor-pointer shadow-lg"
                                            >
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
                                        <div className="space-y-1 flex-1">
                                            <Label className="text-muted-foreground uppercase text-xs">Tên người dùng</Label>
                                            <p className="font-medium">{user?.username || "N/A"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                                        <div className="space-y-1 flex-1">
                                            <Label className="text-muted-foreground uppercase text-xs">Email</Label>
                                            <p className="font-medium break-all">{user?.email || "N/A"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                                        <div className="space-y-1 flex-1">
                                            <Label className="text-muted-foreground uppercase text-xs">Là thành viên từ</Label>
                                            <p className="font-medium">{formatDate(user?.createdAt)}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Shield className="w-5 h-5 text-muted-foreground mt-0.5" />
                                        <div className="space-y-2 flex flex-col">
                                            <Label className="text-muted-foreground uppercase text-xs">Trạng thái tài khoản</Label>
                                            <p className="inline-block w-fit items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-600 dark:text-green-400">
                                                {user?.isVerified ? "Đã xác minh" : "Chưa xác minh"}
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

                            <CardContent>
                                <form onSubmit={handleUpdateProfile} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email-input" className="text-muted-foreground uppercase text-xs">Email</Label>
                                        <Input
                                            id="email-input"
                                            value={user?.email || ""}
                                            disabled
                                            className="bg-muted"
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
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full sm:w-auto"
                                    >
                                        {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Password Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl font-bold">Bảo mật</CardTitle>
                                <CardDescription>Cập nhật mật khẩu để bảo mật tài khoản của bạn</CardDescription>
                            </CardHeader>

                            <CardContent>
                                {errorPassword && (
                                    <Alert variant="destructive" className="mb-4">
                                        <AlertDescription>{errorPassword}</AlertDescription>
                                    </Alert>
                                )}

                                <form onSubmit={handleUpdatePassword} className="space-y-4">
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

                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full sm:w-auto"
                                    >
                                        {isLoading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}