import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
  Box,
  Avatar,
  Divider
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import menuConfigs from "../../api/configs/menu.configs";
import { logout } from "../../redux/features/userThunks";

const UserMenu = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = (e) => setAnchorEl(e.currentTarget);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
    setAnchorEl(null);
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Box
        onClick={toggleMenu}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          padding: "10px 12px",
          borderRadius: 2,
          cursor: "pointer",
          transition: "all 0.2s ease",
          bgcolor: "action.hover",
          "&:hover": {
            bgcolor: "action.selected",
          }
        }}
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: "primary.main",
            fontSize: "1rem",
            fontWeight: "bold"
          }}
        >
          {user.username?.charAt(0).toUpperCase()}
        </Avatar>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            fontWeight="600"
            noWrap
            sx={{
              textTransform: "capitalize",
              color: "text.primary"
            }}
          >
            {user.username}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontSize: "0.75rem"
            }}
          >
            View profile
          </Typography>
        </Box>
      </Box>

      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            padding: 1,
            minWidth: 200,
            mt: 1,
            borderRadius: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)"
          }
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        {menuConfigs.user?.map((item, index) => (
          <ListItemButton
            component={Link}
            to={item.path}
            key={index}
            onClick={() => setAnchorEl(null)}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "action.hover"
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography
                  textTransform="uppercase"
                  fontSize="0.85rem"
                  fontWeight="500"
                >
                  {item.display}
                </Typography>
              }
            />
          </ListItemButton>
        ))}

        <Divider sx={{ my: 1 }} />

        <ListItemButton
          sx={{
            borderRadius: 1,
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "error.light",
              "& .MuiListItemIcon-root, & .MuiTypography-root": {
                color: "error.dark"
              }
            }
          }}
          onClick={handleLogout}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography
                textTransform="uppercase"
                fontSize="0.85rem"
                fontWeight="500"
              >
                sign out
              </Typography>
            }
          />
        </ListItemButton>
      </Menu>
    </>
  );
};

export default UserMenu;