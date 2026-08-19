import { useState } from 'react';
import { useRouter } from 'next/router';
import SEO from '@/components/SEO';
import { supabase, supabaseEnabled } from '@/lib/supabaseClient';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!supabaseEnabled || !supabase) {
      setError('Supabase belum dikonfigurasi. Lihat README bagian "Setup Supabase".');
      return;
    }
    setLoading(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) return setError(err.message);
    router.push('/admin/dashboard');
  }

  return (
    <>
      <SEO title="Login Admin — R2 Nusantara" path="/admin/login" />
      <main className="flex min-h-screen items-center justify-center bg-tembakau-900 px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl dark:bg-neutral-900">
          <h1 className="mb-4 font-poppins text-lg font-bold text-tembakau-800 dark:text-emas-400">Login Admin</h1>
          {error && <p className="mb-3 rounded-md bg-red-50 p-2 text-xs text-red-600">{error}</p>}
          <label className="mb-3 block text-sm">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
            />
          </label>
          <label className="mb-4 block text-sm">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-tembakau-700 py-2.5 text-sm font-semibold text-white hover:bg-tembakau-800"
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
      </main>
    </>
  );
}
