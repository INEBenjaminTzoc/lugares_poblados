import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true
      },
      {
        source: "/inicio",
        destination: "/inicio/departamentos/listar-departamentos",
        permanent: true
      }
    ]
  }
};

export default nextConfig;
