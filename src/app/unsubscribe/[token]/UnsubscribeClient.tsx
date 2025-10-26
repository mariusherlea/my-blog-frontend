'use client';

import { useEffect, useState } from 'react';

export default function UnsubscribeClient({ token }: { token: string }) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const unsubscribe = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/subscribers/unsubscribe/${token}`,
          { method: 'DELETE' }
        );

        if (res.ok) setStatus('success');
        else setStatus('error');
      } catch {
        setStatus('error');
      }
    };

    unsubscribe();
  }, [token]);

  return (
    <main className="p-8 max-w-xl mx-auto text-center">
      {status === 'loading' && <p>Se procesează dezabonarea...</p>}
      {status === 'success' && (
        <p>Te-ai dezabonat cu succes. Ne pare rău că pleci! 😢</p>
      )}
      {status === 'error' && (
        <p>Link invalid sau eroare de server. Încearcă din nou sau contactează-ne.</p>
      )}
    </main>
  );
}
