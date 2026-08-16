# R2 Nusantara — Cigarette Tobacco Shop

Website e-commerce B2B untuk distributor rokok grosir R2 Nusantara (Malang, Jawa Timur).
Dibangun dengan **Next.js + Tailwind CSS**, data 233 produk dikonversi otomatis dari
`shopify_r2nusantara.csv`, checkout mengarah ke **WhatsApp** dengan mekanisme *"bayar
setelah barang terkonfirmasi terkirim"*.

> **Penting:** situs ini berjalan **penuh tanpa Supabase** — katalog, filter, keranjang,
> dan checkout-via-WhatsApp semuanya berfungsi dari data statis. Supabase, gateway
> WhatsApp otomatis, dan cek ongkir live adalah **fitur backend opsional (Fase 2)**
> untuk dashboard admin & notifikasi otomatis. Aktifkan kalau sudah siap.

---

## 1. Jalankan di Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

---

## 2. Struktur Proyek

```
r2-nusantara/
├── public/                 # manifest.json, sw.js, robots.txt, assets/
├── src/
│   ├── components/         # Header, Footer, ProductCard, CartDrawer, dll.
│   ├── context/CartContext.tsx
│   ├── data/products.ts    # 233 produk hasil konversi CSV
│   ├── lib/                # supabaseClient, whatsapp, utils
│   ├── pages/               # index, katalog, produk/[slug], checkout, faq, kontak,
│   │                        # admin/login, admin/dashboard, api/send-whatsapp, api/cek-ongkir
│   └── types/
├── supabase/schema.sql     # skema tabel products, orders, customers, reviews
└── scripts/generate-sitemap.js
```

---

## 3. Mengganti Data Produk

Data produk sudah dikonversi ke `src/data/products.ts` dari CSV yang diunggah (233
item, kategori **R2** dan **Resmi** dengan sub-segmen). Untuk update:

- **Cara cepat:** edit langsung `src/data/products.ts`.
- **Cara CSV:** ekspor ulang CSV dari Shopify dengan kolom yang sama
  (`Handle, Title, Type, Tags, Variant SKU, Variant Price, Variant Inventory Qty,
  Body (HTML)`), lalu jalankan ulang script konversi (minta saya generate ulang, atau
  tulis script Node/Python serupa yang membaca CSV → menulis `products.ts`).
- **Foto produk asli:** CSV tidak menyertakan gambar, jadi kartu produk memakai
  placeholder bermotif inisial. Untuk pakai foto asli, simpan file di
  `public/assets/products/{slug}.jpg` lalu isi field `image` pada produk terkait di
  `products.ts`, contoh: `image: '/assets/products/r2-1.jpg'`.
- **Harga diskon:** field `compareAtPrice` sudah tersedia di tipe `Product` — isi
  manual untuk produk yang ingin ditampilkan dengan harga coret.

---

## 4. Setup Supabase (opsional — untuk dashboard admin)

