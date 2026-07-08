import { ThemeOptions } from "@mui/material";

export function pineUpTheme(
  mode: "light" | "dark"
): ThemeOptions {
  const dark = mode === "dark";

  return {
    palette: {
      mode,

      primary: {
        main: "#D4A63A",
        light: "#E7C46A",
        dark: "#B88922",
        contrastText: "#14171D",
      },

      secondary: {
        main: dark ? "#1F232B" : "#EEF1F5",
        light: dark ? "#2B313C" : "#F7F8FA",
        dark: dark ? "#14171D" : "#D8DDE5",
      },

      background: {
        default: dark ? "#0F1115" : "#F7F8FA",
        paper: dark ? "#1A1F27" : "#FFFFFF",
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
      borderRadius: 18,
    },

    typography: {
      fontFamily: [
        "Inter",
        "system-ui",
        "sans-serif",
      ].join(","),

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

            boxShadow: dark
              ? "0 10px 30px rgba(0,0,0,.25)"
              : "0 10px 30px rgba(0,0,0,.08)",

            borderRadius: 20,
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            height: 46,
            borderRadius: 14,
            fontWeight: 700,
          },

          contained: {
            boxShadow: "none",

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
            borderRadius: 16,

            background: dark
              ? "rgba(255,255,255,.03)"
              : "rgba(0,0,0,.03)",
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

            boxShadow: "none",

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
    },
  };
}