"use client";

import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";

import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import {
  useAccountSwitcher,
} from "../hooks/use-account-switcher";

import {
  STORAGE_KEYS,
} from "@/constants/storage-keys";

import { UserAvatar } from "@/components/common/user-avatar";
import { isVerified } from "@/utils/is-verified";
import { VerifiedBadge } from "@/components/common/verified-badge";

type Props = {
  onClose?: () => void;
};

export function AccountSwitcher({
  onClose,
}: Props) {

  const {
    accounts,
    switchAccount,
  } = useAccountSwitcher(onClose);

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 1,
          mb: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: "text.secondary",
          }}
        >
          Other accounts
        </Typography>

        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            px: 1.3,
            py: .45,
            borderRadius: 999,
            bgcolor: "primary.main",
            color: "#111",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: ".08em",
            textTransform: "uppercase",
          }}
        >
          Switch
        </Box>
      </Box>

      {availableAccounts.map((account) => (
        <MenuItem
          key={`switch-${account.user._id}`}
          onClick={() =>
            switchAccount(account)
          }
          sx={{
            mt: .75,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            background:
              "linear-gradient(135deg, rgba(255,255,255,.02), transparent)",
            transition: ".25s ease",

            "&:hover": {
              borderColor: "primary.main",
              background:
                "linear-gradient(135deg, rgba(212,166,58,.12), transparent)",
              transform: "translateX(4px)",
              boxShadow:
                "0 10px 24px rgba(212,166,58,.14)",
            },
          }}
        >
          <ListItemIcon>
            <UserAvatar
              src={account.user.photo}
              sx={{
                width: 44,
                height: 44,
                border: "2px solid",
                borderColor: "primary.main",
                fontWeight: 700,
              }}
            >
              {account.user.name?.[0]}
            </UserAvatar>
          </ListItemIcon>

          <ListItemText
            sx={{
              paddingLeft: 1,
            }}
            primary={
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 0.5,
    }}
  >
    <Typography
      sx={{
        fontWeight: 700,
        fontSize: 15,
      }}
    >
      {account.user.name}
    </Typography>

    {isVerified(account.user._id) && (
      <VerifiedBadge size={16} />
    )}
  </Box>
}
            secondary={
              <Typography
                variant="caption"
                color="text.secondary"
              >
                @{account.user.username} • Tap to switch
              </Typography>
            }
          />

          <ChevronRightRoundedIcon
            sx={{
              color: "text.secondary",
              fontSize: 20,
            }}
          />
        </MenuItem>
      ))}
    </Box>
  );
}