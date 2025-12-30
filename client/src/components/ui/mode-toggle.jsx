import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useTheme} from "@/components/ui/theme-provider.jsx";
export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <Sun className="h-4 w-4 transition-all dark:hidden" />
                    <Moon className="h-4 w-4 transition-all hidden dark:block" />
                    <span>Giao diện</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Sáng
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Tối
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    Hệ thống
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}