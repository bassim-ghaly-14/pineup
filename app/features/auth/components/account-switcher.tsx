"use client";

import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";

import {
  useAccountSwitcher,
} from "../hooks/use-account-switcher";

import {
  STORAGE_KEYS,
} from "@/constants/storage-keys";
import { UserAvatar } from "@/components/common/user-avatar";


type Props = {
  onClose?: () => void;
};


export function AccountSwitcher({
  onClose,
}: Props) {

  const {
    accounts,
    switchAccount,
  } = useAccountSwitcher(
    onClose
  );


  const currentToken =
    typeof window !== "undefined"
      ? localStorage.getItem(
          STORAGE_KEYS.TOKEN
        )
      : null;


  const availableAccounts =
    accounts.filter(
      (account) =>
        account.token !== currentToken
    );


  if (!availableAccounts.length) {
    return null;
  }


  return (
    <Box
      sx={{
        px: 1,
        py: 1,
      }}
    >

      <Typography
        variant="caption"
        sx={{
          px: 1.5,
          color: "text.secondary",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: ".08em",
        }}
      >
        Switch account
      </Typography>


      {availableAccounts.map(
        (account) => (

          <MenuItem
            key={
              `switch-${account.user._id}`
            }

            onClick={() =>
              switchAccount(account)
            }

            sx={{
              mt: .5,
              borderRadius: 2,

              transition:
                "all .25s ease",

              "&:hover": {
                background:
                  "rgba(212,166,58,.08)",
                transform:
                  "translateX(4px)",
              },
            }}
          >

            <ListItemIcon>

              <UserAvatar
                src={
                  account.user.photo
                }

                sx={{
                  width: 38,
                  height: 38,

                  border:
                    "2px solid",

                  borderColor:
                    "primary.main",

                  fontWeight: 700,
                }}
              >
                {
                  account.user.name?.[0]
                }
              </UserAvatar>

            </ListItemIcon>



            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 700 }}>
                  {account.user.name}
                </Typography>
              }

              secondary={
                <Typography sx={{ fontSize: 12 }}>
                  {`@${account.user.username}`}
                </Typography>
              }
            />



          </MenuItem>

        )
      )}

    </Box>
  );
}