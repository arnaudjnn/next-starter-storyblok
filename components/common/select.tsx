import { Box, useStyleConfig, useTheme, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';
import ReactSelect from 'react-select';

export default function Select({ size = "md", variant = "default" , color="rgba(255, 255, 255, 0.8)", ...rest }) {
  const theme = useTheme();
  const styles = useStyleConfig("Select", { size, variant })
  
  const bg = useColorModeValue("white", 'black')
  const borderColor = useColorModeValue(theme.colors.gray['200'], "rgba(255, 255, 255, 0.2)")
  const borderColorHover = useColorModeValue(theme.colors.gray['300'], "rgba(255, 255, 255, 0.30)")

  const defaultStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'transparent',
      borderColor: variant === 'link' ? 'transparent' : borderColor,
      cursor: 'pointer',
      boxShadow: variant === 'link' ? 'none' : state.isFocused && `0 0 0 2px ${theme.colors.blue['600']}`,
      '&:hover': {
        borderColor: variant === 'link' ? 'transparent' : borderColorHover,
        backgroundColor: 'rgba(255, 255, 255, 0.2)'
      },
    }),
    placeholder: (provided, state) => ({
      color
    }),
    singleValue: (provided, state) => ({
      color
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color,
      transition: 'all .2s ease',
      transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
      '&:hover': {
        color
      },
    }),
    menu: (base, state) => ({
      ...base,
      backgroundColor: bg
    }),
    option: (base, state) => ({
      ...base,
      cursor: 'pointer',
      background: state.isSelected ? borderColor : 'transparent',
      color: useColorModeValue(theme.colors.accent['600'], color)
    })
  };

  return <Box as={ReactSelect} instanceId="react-select" styles={defaultStyles} sx={styles} {...rest} />
}