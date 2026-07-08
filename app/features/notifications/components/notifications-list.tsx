"use client";

import {
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import { useNotifications } from "../hooks/use-notifications";
import { useMarkRead } from "../hooks/use-mark-read";
import { Loader } from "@/components/common/loader";
import { EmptyState } from "@/components/common/empty-state";
// import { ErrorState } from "@/components/common/error-state";


export function NotificationList() {
  const {
    data = [],
    isPending,
    // error,
  } = useNotifications();
  const { mutate: markRead } =
    useMarkRead();

if (isPending) {
    return <Loader />;
}
// if (error) {
//     return <ErrorState />;
// }
if (!data.length) {
    return (
        <EmptyState
            title="No notifications yet"
        />
    );
}

  return <>
    <List>
      {data.map((item) => (
        <ListItem
          key={item._id}
          onClick={() =>
              markRead(item._id)
          }
          sx={{
            cursor: "pointer",
          }}
        >
          <ListItemText
            primary={
              item.title
            }
            secondary={
              item.body
            }
          />
        </ListItem>
      ))}
    </List>
  </>
}