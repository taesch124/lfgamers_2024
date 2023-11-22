/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            // Rewrites all API requests to custom Express server
            {
                source: "/api/:path*",
                destination: "http://localhost:8000/api/:path*",
            }
        ]
    }
}

module.exports = nextConfig
