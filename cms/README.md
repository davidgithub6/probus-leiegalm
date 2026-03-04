# Probus CMS

Next.js application running Payload CMS with Cloudflare D1 database and R2 storage.

## Local Development

Install dependencies:
```bash
npm install
```

Start the development server with local D1 database:
```bash
npm run dev
```

### Developing Locally with Remote Production D1 Database

If you need to connect your local environment to the remote production D1 database (e.g. to inspect production data or debug production-only errors), use the `CLOUDFLARE_REMOTE` environment variable.

**On Windows (PowerShell):**
```powershell
$env:CLOUDFLARE_REMOTE="true"; npm run dev
```

**On Mac/Linux (Bash):**
```bash
CLOUDFLARE_REMOTE=true npm run dev
```

This ensures `getPlatformProxy` passes `{ remoteBindings: true }` so Wrangler accesses the remote Cloudflare resources instead of local ones. You must be authenticated with Cloudflare (`npx wrangler login`) for this to work.
