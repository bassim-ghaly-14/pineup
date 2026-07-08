import { api } from "@/services/api/axios";
import { API_ENDPOINTS } from "@/services/api/endpoints";

export const commentsService = {
  async getComments(postId: string, page: number = 1, limit: number = 10) {
    const res = await api.get(
      API_ENDPOINTS.COMMENTS.LIST(postId),
      {
        params: {
          page,
          limit,
        },
      }
    );
    console.log("RAW COMMENTS:", res?.data);
    return res.data?.data?.comments ?? [];
  },

  async create(
    postId: string,
    formData: FormData
  ) {
    console.log("CREATE COMMENT:", postId);
    for (const [key, value] of formData.entries()) {

    console.log("FORM DATA:", key, value);

  } try {
    const res = await api.post(
      API_ENDPOINTS.COMMENTS.CREATE(postId),
      formData
    );
    return res.data?.data ?? null;
    } catch (error: any) {
    console.log(
      "CREATE COMMENT ERROR:",
      error.response?.data
    );
    throw error;
  }
  },

  async update(
    postId: string,
    commentId: string,
    formData: FormData
  ) {
    const res = await api.put(
      API_ENDPOINTS.COMMENTS.UPDATE(
        postId,
        commentId
      ),
      formData
    );

    return res.data?.data ?? null;
  },

  async remove(
    postId: string,
    commentId: string
  ) {
    const res = await api.delete(
      API_ENDPOINTS.COMMENTS.DELETE(
        postId,
        commentId
      )
    );

    return res.data?.data ?? null;
  },

  async like(
    postId: string,
    commentId: string
  ) {
    const res = await api.put(
      API_ENDPOINTS.COMMENTS.TOGGLE_LIKE(
        postId,
        commentId
      )
    );

    return res.data?.data ?? null;
  },

  async replies(
    postId: string,
    commentId: string
  ) {
    const res = await api.get(
      API_ENDPOINTS.COMMENTS.REPLIES(
        postId,
        commentId
      )
    );
    console.log("RAW REPLIES:", res?.data);
    return res.data?.data?.replies ?? [];
  },

  async createReply(
    postId: string,
    commentId: string,
    formData: FormData
  ) {
    const res = await api.post(
      API_ENDPOINTS.COMMENTS.CREATE_REPLY(
        postId,
        commentId
      ),
      formData
    );

    return res.data?.data ?? null;
  },
};