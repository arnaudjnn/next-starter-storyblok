import { useTheme, Box, Grid } from '@chakra-ui/react';
import Image from 'next/image';
import { render } from 'storyblok-rich-text-react-renderer';

export default function RichText({ content, ...rest}) {
  const { textStyles, layerStyles } = useTheme();

  const styles = {
    h2: {
      ...textStyles.h2,
      fontFamily: 'heading',
      mt: 12,
      mb: 5
    },
    h3: {
      ...textStyles.h5,
      fontFamily: 'heading',
      mt: 12,
      mb: 5
    },
    h4: {
      ...textStyles.h6,
      fontFamily: 'heading',
      mt: 12,
      mb: 5
    },
    p: {
      ...textStyles.p,
      fontFamily: 'body',
      fontSize: 'lg',
      mb: 5,
    },
    ul: {
      pl: 5
    },
    li: {
      pl: 5
    }
  }

  return (
    <Box sx={styles} {...rest}>
      {content.content.map(block => {
        if(block.type === 'blok' && block.attrs.body[0].component === 'imagesGrid') {
          const imagesGrid = block.attrs.body[0]
          return (
            <Box key={imagesGrid._uid} mx="-10%" my="10">
              <Grid gridTemplateColumns={imagesGrid.gridTemplateColumns} gridGap="5">
                {imagesGrid.images.map(image => (
                  <Box
                    key={image.id}
                    as="figure"
                    position="relative"
                    minHeight="30rem"
                  >
                    <Image 
                      src={image.filename}
                      alt={image.alt}
                      layout="fill"
                      objectFit="cover"
                    />
                  </Box>
                ))}
              </Grid>
            </Box>
          )
        }
        return render({ type: 'doc', content: [block] })
      })}
    </Box>
  )
}