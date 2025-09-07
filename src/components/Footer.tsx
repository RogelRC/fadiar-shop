import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#022953] to-[#011b3b] text-white">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Logo y descripción */}
          <div className="space-y-8">
            <div className="flex justify-center md:justify-start">
              <Link href="/" className="block">
                <Image
                  src={"/logo.png"}
                  alt="Fadiar Logo"
                  width={260}
                  height={260}
                  className="hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>
            <div className="space-y-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © 2025 Fadiar. Todos los derechos reservados.
              </p>
            </div>
          </div>

          {/* Información de contacto */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-wider mb-6 text-gray-100 text-center md:text-left">
              CONTÁCTANOS
            </h3>
            <div className="space-y-6 flex flex-col items-center md:items-start">
              <a
                href="tel:+5363513228"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group"
              >
                <svg
                  className="w-5 h-5 text-blue-400 group-hover:text-blue-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+53 63513228</span>
              </a>
              <a
                href="mailto:fadiar.soporte@gmail.com"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors group"
              >
                <svg
                  className="w-5 h-5 text-blue-400 group-hover:text-blue-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>comercial@fadiar.com</span>
              </a>
              <div className="flex items-start space-x-3 text-gray-300">
                <svg
                  className="w-5 h-5 mt-1 flex-shrink-0 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <address className="not-italic text-sm leading-relaxed">
                  Calle 29F entre 114 y 114A,
                  <br />
                  Edificio 11413, Ciudad Libertad,
                  <br />
                  Marianao, La Habana, Cuba
                  <br />
                  <span className="text-blue-300">Almacén 9A (ENAME)</span>
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Mapa */}
        <div className="mt-16">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1588.392229538395!2d-82.43530361034315!3d23.08587264326781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sus!4v1741330516071!5m2!1ses!2sus"
            className="w-full h-[400px] rounded-xl shadow-lg"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </footer>
  );
}
