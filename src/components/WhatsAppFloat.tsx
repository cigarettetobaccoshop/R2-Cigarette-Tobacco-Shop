import { MessageCircle } from 'lucide-react';
import { WA_NOMOR_UTAMA, buildWhatsAppLink } from '@/lib/whatsapp';

export default function WhatsAppFloat() {
  const link = buildWhatsAppLink(
    'Halo R2 Nusantara, saya ingin bertanya tentang produk rokok grosir.',
    WA_NOMOR_UTAMA
  );

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
