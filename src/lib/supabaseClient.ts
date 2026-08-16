import { createClient } from '@supabase/supabase-js';

// Situs tetap berfungsi penuh (katalog, keranjang, checkout via WhatsApp) TANPA
// Supabase. Supabase hanya dipakai untuk fitur backend opsional: dashboard admin,
// riwayat pesanan tersimpan, dan input resi. Isi .env.local untuk mengaktifkannya.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseEnabled = Boolean(url && anonKey);

export const supabase = supabaseEnabled
  ? createClient(url as string, anonKey as string)
  : null;
