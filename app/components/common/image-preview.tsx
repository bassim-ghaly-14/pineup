"use client";

import { useState } from "react";
import { Box } from "@mui/material";

import { ImagePreviewModal } from "./image-preview-modal";

type Props = {
  src: string;
  alt?: string;
  children: React.ReactNode;
};

export function ImagePreview({
  src,
  alt = "image",
  children,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        sx={{
  cursor: "pointer",

  "&:hover": {
    opacity: 0.9,
  },

  transition: "opacity .25s ease",
}}
      >
        {children}
      </Box>


      <ImagePreviewModal
        open={open}
        onClose={() => setOpen(false)}
        src={src}
        alt={alt}
      />
    </>
  );
}