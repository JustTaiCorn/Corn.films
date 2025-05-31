import { Paper, Stack, Box, Typography, Divider, IconButton } from '@mui/material';
import Logo from './Logo';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <Paper square={true} sx={{
      backgroundImage: "unset",
      padding: { xs: "1.5rem", md: "2rem" },
      backgroundColor: "background.paper",
      borderRadius: { xs: 0, md: "16px" },
      boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",
      width: "100%",
      mt: 4,
      marginLeft: { xs: 0, md: "19%" },
      marginBottom: { xs: 0, md: "15px" },
      maxWidth: { md: "80%" }
    }}>
      <Stack
        direction="column"
        spacing={4}
        sx={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        {/* Phần trên: Logo, mô tả, menu, liên hệ */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 8 }}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          {/* Logo và mô tả */}
          <Stack spacing={2} sx={{ maxWidth: { xs: "100%", md: "400px" }, alignItems: { xs: "center", md: "flex-start" } }}>
            <Logo />
            <Typography variant="body2" sx={{ color: "text.secondary", textAlign: { xs: "center", md: "left" } }}>
              Toàn bộ nội dung trên trang web này được tổng hợp từ các nền tảng video chính thống trên Internet và không cung cấp dịch vụ phát trực tuyến chính thức. Nếu bạn phát hiện quyền lợi của mình bị xâm phạm, vui lòng thông báo cho chúng tôi.
            </Typography>
          </Stack>
          {/* Thông tin liên hệ */}
          <Stack spacing={2} alignItems={{ xs: "center", md: "flex-start" }}>
            <Typography variant="h6" sx={{ color: "primary.main", fontWeight: "bold" }}>
              Liên Hệ
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Email: keke@gmail.com
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Điện thoại: 0123456789
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Địa chỉ: 123 Đường ABC, Quận XYZ, TP.Hà Nội
            </Typography>
            <Divider sx={{ width: "100%", my: 1 }} />
            {/* Các icon mạng xã hội */}
            <Stack direction="row" spacing={2}>
              <IconButton color="primary" size="small" sx={{ border: '1px solid', borderColor: 'text.disabled' }}>
                <FacebookOutlinedIcon />
              </IconButton>
              <IconButton color="primary" size="small" sx={{ border: '1px solid', borderColor: 'text.disabled' }}>
                <InstagramIcon />
              </IconButton>
              <IconButton color="primary" size="small" sx={{ border: '1px solid', borderColor: 'text.disabled' }}>
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" size="small" sx={{ border: '1px solid', borderColor: 'text.disabled' }}>
                <GitHubIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>

        {/* Phần dưới: Bản quyền */}
        <Box sx={{ width: '100%', mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              textAlign: "center",
              fontSize: "0.875rem",
            }}
          >
            © 2025 XemPhim. All rights reserved
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default Footer;