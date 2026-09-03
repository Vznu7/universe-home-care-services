import { siteConfig } from '@/config/site';
import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  return (
    <a
      href={siteConfig.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}

