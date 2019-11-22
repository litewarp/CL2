import React from "react";
import { Box, Anchor, Heading, Text } from "grommet"

const HeaderAnchor = (props: { href: string, label: string }) => (
  <Anchor {...props} margin="small" color="dark-5" size="small"/>
)

const Header = () => (
  <>
    <Box direction="column" margin={{left: 'auto'}}>
      <Box direction="row" flex={true} >
        <Heading level={1} margin={{ vertical: 'none' }} color="accent-1">Court</Heading>
        <Heading level={1} margin={{ vertical: 'none'}} color="brand">Listener</Heading>
      </Box>
      <Heading level={6} size="small" margin='none'>
        From <Anchor href="https://free.law" label="Free Law Project" color="accent-1"/>, a 501(c)(3) corporation
      </Heading>
    </Box>
    <Box direction="row" flex={true} justify="end">
      <HeaderAnchor href="/about" label="About" />
      <HeaderAnchor href="/faq" label="FAQ" />
      <HeaderAnchor href="#" label="Tour" />
      <HeaderAnchor href="/sign-in" label="Sign in / Register" />
    </Box>
  </>
)
export default Header
