"use client";

import {
  Box,
  Tab,
  Tabs,
} from "@mui/material";

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
    <Box
      sx={{
        display: "flex",

        width: "fit-content",

        p: 0.5,

        borderRadius: 3,

        bgcolor: "action.hover",

        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Tabs
        value={value}
        onChange={(_, newValue) =>
          onChange(newValue)
        }
        sx={{
          minHeight: 0,

          "& .MuiTabs-indicator": {
            display: "none",
          },

          "& .MuiTabs-flexContainer": {
            gap: 0.5,
          },

          "& .MuiTab-root": {
            minHeight: 40,

            px: 3,

            borderRadius: 2,

            textTransform: "none",

            fontWeight: 700,

            fontSize: 14,

            color: "text.secondary",

            transition:
              "all .25s ease",

            "&:hover": {
              bgcolor: "action.selected",
            },

            "&.Mui-selected": {
              color:
                "primary.contrastText",

              bgcolor:
                "primary.main",

              boxShadow: 1,
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
    </Box>
  );
}