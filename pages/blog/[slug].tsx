import { GetStaticPaths, GetStaticProps } from 'next';
import { getPageData, getGlobalData, getBlogPages } from 'lib/api';
import Layout from 'components/layout';
import Sections from 'components/sections';
import useStoryblok from 'lib/hooks/useStoryblok';

export default function ArticlePage({ globalData, story, preview }) {
  story = useStoryblok(story, preview);

  return (
    <Layout {...globalData} {...story.content}>
      <Sections sections={story.content.body} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {

  const pages = await getBlogPages({ locales })
  const paths = pages.map(page => ({
    params: { slug: page.slug },
    locale: page.locale
  }))

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params: { slug }, preview=false, locale }) => {

  const pageData = await getPageData(['blog', 'article-category', slug], {
    locale,
    preview
  })

  if (!pageData.story) {
    return {
      notFound: true
    }
  }

  const globalData = await getGlobalData({
    locale,
    preview
  })

  return {
    props: {
      globalData,
      story: pageData.story,
      preview
    }
  }
}