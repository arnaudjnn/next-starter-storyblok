import { Box, useStyleConfig, useColorMode } from '@chakra-ui/react';

export const Container = ({ size="default", layerStyles = { dark: 'gray.800', light: 'gray' }, ...rest }) => {
  const { colorMode } = useColorMode()

  const styles = useStyleConfig('Container', {
    size
  })

  return <Box layerStyle={layerStyles[colorMode]} overflow="hidden" sx={styles} {...rest} />
}