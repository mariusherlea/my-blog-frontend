// src/app/admin/comments/page.tsx
import { getUnapprovedComments } from "@/lib/api";
import { ApproveButton } from "@/app/components/ApproveButton";

export default async function AdminCommentsPage() {
  // Asigurăm că întotdeauna avem un array valid
  const response = await getUnapprovedComments();
  const comments = Array.isArray(response?.data) ? response.data : response || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Comentarii neaprobate</h1>

      {comments.length === 0 ? (
        <p className="text-gray-600">Toate comentariile sunt aprobate 🎉</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment: any) => (
            <li
              key={comment.id}
              className="border p-4 rounded bg-white shadow-sm"
            >
              <div className="font-semibold">
                {comment.author || comment.authorName || "Anonim"}
              </div>
              <p className="text-gray-700">{comment.content}</p>
              <p className="text-xs text-gray-400 mt-2">
                Articol: {comment.article?.data?.attributes?.title || "N/A"}
              </p>
              <ApproveButton commentId={comment.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
