"use client";

import {
  Avatar,
  AvatarProps,
} from "@mui/material";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import DefaultAvatar from "@/assets/default-avatar.png";

type Props = AvatarProps & {
  userId?: string;
};

const DEFAULT_AVATAR = DefaultAvatar.src;

export function UserAvatar({
  userId,
  onClick,
  src,
  ...props
}: Props) {

  const router = useRouter();

  const avatarImage =
    typeof src === "string" &&
    src.trim() &&
    !src.includes("default-profile.png")
      ? src
      : DEFAULT_AVATAR;

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    onClick?.(event);

    if (userId) {
      router.push(
        ROUTES.PROFILE_BY_ID(userId)
      );
    }
  };

  return (
    <Avatar
      {...props}
      src={avatarImage}
      onClick={handleClick}
      sx={[
        {
          width: 42,
          height: 42,

          border: "2px solid",
          borderColor: "primary.main",

          cursor: userId
            ? "pointer"
            : "default",

          transition:
            "border-color .25s, transform .25s",

          "&:hover": userId
            ? {
                transform: "scale(1.05)",
              }
            : {},
        },
        ...(Array.isArray(props.sx)
          ? props.sx
          : props.sx
          ? [props.sx]
          : []),
      ]}
    />
  );
}