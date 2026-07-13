"use client";

import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

type Props = {
  size?: number;
};

export function VerifiedBadge({
  size = 22,
}: Props) {
  return (
    <VerifiedRoundedIcon
      sx={{
        fontSize: size,
        color: "primary.main",
        flexShrink: 0,
      }}
    />
  );
}