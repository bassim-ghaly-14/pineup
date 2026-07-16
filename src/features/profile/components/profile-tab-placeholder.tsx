"use client";

import {
  Paper,
  Stack,
  Typography,
  Box,
} from "@mui/material";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";

type Props = {
  type: "about" | "media";
};

export function ProfileTabPlaceholder({
  type,
}: Props) {
  const isAbout = type === "about";

  return (
    <Paper
      elevation={2}
      sx={{
        border: 1,
        borderColor: "divider",
        py: 8,
        px: 3,
      }}
    >
      <Stack sx={{alignItems:"center"}}
        spacing={3}
      >
        <Box
          sx={{
            width: 84,
            height: 84,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "action.hover",
            border: 1,
            borderColor: "divider",
          }}
        >
          {isAbout ? (
            <PersonRoundedIcon
              sx={{
                fontSize: 40,
                color: "primary.main",
              }}
            />
          ) : (
            <PhotoLibraryRoundedIcon
              sx={{
                fontSize: 40,
                color: "primary.main",
              }}
            />
          )}
        </Box>

        <Stack sx={{alignItems:"center"}}
          spacing={1}
        >
          <Typography variant="h5">
            {isAbout ? "About" : "Media"}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            
            sx={{
                textAlign:"center",
                maxWidth: 460,
            }}
          >
            {isAbout
              ? "We're working on bringing more profile information to PineUp. This section will be available in a future update."
              : "Photos and media posts will appear here as soon as this feature is available."}
          </Typography>
        </Stack>

        <Typography
          variant="caption"
          sx={{
            px: 2,
            py: .75,
            borderRadius: 10,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            fontWeight: 700,
            letterSpacing: ".04em",
          }}
        >
          COMING SOON
        </Typography>
      </Stack>
    </Paper>
  );
}