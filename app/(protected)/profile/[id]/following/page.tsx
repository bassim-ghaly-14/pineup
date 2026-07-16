"use client";

import { use } from "react";

import { Loader } from "src/components/common/loader";
import { EmptyState } from "src/components/common/empty-state";

import { FollowUsersPage } from "src/features/profile/components/follow-users-page";

import { useProfile } from "src/features/users/hooks/use-profile";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function FollowingPage({
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
      title="Following"
      users={data.user.following}
    />
  );
}