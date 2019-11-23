import { Anchor, Box, Heading } from 'grommet'
import * as React from 'react'

const HeaderAnchor = (props: { href: string, label: string }) => (
  <Anchor {...props} margin="small" color="dark-5" size="small"/>
)

const freeLawLink = <Anchor href="https://free.law" label="Free Law Project" color="accent-1"/>

const Header = () => (
  <>
    <Box direction="column" margin={{ right: 'auto'}}>
      <Box direction="row">
        <Heading level={1} margin="none" color="accent-1">Court</Heading>
        <Heading level={1} margin="none" color="brand">Listener</Heading>
      </Box>
      <Heading level={6} size="small" margin="none">
        From {freeLawLink}, a 501(c)(3) corporation
      </Heading>
    </Box>
    <Box direction="row" justify="end">
      <HeaderAnchor href="/about" label="About" />
      <HeaderAnchor href="/faq" label="FAQ" />
      <HeaderAnchor href="#" label="Tour" />
      <HeaderAnchor href="/sign-in" label="Sign in / Register" />
    </Box>
  </>
)
export default Header
