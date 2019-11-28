import { Anchor, Box, CheckBox, Heading } from 'grommet'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { ApplicationState } from '../../typings'
// local Components
const Banner = styled(Heading)` font-family: 'Roboto Slab'`
const FreeLawLink = <Anchor href="https://free.law" label="Free Law Project" color="accent-1"/>

const HeaderAnchor = (props: { href: string, label: string }) => (
  <Anchor {...props} margin="small" color="dark-5" size="small"/>
)

export default () => {
  // get data from the redux store
  // pass useSelector a getter function and an optional equality function
  const darkMode = useSelector((state: ApplicationState) => state.layout.darkMode)
  // dispatch actions from the store using useDispatch
  const dispatch = useDispatch()
  return (
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
          onChange={() => ({ action: 'fire hook in withLayout' })}
        />
      </Box>
    </>
  )
}
