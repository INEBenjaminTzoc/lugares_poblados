import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
