"use client";

import Link from "next/link";
import Image from "next/image";

import { Box } from "@mui/material";
// import { useColorScheme } from "@mui/material/styles";
import { useAppTheme } from "../providers/theme-provider";

import mobileLogo from "../../assets/appicon.png";
import desktopLightLogo from "@/assets/primarylogo.png";
import desktopDarkLogo from "@/assets/toggle-logo.png";

type Props = {
  clickable?: boolean;
};

export function AppLogo({
  clickable = true,
}: Props) {
  const { mode } = useAppTheme();

  const desktopLogo =
    mode === "dark"
      ? desktopDarkLogo
      : desktopLightLogo;

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
        }}
      >
        <Image
          src={mobileLogo}
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
        }}
      >
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
      }}
    >
      {content}
    </Link>
  );
}