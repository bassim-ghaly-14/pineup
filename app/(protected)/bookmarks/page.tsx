"use client";

import {
  BookmarkRounded,
} from "@mui/icons-material";

import {
  Box,
  Stack,
  Typography,
} from "@mui/material";

import { FeedList } from "@/features/posts/components/feed-list";

import { useBookmarks } from "@/features/users/hooks/use-bookmarks";

import { Loader } from "@/components/common/loader";

import { AppState } from "@/components/common/app-state";

import { GlassCard } from "@/components/common/glass-card";


export default function BookmarksPage() {

  const {
    data = [],
    isLoading,
    isError,
  } = useBookmarks();


  if (isLoading) {
    return <Loader />;
  }


  if (isError) {
    return (
      <AppState
        type="error"
        title="Unable to load bookmarks"
        description="Something went wrong while fetching your saved posts."
      />
    );
  }


  return (
    <Stack spacing={3}>


      {/* Premium Header */}

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


        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            gap: 3,
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
            <BookmarkRounded
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
              Your Bookmarks
            </Typography>


            <Typography
              color="text.secondary"
              sx={{
                mt:0.5,
              }}
            >
              Keep your favorite posts saved and access them anytime.
            </Typography>


            <Typography
              sx={{
                mt:1.5,
                fontWeight:700,
                color:"primary.main",
              }}
            >
              {data.length} saved posts
            </Typography>

          </Box>


        </Box>

      </GlassCard>



      {
        !data.length ? (

          <AppState
            title="No saved posts yet"
            description="When you bookmark a post, it will appear here."
          />

        ) : (

          <FeedList
            posts={data}
          />

        )
      }


    </Stack>
  );
}