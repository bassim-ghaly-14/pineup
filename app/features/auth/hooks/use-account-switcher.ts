"use client";


import {
  useQueryClient,
} from "@tanstack/react-query";


import {
  useRouter,
} from "next/navigation";


import {
  getStoredAccounts,
  saveAccount,
  type StoredAccount,
} from "../utils/account-storage";


import {
  STORAGE_KEYS,
} from "@/constants/storage-keys";


import {
  queryKeys,
} from "@/constants/query-keys";


import {
  ROUTES,
} from "@/constants/routes";



export function useAccountSwitcher(
  onClose?:()=>void
) {


  const router =
    useRouter();


  const queryClient =
    useQueryClient();



  const switchAccount = (
    account: StoredAccount
  ) => {


    onClose?.();



    localStorage.setItem(
      STORAGE_KEYS.TOKEN,
      account.token
    );


    localStorage.setItem(
      STORAGE_KEYS.USER,
      JSON.stringify(
        account.user
      )
    );



    document.cookie =
      `pineup_token=${account.token}; Path=/; Max-Age=2592000; SameSite=Lax;`;



    window.dispatchEvent(
      new Event("auth-change")
    );



    queryClient.clear();



    queryClient.setQueryData(
      queryKeys.auth.profile(),
      {
        user:
          account.user,
      }
    );



    router.replace(
      ROUTES.FEED
    );

  };




  const saveCurrentAccount = (
    account: StoredAccount
  ) => {

    saveAccount(
      account
    );

  };



  return {

    accounts:
      getStoredAccounts(),


    switchAccount,


    saveCurrentAccount,

  };

}