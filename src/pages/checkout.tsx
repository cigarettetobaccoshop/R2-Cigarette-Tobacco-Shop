import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useCart } from '@/context/CartContext';
import { formatHarga } from '@/lib/utils';
import { buildWhatsAppMessage, buildWhatsAppLink } from '@/lib/whatsapp';
import { OrderCustomer } from '@/types';

const EKSPEDISI = ['SiCepat Express', 'J&T Express', 'Indah Cargo', 'JNE'];

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<OrderCustomer>({
    nama: '',
    whatsapp: '',
    alamat: '',
    patokan: '',
    ekspedisi: EKSPEDISI[0],
  });
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof OrderCustomer>(key: K, value: OrderCustomer[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);

    // Opsional: simpan pesanan ke Supabase jika sudah dikonfigurasi (lihat src/lib/supabaseClient.ts)
    try {
      const { supabase, supabaseEnabled } = await import('@/lib/supabaseClient');
      if (supabaseEnabled && supabase) {
        await supabase.from('orders').insert({
          customer: form,
          items: items.map((it) => ({ product_id: it.product.id, name: it.product.name, qty: it.qty, price: it.product.price })),
          total,
          status: 'pending',
        });
      }
    } catch (err) {
      // Jika Supabase belum dikonfigurasi / gagal, checkout tetap lanjut via WhatsApp
      console.warn('Order belum tersimpan ke database:', err);
    }

    const message = buildWhatsAppMessage(form, items, total);
    const link = buildWhatsAppLink(message);
    clearCart();
    window.open(link, '_blank');
    setSubmitting(false);
    router.push('/');
  }

  if (items.length === 0) {
    return (
      <>
        <SEO title="Checkout — R2 Nusantara" path="/checkout" />
        <Header />
        <main className="mx-auto max-w-xl px-4 py-20 text-center">
          <p className="text-neutral-600 dark:text-neutral-300">Keranjang Anda masih kosong.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO title="Checkout — R2 Nusantara" path="/checkout" />
      <Header />
      <main className="mx-auto grid max-w-5xl gap-8 px-4 py-8 md:grid-cols-[1fr_320px]">
        <form onSubmit={handleSubmit} className="woocommerce-checkout space-y-6">
          <div className="woocommerce-billing-fields rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
            <h2 className="mb-4 font-poppins text-lg font-bold">📝 Formulir Pemesanan Rokok</h2>

            <label className="mb-3 block text-sm">
              Nama Lengkap *
              <input
                required
                value={form.nama}
                onChange={(e) => update('nama', e.target.value)}
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              />
            </label>

            <label className="mb-3 block text-sm">
              Nomor HP/WhatsApp *
              <input
                required
                value={form.whatsapp}
                onChange={(e) => update('whatsapp', e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              />
            </label>

            <label className="mb-3 block text-sm">
              Alamat Lengkap Pengiriman *
              <textarea
                required
                value={form.alamat}
                onChange={(e) => update('alamat', e.target.value)}
                placeholder="Nama Jalan, No. Rumah, RT/RW, Kelurahan, Kecamatan"
                rows={3}
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              />
            </label>

            <label className="mb-3 block text-sm">
              Patokan Lokasi
              <input
                value={form.patokan}
                onChange={(e) => update('patokan', e.target.value)}
                placeholder="Contoh: Sebelah toko kelontong / pagar hitam"
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              />
            </label>

            <label className="block text-sm">
              Ekspedisi *
              <select
                value={form.ekspedisi}
                onChange={(e) => update('ekspedisi', e.target.value)}
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              >
                {EKSPEDISI.map((ex) => (
                  <option key={ex} value={ex}>
                    {ex}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="payment_methods rounded-xl border border-emas-500/40 bg-tembakau-50 p-4 text-sm text-tembakau-900 dark:bg-neutral-900 dark:text-emas-300">
            💳 <strong>Mekanisme Pembayaran:</strong> Pembayaran dilakukan setelah barang terkonfirmasi terkirim
            (resi keluar dan dapat dicek). Bukan transfer di awal, bukan COD.
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
          >
            {submitting ? 'Memproses...' : 'Kirim Pesanan via WhatsApp'}
          </button>
        </form>

        <aside className="woocommerce-checkout-review-order h-fit rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
          <h3 className="mb-3 font-poppins text-base font-bold">Ringkasan Pesanan</h3>
          <ul className="mb-3 space-y-2 text-sm">
            {items.map((it) => (
              <li key={it.product.id} className="flex justify-between gap-2">
                <span className="line-clamp-1">
                  {it.product.name} x{it.qty}
                </span>
                <span className="shrink-0 font-medium">{formatHarga(it.product.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t border-neutral-200 pt-3 text-base font-bold dark:border-neutral-800">
            <span>Total</span>
            <span className="text-tembakau-700 dark:text-emas-400">{formatHarga(total)}</span>
          </div>
        </aside>
      </main>
      <Footer />
    </>
  );
}
