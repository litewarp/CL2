import { Anchor, Box, CheckBox, Heading } from 'grommet'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { toggleDarkMode } from '../../root/redux/layout'
import { ApplicationState, CtxProps } from '../../types'

const DarkModeToggle = styled(CheckBox)`

`

const HeaderAnchor = (props: { href: string, label: string }) => (
  <Anchor {...props} margin="small" color="dark-5" size="small"/>
)

const freeLawLink = <Anchor href="https://free.law" label="Free Law Project" color="accent-1"/>

const Header = () => {
  // get data from the redux store
  // pass useSelector a getter function and an optional equality function
  const darkMode = useSelector((state: ApplicationState) => state.layout.darkMode)
  // dispatch actions from the store using useDispatch
  const dispatch = useDispatch()
  return (
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
      <Box direction="column">
        <Box direction="row" justify="end">
          <HeaderAnchor href="/about" label="About" />
          <HeaderAnchor href="/faq" label="FAQ" />
          <HeaderAnchor href="#" label="Tour" />
          <HeaderAnchor href="/sign-in" label="Sign in / Register" />
        </Box>
        <CheckBox
          label={`Toggle ${ darkMode ? 'Light' : 'Dark' } Mode`}
          checked={darkMode}
          toggle={true}
          onChange={() => dispatch(toggleDarkMode())}
        />
      </Box>
    </>
  )
}
export default Header
