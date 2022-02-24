/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: "/summoners",
				destination: "/",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
