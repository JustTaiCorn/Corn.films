import { Paper, Stack, Button, Box, Typography, Divider, Grid2 } from '@mui/material';
import Container from './Container';
import Logo from './Logo';
import { Link } from "react-router-dom";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import menuConfigs from '../../configs/menu.configs';

const Footer = () => {
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: "unset", padding: "2rem", backgroundColor: "background.paper" }}>
        <Stack
          direction="column"
          spacing={4}
          sx={{ maxWidth: "1200px", margin: "0 auto" }}
        >
          {/* Phần trên: Logo, mô tả, menu, liên hệ */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 4, md: 8 }}
            alignItems={{ xs: "center", md: "flex-start" }}
            justifyContent="space-between"
          >
            {/* Logo và mô tả */}
            <Stack spacing={2} alignItems="center" sx={{ maxWidth: { xs: "100%", md: "400px" } }}>
              <Logo />
              <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "left" }}>
                Toàn bộ nội dung trên trang web này được tổng hợp từ các nền tảng video chính thống trên Internet và không cung cấp dịch vụ phát trực tuyến chính thức. Nếu bạn phát hiện quyền lợi của mình bị xâm phạm, vui lòng thông báo cho chúng tôi. Chúng tôi cam kết sẽ xử lý và gỡ bỏ nội dung vi phạm một cách nhanh chóng. Xin cảm ơn sự hợp tác của bạn!
              </Typography>
            </Stack>

            {/* Menu sản phẩm */}

            <Box sx={{ minWidth: "150px", textAlign: { xs: "center", md: "left" } }}>
              <Typography variant="h6" sx={{ color: "text.secondary", fontWeight: "bold", mb: 1 }}>
                Sản Phẩm
              </Typography>
              <Grid2 container spacing={1}>
                {menuConfigs.main.map((value, index) => (
                  <Grid2 xs={6} key={index}>
                    <Button
                      sx={{ color: "inherit", justifyContent: "flex-start", textTransform: "Upercase", width: "100%" }}
                      component={Link}
                      to={value.path}
                    >
                      {value.display}
                    </Button>
                  </Grid2>
                ))}
              </Grid2>
            </Box>

            {/* Thông tin liên hệ */}
            <Stack spacing={2} alignItems={{ xs: "center", md: "flex-start" }}>
              <Typography variant="h6" sx={{ color: "text.secondary", fontWeight: "bold" }}>
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
              {/* Các nút mạng xã hội */}
              <Stack direction="row" spacing={2}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<FacebookOutlinedIcon />}
                  sx={{ color: "text.secondary", "& .MuiButton-startIcon": { mr: { xs: 0, sm: 2 } } }}
                >
                  <Box sx={{ display: { xs: "none", md: "block" } }}>Facebook</Box>
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<InstagramIcon />}
                  sx={{ color: "text.secondary" }}
                >
                  <Box sx={{ display: { xs: "none", md: "block" } }}>Instagram</Box>
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<TwitterIcon />}
                  sx={{ color: "text.secondary" }}
                >
                  <Box sx={{ display: { xs: "none", md: "block" } }}>Twitter</Box>
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  sx={{ color: "text.secondary" }}
                >
                  <Box sx={{ display: { xs: "none", md: "block" } }}>GitHub</Box>
                </Button>
              </Stack>
            </Stack>
          </Stack>

          {/* Phần dưới: Bản quyền */}
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              textAlign: "center",
              fontSize: { xs: "0.75rem", md: "1rem" },
              mt: 4,
            }}
          >
            © 2025 XemPhim. All rights reserved
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Footer;