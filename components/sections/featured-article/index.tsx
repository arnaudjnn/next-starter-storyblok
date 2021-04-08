import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { Container } from 'components/common/container';
import ArticleCard from 'components/sections/articles/card';
import { useRouter } from 'next/router';

export default function FeaturedArticle({ article }) {
  const router = useRouter();

  useEffect(() => {
    if(!article) {
      router.push('/')
    }
  }, [article])

  if(!article) {
    return null
  }

  return (
    <Container as="section" layerStyle="green" overflow="visible" size="pt50ptHeader">
      {/* <Box mb={{ base: '-11rem', lg: '-18rem' }}> */}
        <ArticleCard 
          direction="row" 
          titleStyle={{ base: 'h5', lg: 'h3'}} 
          titleAs="h1"
          padding="10"
          minHeight="30rem"
          {...article} 
        />
      {/* </Box> */}
    </Container>
  )
}