/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['mdbcdn.b-cdn.net'], // Allow this domain for image loading
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};


export default nextConfig;
