import { Anchor, Box, Button, CheckBox, Header, Heading, Menu } from 'grommet'
import * as React from 'react'
import { FaHeart } from 'react-icons/fa'
import styled from 'styled-components'
import { ManageThemeContext } from './themeProvider'
// local Components

const Banner = styled(Heading)` font-family: 'Roboto Slab'`
const Toggle = styled(CheckBox)`
  align-items: start;
`
const FreeLawLink = <Anchor href="https://free.law" label="Free Law Project" color="accent-1"/>

const HeaderAnchor = (props: { href?: string, label: string }) => (
  <Anchor {...props} margin={{ horizontal: 'small' }} color="dark-5" size="small"/>
)

const OptionsBox = () => (

  <Box direction="row" justify="around" align="center" border="horizontal" fill="horizontal">
    <Menu
      label="Opinions"
      items={[
        { label: 'Advanced Search', href: '/opinion' },
        { label: 'Citation Look Up', href: '/c' }
      ]}
      size="small"
    />
    <Anchor label="RECAP Archive" size="small" href="recap" color="dark-6"/>
    <Anchor label="Oral Arguments" size="small" href="audio" color="dark-6"/>
    <Anchor label="Judges" size="small" href="person" color="dark-6"/>
    <Menu
      label="Visualizations"
      items={[
        { label: 'Gallery', href: '/visualizations/gallery' },
        { label: 'SCOTUS Networks', href: '/visualizations/scotus-mapper' },
        { label: 'New Network', href: '/visualizations/scotus-mapper/new' }
      ]}
      size="small"
    />
    <Anchor label="Donate" size="small" href="/donate/?referrer=navbar-v2" icon={<FaHeart/>}/>
  </Box>
)
export default () => {
  const { mode, toggleMode } = React.useContext(ManageThemeContext)
  const darkMode = mode === 'dark'
  return (
    <Header
      direction="column"
      pad="small"
      align="end"
      background={darkMode ? 'dark-2' : 'light-4'}
    >
      <Box direction="row" pad="small" fill="horizontal">
        <Box align="center" alignSelf="start" margin={{ right: 'auto' }}>
          <Box direction="row">
            <Banner level={1} margin="none" color="neutral-2">Court</Banner>
            <Banner level={1} margin="none" color="accent-2">Listener</Banner>
          </Box>
          <Heading level={6} size="small" margin="none">
            From {FreeLawLink}, a 501(c)(3) corporation
          </Heading>
        </Box>

        <HeaderAnchor href="/about" label="About" />
        <HeaderAnchor href="/faq" label="FAQ" />
        <HeaderAnchor href="#" label="Tour" />
        <HeaderAnchor href="/sign-in" label="Sign in / Register" />
        <HeaderAnchor label={`Toggle ${darkMode ? 'Light' : 'Dark'} Mode`}/>
        <Button
          hoverIndicator="background"
          onClick={() => toggleMode()}
          alignSelf="start"
        >
          <Toggle
            toggle
            reverse
            color="dark-5"
            onChange={() => toggleMode()}
          />
        </Button>
        </Box>
      <OptionsBox/>
    </Header>
  )
}
