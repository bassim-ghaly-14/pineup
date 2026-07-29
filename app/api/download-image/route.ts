import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
) {
  const url =
    request.nextUrl.searchParams.get("url");

  const fileName =
    request.nextUrl.searchParams.get("filename") ||
    "pineup-image";

  if (!url) {
    return NextResponse.json(
      {
        message: "Missing image url",
      },
      {
        status: 400,
      }
    );
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(url);
  } catch {
    return NextResponse.json(
      {
        message: "Invalid image url",
      },
      {
        status: 400,
      }
    );
  }

const hostname = parsedUrl.hostname;

const isAllowed =
  hostname === "route-posts.routemisr.com" ||
  hostname.endsWith(".r2.dev");

if (!isAllowed) {
  return NextResponse.json(
    {
      message: "Forbidden host",
    },
    {
      status: 403,
    }
  );
}

  const response = await fetch(
    parsedUrl.toString()
  );

  if (!response.ok) {
    return NextResponse.json(
      {
        message: "Failed to fetch image",
      },
      {
        status: 500,
      }
    );
  }

  const blob =
    await response.blob();

  const extension =
    blob.type?.split("/")[1] ?? "jpg";

  return new NextResponse(blob, {
    headers: {
      "Content-Type":
        blob.type || "image/jpeg",

      "Content-Disposition":
        `attachment; filename="${fileName}.${extension}"`,
    },
  });
}