"use client";

import { Tab, Tabs } from "@mui/material";

type Props = {
  value: "following" | "explore";
  onChange: (
    value: "following" | "explore"
  ) => void;
};

export function FeedTabs({
  value,
  onChange,
}: Props) {
  return (
    <Tabs
      value={value}
      onChange={(_, newValue) =>
        onChange(newValue)
      }
      sx={{
        mb: 1,

        "& .MuiTabs-indicator": {
          height: 3,
          borderRadius: 999,
        },

        "& .MuiTab-root": {
          textTransform: "none",
          fontWeight: 700,
          fontSize: 15,
          minHeight: 48,
          transition: ".2s",

          "&.Mui-selected": {
            color: "primary.main",
          },
        },
      }}
    >
      <Tab
        value="following"
        label="Following"
      />

      <Tab
        value="explore"
        label="Explore"
      />
    </Tabs>
  );
}