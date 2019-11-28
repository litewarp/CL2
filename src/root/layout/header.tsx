import { Anchor, Box, CheckBox, Heading } from 'grommet'
import * as React from 'react'
import styled from 'styled-components'
// local Components
const Banner = styled(Heading)` font-family: 'Roboto Slab'`
const FreeLawLink = <Anchor href="https://free.law" label="Free Law Project" color="accent-1"/>

const HeaderAnchor = (props: { href: string, label: string }) => (
  <Anchor {...props} margin="small" color="dark-5" size="small"/>
)

export default ({ darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void}) => (
  <>
    <Box direction="column" margin={{ right: 'auto'}} basis="1/2">
      <Box direction="row">
        <Banner level={1} margin="none" color="neutral-2">Court</Banner>
        <Banner level={1} margin="none" color="accent-2">Listener</Banner>
      </Box>
      <Heading level={6} size="small" margin="none">
        From {FreeLawLink}, a 501(c)(3) corporation
      </Heading>
    </Box>
    <Box direction="column" align="end" basis="1/2">
      <Box direction="row" pad="small">
        <HeaderAnchor href="/about" label="About" />
        <HeaderAnchor href="/faq" label="FAQ" />
        <HeaderAnchor href="#" label="Tour" />
        <HeaderAnchor href="/sign-in" label="Sign in / Register" />
      </Box>
      <CheckBox
        reverse
        toggle
        color="dark-5"
        checked={darkMode}
        label={<Anchor margin="none" label={`Toggle ${ darkMode ? 'Light' : 'Dark' } Mode`} color="dark-5"/>}
        onChange={() => toggleDarkMode()}
      />
    </Box>
  </>
)
