"use client";

import { useState } from "react";

import { Button, Stack, TextField } from "@mui/material";

import { useCreateReply } from "../hooks/use-create-reply";
import { useRequireAuthAction } from "src/features/auth/hooks/use-require-auth-action";

type Props = {
  postId: string;
  commentId: string;

  onSuccess?: () => void;
};

export function CreateReply({ postId, commentId, onSuccess }: Props) {
  const [content, setContent] = useState("");

  const createReply = useCreateReply();
  const { requireAuth } = useRequireAuthAction();

  const submit = () => {
    if (content.trim().length < 2) {
      return;
    }

    const formData = new FormData();

    formData.append("content", content.trim());

    requireAuth(() => {
      createReply.mutate(
        {
          postId,
          commentId,
          formData,
        },
        {
          onSuccess: () => {
            setContent("");
            onSuccess?.();
          },
        },
      );
    });
  };

  return (
    <Stack
      spacing={1}
      sx={{
        mt: 1,
        ml: 6,
      }}>
      <TextField
        size="small"
        placeholder="Write a reply..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Button
        variant="contained"
        size="small"
        sx={{
          alignSelf: "flex-end",
        }}
        disabled={createReply.isPending || content.trim().length < 2}
        onClick={submit}>
        {createReply.isPending ? "Replying..." : "Reply"}
      </Button>
    </Stack>
  );
}
