"use client";

import Link from "next/link";
import Image from "next/image";

import { Box } from "@mui/material";
import { useAppTheme } from "../providers/theme-provider";

type Props = {
  clickable?: boolean;
};

export function AppLogo({ clickable = true }: Props) {
  const { mode } = useAppTheme();

  const desktopLogo =
    mode === "dark"
      ? "https://res.cloudinary.com/paihc5qx/image/upload/v1786813314/toggle-logo_fyh97e.png"
      : "https://res.cloudinary.com/paihc5qx/image/upload/v1786813311/primarylogo_pnwfos.png";

  const content = (
    <>
      {/* Mobile Logo */}
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          lineHeight: 0,
        }}>
        <Image
          src="https://res.cloudinary.com/paihc5qx/image/upload/v1786813308/appicon_ci15m7.png"
          alt="PineUp"
          priority
          height={110}
          style={{
            width: "auto",
            height: "110px",
          }}
        />
      </Box>

      {/* Desktop Logo */}
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          lineHeight: 0,
        }}>
        <Image
          src={desktopLogo}
          alt="PineUp"
          priority
          height={74}
          style={{
            width: "auto",
            height: "74px",
          }}
        />
      </Box>
    </>
  );

  if (!clickable) {
    return content;
  }

  return (
    <Link
      href="/feed"
      style={{
        display: "inline-flex",
        alignItems: "center",
        textDecoration: "none",
        color: "inherit",
      }}>
      {content}
    </Link>
  );
}
