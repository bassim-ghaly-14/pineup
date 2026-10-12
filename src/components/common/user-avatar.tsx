"use client";

import { Avatar, AvatarProps } from "@mui/material";
import { useRouter } from "next/navigation";
import { ROUTES } from "src/constants/routes";

type Props = AvatarProps & {
  userId?: string;
};

const DEFAULT_AVATAR =
  "https://res.cloudinary.com/paihc5qx/image/upload/v1786813308/default-avatar_zebtda.png";

export function UserAvatar({ userId, onClick, src, ...props }: Props) {
  const router = useRouter();

  const avatarImage =
    typeof src === "string" &&
    src.trim() &&
    !src.includes("default-profile.png")
      ? src
      : DEFAULT_AVATAR;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (onClick) {
      onClick(event);
      return;
    }

    if (userId) {
      router.push(ROUTES.PROFILE_BY_ID(userId));
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

          backgroundColor: "#000",

          border: "2px solid",
          borderColor: "primary.main",

          cursor: userId || onClick ? "pointer" : "default",

          transition: "border-color .25s, transform .25s",

          "&:hover":
            userId || onClick
              ? {
                  transform: "scale(1.05)",
                }
              : {},
        },
        ...(Array.isArray(props.sx) ? props.sx : props.sx ? [props.sx] : []),
      ]}
    />
  );
}
