import { Anchor, Box, Button, Heading, Text, TextInput } from 'grommet'
import { Article, Github, Link, Twitter } from 'grommet-icons'
import * as React from 'react'
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

export const Footer = () => (
  <>
    {footerLinks.map((l, index) => <Anchor label={l.label} href={l.link} key={`footer_${index}`}/>)}
  </>
)

export const FooterIcons = () => (
  <Box direction="row" gap="medium" justify="center">
    <Link />
    <Twitter />
    <Article />
    <Github />
  </Box>
)
