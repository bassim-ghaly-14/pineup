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

import { pineUpTheme } from "@/constants/theme";

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