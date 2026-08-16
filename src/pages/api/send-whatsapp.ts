import type { NextApiRequest, NextApiResponse } from 'next';

// Endpoint ini mengirim notifikasi WhatsApp otomatis ke pelanggan (dipanggil dari
// dashboard admin saat status pesanan diubah ke "Dikirim"). Membutuhkan API key
// dari gateway WhatsApp pihak ketiga — contoh di bawah pakai Fonnte (fonnte.com).
// Isi FONNTE_TOKEN di .env.local / Vercel Environment Variables untuk mengaktifkan.
//
// Ganti blok fetch di bawah jika memakai Wablas atau Whacenter — keduanya juga
// punya endpoint REST serupa, tinggal sesuaikan URL dan body request.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { to, message } = req.body as { to: string; message: string };
  if (!to || !message) return res.status(400).json({ error: 'to dan message wajib diisi' });

  const token = process.env.FONNTE_TOKEN;
  if (!token) {
    return res.status(200).json({ skipped: true, reason: 'FONNTE_TOKEN belum diatur — notifikasi tidak dikirim.' });
  }

  try {
    const resp = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: { Authorization: token, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ target: to, message }),
    });
    const data = await resp.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Gagal mengirim notifikasi WhatsApp' });
  }
}
