import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ProductCard from '@/components/ProductCard';
import { products, subcategories } from '@/data/products';
import { ProductCategory } from '@/types';
import { Filter, X } from 'lucide-react';

const PAGE_SIZE = 20;
type SortKey = 'terbaru' | 'harga-asc' | 'harga-desc' | 'nama';

export default function Katalog() {
  const router = useRouter();
  const [kategori, setKategori] = useState<ProductCategory | 'semua'>('semua');
  const [subkategori, setSubkategori] = useState<string | 'semua'>('semua');
  const [cari, setCari] = useState('');
  const [sort, setSort] = useState<SortKey>('terbaru');
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    const q = router.query;
    if (q.kategori === 'r2' || q.kategori === 'resmi') setKategori(q.kategori);
    if (typeof q.cari === 'string') setCari(q.cari);
  }, [router.isReady, router.query]);

  const filtered = useMemo(() => {
    let list = products;
    if (kategori !== 'semua') list = list.filter((p) => p.category === kategori);
    if (subkategori !== 'semua') list = list.filter((p) => p.subcategory === subkategori);
    if (cari.trim()) {
      const q = cari.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    const sorted = [...list];
    if (sort === 'harga-asc') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'harga-desc') sorted.sort((a, b) => b.price - a.price);
    if (sort === 'nama') sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [kategori, subkategori, cari, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => setPage(1), [kategori, subkategori, cari, sort]);

  return (
    <>
      <SEO title="Katalog Produk — R2 Nusantara" path="/katalog" />
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <nav className="mb-4 text-xs text-neutral-500">
          <span>Beranda</span> <span className="mx-1">/</span> <span className="text-tembakau-700 dark:text-emas-400">Katalog</span>
        </nav>

        <div className="mb-4 flex items-center justify-between gap-3">
          <h1 className="font-poppins text-xl font-bold text-tembakau-800 dark:text-emas-400">
            Katalog Produk <span className="text-sm font-normal text-neutral-500">({filtered.length} produk)</span>
          </h1>
          <button
            onClick={() => setShowFilter((v) => !v)}
            className="flex items-center gap-1 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm md:hidden dark:border-neutral-700"
          >
            <Filter size={15} /> Filter
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-[220px_1fr]">
          <aside className={`widget_product_categories ${showFilter ? 'block' : 'hidden'} md:block`}>
            <div className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Kategori</h3>
                <button className="md:hidden" onClick={() => setShowFilter(false)}>
                  <X size={16} />
                </button>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                {(['semua', 'r2', 'resmi'] as const).map((k) => (
                  <button
                    key={k}
                    onClick={() => {
                      setKategori(k);
                      setSubkategori('semua');
                    }}
                    className={`rounded-md px-2 py-1.5 text-left ${
                      kategori === k
                        ? 'bg-tembakau-700 text-white'
                        : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {k === 'semua' ? 'Semua Produk' : k === 'r2' ? 'Katalog R2' : 'Katalog Resmi'}
                  </button>
                ))}
              </div>

              {kategori === 'resmi' && (
                <>
                  <h3 className="mb-2 mt-4 text-sm font-semibold">Segmen</h3>
                  <div className="flex flex-col gap-1 text-sm">
                    <button
                      onClick={() => setSubkategori('semua')}
                      className={`rounded-md px-2 py-1.5 text-left ${
                        subkategori === 'semua' ? 'bg-tembakau-700 text-white' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      Semua Segmen
                    </button>
                    {subcategories.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSubkategori(s)}
                        className={`rounded-md px-2 py-1.5 text-left ${
                          subkategori === s ? 'bg-tembakau-700 text-white' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </aside>

          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <input
                value={cari}
                onChange={(e) => setCari(e.target.value)}
                placeholder="Cari produk di katalog..."
                className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              >
                <option value="terbaru">Urutkan: Terbaru</option>
                <option value="harga-asc">Harga Terendah</option>
                <option value="harga-desc">Harga Tertinggi</option>
                <option value="nama">Nama A-Z</option>
              </select>
            </div>

            {paged.length === 0 ? (
              <p className="py-16 text-center text-sm text-neutral-500">Produk tidak ditemukan.</p>
            ) : (
              <ul className="products grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {paged.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </ul>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => {
                      setPage(n);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`h-9 w-9 rounded-lg text-sm font-medium ${
                      page === n ? 'bg-tembakau-700 text-white' : 'border border-neutral-300 dark:border-neutral-700'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
