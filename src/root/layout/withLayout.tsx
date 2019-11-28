// withLayout.tsx - layout high-order-component
// wraps the provided component with the css layout
// and injects layout-related props

import { Box, Grid, Grommet, ResponsiveContext } from 'grommet'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { Footer, FooterIcons } from './footer'
import Header from './header'
import OptionBar from './options'
import theme from './theme'

// set max-width of main content container to 1280px;
const ThemeContext = React.createContext({
  darkMode: true,
  toggleDarkMode: () => {}
})

const ThemeProvider = (props: { children: React.ReactChildren }) => {
  // do we have a stored theme in localStorage? If so, use it to set the initial state.
  const locallyStoredTheme = window.localStorage.getItem('darkMode') ? true : false
  // create the state as a boolean and create callback
  const [ darkMode, setDark ] = React.useState(locallyStoredTheme)

  // hook to determine whether to re-render when props change
  React.useLayoutEffect(
    () => {
      const localTheme = window.localStorage.getItem('darkMode')
      // if lastTheme set in localStorage, use it
      localTheme && localTheme !== 'false'
        ? setDark(true)
        : setDark(false)
    },
    // render the new theme only when the dark state changes
    [darkMode]
  )

  const toggleDarkMode = () => {
    // change local state
    setDark(!darkMode)
    // localStorage does not accept boolean values
    // so the presence of a string other than false acts as a boolean
    !darkMode === true
      ? window.localStorage.setItem('darkMode', 'TRUE')
      : window.localStorage.setItem('darkMode', 'FALSE')
    }
  // create the new context prop and return it with callback

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode
      }}
    >
        {props.children}
    </ThemeContext.Provider>
  )
}

export default (Component: React.ComponentType<{props: any}>) => (...props: any) => {
  // inject size prop from responsive context provider
  const size = React.useContext(ResponsiveContext)
  // inject darkMode flag from layout state
  //  Apply theme and pass responsive size prop to the PageLayout
  const { darkMode, toggleDarkMode } = React.useContext(ThemeContext)
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
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
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
