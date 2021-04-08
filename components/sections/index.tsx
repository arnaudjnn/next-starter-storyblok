import DynamicComponent from './dynamic';
import PageHero from 'components/sections/page-hero';
import RichText from 'components/sections/rich-text';
import FeatureOne from 'components/sections/features/feature-one';
import Articles from 'components/sections/articles';
import Article from 'components/sections/article';
import FeaturedArticle from 'components/sections/featured-article';

const sectionsIndex = {
  'pageHero': PageHero,
  'richText': RichText,
  'featureOne': FeatureOne,
  'articles': Articles,
  'articleBody': Article,
  'featuredArticle': FeaturedArticle
}

export default function Sections({ sections }) {
  return (
    <>
      {sections.map(section => (
        <DynamicComponent 
          key={section._uid} 
          bloksIndex={sectionsIndex} 
          blok={section}
        />
      ))}
    </>
  )
}