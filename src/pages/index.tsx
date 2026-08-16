import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import SEO from '@/components/SEO';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const featured = products.filter((p) => p.category === 'r2').slice(0, 8);
const featuredResmi = products.filter((p) => p.category === 'resmi').slice(0, 8);

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'R2 Nusantara',
    description: 'Distributor rokok grosir R2 & Resmi di Malang, Jawa Timur.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Karangduren, Kec. Pakisaji',
      addressLocality: 'Kabupaten Malang',
      addressRegion: 'Jawa Timur',
      postalCode: '65162',
      addressCountry: 'ID',
    },
    telephone: '+6285715905079',
    email: 'cigaratetobacoshop@gmail.com',
  };

  return (
    <>
      <SEO jsonLd={jsonLd} />
      <Header />
      <main>
        <Hero />

        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-poppins text-xl font-bold text-tembakau-800 dark:text-emas-400">Produk R2 Pilihan</h2>
            <Link href="/katalog?kategori=r2" className="text-sm font-medium text-tembakau-700 hover:underline dark:text-emas-400">
              Lihat semua →
            </Link>
          </div>
          <ul className="products grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-poppins text-xl font-bold text-tembakau-800 dark:text-emas-400">Produk Resmi Pilihan</h2>
            <Link href="/katalog?kategori=resmi" className="text-sm font-medium text-tembakau-700 hover:underline dark:text-emas-400">
              Lihat semua →
            </Link>
          </div>
          <ul className="products grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featuredResmi.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </ul>
        </section>

        <section className="bg-tembakau-50 py-12 dark:bg-neutral-900">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-poppins text-xl font-bold text-tembakau-800 dark:text-emas-400">
              Bayar Setelah Barang Terkirim
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
              Bukan transfer di awal, bukan COD. Anda membayar setelah pesanan terkonfirmasi terkirim dan nomor resi
              aktif dapat dicek. Baca selengkapnya di halaman{' '}
              <Link href="/faq" className="font-semibold text-tembakau-700 underline dark:text-emas-400">
                FAQ
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
