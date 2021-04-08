import { useRef } from 'react';
import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  IconButton,
  Button
} from '@chakra-ui/react'
import { BsFillCaretDownFill } from 'react-icons/bs';
import NextLink from 'next/link';

export default function MenuComponent({ navItems }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <IconButton
        ref={btnRef}
        onClick={isOpen ? onClose : onOpen}
        aria-label="Menu"
        icon={<BsFillCaretDownFill />}
        isRound
        transform={isOpen && 'rotate(-180deg)'}
        transition="600ms ease all"
      />
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay zIndex="1050">
          <DrawerContent mt="60px">
            <DrawerBody>
              {navItems.filter(navItem => navItem.link.url !== '/disalow').map(navItem => (
                <NextLink key={navItem._uid} href={navItem.link.url}>
                  <Button variant="ghost" width="100%">{navItem.text}</Button>
                </NextLink>
              ))}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}