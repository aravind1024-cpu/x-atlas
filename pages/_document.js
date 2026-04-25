import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="X Atlas — Bangalore's hyper-local intelligence platform for income, investment and lifestyle decisions." />
        <meta property="og:title" content="X Atlas" />
        <meta property="og:description" content="Know before you move. Salary data, property ROI, lifestyle scores — locality-level intelligence for Bangalore." />
        <meta name="theme-color" content="#0e0c08" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
