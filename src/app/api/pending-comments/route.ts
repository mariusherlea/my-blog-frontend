// src/app/api/pending-comments/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/comments?filters[approved][$eq]=false&populate[article][fields][0]=title`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  );

  const data = await res.json();

  return NextResponse.json(data);
}
