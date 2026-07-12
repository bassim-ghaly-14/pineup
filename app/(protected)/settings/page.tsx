"use client";

import {
  SettingsRounded,
} from "@mui/icons-material";

import {
  Box,
  Stack,
  Typography,
} from "@mui/material";

import { GlassCard } from "@/components/common/glass-card";

import { ProfilePhotoCard } from "@/features/auth/components/profile-photo-card";
import { ChangePasswordCard } from "@/features/auth/components/change-password-card";


export default function SettingsPage() {
  return (
    <Stack spacing={3}>

      <GlassCard
        sx={{
          p:4,
          position:"relative",
          overflow:"hidden",
        }}
      >

        <Box
          sx={{
            position:"absolute",
            width:180,
            height:180,
            borderRadius:"50%",
            bgcolor:"primary.main",
            opacity:0.08,
            top:-60,
            right:-60,
          }}
        />


        <Stack
          direction={{
            xs:"column",
            sm:"row",
          }}
          spacing={3}
          sx={{
            alignItems:{
              xs:"flex-start",
              sm:"center",
            },
          }}
        >

          <Box
            sx={{
              width:72,
              height:72,
              borderRadius:3,

              display:"flex",
              alignItems:"center",
              justifyContent:"center",

              bgcolor:"primary.main",

              color:"primary.contrastText",

              boxShadow:3,
            }}
          >

            <SettingsRounded
              sx={{
                fontSize:40,
              }}
            />

          </Box>



          <Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight:900,
                letterSpacing:-0.5,
              }}
            >
              Settings
            </Typography>


            <Typography
              color="text.secondary"
              sx={{
                mt:0.5,
              }}
            >
              Manage your profile, security and account preferences.
            </Typography>


          </Box>


        </Stack>


      </GlassCard>



      <GlassCard
        sx={{
          p:3,
        }}
      >

        <ProfilePhotoCard />

      </GlassCard>



      <GlassCard
        sx={{
          p:3,
        }}
      >

        <ChangePasswordCard />

      </GlassCard>


    </Stack>
  );
}