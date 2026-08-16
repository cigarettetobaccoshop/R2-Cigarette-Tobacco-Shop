import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function Tentang() {
  return (
    <>
      <SEO title="Tentang Kami — R2 Nusantara" path="/tentang" />
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="mb-4 font-poppins text-2xl font-bold text-tembakau-800 dark:text-emas-400">Tentang R2 Nusantara</h1>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          R2 Nusantara adalah distributor rokok grosir yang berbasis di Malang, Jawa Timur, melayani penjualan produk
          kategori <strong>R2</strong> dan <strong>Resmi</strong> dengan harga distributor langsung dari gudang. Kami
          bekerja sama dengan ekspedisi terpercaya — SiCepat Express, J&T Express, Indah Cargo, dan JNE — untuk
          memastikan pesanan Anda sampai dengan aman dan cepat ke seluruh Indonesia.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          Kami menerapkan mekanisme pembayaran yang mengutamakan kenyamanan pelanggan: pembayaran dilakukan setelah
          barang terkonfirmasi terkirim, bukan transfer di awal maupun COD.
        </p>
      </main>
      <Footer />
    </>
  );
}
