import React from "react";
import { Box, Anchor, Heading, Text } from "grommet"

const HeaderAnchor = (props: { href: string, label: string }) => (
  <Anchor {...props} margin="small" color="dark-5" size="small"/>
)

const Header = () => (
  <>
    <Box
      direction="row"
      fill="horizontal"
      align="start"
      justify="end"
      pad={{ top: 'small' }}
    >
      <Box direction="row" margin={{ right: 'auto' }}>
        <Heading level={1} margin="none" color="accent-1">Court</Heading>
        <Heading level={1} margin="none" color="brand">Listener</Heading>
      </Box>
      <HeaderAnchor href="/about" label="About" />
      <HeaderAnchor href="/faq" label="FAQ" />
      <HeaderAnchor href="#" label="Tour" />
      <HeaderAnchor href="/sign-in" label="Sign in / Register" />
    </Box>
    <Text margin="none" size="small">
      From <Anchor href="https://free.law" label="Free Law Project" color="accent-1"/>, a 501(c)(3) corporation
    </Text>
  </>
)
export default Header
