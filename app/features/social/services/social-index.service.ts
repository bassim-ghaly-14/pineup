import {
  IndexedUser,
  IndexableUser,
} from "../types/social.types";
const STORAGE_KEY = "pineup_social_index";

class SocialIndexService {
  private users = new Map<string, IndexedUser>();
  private listeners = new Set<() => void>();
  constructor() {
    this.load();
  }

  private load() {
    if (typeof window === "undefined") return;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) return;

      const parsed: IndexedUser[] = JSON.parse(raw);

      parsed.forEach((user) => {
        this.users.set(user._id, user);
      });
    } catch {}
  }

  private save() {
    if (typeof window === "undefined") return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...this.users.values()])
    );
    this.listeners.forEach(
      (listener) => listener()
    );
  }

  addUsers(
    users: IndexableUser[],
    source: IndexedUser["source"]
  ) {
    users.forEach((user) => {
      const old = this.users.get(user._id);

this.users.set(user._id, {
  ...old,

  _id: user._id,

  name: user.name,

  username: user.username,

  photo:
    user.photo ?? old?.photo,

  cover:
    user.cover ?? old?.cover,

  bio:
    user.bio ?? old?.bio,

  isFollowing:
    user.isFollowing ??
    old?.isFollowing,

  followersCount:
    user.followersCount ??
    old?.followersCount,

  followingCount:
    user.followingCount ??
    old?.followingCount,

  lastSeen: Date.now(),

  score:
    (old?.score ?? 0) + 1,

  source,
});
    });

    this.save();
  }

  getUsers() {
    return [...this.users.values()];
  }
  getUser(id: string) {
    return this.users.get(id);
  }
subscribe(listener: () => void) {
  this.listeners.add(listener);

  return () => {
    this.listeners.delete(listener);
  };
}
clear() {
  this.users.clear();

  if (typeof window !== "undefined") {
    localStorage.removeItem(
      STORAGE_KEY
    );
  }
  this.listeners.forEach(
    (listener) => listener()
  );
}
}

export const socialIndex =
  new SocialIndexService();