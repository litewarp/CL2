/** @format */

import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faLink, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Anchor, Box, Button, Footer, Heading, Image, Text, TextInput } from 'grommet'
import * as React from 'react'

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
  { label: 'Jurisdictions', link: '/api/jurisdictions' },
  // blog and newsletter grouped together
  { label: 'Blog', link: 'https://free.law' },
  { label: 'Newsletter', link: 'https://free.law/newsletter' },
  { label: 'Contact', link: '/contact' },
  { label: 'Data Services', link: 'https://free.law/data-consulting' },
  { label: 'Contribute', link: '/contribute' },
  { label: 'Terms & Privacy', link: '/terms' },
  { label: 'Removal', link: '/terms/#removal' },
  { label: 'Vulnerability Policies', link: 'https://free.law/vulnerability-disclosure-policy' },
]

const DonateButton = () => (
  <>
    <Box align="center" gap="xsmall">
      <Text color="accent-1" margin="none">
        Donate
      </Text>
      <Text>to</Text>
      <Text color="neutral-1">Support our work</Text>
    </Box>
  </>
)
export const FooterIcons = () => (
  <Box direction="row" justify="center" gap="medium">
    <Anchor icon={<FontAwesomeIcon icon={faLink} />} href="https://free.law" size="xxlarge" />
    <Anchor
      icon={<FontAwesomeIcon icon={faTwitter} />}
      href="https://twitter.com/freelawproject"
      size="xxlarge"
    />
    <Anchor
      icon={<FontAwesomeIcon icon={faNewspaper} />}
      href="https://free.law/newsletter"
      size="xxlarge"
    />
    <Anchor
      icon={<FontAwesomeIcon icon={faGithub} />}
      href="https://github.com/freelawproject"
      size="xxlarge"
    />
  </Box>
)

// use any as type until the bug that prevents
// typescript from processing a component that has
// multiple root elements (i.e. an array) is solved
// see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20356
const FooterLinks: any = () => {
  const chunkColumns = () => {
    const chunks = []
    const links = footerLinks
    while (links.length) {
      chunks.push(links.splice(0, 4))
    }
    return chunks
  }
  const linkColumns = chunkColumns()
  return linkColumns.map((column, index) => (
    <Box key={'column_index_' + index} alignSelf="start" gap="small" pad="medium">
      {column.map((link, linkIndex) => (
        <Anchor
          key={linkIndex * 23}
          size="small"
          color="light-1"
          label={link.label}
          href={link.link}
        />
      ))}
    </Box>
  ))
}

export const PageFooter = () => (
  <Footer background="dark-1" direction="row" pad="large">
    <Box direction="column" fill="horizontal">
      <Box direction="row" justify="end">
        <Box direction="row">
          <FooterLinks />
        </Box>
        <Box
          margin={{ left: 'auto' }}
          direction="row-responsive"
          gap="xsmall"
          pad="small"
          alignSelf="center"
          border="all">
          <DonateButton />
        </Box>
      </Box>
      <Box pad="medium">
        <Text size="small">
          CourtListener is sponsored by the non-profit{' '}
          {<Anchor label="Free Law Project" href="https://free.law" />}.
        </Text>
      </Box>

      <FooterIcons />
    </Box>
  </Footer>
)
