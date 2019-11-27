// withLayout.tsx - layout high-order-component
// wraps the passed in component with the css layout

import { Box, Grid, Grommet, ResponsiveContext } from 'grommet'
import * as React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Footer, FooterIcons } from './footer'
import Header from './header'
import OptionBar from './options'
import theme from './theme'

// set max-width of main content container to 1280px;
const Main = styled(Box)` max-width: 1280px; `

export default (Component: React.ComponentType<{props: any}>) => (...props: any) => {
  // inject size prop from responsive context provider
  const size = React.useContext(ResponsiveContext)
  // inject darkMode flag from layout state
  const darkMode = useSelector(
    ({ layout }: { layout: { darkMode: boolean }}) => layout.darkMode
)
  // Apply theme and pass responsive size prop to the PageLayout
  return (
    <Grommet theme={theme} themeMode={darkMode ? 'dark' : 'light'} full>
      <Box
        direction="row"
        fill="horizontal"
        justify="end"
        pad="small"
        gridArea="header"
        background={darkMode ? 'dark-2' : 'light-4'}
      >
        <Header/>
      </Box>
      <OptionBar/>
      <Box gridArea="content" pad="medium">
        <Component {...props} />
      </Box>
      <Box direction="column" gridArea="footer">
        <Footer />
      </Box>
    </Grommet>
  )
}
