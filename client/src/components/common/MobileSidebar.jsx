import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import menuConfigs from "../../api/configs/menu.configs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle.jsx";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";

const MobileSidebar = ({ open, toggleSidebar }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <Sheet open={open} onOpenChange={(val) => toggleSidebar(val)}>
      <SheetContent side="left" className="w-[300px] p-0 flex flex-col">
        <SheetHeader className="p-4 border-b shrink-0">
          <SheetTitle className="flex justify-center">
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="flex flex-col py-4 px-3">
            <div className="space-y-4">
              <div>
                <h6 className="mb-2 text-sm font-semibold text-muted-foreground uppercase">
                  MENU
                </h6>
                <div className="flex flex-col gap-1">
                  {menuConfigs.main.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      asChild
                      className="justify-start gap-4 text-primary uppercase font-medium hover:bg-secondary w-full"
                      onClick={() => toggleSidebar(false)}
                    >
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.display}</span>
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>

              {user && (
                <div>
                  <h6 className="mb-2 text-sm font-semibold text-muted-foreground uppercase">
                    PERSONAL
                  </h6>
                  <div className="flex flex-col gap-1">
                    {menuConfigs.user?.map((item, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        asChild
                        className="justify-start gap-4 text-primary uppercase font-medium hover:bg-secondary w-full"
                        onClick={() => toggleSidebar(false)}
                      >
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.display}</span>
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t pt-4 mt-4 flex flex-col">
              <h6 className="mb-2 text-sm font-semibold text-muted-foreground uppercase">
                THEME
              </h6>
              <ModeToggle />
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;