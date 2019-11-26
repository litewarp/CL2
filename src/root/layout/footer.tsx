import { Anchor, Box, Button, Heading, Image, Text, TextInput } from 'grommet'
import * as React from 'react'
import { FaGithub, FaLink, FaRegNewspaper, FaTwitter } from 'react-icons/fa'
import styled from 'styled-components'

// tslint:disable:no-var-requires
const donate = require('./donate-button.png')

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
  <Box direction="column" align="center" border="all" hoverIndicator onClick={() => '/donate/?referrer=footer-link'}>
    <Heading level={3} color="accent-1" margin="none">Donate</Heading>
    <Heading level={5} margin="none">to</Heading>
    <Heading level={4} color="neutral-1" margin="none">Support our work</Heading>
  </Box>
)

export const Footer = () => (
  <Box align="center" direction="row" margin={{ top: 'small' }}>
    <Box direction="column" basis="2/3">
      <Box wrap direction="row" gap="large">
        {footerLinks.map((l, index) => (
          <Anchor size="xsmall" label={l.label} href={l.link} key={`footer_${index}`} margin="none"/>
        ))}
      </Box>
      <Text size="small" margin="none">
        CourtListener is sponsored by the non-profit {<Anchor label="Free Law Project" href="https://free.law" />}.
      </Text>
    </Box>
    <DonateButton />
  </Box>
)

export const FooterIcons = () => (
  <Box direction="row" gap="medium" justify="center">
    <Anchor icon={<FaLink />} href="https://free.law" size="xxlarge"/>
    <Anchor icon={<FaTwitter />} href="https://twitter.com/freelawproject"  size="xxlarge"/>
    <Anchor icon={<FaRegNewspaper />} href="https://free.law/newsletter" size="xxlarge"/>
    <Anchor icon={<FaGithub />} href="https://github.com/freelawproject" size="xxlarge"/>
  </Box>
)
