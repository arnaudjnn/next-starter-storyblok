import { useState } from 'react';
import { useColorMode, useBreakpointValue, useColorModeValue, Box, Grid, Flex, IconButton, Button, HStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { LogoType } from 'components/common/logos';
import Headroom from 'react-headroom';
import Menu from './menu';
import styles from './styles';

export default function Header({ navItems, actionItems, logoInitialColor, navItemsInitialColor, initialBackground, layout }) {
  const [isPinned, setIsPinned] = useState(false);
  const { colorMode } = useColorMode();
  const actionItemsSize = useBreakpointValue({ base: 'sm', md: 'md'});
  const pinnedColor = useColorModeValue('green.800', 'white')
  
  return (
    <Box as="header">
      <Box 
        as={Headroom}
        sx={styles({ colorMode, initialBackground })}
        onPin={() => setIsPinned(true)}
        onUnfix={() => setIsPinned(false)}
      >
        <Grid gridTemplateColumns={['1fr 90px 1fr', '150px 1fr auto']} gridGap={{ base: 3, lg: 6 }} height={{ base: '60px', lg: '80px'}}>
          <Flex alignItems="center" order={{ base: 2, lg: 1 }}>
            <NextLink href="/">
              <IconButton
                aria-label="Home"
                icon={<LogoType width={{ base: '100%', lg: 'auto' }} color={isPinned ? pinnedColor : logoInitialColor[colorMode]}/>}
                variant="link"
              />
            </NextLink>
          </Flex>
          <Flex justifyContent={{ base: 'flex-start', lg: 'flex-end'}} alignItems="center" order={{ base: 1, lg: 2 }}>
            <HStack as="nav" spacing="6" display={{ base: 'none', lg: 'flex' }}>
              {navItems?.filter(navItem => navItem.link.url !== '/disalow').map(navItem => (
                <NextLink key={navItem._uid} href={navItem.link.url}>
                  <Button variant="link" color={isPinned ? pinnedColor : navItemsInitialColor[colorMode]}>{navItem.text}</Button>
                </NextLink>
              ))}
            </HStack>
            <Box display={{ base: 'block', lg: 'none' }}>
              <Menu navItems={navItems}/>
            </Box>
          </Flex>
          {layout !== 'landing' &&
            <Flex justifyContent="flex-end" alignItems="center" order={3}>
              {actionItems?.map(actionItem => (
                <NextLink key={actionItem._uid} href={actionItem.link.url}>
                  <Button variant={actionItem.variant.split('.')[0]} size={actionItemsSize} colorScheme={actionItem.variant.split('.')[1]}>{actionItem.text}</Button>
                </NextLink>
              ))}
            </Flex>
          }
        </Grid>
      </Box>
    </Box>
  );
};