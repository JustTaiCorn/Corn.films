import { useSelector } from "react-redux";
import { Menu as MenuIcon } from "lucide-react";
import { useState, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import MobileSidebar from "./MobileSidebar.jsx";
import menuConfigs from "../../api/configs/menu.configs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle.jsx";

const SideBar = memo(function SidebarForPC() {
  const { user } = useSelector((state) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <MobileSidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-background p-4 shadow-sm md:hidden">
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

      <div className="hidden md:fixed md:top-[5vh] md:left-6 md:flex md:h-[90vh] md:w-[250px] md:flex-col md:bg-card md:p-4 md:shadow-lg md:rounded-xl ">
        <div className="mb-6 mt-2 flex justify-center">
          <Logo />
        </div>

        <div className="grow overflow-y-auto flex flex-col gap-1 space-y-1">
          {menuConfigs.main.map((item, index) => {
            const isActive = pathname === item.path
            return (
              <Button
                key={index}
                variant="ghost"
                asChild
                className={`justify-start gap-4 uppercase font-semibold hover:bg-secondary ${isActive ? "bg-primary border border-primary text-primary-foreground" : "text-primary"
                  }`}
              >
                <Link to={item.path}>
                  {item.icon}
                  {item.display}
                </Link>
              </Button>
            );
          })}
        </div>

        <div className="my-4 h-px bg-border" />

        <div className="flex flex-col gap-3">
          <ModeToggle />
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

export default SideBar;
