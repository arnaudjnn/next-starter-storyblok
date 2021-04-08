import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import 'focus-visible/dist/focus-visible';
import { theme } from 'theme';

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={extendTheme(theme as any)}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}