"use client";

import Link from "next/link";
import Image from "next/image";

import { Box } from "@mui/material";
import { useAppTheme } from "../providers/theme-provider";

type Props = {
  clickable?: boolean;
};

const MOBILE_LOGO =
  "https://res.cloudinary.com/paihc5qx/image/upload/v1786813308/appicon_ci15m7.png";

const LIGHT_DESKTOP_LOGO =
  "https://res.cloudinary.com/paihc5qx/image/upload/v1786813311/primarylogo_pnwfos.png";

const DARK_DESKTOP_LOGO =
  "https://res.cloudinary.com/paihc5qx/image/upload/v1786813314/toggle-logo_fyh97e.png";

export function AppLogo({ clickable = true }: Props) {
  const { mode } = useAppTheme();

  const desktopLogo = mode === "dark" ? DARK_DESKTOP_LOGO : LIGHT_DESKTOP_LOGO;

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
          src={MOBILE_LOGO}
          alt="PineUp"
          width={110}
          height={110}
          priority
          sizes="110px"
          style={{
            width: "110px",
            height: "110px",
            objectFit: "contain",
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
          width={296}
          height={74}
          priority
          sizes="296px"
          style={{
            width: "auto",
            height: "74px",
            objectFit: "contain",
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
