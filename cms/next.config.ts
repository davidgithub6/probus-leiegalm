import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['jose', 'pg-cloudflare'],

    webpack: (webpackConfig: any) => {
        webpackConfig.resolve.extensionAlias = {
            '.cjs': ['.cts', '.cjs'],
            '.js': ['.ts', '.tsx', '.js', '.jsx'],
            '.mjs': ['.mts', '.mjs'],
        }

        // Exclude @vercel/og (OG image WASM) — not needed for CMS admin panel.
        // Saves ~1.4 MiB from the Worker bundle (resvg.wasm + yoga.wasm + font).
        webpackConfig.resolve.alias = {
            ...webpackConfig.resolve.alias,
            'next/dist/compiled/@vercel/og': false,
        }

        return webpackConfig
    },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
