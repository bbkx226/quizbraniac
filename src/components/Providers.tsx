"use client"; // marks source files whose components execute on the client
import React from "react";
import { SessionProvider } from "next-auth/react"; // Managing user sessions and authentication states in a Next.js application using the NextAuth.js library
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(); // Used to manage data queries and caching in the application

const Providers = ({ children }: ThemeProviderProps) => {
  return (
    // Connect and provide a QueryClient to your application
    <QueryClientProvider client={queryClient}> 
      {/* attribute = 'data-theme': HTML attribute modified based on the active theme */}
      {/* defaultTheme = 'system': Default theme name (for v0.0.12 and lower the default was light). If enableSystem is false, the default theme is light */}
      {/* enableSystem = true: Whether to switch between dark and light based on prefers-color-scheme */}
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider>{children}</SessionProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  );
};

export default Providers;