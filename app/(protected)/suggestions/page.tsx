"use client";

import {
  PersonAddAltRounded,
} from "@mui/icons-material";

import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { GlassCard } from "src/components/common/glass-card";
import { UserAvatar } from "src/components/common/user-avatar";

import { useSuggestions } from "src/features/users/hooks/use-suggestions";
import { useFollowUser } from "src/features/users/hooks/use-follow-user";
import { useUserIndexer } from "src/features/social/hooks/use-user-indexer";
import { SuggestedUserCard } from "src/features/users/components/suggested-user-card";

export default function SuggestionsPage() {

  const {
    data = [],
    isLoading,
  } = useSuggestions();

  useUserIndexer({
    users: data,
    source: "suggestions",
  });

  const {
    mutate: follow,
    isPending,
  } = useFollowUser();

  return (
    <Stack spacing={3}>

      <GlassCard
        sx={{
          p: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >

        <Box
          sx={{
            position: "absolute",
            width: 180,
            height: 180,
            borderRadius: "50%",
            bgcolor: "primary.main",
            opacity: 0.08,
            top: -60,
            right: -60,
          }}
        />

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={3}
          sx={{
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
          }}
        >

          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "primary.main",
              color: "primary.contrastText",
              boxShadow: 3,
            }}
          >

            <PersonAddAltRounded
              sx={{
                fontSize: 40,
              }}
            />

          </Box>

          <Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                letterSpacing: -0.5,
              }}
            >
              Suggested Accounts
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 0.5,
              }}
            >
              Discover new people to follow and grow your network.
            </Typography>

            <Typography
              sx={{
                mt: 1.5,
                fontWeight: 700,
                color: "primary.main",
              }}
            >
              {data.length} suggestions
            </Typography>

          </Box>

        </Stack>

      </GlassCard>

      <GlassCard
        sx={{
          p: 0,
          overflow: "hidden",
        }}
      >

        {isLoading ? (

          <Typography sx={{ p: 3 }}>
            Loading...
          </Typography>

        ) : (

<Stack divider={<Divider />}>

  {data.map((user) => (

    <SuggestedUserCard
      key={user._id}
      user={user}
    />

  ))}

</Stack>

        )}

      </GlassCard>

    </Stack>
  );
}