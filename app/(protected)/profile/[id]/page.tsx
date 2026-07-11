"use client";

import { use, useState } from "react";
import {
  Box,
  Stack,
} from "@mui/material";

import { Loader } from "@/components/common/loader";
import { EmptyState } from "@/components/common/empty-state";

import { useProfile } from "@/features/users/hooks/use-profile";
import { useUserPosts } from "@/features/users/hooks/use-user-posts";
import { useAuth } from "@/features/auth/hooks/use-auth";

import { ProfileCover } from "@/features/profile/components/profile-cover";
import { ProfileInfo } from "@/features/profile/components/profile-info";
import { ProfileStats } from "@/features/profile/components/profile-stats";
import { ProfileActions } from "@/features/profile/components/profile-actions";
import { ProfileTabs } from "@/features/profile/components/profile-tabs";
import { ProfilePosts } from "@/features/profile/components/profile-posts";

type Props = {
  params: Promise<{
    id:string;
  }>;
};


export default function ProfilePage({
  params,
}:Props){

  const {id}=use(params);

  const [tab,setTab]=useState(0);

  const {
    data,
    isPending,
  } = useProfile(id);


  const {
    data:posts=[]
  } = useUserPosts(id);


  const {
    data: currentUser,
  } = useAuth();


  const user = data?.user;


  const isOwner =
    currentUser?.user?._id === user?._id;



  if(isPending){
    return <Loader />;
  }


  if(!user){
    return (
      <EmptyState
        title="User not found"
      />
    );
  }



  return (
    <Stack spacing={3}>
      <ProfileCover
        cover={user.cover}
        avatar={user.photo}
        name={user.name}
      />

      <Box>
        <Box
          sx={{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center",
          }}
        >

          <ProfileInfo
            name={user.name}
            username={user.username}
            bio={user.bio}
          />


          <ProfileActions
            userId={user._id}
            isFollowing={data.isFollowing}
            isOwner={isOwner}
          />

        </Box>


        <ProfileStats
          userId={user._id}
          followers={user.followersCount}
          following={user.followingCount}
          bookmarks={user.bookmarksCount}
        />

      </Box>


      <ProfileTabs
        value={tab}
        onChange={(_,value)=>setTab(value)}
      />


      {
        tab===0 &&
        <ProfilePosts
          posts={posts}
        />
      }


    </Stack>
  );
}