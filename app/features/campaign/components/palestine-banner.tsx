"use client";

import {
  Box,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";
import { PalestineDialog } from "./palestine-dialog";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

export function PalestineBanner() {
    const [open, setOpen] = useState(false);
  return (
    <Box
      sx={{
        mb: 2,

        p: 2.5,

        borderRadius: 2,

        position: "relative",
        overflow: "hidden",

        border: "1px solid",
        borderColor: "divider",

        bgcolor: "background.paper",

        cursor: "pointer",

        transition: "all 0.25s ease",

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 3,
        },

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,

          background:
            "linear-gradient(135deg, rgba(22,101,52,0.12), rgba(0,0,0,0), rgba(220,38,38,0.08))",

          pointerEvents: "none",
        },
      }}
    >
      <Stack
        component="div"
        direction="row"
        spacing={2}
        sx={{
          position: "relative",
          zIndex: 1,
          alignItems:"center",
        }}
      >
        <Box
          sx={{
            width: 52,
            height: 52,

            borderRadius: "50%",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            bgcolor: "success.main",
            color: "common.white",

            flexShrink: 0,
          }}
        >
          <FlagRoundedIcon
            sx={{
              fontSize: 30,
            }}
          />
        </Box>


        <Box
          sx={{
            flex: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              color: "success.main",
              letterSpacing: 0.5,
            }}
          >
            COMMUNITY CAMPAIGN
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              lineHeight: 1.2,
              mt: 0.3,
            }}
          >
            Save Palestine 🇵🇸
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
            }}
          >
            Stand with humanity. Share awareness and support.
          </Typography>

          <Button
            size="small"
            endIcon={<ArrowForwardRoundedIcon />}
            onClick={() => setOpen(true)}
            sx={{
              mt: 1,

              px: 0,

              fontWeight: 700,

              "&:hover": {
                bgcolor: "transparent",
              },
            }}
          >
            Learn more
          </Button>
        </Box>
      </Stack>
<PalestineDialog
 open={open}
 onClose={() => setOpen(false)}
/>
    </Box>
  );
}