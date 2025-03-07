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
        source: "/dashboard",
        destination: "/dashboard/departamentos/listar-departamentos",
        permanent: true
      }
    ]
  }
};

export default nextConfig;
