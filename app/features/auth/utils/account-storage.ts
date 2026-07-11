import type { User } from "../types/auth.types";

const ACCOUNTS_KEY = "pineup_accounts";

export type StoredAccount = {
  token: string;
  user: User;
};

export function getStoredAccounts(): StoredAccount[] {
  if (typeof window === "undefined") {
    return [];
  }

  const accounts = localStorage.getItem(
    ACCOUNTS_KEY
  );

  if (!accounts) {
    return [];
  }

  try {
    return JSON.parse(accounts);
  } catch {
    return [];
  }
}


export function saveAccount(
  account: StoredAccount
) {
  const accounts = getStoredAccounts();

  const filtered = accounts.filter(
    (item) =>
      item.user._id !== account.user._id
  );

  const updated = [
    account,
    ...filtered,
  ];

  localStorage.setItem(
    ACCOUNTS_KEY,
    JSON.stringify(updated)
  );
}


export function removeAccount(
  id: string
) {
  const accounts = getStoredAccounts();

  localStorage.setItem(
    ACCOUNTS_KEY,
    JSON.stringify(
      accounts.filter(
        (item) =>
          item.user._id !== id
      )
    )
  );
}


export function clearAccounts() {
  localStorage.removeItem(
    ACCOUNTS_KEY
  );
}