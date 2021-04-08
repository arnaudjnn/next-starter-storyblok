import { Box, Heading, Grid, LinkBox, LinkOverlay, Link, Button, Flex, Text, Stack, StackDivider, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'lib/hooks/useTranslation';

export default function ArticleCard({ direction="column", titleStyle="h5", titleAs="h2", padding="6", minHeight="initial", slug, publishedDate, content }) {
  const { t, locale } = useTranslation();
  const layerStyle = useColorModeValue('white', 'black')

  return (
    <LinkBox as="article" zIndex="1">
      <Grid gridTemplateColumns={{ base: '1fr', lg: direction === 'row' ? '2fr 3fr' : '1fr' }} minHeight={minHeight} height="100%">
        <Box as="figure" position="relative" minHeight="16rem" order={{ base: 1, lg: direction === 'row' ? 2 : 1 }}>
          <Image 
            src={content.coverImage.filename}
            layout="fill"
            objectFit="cover"
          />
        </Box>
        <Flex flexDirection="column" justifyContent="space-between" layerStyle={layerStyle} p={padding} order={{ base: 2, lg: direction === 'row' ? 1 : 2 }}>
          <Box>
            <Stack
              direction="row"
              divider={<StackDivider borderColor="green.800" height="12px" alignSelf="center" />}
            >
              <NextLink href={`/blog/${content.category.slug}`} passHref>
                <Link>{content.category.content.title}</Link>
              </NextLink>
              <Box as="time">{new Date(publishedDate).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })}</Box>
              <Box>{content.minReading + ' min'}</Box>
            </Stack>
            <Heading as={titleAs as any} textStyle={titleStyle} my="5">
              {content.title}
            </Heading>
            <Text noOfLines={3} mb="5">{content.description}</Text>
          </Box>
          <Box>
            <NextLink href={`/blog/${slug}`} passHref>
              <LinkOverlay borderBottom="2px solid" pb="1">
                {t['readArticle']}
              </LinkOverlay>
            </NextLink>
          </Box>
        </Flex>
      </Grid>
    </LinkBox>
  )
}