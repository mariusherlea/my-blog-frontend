// components/CommentForm.tsx
"use client";

import { useState } from "react";

type Props = {
  articleId: number;
};

export default function CommentForm({ articleId }: Props) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:1337/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          author,
          content,
          article: articleId,
        },
      }),
    });

    if (res.ok) {
      setAuthor("");
      setContent("");
      alert("Comentariu trimis!");
    } else {
      alert("Eroare la trimitere.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-8">
      <input
        type="text"
        placeholder="Numele tău"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border rounded px-4 py-2 w-full"
        required
      />
      <textarea
        placeholder="Comentariul tău"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border rounded px-4 py-2 w-full"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Se trimite..." : "Trimite comentariul"}
      </button>
    </form>
  );
}
