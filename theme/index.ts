import Container from './components/container'
import colors from './foundations/colors';
import textStyles from './foundations/textStyles';
import layerStyles from './foundations/layerStyles';

export const theme = {
  colors,
  fonts: {
    body: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "56px",
    "7xl": "64px",
  },
  textStyles,
  layerStyles,
  components: {
    Container,
  },
  styles: {
    global: ({ colorMode }) => ({
      body: {
        color: colorMode === 'dark' ? 'white' : 'green.800',
        bg: colorMode === 'dark' ? 'accent.800' : 'white',
        lineHeight: 1.7,
        fontSize: {
          base: 'md',
          lg: 'lg'
        },
      }
    })
  }
}