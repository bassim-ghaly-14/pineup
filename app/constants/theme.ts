import { Shadows, ThemeOptions } from "@mui/material";
/*
========================================
PineUp Design Tokens

Radius
-------
sm = 12
md = 16
lg = 20
xl = 24

Motion
-------
fast = .2s
normal = .25s
slow = .3s

Elevation
---------
0 = none
1 = subtle
2 = card
3 = floating
4 = modal
========================================
*/
export function pineUpTheme(
  mode: "light" | "dark"
): ThemeOptions {
  const dark = mode === "dark";
const radius = {
  sm: 10,
  md: 14,
  lg: 16,
  xl: 20,
};

const motion = {
  fast: ".2s",
  normal: ".25s",
  slow: ".3s",
};

const gold = {
  main: "#D4A63A",
  light: "#DDB55A",
  dark: "#B88922",
};
  const shadows: Shadows = dark
    ? [
        "none",
        "0 2px 8px rgba(0,0,0,.15)",
        "0 6px 18px rgba(0,0,0,.20)",
        "0 12px 30px rgba(0,0,0,.28)",
        "0 20px 45px rgba(0,0,0,.35)",
        ...Array(20).fill(
          "0 20px 45px rgba(0,0,0,.35)"
        ),
      ] as Shadows
    : [
        "none",
        "0 2px 8px rgba(0,0,0,.05)",
        "0 6px 18px rgba(0,0,0,.08)",
        "0 8px 24px rgba(0,0,0,.08)",
        "0 16px 36px rgba(0,0,0,.10)",
        ...Array(20).fill(
          "0 20px 45px rgba(0,0,0,.12)"
        ),
      ] as Shadows;
  return {
    shadows,
    palette: {
      mode,
      primary: {
        main: gold.main,
        light: gold.light,
        dark: gold.dark,
        contrastText: "#14171D",
      },
      secondary: {
        main: dark ? "#1F232B" : "#EEF1F5",
        light: dark ? "#2B313C" : "#F7F8FA",
        dark: dark ? "#14171D" : "#D8DDE5",
      },
      background: {
        default: dark ? "#0F1115" : "#F3F4F6",
        paper: dark ? "#1A1F27" : "#FCFCFD",
      },
      text: {
        primary: dark ? "#FFFFFF" : "#111827",
        secondary: dark ? "#9CA3AF" : "#6B7280",
      },
      divider: dark
        ? "rgba(255,255,255,.08)"
        : "rgba(0,0,0,.08)",
    },
    shape: {
      borderRadius: radius.lg,
    },
    typography: {
      fontFamily: [
        "Inter",
        "system-ui",
        "sans-serif",
      ].join(","),
      allVariants: {
        letterSpacing: "-0.02em",
      },
      h1: {
        fontWeight: 800,
      },
      h2: {
        fontWeight: 800,
      },
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 700,
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            background: dark
              ? "linear-gradient(180deg,#1A1F27 0%,#171B22 100%)"
              : "#FFFFFF",
            border: dark
              ? "1px solid rgba(255,255,255,.06)"
              : "1px solid rgba(0,0,0,.06)",
            boxShadow: shadows[3],
            borderRadius: radius.lg,
            backdropFilter: "blur(18px)",
            transition: motion.slow,
            "&:hover": {
              transform: "translateY(-2px)",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            height: 46,
            borderRadius: radius.md,
            fontWeight: 700,
            transition: motion.normal,
            "&:active": {
              transform: "scale(.98)",
            },
          },
          contained: {
            boxShadow: shadows[0],
            background:
              "linear-gradient(135deg,#D4A63A,#E7C46A)",
            color: "#14171D",
            "&:hover": {
              boxShadow:
                "0 8px 24px rgba(212,166,58,.35)",
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: radius.md,
            background: dark
              ? "rgba(255,255,255,.03)"
              : "rgba(0,0,0,.03)",
            transition: motion.normal,
            "& .MuiOutlinedInput-notchedOutline": {
            borderColor: dark
              ? "rgba(255,255,255,.12)"
              : "rgba(17,24,39,.18)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: dark
                ? "rgba(255,255,255,.25)"
                : "rgba(17,24,39,.35)",
            },
            "&.Mui-focused": {
              boxShadow:
                "0 0 0 4px rgba(212,166,58,.15)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: gold.main,
              borderWidth: 2,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: dark
              ? "rgba(20,23,29,.75)"
              : "rgba(255,255,255,.75)",
            backdropFilter: "blur(20px)",
            boxShadow: shadows[0],
            borderBottom: dark
              ? "1px solid rgba(255,255,255,.06)"
              : "1px solid rgba(0,0,0,.06)",
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            width: 48,
            height: 48,
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarGutter: "stable",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: radius.lg,
            backdropFilter: "blur(20px)",
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            marginTop: 8,
            borderRadius: radius.lg,
            overflow: "hidden",
            backdropFilter: "blur(20px)",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            margin: 4,
            borderRadius: radius.sm,
            transition: motion.fast,
            "&:hover": {
              background:
                "rgba(212,166,58,.12)",
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: radius.xl,
            backdropFilter: "blur(25px)",
          },
        },
      },
    },
  };
}