This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Runtime and release checks

Use Node.js 20.9 or newer. Next.js, React, and the Next ESLint configuration are
pinned in `package-lock.json`; install reproducibly with `npm ci`.

Before publishing a change:

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npm run test:export
npm audit --omit=dev
```

The project uses `output: "export"`. The production build emits the static site
into `out/`, including `robots.txt` and `sitemap.xml`. Serve that folder to preview
the production output; `next start` is not a static-export server. Confirm the
phone link, navigation, resume download, project images, and mobile layout in a
browser before production deployment. The export tests validate contact and
search metadata without adding a browser-test dependency.
