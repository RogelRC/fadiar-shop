import { Phone } from "lucide-react";
import Image from "next/image";

export default function Whatsapp() {
  return (
    <div className="fixed bottom-8 right-8 z-40 animate-bounce">
      <a
        href="https://wa.me/+5363513228"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      >
        <Image src="/whatsapp-xxl.webp" alt="Whatsapp" width={32} height={32} />
      </a>
    </div>
  );
}
