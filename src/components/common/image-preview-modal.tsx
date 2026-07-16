"use client";

import {
  Box,
  IconButton,
  useTheme,
} from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

import { motion } from "framer-motion";

import { AppDialog } from "./app-dialog";


type Props = {
  open: boolean;
  onClose: () => void;
  src: string;
  alt?: string;
};


export function ImagePreviewModal({
  open,
  onClose,
  src,
  alt = "image",
}: Props) {


  const theme = useTheme();

  const dark =
    theme.palette.mode === "dark";



  const downloadImage = () => {

    try {

      const downloadUrl =
        `/api/download-image?url=${encodeURIComponent(src)}`;


      const link =
        document.createElement("a");


      link.href = downloadUrl;

      link.download =
        "pineup-image.jpg";


      document.body.appendChild(link);

      link.click();

      link.remove();


    } catch {

      console.log("Download failed");

    }

  };



  const glassButton = {

    width: 48,

    height: 48,

    color: dark
      ? "#FFFFFF"
      : theme.palette.text.primary,

    bgcolor: dark
      ? "rgba(255,255,255,.12)"
      : "rgba(255,255,255,.85)",

    border: "1px solid",

    borderColor: dark
      ? "rgba(255,255,255,.15)"
      : "rgba(0,0,0,.08)",

    backdropFilter:
      "blur(14px)",


    transition:
      "all .25s ease",


    "&:hover": {

      bgcolor:
        theme.palette.primary.main,

      color:
        theme.palette.primary.contrastText,

      transform:
        "translateY(-2px)",

    },

  };



  return (

    <AppDialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullScreen

      slotProps={{
        backdrop:{
          sx:{
            bgcolor:
              dark
                ? "rgba(0,0,0,.88)"
                : "rgba(15,17,21,.65)",

            backdropFilter:
              "blur(14px)",
          },
        },
      }}

    >


      <Box
        sx={{

          width:"100%",
          height:"100%",

          display:"flex",

          alignItems:"center",

          justifyContent:"center",

          position:"relative",

          overflow:"hidden",

        }}
      >



        {/* Close Button */}

        <IconButton

          onClick={onClose}

          sx={{

            ...glassButton,

            position:"absolute",

            top:{
              xs:16,
              md:24,
            },

            right:{
              xs:16,
              md:24,
            },

            zIndex:5,

          }}

        >

          <CloseRoundedIcon />

        </IconButton>




        {/* Download Button */}

        <IconButton

          onClick={downloadImage}

          sx={{

            ...glassButton,

            position:"absolute",

            top:{
              xs:16,
              md:24,
            },

            left:{
              xs:16,
              md:24,
            },

            zIndex:5,

          }}

        >

          <DownloadRoundedIcon />

        </IconButton>





        {/* Image */}

        <motion.img

          src={src}

          alt={alt}


          initial={{
            opacity:0,
            scale:.88,
          }}


          animate={{
            opacity:1,
            scale:1,
          }}


          transition={{
            duration:.25,
            ease:"easeOut",
          }}


          style={{

            maxWidth:"92vw",

            maxHeight:"88vh",

            objectFit:"contain",

            borderRadius:"20px",

            userSelect:"none",

            boxShadow:
              dark
                ? "0 30px 80px rgba(0,0,0,.6)"
                : "0 30px 80px rgba(0,0,0,.25)",

          }}

        />


      </Box>


    </AppDialog>

  );
}