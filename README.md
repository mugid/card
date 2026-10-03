# bekslambek.com

Personal portfolio built with Next.js 16, React 19, Tailwind CSS 4, and Motion.

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

The homepage is in `src/app/page.tsx`, with content in `src/components`. The 404 page is in `src/app/not-found.tsx`.

## Ideas

- Add internationalization.
- Add a blog.
- Add an interests section.
