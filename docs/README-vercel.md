# Vercel CLI — Panduan Singkat

Panduan ini menjelaskan cara memasang dan menggunakan Vercel CLI untuk pengembangan lokal, deployment preview, dan deployment produksi.

## Instalasi
Pilih salah satu metode berikut sesuai pengelola paket Anda:

- npm (umum)

```bash
npm i -g vercel
```

- pnpm

```bash
pnpm add -g vercel
```

- yarn

```bash
yarn global add vercel
```

- bun

```bash
bun i -g vercel
```

- npx (tanpa instalasi global)

```bash
npx vercel <perintah>
```

Verifikasi pemasangan:

```bash
vercel --version
vercel help
```

## Login & Mengaitkan Proyek

Login ke akun Vercel:

```bash
vercel login
```

Hubungkan direktori lokal ke proyek Vercel yang ada:

```bash
cd path/ke/proyek
vercel link
```

Untuk non-interaktif (mis. CI), gunakan token:

```bash
vercel --token $VERCEL_TOKEN
```

## Workflow Dasar

- Deploy preview (default):

```bash
vercel
```

- Deploy produksi:

```bash
vercel --prod
```

Catatan: Commit atau merge ke cabang produksi (mis. `main`) biasanya memicu deployment produksi jika terintegrasi dengan Git provider.

## Environment Variables

- Tarik variabel environment ke file `.env.local`:

```bash
vercel env pull
```

- Tarik variabel dari environment tertentu:

```bash
vercel pull --environment=staging
```

- Tambah variabel ke environment lewat CLI:

```bash
vercel env add MY_KEY production
```

## Environment Kustom

Deploy ke environment kustom (misal `staging`):

```bash
vercel deploy --target=staging
```

Mengelola konektor (Vercel Connect):

```bash
vercel connect attach <provider>/<project> --environment staging
```

## Autentikasi di CI/CD

- Simpan Vercel token sebagai secret di CI (mis. `VERCEL_TOKEN`) dan panggil perintah `vercel --token $VERCEL_TOKEN`.
- Pastikan token memiliki izin yang tepat untuk deployment yang akan dilakukan.

## Troubleshooting Singkat

- PATH tidak ditemukan setelah instalasi global: tutup-buka terminal atau pastikan direktori bin global ada di PATH (contoh: `~/.npm-global/bin`).
- Izin EACCES saat instalasi global: gunakan nvm atau sesuaikan prefix npm; hindari `sudo`.
- `vercel login` tidak membuka browser: gunakan `vercel login --token <token>`.

## Contoh Alur Singkat (dari repo lokal)

```bash
cd project/
vercel login
vercel link
vercel env pull
vercel   # untuk preview
vercel --prod   # untuk production
```

---

File ini ditambahkan untuk membantu developer tim cepat memulai dengan Vercel CLI. Jika Anda ingin, saya bisa:
- Menambahkan instruksi khusus CI (GitHub Actions) untuk deployment otomatis.
- Menggabungkan panduan ini ke README utama dan membuat link dari docs/.
