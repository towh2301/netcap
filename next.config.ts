import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "image.tmdb.org",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "phimimg.com",
				pathname: "/**",
			},
		],
	},
};
// module.exports = {
// 	allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
// }

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
