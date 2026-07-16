"use client";

import {
  NotificationsRounded,
} from "@mui/icons-material";

import {
  Box,
  Stack,
  Typography,
} from "@mui/material";

import { NotificationList } from "@/features/notifications/components/notifications-list";

import { GlassCard } from "@/components/common/glass-card";

import { useNotifications } from "@/features/notifications/hooks/use-notifications";


export default function NotificationsPage() {

  const {
    data = [],
    isPending,
  } = useNotifications();
if (isPending) {
  return null;
}

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

            <NotificationsRounded
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
              Notifications
            </Typography>


            <Typography
              color="text.secondary"
              sx={{
                mt:0.5,
              }}
            >
              Stay updated with activity around your account.
            </Typography>


            <Typography
              sx={{
                mt:1.5,
                fontWeight:700,
                color:"primary.main",
              }}
            >
              {data.length} notifications
            </Typography>

          </Box>


        </Stack>


      </GlassCard>



      <GlassCard
        sx={{
          p:0,
          overflow:"hidden",
        }}
      >

        <NotificationList />

      </GlassCard>


    </Stack>
  );
}