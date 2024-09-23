
/** @type {import('next').NextConfig} */
const nextConfig = {
   typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dmubbitutmxgdeiorvzi.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/cabin-images/**',
            },
        ],
    },

    // enable site to be exported as a static site
    // output:"export",
};

export default nextConfig;
