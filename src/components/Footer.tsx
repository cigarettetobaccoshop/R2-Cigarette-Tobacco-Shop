import Link from 'next/link';
import { MapPin, Mail, Phone, Truck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-tembakau-900 text-neutral-200 dark:border-neutral-800">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-poppins text-lg font-bold text-emas-400">R2 Nusantara</h3>
          <p className="mt-1 text-xs uppercase tracking-wider text-neutral-400">Cigarette Tobacco Shop</p>
          <p className="mt-3 flex gap-2 text-sm text-neutral-300">
            <MapPin size={16} className="mt-0.5 shrink-0" />
            Gudang Distributor R2 Nusantara, Karangduren, Kec. Pakisaji, Kabupaten Malang, Jawa Timur 65162
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Kontak</h4>
          <ul className="space-y-2 text-sm text-neutral-300">
            <li className="flex items-center gap-2">
              <Phone size={15} /> 0857-1590-5079 (Utama)
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} /> 0831-6938-6894
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} /> 0831-9407-6155
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} /> cigaratetobacoshop@gmail.com
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Ekspedisi</h4>
          <ul className="space-y-2 text-sm text-neutral-300">
            <li className="flex items-center gap-2"><Truck size={15} /> SiCepat Express</li>
            <li className="flex items-center gap-2"><Truck size={15} /> J&T Express</li>
            <li className="flex items-center gap-2"><Truck size={15} /> Indah Cargo</li>
            <li className="flex items-center gap-2"><Truck size={15} /> JNE</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Tautan</h4>
          <ul className="space-y-2 text-sm text-neutral-300">
            <li><Link href="/faq" className="hover:text-emas-400">Cara Pembayaran (FAQ)</Link></li>
            <li><Link href="/katalog?kategori=r2" className="hover:text-emas-400">Katalog R2</Link></li>
            <li><Link href="/katalog?kategori=resmi" className="hover:text-emas-400">Katalog Resmi</Link></li>
            <li><Link href="/kontak" className="hover:text-emas-400">Kontak</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-3 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} R2 Nusantara — Pembayaran dilakukan setelah barang terkonfirmasi terkirim.
      </div>
    </footer>
  );
}
