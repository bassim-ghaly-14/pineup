import { api } from "@/services/api/axios";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export const notificationsService = {
  async getAll() {
    const res = await api.get(
      API_ENDPOINTS.NOTIFICATIONS.GET_ALL
    );
    return res.data?.data?.notifications ?? [];
  },

  async unreadCount() {
    const res = await api.get(
      API_ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT
    );
    return res.data?.data?.unreadCount ?? 0;
  },

  async markRead(id: string) {
    const res = await api.patch(
      API_ENDPOINTS.NOTIFICATIONS.MARK_AS_READ(id)
    );
    return res.data?.data;
  },

  async markAllRead() {
    const res = await api.patch(
      API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_AS_READ
    );
    return res.data?.data;
  },
};