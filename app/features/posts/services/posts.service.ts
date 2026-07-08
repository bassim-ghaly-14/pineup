import { api } from "@/services/api/axios";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export const postsService = {
  async getFeed(params?: { page?: number; limit?: number; only?: string }) {
    const res = await api.get(API_ENDPOINTS.POSTS.FEED, { params });
    console.log("RAW POSTS:", res?.data);
    const data = res.data?.data;
    const page = params?.page ?? 1;
    return {
    posts: data?.posts ?? [],
    page: data?.page ?? page,
    pages: data?.pages ?? 1,
    total: data?.total ?? 0,
  };
  },

  async getAll() {
    const res = await api.get(API_ENDPOINTS.POSTS.GET_ALL);

    return res.data?.data?.posts ?? res.data?.data ?? [];
  },

  async getById(id: string) {
    const res = await api.get(API_ENDPOINTS.POSTS.GET_SINGLE(id));

    return res.data?.data ?? null;
  },

  async create(formData: FormData) {
    console.log("TOKEN:", localStorage.getItem("pineup_token"));
    const res = await api.post(
      API_ENDPOINTS.POSTS.CREATE,
      formData,
      { headers: { "Content-Type": "multipart/form-data" }, }
    );

    return res.data?.data ?? null;
  },

  async update(id: string, payload: { body: string }) {
    const res = await api.put(
      API_ENDPOINTS.POSTS.UPDATE(id),
      payload
    );

    return res.data?.data ?? null;
  },

  async remove(id: string) {
    const res = await api.delete(API_ENDPOINTS.POSTS.DELETE(id));

    return res.data?.data ?? null;
  },

  async like(id: string) {
    const res = await api.put(API_ENDPOINTS.POSTS.TOGGLE_LIKE(id));

    return res.data?.data ?? null;
  },

  async bookmark(id: string) {
    const res = await api.put(API_ENDPOINTS.POSTS.TOGGLE_BOOKMARK(id));

    return res.data?.data ?? null;
  },

  async share(id: string) {
    const res = await api.post(API_ENDPOINTS.POSTS.SHARE(id));

    return res.data?.data ?? null;
  },
};