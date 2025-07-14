
//src/app/moderare/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getAllComments, approveComment, deleteComment } from "@/lib/api";

export default function ModerationPage() {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 👉 Fetch comentarii la montare
const fetchComments = async () => {
  try {
    setLoading(true);
    setComments([]); // ⬅️ curăță înainte de reîncărcare
    const data = await getAllComments();
    setComments(data);
  } catch (err: any) {
    setError("Eroare la încărcarea comentariilor");
    console.error(err);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchComments();
  }, []);

const handleApprove = async (id: number) => {
  try {
    const result = await approveComment(id);
    if (result?.status === "not_found") {
      console.warn(`Comentariul ${id} nu există. Se va omite.`);
    }
    await fetchComments();
  } catch (err) {
    console.error("Eroare la aprobare:", err);
  }
};


  const handleDelete = async (id: number) => {
    try {
      await deleteComment(id);
      await fetchComments(); // 🔄 Reîncarcă lista după ștergere
    } catch (err) {
      console.error("Eroare la ștergere:", err);
    }
  };

  if (loading) return <p>Se încarcă comentariile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Moderare comentarii</h1>
      {comments.length === 0 ? (
        <p>Nu există comentarii de moderat.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="border p-4 rounded shadow">
              <p><strong>{comment.authorName}:</strong> {comment.content}</p>
              <p className="text-sm text-gray-600">Articol: {comment.articleTitle}</p>
              <div className="mt-2 space-x-2">
                {!comment.approved && (
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded"
                    onClick={() => handleApprove(comment.id)}
                  >
                    Aproba
                  </button>
                )}
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded"
                  onClick={() => handleDelete(comment.id)}
                >
                  Șterge
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
