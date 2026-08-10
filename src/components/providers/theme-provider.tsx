"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material";

import { pineUpTheme } from "src/constants/theme";

type ColorMode = "light" | "dark";

type ThemeContextValue = {
  mode: ColorMode;
  toggleTheme: () => void;
};

const ThemeContext =
  createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "pineup-theme";

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ColorMode>("dark");
useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ColorMode | null;
    if (saved === "light" || saved === "dark") {
      setMode(saved);
      return;
    }
    setMode(
      window.matchMedia("(prefers-color-scheme: dark)")
      .matches
        ? "dark"
        : "light"
  );
  }, []);

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  const theme = useMemo(
    () => createTheme(pineUpTheme(mode)),
    [mode]
  );

  const value = useMemo(
    () => ({ mode, toggleTheme }),
    [mode]
  );

  // Sync CSS variables with MUI theme mode for globals.css
  useEffect(() => {
    const root = document.documentElement;
    const isDark = mode === "dark";

    root.style.setProperty(
      "--bg-default",
      isDark ? "#0F1115" : "#F3F4F6"
    );
    root.style.setProperty(
      "--bg-paper",
      isDark ? "#1A1F27" : "#FCFCFD"
    );
    root.style.setProperty(
      "--text-primary",
      isDark ? "#FFFFFF" : "#111827"
    );
    root.style.setProperty(
      "--text-secondary",
      isDark ? "#9CA3AF" : "#6B7280"
    );
    root.style.setProperty(
      "--border-color",
      isDark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.08)"
    );
    root.style.setProperty(
      "--body-bg-start",
      isDark ? "#0f1115" : "#F3F4F6"
    );
    root.style.setProperty(
      "--body-bg-end",
      isDark ? "#14171d" : "#FFFFFF"
    );
  }, [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used inside ThemeProvider.");
  }

  return context;
}