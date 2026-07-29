"use client";

import { Tabs, Tab } from "@mui/material";

import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";

type Props = {
  value: number;
  onChange: (event: React.SyntheticEvent, value: number) => void;
};

export function ProfileTabs({ value, onChange }: Props) {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      variant="fullWidth"
      sx={{
        mb: 3,

        borderBottom: "1px solid",
        borderColor: "divider",

        "& .MuiTab-root": {
          minHeight: 64,

          textTransform: "none",

          fontSize: 15,
          fontWeight: 600,

          gap: 1,

          transition: "all .2s ease",
        },

        "& .MuiTab-root:hover": {
          color: "primary.main",
        },

        "& .Mui-selected": {
          color: "primary.main",
        },

        "& .MuiTabs-indicator": {
          height: 3,
          borderRadius: "999px 999px 0 0",
        },
      }}>
      <Tab icon={<ArticleRoundedIcon />} iconPosition="start" label="Posts" />

      <Tab icon={<BadgeRoundedIcon />} iconPosition="start" label="About" />

      <Tab
        icon={<PhotoLibraryRoundedIcon />}
        iconPosition="start"
        label="Media"
      />
    </Tabs>
  );
}
