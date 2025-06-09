"use client";

import { useTransition } from "react";

export function ApproveButton({ commentId }: { commentId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleApprove = async () => {
    startTransition(async () => {
      const res = await fetch(`/api/moderate/${commentId}`, {
        method: "POST",
      });

      if (res.ok) {
        window.location.reload(); // reîncarcă lista după aprobare
      } else {
        alert("Eroare la aprobare");
      }
    });
  };

  return (
    <button
      onClick={handleApprove}
      disabled={isPending}
      className="bg-green-600 text-white px-4 py-1 mt-2 rounded text-sm"
    >
      {isPending ? "Aprob..." : "Aprobă"}
    </button>
  );
}
