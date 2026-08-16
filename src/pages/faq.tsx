import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { ChevronDown } from 'lucide-react';

const FAQ_LIST = [
  {
    q: 'Bagaimana mekanisme pembayaran di R2 Nusantara?',
    a: 'Pembayaran dilakukan SETELAH barang terkonfirmasi terkirim, yaitu setelah nomor resi keluar dan dapat dicek statusnya. Ini bukan sistem transfer di awal, dan juga bukan COD (bayar di tempat saat barang tiba). Anda melakukan pembayaran begitu resi aktif menunjukkan barang sudah dalam proses pengiriman.',
  },
  {
    q: 'Kenapa bukan transfer di awal atau COD?',
    a: 'Sistem ini dirancang agar pelanggan merasa lebih aman: Anda memastikan pesanan benar-benar diproses dan dikirim (resi keluar) sebelum melakukan pembayaran, tanpa perlu menunggu kurir datang seperti COD.',
  },
  {
    q: 'Bagaimana cara memesan?',
    a: 'Pilih produk dari Katalog R2 atau Katalog Resmi, tambahkan ke keranjang, lalu lengkapi formulir di halaman Checkout. Setelah submit, pesanan akan diteruskan ke WhatsApp admin dengan rincian lengkap.',
  },
  {
    q: 'Ekspedisi apa saja yang tersedia?',
    a: 'SiCepat Express, J&T Express, Indah Cargo, dan JNE. Anda dapat memilih ekspedisi saat checkout.',
  },
  {
    q: 'Apa bedanya kategori R2 dan Resmi?',
    a: 'R2 adalah lini produk dengan harga grosir distributor R2 Nusantara. Resmi adalah produk rokok bercukai resmi/legal dari berbagai merek, dikelompokkan menurut segmen pasar (Mild, Kretek Filter, Kretek Tangan, SPM Internasional, dll).',
  },
  {
    q: 'Bagaimana jika resi sudah keluar tapi saya belum menerima instruksi pembayaran?',
    a: 'Admin akan mengirimkan nomor resi beserta instruksi pembayaran melalui WhatsApp begitu status pesanan berubah menjadi "Dikirim". Jika belum menerima setelah 1x24 jam, silakan hubungi WhatsApp utama kami.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_LIST.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <SEO title="FAQ — Cara Pembayaran R2 Nusantara" path="/faq" jsonLd={jsonLd} />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="mb-6 font-poppins text-2xl font-bold text-tembakau-800 dark:text-emas-400">
          Pertanyaan Umum (FAQ)
        </h1>
        <div className="space-y-3">
          {FAQ_LIST.map((f, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between p-4 text-left text-sm font-semibold"
              >
                {f.q}
                <ChevronDown className={`shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} size={18} />
              </button>
              {open === i && (
                <p className="px-4 pb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
