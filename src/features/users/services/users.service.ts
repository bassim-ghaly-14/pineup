import { api } from "src/services/api/axios";
import { API_ENDPOINTS } from "src/services/api/endpoints";
import { UserProfileResponse } from "src/features/profile/types/profile.types";
import { User } from "../types/user.types";

export const usersService = {
  async getProfile(id: string): Promise<UserProfileResponse> {
    const res = await api.get(API_ENDPOINTS.USERS.PROFILE(id));
    return res.data?.data;
  },

  async getUserPosts(id: string) {
    const res = await api.get(API_ENDPOINTS.USERS.POSTS(id));
    return res.data?.data?.posts ?? [];
  },

  async getSuggestions(): Promise<User[]> {
    const res = await api.get(API_ENDPOINTS.USERS.SUGGESTIONS);
    return res.data?.data?.suggestions ?? [];
  },

  async getBookmarks() {
    const res = await api.get(API_ENDPOINTS.USERS.BOOKMARKS);
    return res.data?.data?.bookmarks ?? [];
  },

  async follow(id: string) {
    const res = await api.put(API_ENDPOINTS.USERS.FOLLOW(id));
    return res.data?.data ?? null;
  },

  async unfollow(id: string) {
    const res = await api.put(API_ENDPOINTS.USERS.FOLLOW(id));
    return res.data?.data ?? null;
  },
};