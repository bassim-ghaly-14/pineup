"use client";

import {
  Stack,
  Typography,
  Divider,
  Box,
  Button,
} from "@mui/material";

import { GlassCard } from "@/components/common/glass-card";
import { UserAvatar } from "@/components/common/user-avatar";

import { useSuggestions } from "@/features/users/hooks/use-suggestions";
import { useFollowUser } from "@/features/users/hooks/use-follow-user";

export function RightSidebar() {
  const {
    data = [],
    isLoading,
  } = useSuggestions();

  const {
    mutate: follow,
    isPending,
  } = useFollowUser();


  return (
    <Stack spacing={3}>

      <GlassCard sx={{ p:3 }}>
        <Typography
          sx={{
            fontWeight:700,
            mb:2,
          }}
        >
          Trending
        </Typography>

        <Stack spacing={1.5}>
          <Typography color="text.secondary">
            #Technology
          </Typography>

          <Typography color="text.secondary">
            #Design
          </Typography>

          <Typography color="text.secondary">
            #ArtificialIntelligence
          </Typography>
        </Stack>
      </GlassCard>


      <GlassCard sx={{p:3}}>

        <Typography
          sx={{
            fontWeight:700,
            mb:2,
          }}
        >
          Who to follow
        </Typography>


        {isLoading ? (
          <Typography color="text.secondary">
            Loading...
          </Typography>
        ) : (

        <Stack
          spacing={2}
          divider={<Divider />}
        >

          {data.map((user) => (

            <Box
              key={user._id}
              sx={{
                display:"flex",
                alignItems:"center",
                gap:2,
              }}
            >

              <UserAvatar
                src={user.photo}
                userId={user._id}
              />


              <Stack
                spacing={0}
                sx={{
                  flex:1,
                }}
              >

                <Typography
                  sx={{
                    fontWeight:600,
                  }}
                >
                  {user.name}
                </Typography>


                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  @{user.username}
                </Typography>


                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {user.followersCount} followers
                </Typography>

              </Stack>


              <Button
                size="small"
                variant="contained"
                disabled={isPending}
                onClick={() =>
                  follow(user._id)
                }
              >
                Follow
              </Button>


            </Box>

          ))}

        </Stack>

        )}

      </GlassCard>

    </Stack>
  );
}