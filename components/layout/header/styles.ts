const HeaderStyles = ({ colorMode, initialBackground }) => ({
  position: 'absolute',
  width: '100%',
  zIndex: 'sticky',
  '.headroom': {
    px: {
      base: 5,
      lg: 24
    },
    bg: colorMode === 'dark' ? 'gray.800' : 'white',
  },
  '.headroom--unfixed': {
    bg: colorMode === 'dark' ? initialBackground.dark : initialBackground.light,
  },
})
export default HeaderStyles