"use client";

import { use } from "react";

import { Loader } from "@/components/common/loader";
import { EmptyState } from "@/components/common/empty-state";

import { FollowUsersPage } from "@/features/profile/components/follow-users-page";

import { useProfile } from "@/features/users/hooks/use-profile";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function FollowersPage({
  params,
}: Props) {
  const { id } = use(params);

  const {
    data,
    isPending,
  } = useProfile(id);

  if (isPending) {
    return <Loader />;
  }

  if (!data?.user) {
    return (
      <EmptyState
        title="User not found"
      />
    );
  }

  return (
    <FollowUsersPage
      title="Followers"
      users={data.user.followers}
    />
  );
}