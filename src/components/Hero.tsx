import Link from 'next/link';

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[420px] items-center overflow-hidden bg-tembakau-900 bg-cover bg-center text-white"
      style={{ backgroundImage: "linear-gradient(rgba(30,17,8,.75),rgba(30,17,8,.85)), url('/assets/hero-bg.jpg')" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:text-left">
        <p className="font-poppins text-xs uppercase tracking-[0.3em] text-emas-400">Distributor Grosir Terpercaya</p>
        <h1 className="mt-3 font-poppins text-3xl font-bold leading-tight sm:text-5xl">
          R2 Nusantara
          <span className="mt-1 block text-lg font-medium text-emas-300 sm:text-2xl">Cigarette Tobacco Shop</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-neutral-200 sm:mx-0 sm:text-base">
          Rokok grosir R2 & Resmi harga distributor langsung dari gudang Malang. Bayar setelah barang terkonfirmasi
          terkirim.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:justify-start">
          <Link
            href="/katalog?kategori=r2"
            className="rounded-full bg-emas-500 px-6 py-3 text-sm font-semibold text-tembakau-900 shadow-lg transition-transform hover:scale-105"
          >
            Lihat Katalog R2
          </Link>
          <Link
            href="/katalog?kategori=resmi"
            className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Lihat Katalog Resmi
          </Link>
        </div>
      </div>
    </section>
  );
}
