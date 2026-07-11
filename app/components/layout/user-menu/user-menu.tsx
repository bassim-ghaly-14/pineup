"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  CurrentAccountCard,
} from "@/features/auth/components/current-account-card";
import { ConfirmDialog } from "@/components/common/confirm-dialog";

import { ROUTES } from "@/constants/routes";
import { STORAGE_KEYS } from "@/constants/storage-keys";
import { useAppTheme } from "@/components/providers/theme-provider";

import {
  AccountSwitcher,
} from "@/features/auth/components/account-switcher";


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

    localStorage.removeItem(
      STORAGE_KEYS.TOKEN
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
              minWidth: 290,
              borderRadius: 3,
              p:1,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              backdropFilter: "blur(24px)",
              boxShadow: "1px solid rgba(255,255,255,.08)",
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

        <MenuItem
          onClick={() =>
            navigate(
              ROUTES.SETTINGS
            )
          }
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



        <MenuItem
          onClick={() =>
navigate(
  `${ROUTES.LOGIN}?addAccount=true`
)
          }
        >

          <ListItemIcon>
            <AddRoundedIcon />
          </ListItemIcon>


          <ListItemText
            primary="Add account"
          />

        </MenuItem>



        <Divider />



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