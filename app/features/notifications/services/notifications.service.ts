import { api } from "@/services/api/axios";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export const notificationsService = {
  async getAll() {
    const res = await api.get(
      API_ENDPOINTS.NOTIFICATIONS.GET_ALL
    );
    console.log("RAW NOTIFICATIONS:", res?.data );
    return res.data?.data ?? [];
  },

  async unreadCount() {
    const res = await api.get(
      API_ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT
    );
    console.log("RAW UNREAD COUNT:", res?.data );
    return res.data?.data?.count ?? 0;
  },

  async markRead(id: string) {
    const res = await api.patch(
      API_ENDPOINTS.NOTIFICATIONS.MARK_AS_READ(id)
    );
    console.log("MARK READ:", res?.data );
    return res.data?.data;
  },

  async markAllRead() {
    const res = await api.patch(
      API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_AS_READ
    );
    console.log("MARK ALL READ:", res?.data );
    return res.data?.data;
  },
};