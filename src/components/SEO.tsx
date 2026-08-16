import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  jsonLd?: Record<string, unknown>;
}

const SITE = 'https://www.r2nusantara.com';

export default function SEO({
  title = 'R2 Nusantara — Cigarette Tobacco Shop',
  description = 'Distributor rokok grosir R2 & Resmi harga distributor langsung dari gudang Malang. Bayar setelah barang terkonfirmasi terkirim.',
  path = '/',
  jsonLd,
}: SEOProps) {
  const url = `${SITE}${path}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE}/assets/preview.jpg`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#8B5A2B" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/assets/logo.png" />
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
    </Head>
  );
}
