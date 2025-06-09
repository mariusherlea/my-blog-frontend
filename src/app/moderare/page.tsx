"use client";

import { useEffect, useState } from "react";

type Comment = {
  id: number;
  name: string;
  text: string;
  createdAt: string;
  article: {
    id: number;
    title: string;
  };
};

export default function ModerarePage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    const res = await fetch("/api/pending-comments");
    const data = await res.json();
    setComments(data.data); // direct data, fără .attributes
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const approve = async (id: number) => {
    setLoading(true);
    const res = await fetch("/api/moderate-comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId: id }),
    });

    if (res.ok) {
      setComments((prev) => prev.filter((c) => c.id !== id));
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Comentarii în așteptare</h1>
      {comments.length === 0 ? (
        <p>Nu există comentarii de aprobat.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="border p-4 rounded-md bg-white shadow"
            >
              <div className="text-sm text-gray-600 mb-1">
                Articol: <strong>{comment.article.title}</strong>
              </div>
              <div className="font-semibold">{comment.name}</div>
              <p className="mt-1">{comment.text}</p>
              <div className="text-xs text-gray-400 mt-2">
                {new Date(comment.createdAt).toLocaleString("ro-RO")}
              </div>
              <button
                onClick={() => approve(comment.id)}
                className="mt-3 bg-green-600 text-white px-3 py-1 rounded"
                disabled={loading}
              >
                Aprobă
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
