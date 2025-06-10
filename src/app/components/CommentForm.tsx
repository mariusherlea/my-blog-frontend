"use client";
import { useState } from "react";
import { postComment } from "@/lib/api";

type CommentFormProps = {
  articleId: number;
};

export default function CommentForm({ articleId }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!authorName.trim() || !content.trim()) {
      setError("Numele și comentariul sunt obligatorii");
      return;
    }

    try {
      await postComment(articleId, content.trim(), authorName.trim());
      setSuccess(true);
      setError(null);
      setContent("");
      setAuthorName("");
    } catch (err) {
      setError("Eroare la trimiterea comentariului");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        placeholder="Numele tău"
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Scrie comentariul tău aici..."
        className="w-full p-2 border rounded"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">Comentariul a fost trimis spre aprobare!</p>}
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Trimite comentariul
      </button>
    </form>
  );
}
