"use client";

import {
  Tabs,
  Tab,
} from "@mui/material";

type Props = {
  value: number;
  onChange: (
    event: React.SyntheticEvent,
    value: number
  ) => void;
};

export function ProfileTabs({
  value,
  onChange,
}: Props) {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      sx={{
        mb: 3,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Tab label="Posts" />
      <Tab label="About" />
      <Tab label="Media" />
    </Tabs>
  );
}