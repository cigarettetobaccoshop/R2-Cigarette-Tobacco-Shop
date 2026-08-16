import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { WA_NOMOR_UTAMA, buildWhatsAppLink } from '@/lib/whatsapp';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Kontak() {
  return (
    <>
      <SEO title="Kontak — R2 Nusantara" path="/kontak" />
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="mb-6 font-poppins text-2xl font-bold text-tembakau-800 dark:text-emas-400">Kontak Kami</h1>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex gap-3 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
              <MapPin className="mt-1 shrink-0 text-tembakau-700 dark:text-emas-400" />
              <div>
                <p className="font-semibold">Gudang Distributor R2 Nusantara</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  WJMC+WG8, Karangduren, Kec. Pakisaji, Kabupaten Malang, Jawa Timur 65162
                </p>
                <a
                  href="https://maps.app.goo.gl/KNET5b2NcHVUH1c57?g_st=ac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-tembakau-700 hover:underline dark:text-emas-400"
                >
                  Buka di Google Maps →
                </a>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
              <Phone className="mt-1 shrink-0 text-tembakau-700 dark:text-emas-400" />
              <div className="text-sm text-neutral-600 dark:text-neutral-300">
                <p>0857-1590-5079 (WhatsApp Utama)</p>
                <p>0831-6938-6894 (Alternatif 1)</p>
                <p>0831-9407-6155 (Alternatif 2)</p>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
              <Mail className="mt-1 shrink-0 text-tembakau-700 dark:text-emas-400" />
              <p className="text-sm text-neutral-600 dark:text-neutral-300">cigaratetobacoshop@gmail.com</p>
            </div>

            <a
              href={buildWhatsAppLink('Halo R2 Nusantara, saya ingin bertanya.', WA_NOMOR_UTAMA)}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg bg-green-600 py-3 text-center text-sm font-semibold text-white hover:bg-green-700"
            >
              Chat via WhatsApp
            </a>
          </div>

          <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
            <iframe
              title="Lokasi R2 Nusantara"
              src="https://www.google.com/maps?q=WJMC%2BWG8+Karangduren+Pakisaji+Malang&output=embed"
              width="100%"
              height="100%"
              style={{ minHeight: 320, border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
