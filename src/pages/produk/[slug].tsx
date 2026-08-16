import { GetStaticPaths, GetStaticProps } from 'next';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { Product } from '@/types';
import { formatHarga, productImage } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Minus, Plus } from 'lucide-react';

interface Props {
  product: Product;
  related: Product[];
}

export default function ProdukDetail({ product, related }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'IDR',
      price: product.price,
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <SEO title={`${product.name} — R2 Nusantara`} description={product.description} path={`/produk/${product.slug}`} jsonLd={jsonLd} />
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <nav className="mb-4 text-xs text-neutral-500">
          Beranda / <a href={`/katalog?kategori=${product.category}`} className="hover:underline">Katalog {product.category === 'resmi' ? 'Resmi' : 'R2'}</a> / {product.name}
        </nav>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
            <img src={productImage(product)} alt={product.name} className="aspect-square w-full object-cover" />
          </div>

          <div>
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold text-white ${product.category === 'resmi' ? 'bg-tembakau-700' : 'bg-emas-600'}`}>
              {product.category === 'resmi' ? 'RESMI' : 'R2'}
            </span>
            {product.subcategory && <span className="ml-2 text-xs uppercase text-neutral-500">{product.subcategory}</span>}

            <h1 className="mt-3 font-poppins text-2xl font-bold text-neutral-900 dark:text-neutral-100">{product.name}</h1>
            <p className="mt-1 text-xs text-neutral-500">SKU: {product.sku}</p>

            <p className="mt-4 text-3xl font-bold text-tembakau-700 dark:text-emas-400">{formatHarga(product.price)}</p>
            <p className="mt-1 text-sm text-neutral-500">
              {product.stock > 0 ? `Stok tersedia: ${product.stock} slop` : 'Stok sedang habis'}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{product.description}</p>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center rounded-lg border border-neutral-300 dark:border-neutral-700">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2">
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="p-2">
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={() => addItem(product, qty)}
                disabled={product.stock <= 0}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-tembakau-700 py-3 text-sm font-semibold text-white hover:bg-tembakau-800 disabled:bg-neutral-300"
              >
                <ShoppingCart size={18} /> Tambah ke Keranjang
              </button>
            </div>

            <div className="mt-6 rounded-lg bg-tembakau-50 p-3 text-xs text-tembakau-800 dark:bg-neutral-900 dark:text-emas-300">
              💳 Bayar setelah barang terkonfirmasi terkirim (resi keluar & dapat dicek). Bukan transfer di awal, bukan
              COD.
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-4 font-poppins text-lg font-bold text-tembakau-800 dark:text-emas-400">Produk Terkait</h2>
            <ul className="products grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </ul>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: products.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const product = products.find((p) => p.slug === params?.slug);
  if (!product) return { notFound: true };
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  return { props: { product, related } };
};
