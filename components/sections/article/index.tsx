import { useEffect } from 'react';
import { Box, Heading, Stack, Grid, StackDivider, Link, Avatar, Text, useColorModeValue } from '@chakra-ui/react';
import { Container } from 'components/common/container';
import RichText from 'components/common/rich-text';
import { useTranslation } from 'lib/hooks/useTranslation';
import { SocialsShare }from 'components/common/socials';
import Image from 'next/image';
import NextLink from 'next/link';
import Seo from './seo';
import { useRouter } from 'next/router';

export default function ArticleSection({ article, containerSize }) {
  const router = useRouter();
  const { t, locale } = useTranslation();
  const authorCardLayerStyle = useColorModeValue('gray', 'gray.800');

  useEffect(() => {
    if(!article.content.locales.includes(locale)) {
      router.push('/blog')
    }
  }, [article])
  
  return (
    <article>
      <Seo article={article} />
      <Container size={containerSize} layerStyle="green" overflow="visible">
        <Box maxWidth={{ base: '100%', lg: '75%' }} mx="auto" textAlign="center">
          <Stack
            direction="row"
            divider={<StackDivider borderColor="white" height="12px" alignSelf="center" />}
            justifyContent="center"
            mb="5"
          >
            <NextLink href={article.content.category.slug}>
              <Link>{article.content.category.content.title}</Link>
            </NextLink>
            <Box as="time">{new Date(article.publishedDate).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })}</Box>
            <Box>{article.content.minReading + ' ' + t['minRead']}</Box>
          </Stack>
          <Heading as="h1" textStyle="h1" mb="16">{article.content.title}</Heading>
        </Box>
        <Box maxWidth={{ base: '100%', lg: '90%' }} mx="auto" mb={{ base: '-12rem', lg: '-20rem' }}>
          <Box as="figure" position="relative" minHeight={{ base: '20rem', lg: '30rem' }} width="100%" zIndex="1">
            <Image 
              src={article.content.coverImage.filename}
              alt={article.content.coverImage.alt}
              layout="fill"
              objectFit="cover"
            />
          </Box>
        </Box>
      </Container>
      <Container size="ptHeader" layerStyles={{ dark: 'black', light: 'white' }}>
        <Box maxWidth={{ base: '100%', lg: '75%' }} mx="auto">
          <RichText content={article.content.content}/>
          <Box borderTop="1px solid" borderColor="gray.100" py="5">
            <SocialsShare 
              title={article.content.title}
              description={article.content.description}
              media={article.content.coverImage.filename}
              facebook
              linkedin
              twitter
              pinterest
            />
          </Box>
          <Grid gridTemplateColumns={{ base: '1fr', lg: '1fr auto'}} gridGap="10" layerStyle={authorCardLayerStyle} borderRadius="xl" p="10" mt="10">
            <Avatar 
              name={article.content.author.content.name} 
              src={article.content.author.content.avatar.filename}
              size="lg"
            />
            <Box>
              <Heading as="p" mb="3">{article.content.author.content.name}</Heading>
              <Text>{article.content.author.content.description}</Text>
            </Box>
          </Grid>
        </Box>
      </Container>
    </article>
  )
}