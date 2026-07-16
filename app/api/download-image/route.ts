import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: NextRequest
) {

  const url =
    request.nextUrl.searchParams.get("url");


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


  const response = await fetch(url);


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


  return new NextResponse(blob, {
    headers: {
      "Content-Type":
        blob.type || "image/jpeg",

      "Content-Disposition":
        'attachment; filename="pineup-image.jpg"',
    },
  });

}