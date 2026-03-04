# Probus Leiegalm Website

Modern, premium rebuild of the Probus Leiegalm Menen-Wevelgem website, featuring a SvelteKit frontend and a Payload CMS backend deployed on Cloudflare.

## Project Structure

- `/` (Root): The SvelteKit frontend application.
- `/cms`: The Payload CMS application (Next.js).

## Frontend (SvelteKit)

To develop the frontend locally:

```bash
npm install
npm run dev
```

## Backend (Payload CMS)

The CMS is configured to run on Cloudflare Workers using D1 for the database and R2 for storage.

To develop the CMS locally:

```bash
cd cms
npm install
npm run dev
```
By default, this will run the CMS locally and connect to a local development D1 database via Wrangler.

### Connecting Local CMS to Remote D1 Database

If you need to run the CMS locally but connect to the **remote production Cloudflare D1 database** (for example, to debug data issues or Lexical errors that only appear in production), you can use the `CLOUDFLARE_REMOTE` environment variable we have configured.

**On Windows (PowerShell):**
```powershell
$env:CLOUDFLARE_REMOTE="true"; npm run dev
```

**On Mac/Linux (Bash):**
```bash
CLOUDFLARE_REMOTE=true npm run dev
```

This sets the `remoteBindings: true` flag in the Cloudflare context, instructing Wrangler to connect to the remote D1 database instead of the local SQLite file.

(Note: You also need to authenticate with Wrangler using `npx wrangler login` if you haven't already).
