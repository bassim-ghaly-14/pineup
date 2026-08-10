"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getStoredAccounts,
  removeAccount,
} from "src/features/auth/utils/account-storage";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  CurrentAccountCard,
} from "src/features/auth/components/current-account-card";
import { ConfirmDialog } from "src/components/common/confirm-dialog";

import { ROUTES } from "src/constants/routes";
import { STORAGE_KEYS } from "src/constants/storage-keys";
import { useAppTheme } from "src/components/providers/theme-provider";

import {
  AccountSwitcher,
} from "src/features/auth/components/account-switcher";


type Props = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
};


export function UserMenu({
  anchorEl,
  onClose,
}: Props) {

  const open = Boolean(anchorEl);


  const [
    confirmOpen,
    setConfirmOpen,
  ] = useState(false);


  const {
    mode,
    toggleTheme,
  } = useAppTheme();


  const router = useRouter();



  const navigate = (
    href: string
  ) => {

    onClose();

    requestAnimationFrame(() => {
      router.push(href);
    });

  };



  const openLogoutDialog = () => {
    onClose();
    setConfirmOpen(true);
  };



const handleLogout = () => {
  setConfirmOpen(false);
  const currentUser = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.USER) || "null"
  );

  if (!currentUser) {
    window.location.href = ROUTES.LOGIN;
    return;
  }

  removeAccount(currentUser._id);

  const accounts = getStoredAccounts();

  if (accounts.length > 0) {
    const nextAccount = accounts[0];

    localStorage.setItem(
      STORAGE_KEYS.TOKEN,
      nextAccount.token
    );

    localStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify(nextAccount.user)
    );

    document.cookie =
      `pineup_token=${nextAccount.token}; Path=/; Max-Age=2592000; SameSite=Lax;`;

    window.dispatchEvent(
      new Event("auth-change")
    );
    router.replace(
      ROUTES.FEED
    );

    return;
  }

  localStorage.removeItem(
    STORAGE_KEYS.TOKEN
  );

  localStorage.removeItem(
    STORAGE_KEYS.USER
  );

  document.cookie =
    "pineup_token=; Path=/; Max-Age=0";

  window.location.href =
    ROUTES.LOGIN;
};



  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        disableAutoFocusItem
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 320,
              maxWidth: 340,
              borderRadius: 3,
              p:1,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              backdropFilter: "blur(24px)",
              boxShadow: "0 24px 60px rgba(0,0,0,.38)",
              overflow: "hidden",
            },
          },
        }}
      >
<>
  <CurrentAccountCard
    onClose={onClose}/>
  </>
<>
  <AccountSwitcher
    onClose={onClose}
  />
</>
<Divider sx={{ my: 1 }} />
<MenuItem
  onClick={() =>
    navigate(
      `${ROUTES.LOGIN}?addAccount=true`
    )
  }
  sx={{
    my: 1,
    borderRadius: 3,
    bgcolor: "primary.main",
    color: "primary.contrastText",
    fontWeight: 700,
    transition: ".25s",

    "&:hover": {
      bgcolor: "primary.light",
      transform: "translateY(-1px)",
    },
  }}
>
  <ListItemIcon
    sx={{
      color: "primary.contrastText",
      minWidth: 38,
    }}
  >
    <AddRoundedIcon />
  </ListItemIcon>

  <ListItemText
    primary="Add another account"
    secondary="Sign in without logging out"
    sx={{
      '& .MuiListItemText-secondary': {
        color: 'rgba(0,0,0,.65)',
      },
    }}
  />
</MenuItem>

        <MenuItem
          onClick={() =>
            navigate(
              ROUTES.SETTINGS
            )
          }
          sx={{
            borderRadius: 2,
          }}
        >

          <ListItemIcon>
            <SettingsRoundedIcon />
          </ListItemIcon>

          <ListItemText
            primary="Settings"
          />

        </MenuItem>




        <MenuItem
          onClick={
            toggleTheme
          }
          sx={{
            borderRadius: 2,
          }}
        >

          <ListItemIcon>

            {mode === "dark" ? (
              <LightModeRoundedIcon />
            ) : (
              <DarkModeRoundedIcon />
            )}

          </ListItemIcon>


          <ListItemText
            primary={
              mode === "dark"
                ? "Light mode"
                : "Dark mode"
            }
          />

        </MenuItem>

<Divider sx={{ my: 1 }} />

        <MenuItem
          onClick={
            openLogoutDialog
          }

          sx={{
            color: "error.main",
          }}
        >

          <ListItemIcon>
            <LogoutRoundedIcon
              color="error"
            />
          </ListItemIcon>


          <ListItemText
            primary="Sign out"
          />

        </MenuItem>


      </Menu>



      <ConfirmDialog
        open={confirmOpen}
        title="Sign out of PineUp?"
        description="You'll need to sign in again to access your account."
        confirmText="Sign out"
        cancelText="Stay signed in"

        onClose={() =>
          setConfirmOpen(false)
        }

        onConfirm={
          handleLogout
        }
      />

    </>
  );
}