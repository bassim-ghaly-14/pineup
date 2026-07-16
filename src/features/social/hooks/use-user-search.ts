"use client";

import { useMemo } from "react";
import Fuse from "fuse.js";

import { useSocialIndex } from "./use-social-index";


export function useUserSearch(query: string) {

  const users = useSocialIndex();


  const fuse = useMemo(() => {

    return new Fuse(users, {
      keys: [
        "name",
        "username",
      ],

      threshold: 0.35,

      includeScore: true,
    });

  }, [users]);


  const results = useMemo(() => {

    if (!query.trim()) {
      return [];
    }


    return fuse
      .search(query)
      .map((item) => item.item);

  }, [
    query,
    fuse,
  ]);


  return results;
}