import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SEO from '@/components/SEO';
import { supabase, supabaseEnabled } from '@/lib/supabaseClient';
import { formatHarga } from '@/lib/utils';
import { Order, OrderStatus } from '@/types';

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'Pending',
  diproses: 'Diproses',
  dikirim: 'Dikirim',
  selesai: 'Selesai',
};

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [resiInput, setResiInput] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!supabaseEnabled || !supabase) {
      setLoading(false);
      return;
    }
    (async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        router.push('/admin/login');
        return;
      }
      await loadOrders();
    })();
  }, []);

  async function loadOrders() {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    setOrders((data as unknown as Order[]) || []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: OrderStatus) {
    if (!supabase) return;
    const resi = resiInput[id];
    await supabase.from('orders').update({ status, resi: resi || undefined }).eq('id', id);
    // Kirim notifikasi WhatsApp ke pelanggan saat status "dikirim" — lihat /api/send-whatsapp
    if (status === 'dikirim') {
      const order = orders.find((o) => o.id === id);
      if (order) {
        fetch('/api/send-whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: order.customer.whatsapp,
            message: `Halo ${order.customer.nama}, pesanan Anda di R2 Nusantara telah dikirim. No. resi: ${resi}. Mohon lakukan pembayaran setelah resi aktif dapat dicek. Terima kasih!`,
          }),
        }).catch(() => {});
      }
    }
    loadOrders();
  }

  const revenue = orders.filter((o) => o.status === 'selesai').reduce((s, o) => s + o.total, 0);

  if (!supabaseEnabled) {
    return (
      <>
        <SEO title="Dashboard Admin" path="/admin/dashboard" />
        <main className="mx-auto max-w-2xl px-4 py-16 text-center">
          <h1 className="mb-2 font-poppins text-xl font-bold text-tembakau-800">Supabase Belum Dikonfigurasi</h1>
          <p className="text-sm text-neutral-600">
            Dashboard admin butuh Supabase untuk menyimpan & mengelola pesanan. Ikuti bagian "Setup Supabase" di
            README, lalu isi <code>.env.local</code> dan deploy ulang.
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO title="Dashboard Admin — R2 Nusantara" path="/admin/dashboard" />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-6 font-poppins text-xl font-bold text-tembakau-800">Dashboard Admin</h1>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-neutral-200 p-4">
            <p className="text-xs text-neutral-500">Total Pesanan</p>
            <p className="text-xl font-bold">{orders.length}</p>
          </div>
          <div className="rounded-xl border border-neutral-200 p-4">
            <p className="text-xs text-neutral-500">Pending</p>
            <p className="text-xl font-bold">{orders.filter((o) => o.status === 'pending').length}</p>
          </div>
          <div className="rounded-xl border border-neutral-200 p-4">
            <p className="text-xs text-neutral-500">Dikirim</p>
            <p className="text-xl font-bold">{orders.filter((o) => o.status === 'dikirim').length}</p>
          </div>
          <div className="rounded-xl border border-neutral-200 p-4">
            <p className="text-xs text-neutral-500">Pendapatan (Selesai)</p>
            <p className="text-xl font-bold">{formatHarga(revenue)}</p>
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-neutral-500">Memuat pesanan...</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-left">
                <tr>
                  <th className="p-3">Pemesan</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">No. Resi</th>
                  <th className="p-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t border-neutral-100">
                    <td className="p-3">
                      <p className="font-medium">{o.customer.nama}</p>
                      <p className="text-xs text-neutral-500">{o.customer.whatsapp}</p>
                    </td>
                    <td className="p-3">{formatHarga(o.total)}</td>
                    <td className="p-3">{STATUS_LABEL[o.status]}</td>
                    <td className="p-3">
                      <input
                        defaultValue={o.resi}
                        onChange={(e) => setResiInput((r) => ({ ...r, [o.id]: e.target.value }))}
                        placeholder="Input resi"
                        className="w-32 rounded border border-neutral-300 px-2 py-1 text-xs"
                      />
                    </td>
                    <td className="p-3">
                      <select
                        value={o.status}
                        onChange={(e) => updateStatus(o.id, e.target.value as OrderStatus)}
                        className="rounded border border-neutral-300 px-2 py-1 text-xs"
                      >
                        {Object.entries(STATUS_LABEL).map(([k, v]) => (
                          <option key={k} value={k}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
