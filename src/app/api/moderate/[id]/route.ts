// src/app/api/moderate/[id]/route.ts
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const res = await fetch(`http://localhost:1337/api/comments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
    },
    body: JSON.stringify({
      data: { approved: true },
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to approve" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
