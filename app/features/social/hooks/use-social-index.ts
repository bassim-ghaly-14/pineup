"use client";

import { useEffect, useState } from "react";

import { socialIndex } from "../services/social-index.service";

export function useSocialIndex() {
  const [users, setUsers] = useState(
    () => socialIndex.getUsers()
  );


  useEffect(() => {
    const unsubscribe =
      socialIndex.subscribe(() => {
        setUsers(
          socialIndex.getUsers()
        );
      });


    return unsubscribe;
  }, []);


  return users;
}