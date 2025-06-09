// app/api/moderate-comment/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { commentId } = await req.json();
  console.log("Comment ID primite:", commentId);
  console.log(
    "Fetch URL:",
    `${process.env.STRAPI_URL}/api/comments/${commentId}`
  );
  console.log(
    "Token (first 10 chars):",
    process.env.STRAPI_API_TOKEN?.substring(0, 10)
  );
  try {
    const res = await fetch(
      `${process.env.STRAPI_URL}/api/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            approved: true,
          },
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Eroare la aprobarea comentariului:", data);
      return NextResponse.json(
        { error: "Eroare la aprobarea comentariului" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Eroare server:", error);
    return NextResponse.json({ error: "Eroare server" }, { status: 500 });
  }
}
