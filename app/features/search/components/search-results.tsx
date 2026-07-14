"use client";

import {
  SearchOffRounded,
  ExploreRounded,
} from "@mui/icons-material";

import {
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { SuggestedUserCard } from "@/features/users/components/suggested-user-card";
import { GlassCard } from "@/components/common/glass-card";

type Props = {
  users: any[];
  query: string;
};

export function SearchResults({
  users,
  query,
}: Props) {


  if (!query.trim()) {
    return (
      <GlassCard
        sx={{
          p:5,
          minHeight:220,
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          textAlign:"center",
        }}
      >

        <Stack
          spacing={2}
          sx={{alignItems:"center"}}
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

            <ExploreRounded
              sx={{
                fontSize:38,
              }}
            />

          </Box>


          <Typography
            variant="h5"
            sx={{
              fontWeight:900,
              letterSpacing:-0.3,
            }}
          >
            Discover People
          </Typography>


          <Typography
            color="text.secondary"
            sx={{
              maxWidth:420,
              fontSize:15,
              fontWeight:500,
              lineHeight:1.6,
            }}
          >
            Explore the PineUp community and find people you want to follow.
          </Typography>


        </Stack>


      </GlassCard>
    );
  }



  if (!users.length) {
    return (
      <GlassCard
        sx={{
          p:5,
          minHeight:220,
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          textAlign:"center",
        }}
      >

        <Stack
          spacing={2}
          sx={{alignItems:"center"}}
        >

          <Box
            sx={{
              width:72,
              height:72,
              borderRadius:3,
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              bgcolor:"action.hover",
              color:"text.secondary",
            }}
          >

            <SearchOffRounded
              sx={{
                fontSize:38,
              }}
            />

          </Box>


          <Typography
            variant="h5"
            sx={{
              fontWeight:900,
            }}
          >
            No Results Found
          </Typography>


          <Typography
            color="text.secondary"
            sx={{
              maxWidth:380,
              fontSize:15,
              fontWeight:500,
              lineHeight:1.6,
            }}
          >
            We couldn't find anyone matching "{query}".
            Try searching with another name or username.
          </Typography>


        </Stack>


      </GlassCard>
    );
  }



  return (
    <GlassCard
      sx={{
        p:0,
        overflow:"hidden",
      }}
    >

      <Stack divider={<Divider />}>

        {users.map((user)=>(
          <SuggestedUserCard
            key={user._id}
            user={user}
          />
        ))}

      </Stack>

    </GlassCard>
  );
}