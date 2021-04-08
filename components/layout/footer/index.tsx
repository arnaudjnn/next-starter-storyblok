import { Box, Button, Grid, Flex, Text, Stack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Container } from 'components/common/container';
import { LogoType } from 'components/common/logos';
import { ColorModeSwitcher } from 'components/common/color-mode-switcher';
import LangSelect from 'components/common/lang-select';

export default function Footer({ copyright, text, nav, layout }) {

  return (
    <footer>
      <Container 
        layerStyle="green"
        size="py50"
      >
        <Grid gridTemplateColumns={{ base: '1fr', lg: '1fr 2fr' }} gridRowGap="5" gridColumnGap="20">
          <Flex>
            <Box>
              <LogoType color="white" width="auto"/>
              <Text mt="10" mb="5" color="gray.300">{text}</Text>
            </Box>
          </Flex>
          <Flex alignItems="center" position="relative">
            <Stack as="nav" spacing="5">
              {nav[0].navItems.filter(navItem => navItem.link.url !== '/disalow').map(navItem => (
                <NextLink key={navItem._uid} href={navItem.link.url}>
                  <Button variant="link" color="white" fontSize="2xl" justifyContent="left">
                    {navItem.text}
                  </Button>
                </NextLink>
              ))}
            </Stack>
          </Flex>
        </Grid>
      </Container>
      <Container size="py0" layerStyle="green" overflow="visible">
        <Grid gridTemplateColumns={{ base: '1fr', lg: '1fr 1fr' }} gridGap="5" py="5" borderTop="1px solid" borderColor="rgb(255, 255, 255, .4)">
          <Flex alignItems="center">
            <Text fontSize="md" display="flex" flexDirection={{ base: 'column', lg: 'row' }} textAlign="center">
              {copyright}
            </Text>
          </Flex>
          <Flex alignItems="center" justifyContent={{ base: 'center', lg: 'flex-end' }}>
            <LangSelect color="white"/>
            <ColorModeSwitcher color="white" />
          </Flex>
        </Grid>
      </Container>
    </footer>
  )
}