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

  type: string;
  entityType: string;
  entityId: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string;

  entity?: {
    _id: string;

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