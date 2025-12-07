import { useSelector, useDispatch } from "react-redux";
import { Menu as MenuIcon, Moon, Sun } from "lucide-react";
import { useState, memo } from "react";
import { Link } from "react-router-dom";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Sidebar from "./Sidebar";
import menuConfigs from "../../api/configs/menu.configs";
import { Button } from "@/components/ui/button";

const themeModes = {
  dark: "dark",
  light: "light"
};

const SidebarForPC = memo(function SidebarForPC() {
  const { user } = useSelector((state) => state.user);
  const { themeMode } = useSelector((state) => state.themeMode);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const onSwitchTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      {/* Mobile sidebar */}
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-999 flex items-center justify-between bg-background p-4 shadow-sm md:hidden">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <MenuIcon />
        </Button>

        <Logo />

        <div>
          {!user ? (
            <Button asChild size="sm">
              <Link to="/log-in">sign in</Link>
            </Button>
          ) : (
            <UserMenu />
          )}
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:top-[5vh] md:left-6 md:flex md:h-[90vh] md:w-[250px] md:flex-col md:bg-card md:p-4 md:shadow-lg md:rounded-xl ">
        {/* Logo */}
        <div className="mb-6 mt-2 flex justify-center">
          <Logo />
        </div>

        {/* Menu Items */}
        <div className="flex-grow overflow-y-auto flex flex-col gap-1">
          {menuConfigs.main.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              asChild
              className="justify-start gap-4 text-primary uppercase font-medium hover:bg-secondary"
            >
              <Link to={item.path}>
                {item.icon}
                {item.display}
              </Link>
            </Button>
          ))}
        </div>

        <div className="my-4 h-px bg-border" />

        {/* Bottom section - Theme toggle & User */}
        <div className="flex flex-col gap-3">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            onClick={onSwitchTheme}
            className="justify-start gap-4 text-foreground normal-case hover:bg-secondary"
          >
            {themeMode === themeModes.dark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            {themeMode === themeModes.dark ? "Dark Mode" : "Light Mode"}
          </Button>

          {/* User info or sign in */}
          {!user ? (
            <Button asChild className="w-full uppercase font-bold">
              <Link to="/log-in">sign in</Link>
            </Button>
          ) : (
            <UserMenu />
          )}
        </div>
      </div>
    </>
  );
});

export default SidebarForPC;
