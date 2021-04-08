import { Grid, Box, Heading, Text, useColorMode } from '@chakra-ui/react';
import { Container } from 'components/common/container';
import Image from 'next/image';

export default function FeatureOne({ parts }) {
  const { colorMode } = useColorMode();
  return (
    <Container as="section" size="p0">
      <Grid gridTemplateColumns={{ base: '1fr', lg: '1fr 1fr'}} minHeight="80vh">
        {parts.map((part, index) => {
          if (part.component === 'featureContentPart') {
            return (
              <Container 
                key={part._uid} 
                display="flex"
                alignItems="center"
                size={index > 0 ? 'pl0' : 'default'}
                layerStyles={{ light: part.lightLayerStyle, dark: part.darkLayerStyle }}
              >
                <Box textAlign={eval('({' + part.textAlign + '})')}>
                  <Heading mb="5" as={part.titleAs || 'h2'} textStyle={part.titleStyle}>{part.title}</Heading>
                  <Text color={eval('({' + part.descriptionColor + '})')[colorMode]}>{part.description}</Text>
                </Box>
              </Container>
            )
          }
          if(part.component === 'featureDesignPart') {
            return (
              <Container 
                key={part._uid}
                display="flex"
                size={part.containerSize}
                layerStyles={{ light: part.lightLayerStyle, dark: part.darkLayerStyle }}
              >
                {part.image.filename &&
                  <Box 
                    as="figure" 
                    position="relative" 
                    minHeight="20rem" 
                    width="100%"
                  >
                    <Image 
                      src={part.image.filename}
                      alt={part.image.alt}
                      layout="fill"
                      objectFit="cover"
                    />
                  </Box>
                }
              </Container>
            )
          }
        })}
      </Grid>
    </Container>
  )
}