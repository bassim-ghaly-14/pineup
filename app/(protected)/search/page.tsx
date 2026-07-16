"use client";

import {
  SearchRounded,
} from "@mui/icons-material";
import { useState } from "react";
import { useUserSearch } from "src/features/social/hooks/use-user-search";
import { SearchResults } from "src/features/search/components/search-results";
import {
  Box,
  Stack,
  Typography,
} from "@mui/material";

import { GlassCard } from "src/components/common/glass-card";
import { SearchInput } from "src/components/common/search-input";

export default function SearchPage() {
const [query,setQuery] = useState("");

const results = useUserSearch(query);
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
            alignItems: {
              xs: "flex-start",
              sm: "center",
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

            <SearchRounded
              sx={{
                fontSize:40,
              }}
            />

          </Box>


          <Box sx={{ flex: 1 }}>

            <Typography
              variant="h4"
              sx={{
                fontWeight:900,
                letterSpacing:-0.5,
              }}
            >
              Search PineUp
            </Typography>


            <Typography
              color="text.secondary"
              sx={{
                mt:.5,
                mb:2,
              }}
            >
              Find people and discover new accounts.
            </Typography>


<SearchInput
  value={query}
  onChange={(e)=>setQuery(e.target.value)}
/>

          </Box>


        </Stack>


      </GlassCard>
<SearchResults
  users={results}
  query={query}
/>

    </Stack>
  );
}