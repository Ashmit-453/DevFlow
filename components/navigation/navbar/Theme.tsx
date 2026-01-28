"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import clsx from "clsx"
export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const itemClass = (value: string) =>
    clsx(
      "cursor-pointer transition-colors",
      "hover:bg-muted",
      theme === value && "bg-muted font-medium"
    )

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Sun className="size-[1.2rem]" />
        <span className="sr-only">Toggle Theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="transition-transform duration-200 hover:scale-110 cursor-pointer">
          {theme === 'dark' ? (
            <Moon className="size-[1.2rem]" />
          ) : (
            <Sun className="size-[1.2rem]" />
          )}
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem className={itemClass('light')} onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem className={itemClass('dark')} onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem className={itemClass('system')} onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ThemeToggle;