1. Buat project baru di [supabase.com](https://supabase.com).
2. Buka **SQL Editor**, jalankan seluruh isi `supabase/schema.sql`.
3. Buka **Authentication → Users → Add User**, buat akun email/password untuk admin.
4. Buka **Project Settings → API**, salin `Project URL` dan `anon public key`.
5. Salin `.env.local.example` menjadi `.env.local`, isi:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
   ```
6. Jalankan ulang `npm run dev`. Login admin di `/admin/login`.

Tanpa langkah ini, `/admin/dashboard` akan menampilkan pesan bahwa Supabase belum
dikonfigurasi — halaman publik tetap berjalan normal.

---

## 5. Notifikasi WhatsApp Otomatis (opsional)

Endpoint `/api/send-whatsapp` sudah siap dipakai dashboard admin untuk mengirim
notifikasi resi ke pelanggan otomatis. Untuk mengaktifkan:

1. Daftar di [fonnte.com](https://fonnte.com) (atau Wablas/Whacenter — ganti URL
   endpoint di `src/pages/api/send-whatsapp.ts` sesuai provider pilihan Anda).
2. Hubungkan nomor WhatsApp perangkat Anda, salin token API.
3. Isi `FONNTE_TOKEN=` di `.env.local` (dan di Vercel Environment Variables saat
   deploy).

Tanpa token ini, checkout pelanggan **tetap berfungsi normal** (mengarah ke WhatsApp
manual) — token hanya dibutuhkan untuk notifikasi otomatis dari sisi admin.

---

## 6. Cek Ongkir Otomatis (opsional)

Endpoint `/api/cek-ongkir` sudah disiapkan sebagai stub untuk RajaOngkir (via
[collaborator.komerce.id](https://collaborator.komerce.id)) atau Binderbyte. Daftar
akun, isi `RAJAONGKIR_API_KEY=` di `.env.local`, lalu sesuaikan body request dengan
dokumentasi resmi provider (format ID kota/kecamatan berbeda antar versi API).

---

## 7. Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit: R2 Nusantara Next.js"
git branch -M main
git remote add origin https://github.com/cigarettetobaccoshop/R2-Cigarette-Tobacco-Shop.git
git push -u origin main
```

> Repo `R2-Cigarette-Tobacco-Shop` yang Anda sebutkan saat ini berisi struktur lama.
> Anda bisa push proyek ini ke branch baru dulu (`git push -u origin main:nextjs`)
> untuk review sebelum menimpa `main`.

---

## 8. Deploy ke Vercel

1. Buka [vercel.com/new](https://vercel.com/new), import repo GitHub di atas.
2. Framework preset otomatis terdeteksi sebagai **Next.js**.
3. Di step **Environment Variables**, isi variabel yang sama dengan `.env.local`
   (Supabase, Fonnte, RajaOngkir — kalau dipakai).
4. Klik **Deploy**. Setiap push ke `main` akan auto-deploy (CI/CD bawaan Vercel).
5. (Opsional) Hubungkan domain kustom `r2nusantara.com` di **Settings → Domains**.

---

## 9. PWA (Install ke Homescreen)

Service worker dasar (`public/sw.js`) sudah aktif dan di-registrasi otomatis — situs
sudah bisa "Add to Home Screen" dan menyimpan cache offline sederhana. Untuk fitur PWA
yang lebih lengkap (precaching per-route, update prompt), install `next-pwa`:

```bash
npm install next-pwa
```

lalu uncomment blok `withPWA` di `next.config.js`.

---

## 10. Panduan Admin

1. Buka `/admin/login`, masuk dengan akun Supabase yang dibuat di langkah 4.
2. Dashboard menampilkan ringkasan (total pesanan, pending, dikirim, pendapatan dari
   pesanan berstatus **Selesai**) dan tabel semua pesanan.
3. Untuk memproses pesanan: isi kolom **No. Resi**, lalu ubah status ke **Dikirim** —
   sistem otomatis memanggil `/api/send-whatsapp` untuk mengirim resi ke pelanggan
   (jika `FONNTE_TOKEN` sudah diisi).
4. Ubah status ke **Selesai** setelah pembayaran pelanggan diterima — nilai ini masuk
   ke perhitungan "Pendapatan" di ringkasan atas.

---

## 11. Yang Sudah Termasuk vs Yang Perlu Ditambah Manual

**Sudah jalan penuh (tanpa konfigurasi tambahan):**
- Katalog 2 kolom mobile / 3–4 kolom desktop, filter kategori R2/Resmi + sub-segmen,
  pencarian, urutkan harga/nama, pagination.
- Halaman detail produk, keranjang (localStorage), checkout dengan form sesuai format
  yang diminta → generate pesan WhatsApp terformat rapi ke nomor utama.
- Dark mode toggle, FAQ mekanisme pembayaran, halaman kontak + Google Maps embed,
  tombol WhatsApp mengambang, SEO meta tags + JSON-LD (LocalBusiness, Product, FAQPage),
  sitemap.xml otomatis, robots.txt, manifest PWA + service worker dasar.

**Butuh setup akun/API key milik Anda sendiri (sudah disiapkan kodenya):**
- Dashboard admin (kelola status pesanan, input resi) → butuh Supabase.
- Notifikasi WhatsApp otomatis ke pelanggan saat resi terbit → butuh token Fonnte/Wablas.
- Cek ongkir real-time → butuh API key RajaOngkir/Binderbyte.
- Push ke GitHub & deploy Vercel → butuh Anda login ke akun GitHub/Vercel masing-masing
  (saya tidak punya akses jaringan/kredensial untuk melakukan ini dari sisi saya).

**Belum dibuat (di luar cakupan pass ini, bisa ditambahkan kalau dibutuhkan):**
Quick view popup, perbandingan produk 3-arah, wishlist, riwayat dilihat, sistem kupon,
review moderation UI, Google Analytics 4 / Meta Pixel wiring, CRUD produk lewat
dashboard (saat ini kelola produk masih lewat edit `products.ts`).
