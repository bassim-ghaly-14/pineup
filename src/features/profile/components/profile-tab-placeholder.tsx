"use client";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";

import { EmptyState } from "src/components/common/empty-state";

type Props = {
  type: "about" | "media";
};

export function ProfileTabPlaceholder({ type }: Props) {
  const isAbout = type === "about";

  return (
    <EmptyState
      {...({
        icon: isAbout ? (
          <PersonRoundedIcon
            sx={{
              fontSize: 72,
            }}
          />
        ) : (
          <PhotoLibraryRoundedIcon
            sx={{
              fontSize: 72,
            }}
          />
        ),

        title: isAbout ? "About" : "Media",

        description: isAbout
          ? "We're working on bringing more profile information to PineUp. This section will be available in a future update."
          : "Photos and media posts will appear here as soon as this feature is available.",

        badge: "COMING SOON",
      } as any)}
    />
  );
}
