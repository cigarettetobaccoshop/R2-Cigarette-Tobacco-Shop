import { CartItem, OrderCustomer } from '@/types';
import { formatHarga } from './utils';

export const WA_NOMOR_UTAMA = '6285715905079';
export const WA_ALT_1 = '6283169386894';
export const WA_ALT_2 = '6283194076155';

export function buildWhatsAppMessage(customer: OrderCustomer, items: CartItem[], total: number): string {
  const daftarPesanan = items
    .map(
      (it, i) =>
        `${i + 1}. ${it.product.name} (${it.product.category === 'resmi' ? 'Resmi' : 'R2'}) x${it.qty} — ${formatHarga(
          it.product.price * it.qty
        )}`
    )
    .join('\n');

  return `📝 *FORMULIR PEMESANAN ROKOK*
*R2 Nusantara – Cigarette Tobacco Shop*

*Data Pemesan:*
Nama Lengkap: ${customer.nama}
Nomor HP/WhatsApp: ${customer.whatsapp}
Alamat Lengkap Pengiriman: ${customer.alamat}
Patokan Lokasi: ${customer.patokan || '-'}
Ekspedisi Pilihan: ${customer.ekspedisi}

*Detail Pesanan:*
${daftarPesanan}

*Total: ${formatHarga(total)}*

*Mekanisme Pembayaran:*
Pembayaran dilakukan SETELAH barang terkonfirmasi terkirim (resi keluar & dapat dicek). Mohon konfirmasi ketersediaan stok dan proses pengiriman. Terima kasih 🙏`;
}

export function buildWhatsAppLink(message: string, nomor: string = WA_NOMOR_UTAMA): string {
  return `https://wa.me/${nomor}?text=${encodeURIComponent(message)}`;
}
