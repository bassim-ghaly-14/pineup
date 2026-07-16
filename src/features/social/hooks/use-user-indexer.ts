"use client";

import { useEffect } from "react";

import { socialIndex } from "../services/social-index.service";
import { extractUsersFromPosts } from "../utils/extract-users";
import {
  IndexableUser,
  IndexedUser,
} from "../types/social.types";

interface UseUserIndexerProps {
  users?: IndexableUser[];

  posts?: any[];

  source: IndexedUser["source"];
}

export function useUserIndexer({
  users,
  posts,
  source,
}: UseUserIndexerProps) {

  useEffect(() => {

    if (users?.length) {
      socialIndex.addUsers(
        users,
        source
      );
    }


    if (posts?.length) {

      const extractedUsers =
        extractUsersFromPosts(posts);


      if (extractedUsers.length) {
        socialIndex.addUsers(
          extractedUsers,
          source
        );
      }
    }

  }, [
    users,
    posts,
    source,
  ]);
}