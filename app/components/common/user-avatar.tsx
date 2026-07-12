"use client";

import {
  Avatar,
  AvatarProps,
} from "@mui/material";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

type Props = AvatarProps & {
  userId?: string;
};

export function UserAvatar({
  userId,
  onClick,
  ...props
}: Props) {

  const router = useRouter();


  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {

    onClick?.(event);

    if (userId) {
      router.push(
        ROUTES.PROFILE_BY_ID(userId)
      );
    }
  };


  return (
    <>
    <Avatar
      {...props}
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
    </>
  );
}