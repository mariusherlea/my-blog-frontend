'use client';

import { useState } from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      setStatus('error');
      setMessage('Adresa de email nu este validă.');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/subscribers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { email } }),
      });

      if (res.ok) {
        setStatus('success');
        setMessage('Mulțumim! Te-ai abonat cu succes.');
        setEmail('');
      } else {
        const data = await res.json();
        throw new Error(data.error?.message || 'Eroare la abonare.');
      }
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Eroare la abonare.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 border rounded-md shadow">
      <label className="block">
        <span className="text-gray-700">Email</span>
        <input
          type="email"
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
          placeholder="exemplu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Se trimite...' : 'Abonează-te'}
      </button>

      {message && (
        <p className={`text-sm ${status === 'error' ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
