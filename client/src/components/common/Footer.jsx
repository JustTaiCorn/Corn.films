import Logo from './Logo';
import { Facebook, Instagram, Twitter, Github } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <div className="relative mt-8 mb-4 bg-card p-6 shadow-lg mx-auto w-[95%] rounded-xl md:ml-[340px] md:w-auto md:mr-8 md:rounded-2xl md:p-8">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8">
        {/* Phần trên: Logo, mô tả, menu, liên hệ */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          {/* Logo và mô tả */}
          <div className="flex max-w-full flex-col items-center gap-4 md:max-w-[400px] md:items-start">
            <Logo />
            <p className="text-center text-sm text-muted-foreground md:text-left">
              Toàn bộ nội dung trên trang web này được tổng hợp từ các nền tảng video  trên Internet và không cung cấp dịch vụ phát trực tuyến chính thức. Nếu bạn phát hiện quyền lợi của mình bị xâm phạm, vui lòng thông báo cho chúng tôi.
            </p>
          </div>
          {/* Thông tin liên hệ */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <h6 className="font-bold text-primary text-lg">
              Liên Hệ
            </h6>
            <p className="text-sm text-muted-foreground">
              Email: keke@gmail.com
            </p>
            <p className="text-sm text-muted-foreground">
              Điện thoại: 0123456789
            </p>
            <p className="text-sm text-muted-foreground">
              Địa chỉ: 123 Đường ABC, Quận XYZ, TP.Hà Nội
            </p>
            {/* Các icon mạng xã hội */}
            <div className="flex gap-4 text-primary border-muted-foreground/20">
              <Button variant="outline" size="icon" className=" hover:bg-primary/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className=" hover:bg-primary/10">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className=" hover:bg-primary/10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className=" hover:bg-primary/10">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Phần dưới: Bản quyền */}
        <div className="mt-6 w-full border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 XemPhim. All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
