import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Moon, Sun } from "lucide-react";

import { setThemeMode } from "../../redux/features/themeModeSlice";
import menuConfigs from "../../api/configs/menu.configs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const themeModes = {
  dark: "dark",
  light: "light"
};

const Sidebar = ({ open, toggleSidebar }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { themeMode } = useSelector((state) => state.themeMode);

  const onSwitchTheme = () => {
    const theme = themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  return (
    <Sheet open={open} onOpenChange={toggleSidebar}>
      <SheetContent side="left" className="w-[300px] p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex justify-center">
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full py-4">
          <div className="flex-1 overflow-y-auto px-3">
            <div className="mb-4">
              <h6 className="mb-2 px-2 text-sm font-semibold text-muted-foreground uppercase">MENU</h6>
              <div className="flex flex-col gap-1">
                {menuConfigs.main.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    asChild
                    className="justify-start gap-3 w-full"
                    onClick={() => toggleSidebar(false)}
                  >
                    <Link to={item.path}>
                      {item.icon}
                      <span className="uppercase">{item.display}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            </div>

            {user && (
              <div className="mb-4">
                <h6 className="mb-2 px-2 text-sm font-semibold text-muted-foreground uppercase">PERSONAL</h6>
                <div className="flex flex-col gap-1">
                  {menuConfigs.user?.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      asChild
                      className="justify-start gap-3 w-full"
                      onClick={() => toggleSidebar(false)}
                    >
                      <Link to={item.path}>
                        {item.icon}
                        <span className="uppercase">{item.display}</span>
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-4">
              <h6 className="mb-2 px-2 text-sm font-semibold text-muted-foreground uppercase">THEME</h6>
              <Button
                variant="ghost"
                className="justify-start gap-3 w-full"
                onClick={onSwitchTheme}
              >
                {themeMode === themeModes.dark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span className="uppercase">{themeMode === themeModes.dark ? "dark mode" : "light mode"}</span>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
