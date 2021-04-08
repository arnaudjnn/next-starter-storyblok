import { Container } from 'components/common/container';
import RichTextContent from 'components/common/rich-text';
import { Box } from '@chakra-ui/react';

export default function RichText({ content }) {
  return (
    <Container size="pt0">
      <Box mx="auto" maxW={{ base: '100%', lg: '75%' }}>
        <RichTextContent content={content} />
      </Box>
    </Container>
  )
}