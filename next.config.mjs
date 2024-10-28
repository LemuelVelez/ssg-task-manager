/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['mdbcdn.b-cdn.net'], // Allow this domain for image loading
    },
    // Uncomment the following lines if you plan to enable PWA support
    // pwa: {
    //   dest: 'public',
    //   disable: process.env.NODE_ENV === 'development', // Disable PWA in development mode
    // },
};

export default nextConfig;
