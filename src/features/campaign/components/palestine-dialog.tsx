"use client";

import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";

type Props = {
  open: boolean;
  onClose: () => void;
};

const HASHTAGS = [
  "#SavePalestine",
  "#HumanityFirst",
  "#StandWithPalestine",
  "#PeaceForPalestine",
  "#HumanRights",
] as const;

type Feedback = "idle" | "copied" | "error";

function getShareData() {
  return {
    title: "Save Palestine 🇵🇸",
    text: [
      "Stand with humanity. Share awareness and support peace.",
      "",
      HASHTAGS.join(" "),
    ].join("\n"),
    url: `${window.location.origin}/support-palestine`,
  };
}

export function PalestineDialog({ open, onClose }: Props) {
  const [feedback, setFeedback] = useState<Feedback>("idle");

  const handleClose = () => {
    setFeedback("idle");
    onClose();
  };

  const handleShare = async () => {
    const shareData = getShareData();

    try {
      if (typeof navigator.share === "function") {
        await navigator.share(shareData);
        setFeedback("idle");
        return;
      }

      if (typeof navigator.clipboard?.writeText === "function") {
        await navigator.clipboard.writeText(
          `${shareData.text}\n\n${shareData.url}`,
        );

        setFeedback("copied");
        return;
      }

      setFeedback("error");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      setFeedback("error");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="palestine-dialog-title"
      aria-describedby="palestine-dialog-description"
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: {
            position: "relative",
            overflow: "hidden",
            borderRadius: 3,
            border: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
            backgroundImage: "none",
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 24px 80px rgba(0,0,0,0.4)"
                : "0 24px 80px rgba(15,23,42,0.12)",
          },
        },
      }}>
      {/* Palestinian-inspired accent */}
      <Box
        aria-hidden="true"
        sx={{
          display: "flex",
          height: 4,
          "& > span": { flex: 1 },
        }}>
        <Box component="span" sx={{ bgcolor: "#CE2939" }} />
        <Box component="span" sx={{ bgcolor: "#181818" }} />
        <Box component="span" sx={{ bgcolor: "#FFFFFF" }} />
        <Box component="span" sx={{ bgcolor: "#16804A" }} />
      </Box>

      <IconButton
        aria-label="Close dialog"
        onClick={handleClose}
        size="small"
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 1,
          color: "text.secondary",
          bgcolor: "action.hover",
          "&:hover": {
            bgcolor: "action.selected",
          },
        }}>
        <CloseRoundedIcon fontSize="small" />
      </IconButton>

      <DialogContent
        sx={{
          px: { xs: 2.5, sm: 3.5 },
          pt: 4,
          pb: 3.5,
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            width: "100%",
          }}>
          {/* Hero */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
              width: "100%",
            }}>
            <Box
              sx={{
                width: 76,
                height: 76,
                display: "grid",
                placeItems: "center",
                borderRadius: 3,
                color: "success.main",
                bgcolor: "action.hover",
                border: 1,
                borderColor: "divider",
              }}>
              <FlagRoundedIcon sx={{ fontSize: 42 }} />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0.75,
              }}>
              <Typography
                id="palestine-dialog-title"
                component="h2"
                variant="h5"
                sx={{
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  textAlign: "center",
                }}>
                Save Palestine 🇵🇸
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "success.main",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}>
                PineUp · Humanity First
              </Typography>
            </Box>

            <Typography
              id="palestine-dialog-description"
              variant="body2"
              color="text.secondary"
              sx={{
                maxWidth: 340,
                textAlign: "center",
                lineHeight: 1.8,
              }}>
              PineUp stands with humanity. Share awareness and support a voice
              for peace and dignity.
            </Typography>
          </Box>

          {/* Hashtags section */}
          <Box
            sx={{
              width: "100%",
              boxSizing: "border-box",
              p: 2,
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "action.hover",
            }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 800,
                mb: 1.5,
              }}>
              Spread the word
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                gap: 1,
              }}>
              {HASHTAGS.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{
                    maxWidth: "100%",
                    height: "auto",
                    minHeight: 32,
                    borderRadius: 1.5,
                    borderColor: "success.main",
                    color: "success.main",
                    bgcolor: "background.paper",
                    "& .MuiChip-label": {
                      display: "block",
                      whiteSpace: "normal",
                      overflowWrap: "anywhere",
                      px: 1.25,
                      py: 0.75,
                      fontSize: 12,
                      fontWeight: 600,
                      lineHeight: 1.4,
                    },
                  }}
                />
              ))}
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                mt: 1.5,
                lineHeight: 1.6,
              }}>
              Together for peace and dignity.
            </Typography>
          </Box>

          {/* Share feedback */}
          {feedback !== "idle" && (
            <Alert
              severity={feedback === "copied" ? "success" : "error"}
              role="status"
              sx={{
                width: "100%",
                boxSizing: "border-box",
                borderRadius: 2,
                alignItems: "center",
                "& .MuiAlert-message": {
                  minWidth: 0,
                  overflowWrap: "anywhere",
                },
              }}>
              {feedback === "copied"
                ? "Share message copied to clipboard."
                : "Unable to share or copy the message. Please try again."}
            </Alert>
          )}

          {/* Primary action */}
          <Box sx={{ width: "100%" }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<ShareRoundedIcon />}
              onClick={handleShare}
              sx={{
                minHeight: 48,
                borderRadius: 2,
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
              }}>
              Share awareness
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
