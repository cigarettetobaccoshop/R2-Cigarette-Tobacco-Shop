import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ShoppingCart, Menu, X, Sun, Moon, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const NAV = [
  { href: '/', label: 'Beranda' },
  { href: '/katalog?kategori=r2', label: 'Katalog R2' },
  { href: '/katalog?kategori=resmi', label: 'Katalog Resmi' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/kontak', label: 'Kontak' },
];

export default function Header() {
  const { count, openCart } = useCart();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('r2n_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = saved ? saved === 'dark' : prefersDark;
    setDark(useDark);
    document.documentElement.classList.toggle('dark', useDark);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('r2n_theme', next ? 'dark' : 'light');
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/katalog?cari=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-2">
          <img src="/assets/logo.png" alt="R2 Nusantara" className="h-9 w-9 rounded object-contain" />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-poppins text-base font-bold text-tembakau-800 dark:text-emas-400">
              R2 Nusantara
            </span>
            <span className="text-[10px] uppercase tracking-wider text-neutral-500">
              Cigarette Tobacco Shop
            </span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center gap-6 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-tembakau-700 dark:text-neutral-300 dark:hover:text-emas-400"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={handleSearch} className="ml-auto hidden max-w-xs flex-1 items-center md:flex">
          <div className="flex w-full items-center rounded-full border border-neutral-300 px-3 py-1.5 dark:border-neutral-700">
            <Search size={16} className="text-neutral-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari produk..."
              className="w-full bg-transparent px-2 text-sm outline-none dark:text-neutral-100"
            />
          </div>
        </form>

        <button onClick={toggleTheme} aria-label="Ganti tema" className="rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button onClick={openCart} className="relative rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800" aria-label="Keranjang">
          <ShoppingCart size={22} />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emas-600 text-[11px] font-bold text-tembakau-900">
              {count}
            </span>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-neutral-200 px-4 py-3 md:hidden dark:border-neutral-800">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-2 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
