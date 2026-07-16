type NotificationType =
  | "like_post"
  | "comment_post"
  | "reply_comment"
  | "follow_user"
  | "share_post";
export interface Notification {
  _id: string;

  actor: {
    _id: string;
    name: string;
    photo: string;
  };

  recipient: {
    _id: string;
    name: string;
    photo: string;
  };

  type: NotificationType;
  entityType: string;
  entityId: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string;

  entity?: {
    reply?: {
      _id:string;
      content:string;
      createdAt:string;
    };
    isReply?: boolean;
    parentComment?: string | null;
    _id: string;

    post?:
    | string
    | {
        _id: string;
      };
    unavailable?: boolean;

    body?: string;
    image?: string;

    user?: string;

    commentsCount?: number;
    likesCount?: number;
    sharesCount?: number;
    isShare?: boolean;

    topComment?: {
      _id: string;
      content: string;

      commentCreator: {
        _id: string;
        name: string;
        username: string;
        photo: string;
      };

      post: string;
      parentComment: string | null;
      likes: string[];
      createdAt: string;
    };

    name?: string;
    username?: string;
    photo?: string;

    followersCount?: number;
    followingCount?: number;
    bookmarksCount?: number;

    id?: string;
  };
}