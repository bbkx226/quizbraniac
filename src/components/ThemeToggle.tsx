"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// It uses React's HTMLAttributes<HTMLDivElement> for its props type, so any valid div attributes can be passed in.
// It destructures {className, ...props} from the props object. This extracts className as a separate variable and passes the remaining props into an object called props.
export function ThemeToggle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { setTheme } = useTheme() // It uses the useTheme hook, destructuring just the setTheme function from it.

  return (
    <div className={className} {...props}>
        <DropdownMenu>
          {/*  the asChild prop on <DropdownMenuTrigger> means that it will render its child as the trigger rather than rendering its own element. This allows the parent to customize the trigger. */}
          <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                {/* 
                  rotate-0 scale-100 - Rotate is initially 0 degrees and scale is 100% (normal size) 
                  dark:-rotate-90 dark:scale-0 - Rotate -90 deg and scale to 0% (hide) in dark mode.
                */}
                <span className="animate-spin"><Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /></span>
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                {/* 
                  The sr-only class in Tailwind CSS is used to visually hide an element, while still allowing it to be read by screen readers. 
                */}
                <span className="sr-only">Toggle theme</span>
              </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
