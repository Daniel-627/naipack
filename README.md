# Naipack website

Next.js (App Router) site with the Sanity Studio embedded at `/studio`.
Pages: Home (with the auto-advancing hero slider), Products, Get a quote, Contact.
Every quote and contact button opens WhatsApp with the message already written.

The site runs straight away on built-in content. Connect Sanity when you want to edit it from the Studio.

## What you need

- Node.js 22 (22.12 or newer). Sanity 6 needs it, and `package.json` pins Node 22 so Vercel builds with the same version. Check with `node -v`.
- A free Sanity account (only when you connect the CMS).

## Set up

1. Copy the contents of this folder into your empty project folder, so `package.json` sits directly inside it.
2. In a terminal opened in that folder:

   ```bash
   npm install
   git init
   ```

3. Create your environment file (Windows: `copy .env.example .env.local`, Mac/Linux: `cp .env.example .env.local`).
4. Start the site:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000.

When you are ready for a first commit: `git add .` then `git commit -m "Initial Naipack site"`.
`.env.local` is already ignored by git, so your keys stay out of the repository.

## Connect Sanity (the CMS)

1. Go to https://www.sanity.io/manage, create a project (free plan is fine), and copy its **Project ID**.
2. Paste it into `.env.local` after `NEXT_PUBLIC_SANITY_PROJECT_ID=`. Leave `NEXT_PUBLIC_SANITY_DATASET=production`.
3. In the project's **API** settings on sanity.io, under **CORS origins**, add `http://localhost:3000` and tick **Allow credentials**. Add your live address here too when you deploy.
4. Restart `npm run dev`, then open http://localhost:3000/studio and sign in.
5. Load the current products, questions and settings into the Studio once:

   ```bash
   npx sanity login
   npm run seed
   ```

   The seed only adds documents that do not exist yet, so running it again will not overwrite your edits.

## What you edit in the Studio

| Where | What it controls |
| --- | --- |
| Site settings | WhatsApp number (digits with country code, e.g. `254712345678`), address, map search, opening hours, TikTok link, homepage headline, logo |
| Products | Name, short line, description, photo, and the options each product offers. The options feed both the Products page and the quote form drop-downs |
| Recent work | Job photos for the homepage gallery. The first photo is shown largest |
| Questions | The questions on the Products page |

- Add a product photo and it replaces the drawing in the hero slider and on the Products page.
- Changes appear on the site within about a minute.
- Until the WhatsApp number is set, buttons open WhatsApp and let the visitor choose the chat.

## Before going live

- Set the WhatsApp number, opening hours and photos in the Studio.
- Set `NEXT_PUBLIC_SHOW_PREVIEW_BANNER=false` (or delete the line) to remove the "design preview" strip. While it is `true`, empty Recent work shows placeholder tiles; when it is off, that section stays hidden until photos are added.
- Set `NEXT_PUBLIC_SITE_URL` to the real address (used for the sitemap and link previews).
- Upload the real logo in Site settings. Until then a text version is shown.

## Put it on GitHub (PowerShell)

Create an empty repository on GitHub first (no README, no .gitignore, no license), then in the folder that holds this project:

```powershell
git init -b main
git add .
git commit -m "Initial Naipack site"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Deploy on Vercel (no local install needed)

Vercel runs `npm install` and the build for you.

1. On vercel.com choose **Add New, Project** and import the GitHub repository. Vercel detects Next.js; leave the build settings as they are.
2. Under **Environment Variables** add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` (from sanity.io/manage; leave out to run on the built-in content)
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - `NEXT_PUBLIC_SITE_URL` = the live address, e.g. `https://naipack.co.ke`
   - `NEXT_PUBLIC_SHOW_PREVIEW_BANNER` = `true` while it is a preview, `false` when it goes live
3. Click **Deploy**.
4. In your Sanity project (sanity.io/manage, **API**, **CORS origins**) add the Vercel address and your own domain, with **Allow credentials** ticked. Then open `https://<your-address>/studio` and sign in.

`NEXT_PUBLIC_` values are baked in at build time, so redeploy after changing them. Content edits made in the Studio appear on the site within about a minute without a redeploy.

If you skip `npm run seed`, the site keeps showing its built-in products and questions. As soon as you create your first product in the Studio, the Products pages switch to the Studio's list, so create all five or run the seed once.

## Project map

```
app/(site)/                 The public pages (home, products, quote, contact)
app/(studio)/studio/        The embedded Sanity Studio route
components/                 Header, hero slider, quote form, and so on
sanity/schemaTypes/         Content types: siteSettings, product, galleryItem, faq
sanity.config.ts            Studio setup (mounted at /studio)
content/defaults.json       Built-in content, used until the CMS has documents
lib/content.ts              Loads content from Sanity, falls back to defaults
styles/globals.css          All styling
scripts/make-seed.mjs       Builds the seed file for `npm run seed`
```

## Commands

- `npm run dev` start the site locally
- `npm run build` and `npm run start` production build and server
- `npm run typecheck` check TypeScript
- `npm run seed` load the starting content into Sanity
