import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // ← Esto permite `next export`
  trailingSlash: true, // ← ¡Esto es lo que te faltaba!
  images: {


    unoptimized: true, // ← Desactiva la optimización para export estático

    remotePatterns: [
      {
        protocol: "https",
        hostname: "app.fadiar.com",
      },
    ],
  },

  // Si estás usando rutas con basePath o i18n, puede que también necesites configurar eso aquí.
};

export default nextConfig;
