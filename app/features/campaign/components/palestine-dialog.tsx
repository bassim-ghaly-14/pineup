"use client";

import {
  Dialog,
  DialogContent,
  Stack,
  Typography,
  Button,
  Chip,
} from "@mui/material";

import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";


type Props = {
  open: boolean;
  onClose: () => void;
};
const handleShare = async () => {
  const shareData = {
    title: "Save Palestine 🇵🇸",
    text:
      "Stand with humanity. Share awareness and support peace.\n\n#SavePalestine #HumanityFirst",
    url: window.location.origin + "/support-palestine",
  };


  if (navigator.share) {
    await navigator.share(shareData);
  } else {
    await navigator.clipboard.writeText(
      `${shareData.text}\n\n${shareData.url}`
    );
  }
};

export function PalestineDialog({
  open,
  onClose,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            p: 1,
          },
        },
      }}
    >
      <DialogContent>
        <Stack sx={{
            alignItems:"center",
            textAlign:"center"
        }}
          spacing={2.5}
          
        >

          <FlagRoundedIcon
            sx={{
              fontSize: 55,
              color: "success.main",
            }}
          />


          <Typography sx={{fontWeight:800}}
            variant="h5"
          >
            Save Palestine 🇵🇸
          </Typography>


          <Typography
            color="text.secondary"
          >
            PineUp stands with humanity.
            Share awareness and support a voice
            for peace and dignity.
          </Typography>


          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Chip label="#SavePalestine" />
            <Chip label="#HumanityFirst" />
            <Chip label="#StandWithPalestine" />
          </Stack>


          <Button
            fullWidth
            variant="contained"
            startIcon={<ShareRoundedIcon />}
            onClick={handleShare}
          >
            Share awareness
          </Button>

        </Stack>
      </DialogContent>
    </Dialog>
  );
}