# Lingkungan

Daftar isi

- [Lingkungan Pembangunan Lokal](#lingkungan-pembangunan-lokal)
- [Lingkungan Pratinjau (Pra-produksi)](#lingkungan-pratinjau-pra-produksi)
- [Lingkungan Produksi](#lingkungan-produksi)
- [Lingkungan Kustom](#lingkungan-kustom)
- [Sumber daya lainnya](#sumber-daya-lainnya)

Vercel menyediakan tiga lingkungan default— Lokal, Pratinjau, dan Produksi:

1. Pengembangan Lokal: mengembangkan dan menguji perubahan kode pada mesin lokal Anda.
2. Pratinjau: peluncuran untuk pengujian lebih lanjut, QA, atau kolaborasi tanpa memengaruhi situs aktif Anda.
3. Produksi: menerapkan perubahan akhir pada situs yang berinteraksi langsung dengan pengguna menggunakan domain produksi.

Tim Pro dan Enterprise dapat membuat Lingkungan Kustom untuk alur kerja yang lebih khusus (misalnya, `staging`, `QA`). Setiap lingkungan dapat menentukan variabel lingkungan uniknya sendiri, seperti informasi koneksi basis data atau kunci API.

## Lingkungan Pembangunan Lokal

Lingkungan ini adalah tempat Anda mengembangkan fitur baru dan memperbaiki bug di mesin lokal Anda. Saat membangun dengan [framework](/docs/frameworks), gunakan [Vercel CLI](/docs/cli) untuk mengambil variabel lingkungan untuk proyek Anda.

1. Instal Vercel CLI:

Terminal

```bash
npm i -g vercel
```

```bash
bun i -g vercel
```

```bash
yarn global add vercel
```

```bash
pnpm i -g vercel
```

2. Hubungkan proyek Vercel Anda dengan direktori lokal Anda:

```bash
vercel link
```

3. Ambil variabel lingkungan secara lokal untuk digunakan dalam pengembangan aplikasi:

```bash
vercel env pull
```

Ini akan mengisi `.env.local` file di direktori aplikasi Anda.

## Lingkungan Pratinjau (Pra-produksi)

Lingkungan pratinjau memungkinkan Anda untuk menerapkan dan menguji perubahan dalam pengaturan langsung, tanpa memengaruhi situs produksi Anda. Secara default, Vercel membuat penerapan pratinjau ketika Anda:

- Melakukan push commit ke branch yang bukan branch produksi Anda (biasanya `main`).
- Membuat permintaan pull (PR) di GitHub, GitLab, atau Bitbucket.
- Melakukan deployment menggunakan CLI tanpa `--prod` flag, misalnya hanya dengan `vercel`.

[Penyebaran pertama](#penyebaran-pertama) dari proyek baru selalu merupakan penyebaran produksi. Aturan pratinjau di atas hanya berlaku setelah penyebaran produksi pertama tersebut ada.

Setiap deployment akan mendapatkan URL yang dibuat secara otomatis, dan Anda biasanya akan melihat tautan muncul di komentar PR penyedia Git Anda atau di Dasbor Vercel.

Ada dua jenis URL pratinjau:

- URL khusus cabang – Selalu mengarah ke perubahan terbaru pada cabang tersebut.
- URL khusus commit – Menunjuk ke deployment persis dari commit tersebut.

Pelajari selengkapnya tentang [URL yang dihasilkan](/docs/deployments/generated-urls).

## Lingkungan Produksi

Lingkungan produksi adalah versi situs atau aplikasi Anda yang sedang berjalan dan dapat diakses oleh pengguna.

Secara default, mendorong atau menggabungkan perubahan ke cabang produksi Anda (biasanya `main`) akan memicu penerapan ke produksi. Anda juga dapat secara eksplisit menerapkan ke produksi melalui CLI:

```bash
vercel --prod
```

Commit ke cabang produksi, atau `vercel --prod`, akan membuat deployment produksi. Cabang lain, permintaan tarik, dan `vercel` tanpa `--prod` akan membuat deployment pratinjau.

Saat penerapan produksi berhasil, Vercel memperbarui domain produksi Anda untuk mengarah ke penerapan baru, memastikan pengguna Anda melihat perubahan terbaru dengan segera. Untuk alur kerja tingkat lanjut, Anda dapat menonaktifkan promosi otomatis penerapan dan [mengontrol promosi secara manual](/docs/deployments/promoting-a-deployment).

### Penyebaran pertama

Peluncuran pertama proyek baru selalu merupakan peluncuran produksi. Ini terjadi bahkan ketika Anda:

- Mengimpor repositori Git di dasbor.
- Menjalankan `vercel` atau `vercel deploy` dari CLI tanpa `--prod`.
- Melakukan deployment dari branch yang bukan branch produksi Anda.

Vercel melakukan ini agar setiap proyek baru memiliki penerapan produksi dan dapat langsung menerima [domain produksi.](/docs/domains/working-with-domains/deploying-and-redirecting)

Setelah penerapan produksi pertama tersebut, penerapan selanjutnya mengikuti aturan yang biasa:

- Melakukan commit ke branch produksi, atau `vercel --prod` membuat deployment produksi.
- Cabang lain, permintaan tarik, dan `vercel` tanpa `--prod` membuat deployment pratinjau.

## Lingkungan Kustom

Lingkungan kustom tersedia pada paket [Enterprise](/docs/plans/enterprise) dan [Pro](/docs/plans/pro).

Lingkungan kustom berguna untuk lingkungan pra-produksi yang berjalan lebih lama seperti `staging`, `QA`, atau alur kerja khusus lainnya yang Anda perlukan.

Pemilik tim dan administrator proyek dapat membuat, memperbarui, atau menghapus lingkungan khusus.

### Membuat lingkungan khusus

1. Buka pengaturan [Lingkungan](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironments&title=Go+to+Environments+settings) proyek Anda di Dasbor Vercel.
2. Klik Buat Lingkungan.
3. Berikan nama (misalnya, `staging`), dan secara opsional:
   - Pelacakan Cabang untuk melakukan deployment secara otomatis setiap kali cabang yang sesuai di-push.
   - Lampirkan Domain untuk memberikan URL tetap ke lingkungan Anda.
   - Impor variabel dari lingkungan lain untuk mengisi lingkungan ini dengan variabel lingkungan yang sudah ada.

Untuk membuat token Authorization Bearer, lihat bagian [token akses](/docs/rest-api#creating-an-access-token) pada dokumentasi API.

Contoh curl

```bash
curl --request POST \
  --url https://api.vercel.com/v9/projects/<project-id-or-name>/custom-environments \
  --header "Authorization: Bearer $VERCEL_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "slug": "<environment_name_slug>",
    "description": "<environment_description>",
  }'
```

Untuk membuat token Authorization Bearer, lihat bagian [token akses](/docs/rest-api#creating-an-access-token) pada dokumentasi API.

Contoh menggunakan Vercel SDK

```javascript
import { Vercel } from '@vercel/sdk';
 
const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});
 
async function run() {
  const result = await vercel.environment.createCustomEnvironment({
    idOrName: '<project-id-or-name>',
    requestBody: {
      slug: '<environment_name_slug>',
      description: '<environment_description>',
    },
  });
  // Handle the result
  console.log(result);
}
 
run();
```

### Menggunakan lingkungan kustom melalui CLI

Anda dapat menerapkan, menarik, dan mengelola variabel lingkungan ke lingkungan kustom Anda dengan CLI:

```bash
# Deploy to a custom environment named "staging":
vercel deploy --target=staging
 
# Pull environment variables from "staging":
vercel pull --environment=staging
 
# Add environment variables to "staging":
vercel env add MY_KEY staging
```

### Menggunakan lingkungan kustom dengan Vercel Connect

Anda dapat membatasi akses token [Vercel Connect](/docs/connect) dan memicu penerusan ke Lingkungan Kustom. Ini memungkinkan penerapan staging atau QA untuk menggunakan konektor tanpa mengaktifkannya di lingkungan Connect bawaan mana pun: Produksi, Pratinjau, atau Pengembangan.

Di Dasbor Vercel, buka bagian Proyek konektor dan pilih Lingkungan Kustom saat menambahkan atau mengedit tautan proyek. Dari CLI, berikan slug lingkungan:

```bash
vercel connect attach slack/acme-slack --environment staging
```

Anda juga dapat memilih Lingkungan Kustom sebagai tujuan pemicu di dasbor atau melalui CLI:

```bash
vercel connect attach slack/acme-slack --environment staging --triggers \
  --trigger-environment staging --trigger-path /api/slack-events
```

Target pemicu ditambahkan ke tautan proyek konektor secara otomatis. Untuk proyek tanpa tujuan pemicu yang ada, meneruskan `--environment staging`, seperti yang ditunjukkan di atas, membatasi akses token ke `staging`. Tujuan pemicu yang ada tetap terdaftar, dan CLI mempertahankan Lingkungan Kustom apa pun yang mereka perlukan pada tautan proyek. Sebelum mengirim peristiwa ke Lingkungan Kustom, sebarkan ke lingkungan tersebut dan [tetapkan domain](/docs/domains/working-with-domains/add-a-domain-to-environment) ke lingkungan tersebut. Domain harus diverifikasi dan melayani penyebaran terbaru lingkungan secara langsung, bukan mengalihkan ke tempat lain.

Lihat [tautan Proyek](/docs/connect/concepts/project-links) untuk konfigurasi akses token dan [Pemicu](/docs/connect/concepts/triggers) untuk pengaturan tujuan dan perilaku siklus hidup.

### Harga dan batasan

Setiap paket mencakup sejumlah lingkungan khusus per proyek tanpa biaya tambahan. Anda dapat membeli lebih banyak untuk proyek apa pun dalam paket berisi lima lingkungan:

| Rencana    | Termasuk per proyek | Lingkungan tambahan                          | Jumlah maksimum per proyek |
| ---------- | ------------------- | -------------------------------------------- | -------------------------- |
| Pro        | 1                   | $50 per bulan untuk setiap paket berisi lima | 16                         |
| Perusahaan | 12                  | $50 per bulan untuk setiap paket berisi lima | 22                         |

Untuk membeli lingkungan kustom tambahan:

1. Buka pengaturan [Lingkungan](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironments&title=Go+to+Environments+settings) proyek Anda di Dasbor Vercel.
2. Di bagian Lingkungan Kustom, gunakan stepper untuk mengatur jumlah lingkungan untuk proyek tersebut.
3. Klik Simpan, lalu konfirmasikan biaya bulanan yang telah diperbarui.

Untuk menghentikan biaya bulanan, kurangi jumlahnya kembali ke jumlah yang termasuk dalam paket Anda di bagian yang sama. Jika proyek menggunakan lebih banyak lingkungan daripada jumlah yang dikurangi, hapus lingkungan kustom terlebih dahulu: pengurangan di bawah penggunaan saat ini tidak diterima.

Paket yang dibeli hanya berlaku untuk satu proyek. Anggota yang memiliki izin untuk memperbarui paket penagihan tim dapat mengubah jumlah paket.

## Sumber daya lainnya

- [Pelajari berbagai lingkungan di Vercel.](https://www.youtube.com/watch?v=nZrAgov_-D8)
