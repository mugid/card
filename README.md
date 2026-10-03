# bekslambek.com

Personal portfolio built with Next.js 16, React 19, and Tailwind CSS 4.

## Local development

Use pnpm 10.12.1 and a Node.js version supported by Next.js 16.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

The homepage is in `src/app/page.tsx`. The writing and words pages are in `src/app/blog/page.tsx` and `src/app/words/page.tsx`. The 404 page is in `src/app/not-found.tsx`. `public/sounds/` is reserved for future audio assets.

Interaction sounds use Cuelume. The sound toggle persists its setting in the browser.

## Ideas

- Add internationalization.
- Add an interests section.
