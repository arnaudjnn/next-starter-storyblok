import { Box, Heading } from '@chakra-ui/react';
import { Container } from 'components/common/container';

export default function PageHero({ title, titleAs="h1", titleStyle="h1", containerSize }) {
  return (
    <Container size={containerSize}>
      <Box textAlign="center" mx="auto" maxWidth={{ base: '100%', lg: '75%' }}>
        <Heading as={titleAs as any} textStyle={titleStyle}>{title}</Heading>
      </Box>
    </Container>
  )
}