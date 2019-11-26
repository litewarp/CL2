import { Anchor, Box, Button, Heading, Image, Text, TextInput } from 'grommet'
import * as React from 'react'
import { FaGithub, FaLink, FaRegNewspaper, FaTwitter } from 'react-icons/fa'
import styled from 'styled-components'

const footerLinks = [
  { label: 'About', link: '/about' },
  { label: 'Visualizations', link: '/visualizations/scotus-mapper' },
  { label: 'FAQ', link: '/faq' },
  // launches overlay
  { label: 'Tour', link: '#' },
  { label: 'Donate', link: '/donate/?referrer=footer-link' },
  { label: 'Citation Lookup', link: '/c' },
  { label: 'Coverage', link: '/coverage' },
  { label: 'APIs and Bulk Data', link: 'api' },
  // has icon
  { label: 'Feeds & Podcasts', link: '/podcasts' },
  { label: 'Jurisdictions' , link: '/api/jurisdictions' },
  // blog and newsletter grouped together
  { label: 'Blog', link: 'https://free.law' },
  { label: 'Newsletter', link: 'https://free.law/newsletter' },
  { label: 'Contact', link: '/contact' },
  { label: 'Data Services', link: 'https://free.law/data-consulting' },
  { label: 'Contribute', link: '/contribute' },
  { label: 'Terms & Privacy', link: '/terms' },
  { label: 'Removal', link: '/terms/#removal' },
  { label: 'Vulnerability Policies', link: 'https://free.law/vulnerability-disclosure-policy' }
]

const DonateButton = () => (
  <Button
    hoverIndicator
    href="/donate/?referrer=footer-link"
  >
    <Heading level={3} color="accent-1" margin="none">Donate</Heading>
    <Heading level={5} margin="none">to</Heading>
    <Heading level={4} color="neutral-1" margin="none">Support our work</Heading>
  </Button>
)
export const FooterIcons = () => (
  <Box direction="row" justify="center" gap="medium">
    <Anchor icon={<FaLink />} href="https://free.law" size="xxlarge"/>
    <Anchor icon={<FaTwitter />} href="https://twitter.com/freelawproject"  size="xxlarge"/>
    <Anchor icon={<FaRegNewspaper />} href="https://free.law/newsletter" size="xxlarge"/>
    <Anchor icon={<FaGithub />} href="https://github.com/freelawproject" size="xxlarge"/>
  </Box>
)

export const Footer = () => (
  <>
    <Box basis="1/2" direction="row" margin={{ right: 'auto' }} wrap>
        {footerLinks.map((l, index) => (
          <Anchor size="xsmall" label={l.label} href={l.link} key={`footer_${index}`} />
        ))}

    </Box>
    <Text size="small" margin={{ top: 'small'}}>
      CourtListener is sponsored by the non-profit {<Anchor label="Free Law Project" href="https://free.law" />}.
    </Text>
    <Box margin={{ left: 'auto'}} alignSelf="start">
      <DonateButton />
    </Box>
  </>
)
