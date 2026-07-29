"use client";

import { useState } from "react";

import { toast } from "sonner";

type DownloadImageOptions = {
  imageUrl: string;
  fileName?: string;
};

export function useDownloadImage() {
  const [isDownloading, setIsDownloading] =
    useState(false);

  const downloadImage = async ({
    imageUrl,
    fileName = "pineup-image",
  }: DownloadImageOptions) => {
    if (isDownloading) return;
 // Local image (default avatar, local assets...)

  if (imageUrl.startsWith("/")) {

    const link = document.createElement("a");

    link.href = imageUrl;

    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    link.remove();

    toast.success("Image downloaded successfully.");

    return;

  }


    try {
      setIsDownloading(true);

      const response = await fetch(
        `/api/download-image?url=${encodeURIComponent(
          imageUrl
        )}&filename=${encodeURIComponent(
          fileName
        )}`
      );

      if (!response.ok) {
        throw new Error();
      }

      const blob =
        await response.blob();

      const objectUrl =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = objectUrl;
const disposition =
  response.headers.get("Content-Disposition");

const match =
  disposition?.match(/filename="(.+)"/);

link.download =
  match?.[1] ?? fileName;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(
        objectUrl
      );

      toast.success(
        "Image downloaded successfully."
      );
    } catch {
      toast.error(
        "Failed to download image."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    downloadImage,
    isDownloading,
  };
}