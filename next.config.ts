import type { NextConfig } from "next";

const securityHeaders = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-XSS-Protection", value: "1; mode=block" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
    },
];

const nextConfig: NextConfig = {
    async headers() {
        return [{ source: "/:path*", headers: securityHeaders }];
    },
    async rewrites() {
        // Always proxy /api/* through Next.js so the browser only ever talks to
        // the same origin (localhost in dev, www.grimwald.xyz in prod).
        // This keeps the admin_token cookie same-site and visible to middleware.
        return [
            {
                source: "/api/:path*",
                destination: "https://prices.grimwald.xyz/api/:path*",
            },
        ];
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        remotePatterns:[
            new URL('https://s.namemc.com/**'),
            new URL('https://namemc.com/**'),
            new URL('https://static.grimwald.xyz/**')
        ]
    },
};

export default nextConfig;
