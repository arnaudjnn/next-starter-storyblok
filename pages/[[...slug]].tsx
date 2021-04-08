import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { getPageData, getGlobalData, getPages } from 'lib/api';
import Layout from 'components/layout';
import Sections from 'components/sections';
import useStoryblok from 'lib/hooks/useStoryblok';

export default function DynamicPage({ globalData, story, preview }) {
  const router = useRouter();
  story = useStoryblok(story, preview);

  if(router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout {...globalData} {...story.content}>
      <Sections sections={story.content.body} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {

  const pages = await getPages({ locales })
  const paths = pages.map(page => ({
    params: { slug: page.path },
    locale: page.locale
  }))

  return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async ({ params: { slug: slugArray }, preview=false, locale }) => {

  const pageData = await getPageData(slugArray, {
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