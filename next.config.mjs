/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['llamaindex', 'onnxruntime-node'],
    },
    webpack: (config) => {
        config.externals.push({
            "onnxruntime-node": "commonjs onnxruntime-node",
            sharp: "commonjs sharp",
        });
        return config;
    },
};

export default nextConfig;
