import { Box, Grid, Heading, Button, Stack} from '@chakra-ui/react';
import { Container } from 'components/common/container';
import ArticleCard from './card';
import NextLink from 'next/link';
import { useTranslation } from 'lib/hooks/useTranslation';
import { useRouter } from 'next/router';

export default function Articles({ title, categories, customSelection, containerSize }) {
  const { t } = useTranslation();
  const { asPath } = useRouter();
  const slug = asPath.split('/')[2] || 'index'
  
  return (
    <Container as="section" size={containerSize}>
      {categories?.length > 1 &&
        <Stack 
          direction="row" 
          justifyContent="center"
          mb={{ base: 5, lg: 10 }} 
          mt={{ base: 10, lg: 20 }}
        >
          <NextLink href="/blog">
            <Button size="sm" variant={slug === 'index' ? 'solid' : 'outline'} colorScheme="green">{t['all']}</Button>
          </NextLink>
          {categories.map(category => (
            <NextLink key={category.slug} href={`/blog/${category.slug}`}>
              <Button size="sm" variant={slug === category.slug ? 'solid' : 'outline'} colorScheme="green">{category.content.title}</Button>
            </NextLink>
          ))}
        </Stack>
      }
      {title &&
        <Box mx="auto" maxWidth={{ base: '100%', lg: '75%' }} textAlign="center">
          <Heading as="h2" textStyle="h2" mb="10">{title}</Heading>
        </Box>
      }
      <Grid gridTemplateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)'}} gridRowGap={{ base: 10, lg: 20 }} gridColumnGap="5">
        {customSelection?.items.map(article => (
          <ArticleCard key={article.slug} {...article}/>
        ))}
      </Grid>
    </Container>
  )
}