"use client";

import {
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";

import { useRouter } from "next/navigation";


type Props = {
  type?: "404" | "error" | "empty";
  title: string;
  description: string;
};


export function AppState({
  type = "empty",
  title,
  description,
}: Props) {

  const router = useRouter();


  const Icon =
    type === "error"
      ? ErrorOutlineRoundedIcon
      : type === "404"
        ? SearchOffRoundedIcon
        : HomeRoundedIcon;



  return (
    <Paper
      elevation={0}
      sx={{
        minHeight: 420,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        borderRadius: 5,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >

      <Stack
        spacing={3}
        sx={{
          alignItems:"center",
          textAlign:"center",
          maxWidth:420,
        }}
      >

        <Icon
          sx={{
            fontSize:72,
            color:
              type === "error"
                ? "error.main"
                : "primary.main",
          }}
        />


        <Typography
          variant="h4"
          sx={{
            fontWeight:800,
          }}
        >
          {title}
        </Typography>


        <Typography
          color="text.secondary"
        >
          {description}
        </Typography>



        <Button
          variant="contained"
          startIcon={
            <HomeRoundedIcon />
          }
          onClick={() =>
            router.push("/feed")
          }
        >
          Back Home
        </Button>


      </Stack>

    </Paper>
  );
}