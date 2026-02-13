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

## Embedded Superset

1. Copy env template:

```bash
cp .env.local .env.local
```

2. Set these variables:

- `SUPERSET_URL_DEV` / `SUPERSET_URL_PROD` - Superset URL for server-side token generation.
- `SUPERSET_SERVICE_USERNAME` / `SUPERSET_SERVICE_PASSWORD` - Superset service user for `/api/v1/security/login`.
- `NEXT_PUBLIC_SUPERSET_URL_DEV` / `NEXT_PUBLIC_SUPERSET_URL_PROD` - Superset URL for browser embedding.
- `NEXT_PUBLIC_SUPERSET_DASHBOARD_ID` - UUID from Superset `Share -> Embed dashboard`.

3. Open frontend route: `/dashboards/superset`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
