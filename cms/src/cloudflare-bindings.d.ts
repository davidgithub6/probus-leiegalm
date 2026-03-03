// Augment the global CloudflareEnv interface used by @opennextjs/cloudflare
// with our project-specific bindings defined in wrangler.jsonc
declare global {
    interface CloudflareEnv {
        D1: D1Database;
        R2: R2Bucket;
    }
}
export {};
