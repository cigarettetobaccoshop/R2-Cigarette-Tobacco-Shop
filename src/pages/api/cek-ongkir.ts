import type { NextApiRequest, NextApiResponse } from 'next';

// Stub integrasi ongkir. Daftar akun di https://collaborator.komerce.id (RajaOngkir)
// atau https://binderbyte.com, lalu isi RAJAONGKIR_API_KEY di .env.local.
// Body request: { origin, destination, weight, courier } — sesuaikan dengan
// dokumentasi resmi provider yang dipakai, karena format origin/destination
// (ID kota vs ID kecamatan) berbeda antar versi API.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.RAJAONGKIR_API_KEY;
  if (!apiKey) {
    return res.status(200).json({
      skipped: true,
      reason: 'RAJAONGKIR_API_KEY belum diatur. Lihat README bagian "Integrasi Ongkir".',
    });
  }

  const { origin, destination, weight, courier } = req.body;

  try {
    const resp = await fetch('https://rajaongkir.komerce.id/api/v1/calculate/domestic-cost', {
      method: 'POST',
      headers: {
        key: apiKey,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ origin, destination, weight, courier }),
    });
    const data = await resp.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Gagal mengambil data ongkir' });
  }
}
