import { Box, Grommet, ResponsiveContext } from 'grommet'
import * as React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Footer, FooterIcons } from './footer'
import Header from './header'
import OptionBar from './options'
import theme from './theme'

// set max-width of main content container to 1280px;
const Main = styled(Box)` max-width: 1280px; `
const Background = styled(Box)``

export default (Component: React.ComponentType<{}>) => ((props: any) => {
  // inject darkMode flag from layout state
  const darkMode = useSelector(
    ({ layout }: { layout: { darkMode: boolean }}) => layout.darkMode
  )
  // Apply theme and pass responsive size prop to the PageLayout
  return (
    <Grommet theme={theme} themeMode={darkMode ? 'dark' : 'light'} full>
      <ResponsiveContext.Consumer>
        {(size) => (
          <Background alignContent="center">
            <Main alignSelf="center">
              <Header />
              <OptionBar />
              <Box>
                <Component {...props} />
              </Box>
              <Footer />
              <FooterIcons />
            </Main>
          </Background>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  )
})
