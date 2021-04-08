import {
  useColorMode,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = ({ color="rgb(255, 255, 255, .8)" }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <IconButton
      size="md"
      fontSize="lg"
      bg="transparent"
      color={color}
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${colorMode} mode`}
      _hover={{ bg: 'rgb(255, 255, 255, .2)' }}
    />
  )
}