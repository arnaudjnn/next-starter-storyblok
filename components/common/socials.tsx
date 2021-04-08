import { Box, Icon, Flex, Text, List, ListItem, Link } from '@chakra-ui/react';
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, PinterestShareButton } from 'react-share';
import { useRouter } from 'next/router';
import { FaFacebook, FaLinkedin, FaTwitter, FaPinterest, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useTranslation } from 'lib/hooks/useTranslation';

const siteName = "https://starter.io"

type IProps = {
  title: string;
  description?: string;
  media?: string;
  facebook?: boolean;
  linkedin?: boolean;
  twitter?: boolean;
  pinterest?: boolean;
}

export function SocialsShare({ title, description, media, facebook=false, linkedin=false, twitter=false, pinterest=false }: IProps) {
  const { asPath } = useRouter();
  const { t, locale } = useTranslation();
  const url = `${siteName}/${locale + asPath}`

  return (
    <Flex>
      <Text fontSize="xl">{t['share']}</Text>
      <List display="flex" alignItems="center" ml="5">
        {facebook &&
          <ListItem mr="5">
            <FacebookShareButton
              url={url}
              quote={title}
            >
              <Icon as={FaFacebook} w={5} h={5} color="blue.400"/>
            </FacebookShareButton>
          </ListItem>
        }
        {linkedin &&
          <ListItem mr="5">
            <LinkedinShareButton
              url={url}
              title={title}
              summary={description}
              source={siteName}
            >
              <Icon as={FaLinkedin} w={5} h={5} color="blue.400"/>
            </LinkedinShareButton>
          </ListItem>
        }
        {twitter &&
          <ListItem mr="5">
            <TwitterShareButton
              url={url}
              title={title}
            >
              <Icon as={FaTwitter} w={5} h={5} color="blue.400"/>
            </TwitterShareButton>
          </ListItem>
        }
        {pinterest &&
          <ListItem mr="5">
            <PinterestShareButton
              url={url}
              description={description}
              media={media}
            >
              <Icon as={FaPinterest} w={5} h={5} color="blue.400"/>
            </PinterestShareButton>
          </ListItem>
        }
      </List>
    </Flex>
  )
}

export function SocialsLink({ socials, color="blue.400" }) {
  const logos = {
    facebook: FaFacebook,
    twitter: FaTwitter,
    linkedin: FaLinkedin,
    instagram: FaInstagram,
    youtube: FaYoutube
  };

  return (
    <List display="grid" gridTemplateColumns={`repeat(${socials.length}, auto)`} gridGap="5">
      {socials.map(social => {
        const Logo = logos[social.network]
        return (
          <ListItem key={social._uid}>
            <Link color={color} href={social.url} aria-label={social.network} target="_blank" rel="noopener">
              <Icon as={Logo} h={5} w={5} />
            </Link>
          </ListItem>
        )
      })}
    </List>
  )
}