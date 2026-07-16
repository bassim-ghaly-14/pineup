"use client";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import {
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";

export function SearchInput(
  props: TextFieldProps
) {
  const mergedSx = Array.isArray(props.sx)
    ? props.sx
    : props.sx
      ? [props.sx]
      : [];

  return (
    <TextField
      {...props}
      placeholder={
        props.placeholder ??
        "Search PineUp..."
      }
      slotProps={{
        ...props.slotProps,
        input: {
          ...props.slotProps?.input,
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon
                sx={{
                  color: "primary.main",
                  opacity: 0.75,
                  fontSize: 20,
                }}
              />
            </InputAdornment>
          ),
        },
      }}
      sx={[
        (theme) => ({
          "& .MuiOutlinedInput-root": {
            height: 48,

            borderRadius: "999px",

            background:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,.04)"
                : "rgba(0,0,0,.04)",

            backdropFilter: "blur(18px)",
            WebkitBackdropFilter:
              "blur(18px)",

            transition:
              "all .25s ease",

            "& fieldset": {
              border: "1px solid",
              borderColor: theme.palette.divider,
            },

            "&:hover": {
              background:
                theme.palette.mode ===
                "dark"
                  ? "rgba(255,255,255,.06)"
                  : "rgba(0,0,0,.06)",

              "& fieldset": {
                borderColor:
                  "rgba(212,166,58,.25)",
              },
            },

            "&.Mui-focused": {
              background:
                theme.palette.mode ===
                "dark"
                  ? "rgba(255,255,255,.07)"
                  : "rgba(0,0,0,.07)",

              boxShadow:
                "0 0 0 4px rgba(212,166,58,.08)",

              "& fieldset": {
                borderColor:
                  "primary.main",
                borderWidth: 1,
              },
            },
          },

          "& input": {
            fontSize: 14,
            fontWeight: 500,
          },

          "& input::placeholder": {
            opacity: 1,
            color: "text.secondary",
          },
        }),
        ...mergedSx,
      ]}
    />
  );
}