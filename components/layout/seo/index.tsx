import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useTranslation } from 'lib/hooks/useTranslation';

export default function Seo({ metadata }) {
  const { asPath } = useRouter();
  const { locale } = useTranslation();
  const localeLinks = [
    { locale: 'en', path: '' },
    { locale: 'fr', path: '/fr' }
  ]

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {localeLinks.filter(localeLink => localeLink.locale !== locale).map(localeLink => (
          <link key={localeLink.locale} rel="alternate" hrefLang={localeLink.locale} href={`https://wyno.io${localeLink.path + asPath}`} />
        ))}
      </Head>
      <NextSeo
        title={`${metadata.title} | Wyno`}
        description={metadata.description}
        canonical={`https://wyno.io${asPath}`}
        openGraph={{
          site_name: metadata.title,
          type: "website",
          url: `https://wyno.io${asPath}`,
          title: metadata.og_title,
          description: metadata.og_description,
          images: [
            { 
              url: metadata.og_image ? metadata.og_image : 'https://a.storyblok.com/f/102178/2080x1170/0d7b3e0eed/default-open-graph.png',
              width: 2048,
              height: 1170,
              alt: 'Default Wyno Og Image',
            }
          ]
        }}
      />
    </>
  )
}