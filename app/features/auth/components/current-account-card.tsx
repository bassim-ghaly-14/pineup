"use client";

import {
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { useRouter } from "next/navigation";

import { UserAvatar } from "@/components/common/user-avatar";

import {
  STORAGE_KEYS,
} from "@/constants/storage-keys";

import {
  ROUTES,
} from "@/constants/routes";
import { isVerified } from "@/utils/is-verified";
import { VerifiedBadge } from "@/components/common/verified-badge";

type Props = {
  onClose: () => void;
};

export function CurrentAccountCard({
  onClose,
}: Props) {

  const router = useRouter();

  const user =
    typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem(
            STORAGE_KEYS.USER
          ) || "null"
        )
      : null;

  if (!user) {
    return null;
  }

  const openProfile = () => {

    onClose();

    requestAnimationFrame(() => {

      router.push(
        ROUTES.PROFILE_BY_ID(
          user.id ?? user._id
        )
      );

    });

  };

  return (

    <Box
      onClick={(e) => {
  e.stopPropagation();
  openProfile();
}}
      sx={{
        mx: 1,
        mb: 1,
        p: 2,
        borderRadius: 3,

        cursor: "pointer",
        background:
          "linear-gradient(135deg, rgba(212,166,58,.18) 0%, rgba(212,166,58,.05) 45%, rgba(255,255,255,.02) 100%)",

        border:
          "1px solid rgba(212,166,58,.22)",

        transition:
          ".25s ease",

        "&:hover": {
          transform: "translateY(-3px)",
          borderColor: "primary.main",
          boxShadow:
            "0 18px 40px rgba(212,166,58,.22)",

          "& .current-arrow": {
            transform: "translateX(5px)",
            color: "primary.main",
          },
        },
      }}
    >

      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
        }}
      >

        <UserAvatar
          src={user.photo}
          sx={{
            width: 60,
            height: 60,
            border: "3px solid",
            borderColor:
              "primary.main",
            boxShadow:
              "0 0 0 4px rgba(212,166,58,.12)",
            fontSize: 22,
            fontWeight: 800,
          }}
        >
          {user.name?.[0]}
        </UserAvatar>

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >

<Stack
  direction="row"
  spacing={1}
  useFlexGap
  sx={{
    alignItems: "center",
    flexWrap: "wrap",
    rowGap: 0.5,
    minWidth: 0,
  }}
>
  <Stack
    direction="row"
    spacing={0.5}
    sx={{ alignItems: "center" }}
  >
    <Typography
      noWrap
      sx={{
        fontWeight: 800,
        fontSize: 17,
      }}
    >
      {user.name}
    </Typography>

    {isVerified(user._id ?? user.id) && (
      <VerifiedBadge size={18} />
    )}
  </Stack>

<Chip
  label="Current"
  size="small"
  sx={{
    flexShrink: 0,
    height: 22,
    px: 0.5,
    bgcolor: "rgba(212,166,58,.16)",
    color: "primary.main",
    border: "1px solid rgba(212,166,58,.28)",
    fontSize: 11,
    fontWeight: 800,
  }}
/>
</Stack>

          <Typography
            noWrap
            variant="body2"
            color="text.secondary"
          >
            @{user.username}
            <Typography
              variant="caption"
              sx={{
                display: "block",
                mt: .25,
                color: "text.disabled",
              }}
            >
              View your profile
            </Typography>
          </Typography>

        </Box>

        <ArrowForwardRoundedIcon
          className="current-arrow"
          sx={{
            color: "text.secondary",
            transition: ".25s",
            fontSize: 22,
          }}
        />

      </Stack>

    </Box>

  );

}