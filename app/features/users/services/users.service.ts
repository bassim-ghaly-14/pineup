import { api } from "@/services/api/axios";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export const usersService = {
  async getProfile(id: string) {
    const res = await api.get(API_ENDPOINTS.USERS.PROFILE(id));
    return res.data?.data ?? {};
  },

  async getUserPosts(id: string) {
    const res = await api.get(API_ENDPOINTS.USERS.POSTS(id));
    return res.data?.data ?? [];
  },

  async getSuggestions() {
    const res = await api.get(API_ENDPOINTS.USERS.SUGGESTIONS);
    return res.data?.data ?? [];
  },

  async getBookmarks() {
    const res = await api.get(API_ENDPOINTS.USERS.BOOKMARKS);
    console.log("BOOKMARKS RAW:", res.data);
    return res.data?.data ?? [];
  },

  async follow(id: string) {
    const res = await api.post(API_ENDPOINTS.USERS.FOLLOW(id));
    return res.data?.data ?? null;
  },

  async unfollow(id: string) {
    // NOTE: backend seems to NOT define unfollow endpoint
    const res = await api.post(API_ENDPOINTS.USERS.FOLLOW(id));
    return res.data?.data ?? null;
  },
};