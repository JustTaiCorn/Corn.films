import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Box, Button, IconButton, Stack, Divider } from "@mui/material";
import { useState, memo } from "react";
import { Link } from "react-router-dom";
import { themeModes } from "../../api/configs/theme.configs";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Sidebar from "./Sidebar";
import menuConfigs from "../../api/configs/menu.configs";

const SidebarForPC = memo(function SidebarForPC() {
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const onSwithTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      {/* Mobile sidebar (giữ nguyên) */}
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Mobile top bar */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          display: { xs: "flex", md: "none" },
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          bgcolor: "background.paper"
        }}
      >
        <IconButton
          color="inherit"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>

        <Logo />

        <Box>
          {!user ? (
            <Button
              variant="contained"
              component={Link}
              to="/log-in"
              size="small"
            >
              sign in
            </Button>
          ) : (
            <UserMenu />
          )}
        </Box>
      </Box>

      {/* Desktop sidebar */}
      <Box
        sx={{
          minHeight: "90vh",
          width: "15%",
          minWidth: "220px",
          maxWidth: "250px",
          height: "90vh",
          position: "fixed",
          top: "5vh",
          left: "5vh",
          bgcolor: "background.paper",
          borderRight: "1px solid",
          borderColor: "divider",
          padding: 2,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          zIndex: 1200,
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
        }}
      >
        {/* Logo */}
        <Box sx={{ mb: 4, mt: 2, display: "flex", justifyContent: "center" }}>
          <Logo />
        </Box>

        {/* Menu Items */}
        <Stack spacing={1} sx={{ flexGrow: 1 }}>
          {menuConfigs.main.map((item, index) => (
            <Button
              key={index}
              startIcon={item.icon}
              sx={{
                justifyContent: "flex-start",
                color: appState.includes(item.state) ? "primary.contrastText" : "text.primary",
                bgcolor: appState.includes(item.state) ? "primary.main" : "transparent",
                borderRadius: 2,
                padding: "10px 16px",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
                fontWeight: "medium",
                "&:hover": {
                  bgcolor: "primary.dark"
                },
                fontSize: { md: '0.9rem' },
              }}
              component={Link}
              to={item.path}
              variant="text"
            >
              {item.display}
            </Button>
          ))}
        </Stack>
        <Divider />
        {/* Bottom section - Theme toggle & User */}
        <Stack spacing={2} sx={{ mt: 3 }}>
          {/* Theme toggle */}
          <Button
            startIcon={themeMode === themeModes.dark ? <DarkModeOutlinedIcon /> : <WbSunnyOutlinedIcon />}
            onClick={onSwithTheme}
            sx={{
              justifyContent: "flex-start",
              color: "text.primary",
              textTransform: "none"
            }}
          >
            {themeMode === themeModes.dark ? "Dark Mode" : "Light Mode"}
          </Button>

          {/* User info or sign in */}
          {!user ? (
            <Button
              variant="contained"
              component={Link}
              to="/log-in"
              fullWidth
              sx={{
                maxHeight: "40px",
              }}
            >
              sign in
            </Button>
          ) : (
            <Box sx={{ width: "100%" }}>
              <UserMenu vertical={true} />
            </Box>
          )}
        </Stack>
      </Box>

      {/* Content margin for desktop */}
      <Box sx={{
        marginLeft: { xs: 0, md: '270px' },
        transition: "margin 0.3s ease"
      }}></Box>
    </>
  );
});

export default SidebarForPC;