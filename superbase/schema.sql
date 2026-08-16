-- ============================================================
-- R2 Nusantara — Supabase Schema
-- Jalankan di Supabase Dashboard → SQL Editor
-- ============================================================

-- Tabel produk (opsional — situs sudah berjalan dengan data statis di
-- src/data/products.ts; tabel ini dipakai kalau Anda ingin kelola produk
-- lewat dashboard admin alih-alih edit kode)
create table if not exists products (
  id text primary key,
  sku text,
  name text not null,
  category text not null check (category in ('r2', 'resmi')),
  subcategory text,
  price integer not null,
  compare_at_price integer,
  stock integer not null default 0,
  description text,
  image text,
  created_at timestamptz default now()
);

-- Tabel pelanggan
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  whatsapp text not null,
  alamat text,
  created_at timestamptz default now()
);

-- Tabel pesanan
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer jsonb not null,       -- { nama, whatsapp, alamat, patokan, ekspedisi }
  items jsonb not null,          -- [{ product_id, name, qty, price }]
  total integer not null,
  status text not null default 'pending' check (status in ('pending','diproses','dikirim','selesai')),
  resi text,
  created_at timestamptz default now()
);

-- Tabel ulasan produk
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  product_id text references products(id) on delete cascade,
  nama text not null,
  rating integer not null check (rating between 1 and 5),
  komentar text,
  approved boolean default false,
  created_at timestamptz default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table products enable row level security;
alter table orders enable row level security;
alter table customers enable row level security;
alter table reviews enable row level security;

-- Publik boleh baca produk & ulasan yang disetujui
create policy "Publik baca produk" on products for select using (true);
create policy "Publik baca ulasan approved" on reviews for select using (approved = true);

-- Publik boleh membuat pesanan baru (checkout tanpa login)
create policy "Publik buat pesanan" on orders for insert with check (true);
create policy "Publik buat data pelanggan" on customers for insert with check (true);

-- Hanya user yang login (admin) yang boleh baca & ubah pesanan
create policy "Admin baca semua pesanan" on orders for select using (auth.role() = 'authenticated');
create policy "Admin ubah pesanan" on orders for update using (auth.role() = 'authenticated');

-- Hanya admin yang boleh kelola produk
create policy "Admin kelola produk" on products for all using (auth.role() = 'authenticated');

-- ============================================================
-- Catatan:
-- 1. Buat akun admin lewat Supabase Dashboard → Authentication → Add User.
-- 2. Login admin di /admin/login memakai email & password akun tersebut.
-- 3. Untuk import 233 produk dari CSV ke tabel `products`, gunakan
--    Supabase Dashboard → Table Editor → Insert → Import data from CSV,
--    lalu mapping kolom: Handle→id, Variant SKU→sku, Title→name, dst.
-- ============================================================
