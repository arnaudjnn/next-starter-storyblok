import { GetStaticProps } from 'next';
import { getPageData, getGlobalData } from 'lib/api';
import Layout from 'components/layout';
import Sections from 'components/sections';
import useStoryblok from 'lib/hooks/useStoryblok';

export default function BlogPage({ globalData, story, preview }) {
  story = useStoryblok(story, preview);

  return (
    <Layout {...globalData} {...story.content}>
      <Sections sections={story.content.body} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview=false, locale }) => {

  const pageData = await getPageData(['blog'], {
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
      story: pageData ? pageData.story : false,
      preview
    }
  }
}