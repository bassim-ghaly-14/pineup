"use client";

import {
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { useRouter } from "next/navigation";

import {
  STORAGE_KEYS,
} from "@/constants/storage-keys";

import {
  ROUTES,
} from "@/constants/routes";
import { UserAvatar } from "@/components/common/user-avatar";


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

    <MenuItem

      onClick={
        openProfile
      }


      sx={{

        mx: 1,

        mt: 1,

        mb: 1,


        borderRadius: 3,


        background:
          "linear-gradient(135deg, rgba(212,166,58,.16), transparent)",


        border:
          "1px solid rgba(212,166,58,.25)",


        transition:
          ".25s ease",


        "&:hover": {

          transform:
            "translateX(4px)",

          background:
            "linear-gradient(135deg, rgba(212,166,58,.25), transparent)",

        },

      }}

    >

      <ListItemIcon>

        <UserAvatar

          src={
            user.photo
          }

          sx={{

            width:44,

            height:44,


            border:
              "2px solid",


            borderColor:
              "primary.main",

          }}

        >

          {
            user.name?.[0]
          }

        </UserAvatar>

      </ListItemIcon>



      <ListItemText

        primary={
          user.name
        }


        secondary={
          `@${user.username}`
        }

      />


      <ArrowForwardRoundedIcon

        fontSize="small"

        sx={{
          color:
            "text.secondary",
        }}

      />


    </MenuItem>

  );
}