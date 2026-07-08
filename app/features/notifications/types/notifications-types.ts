export interface Notification {
  _id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  type:
    | "like"
    | "comment"
    | "follow"
    | "share";
}