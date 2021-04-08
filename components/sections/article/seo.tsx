import { NextSeo } from 'next-seo';

export default function ArticleSeo({ article }) {
  return (
    <NextSeo
      openGraph={{
        title: article.content.title,
        description: article.content.description,
        url: `${process.env.VERCEL_URL}/blog/${article.slug}`,
        type: 'article',
        article: {
          publishedTime: article.published_at,
          modifiedTime: article.published_at,
          tags: [ article.content.category.content.title ],
        },
        images: [
          {
            url: article.content.coverImage.filename,
            alt: article.content.coverImage.alt,
          },
        ],
      }}
    />
  )
}