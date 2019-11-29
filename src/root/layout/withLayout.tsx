// withLayout.tsx - layout high-order-component
// wraps the provided component with the css layout
// and injects layout-related props

import { Box, Grid, Grommet, ResponsiveContext } from 'grommet'
import * as React from 'react'
import { Footer, FooterIcons } from './footer'
import Header from './header'
import OptionBar from './options'
import theme from './theme'
import { ManageThemeContext, ThemeManager } from './themeProvider'

const Layout = ({children}: { children: React.ReactNode }) => {

  const { mode, toggleMode } = React.useContext(ManageThemeContext)
  const darkMode = mode === 'dark'
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
      <Header />
    </Box>
    <OptionBar/>
    <Box gridArea="content" pad="medium">
      {children}
    </Box>
    <Box direction="column" gridArea="footer">
      <Footer />
    </Box>
  </Grommet>
  )
}

export default (Component: React.ComponentType<{props: any}>) => (...props: any) => (
  <ThemeManager>
    <Layout>
      <Component {...props}/>
    </Layout>
  </ThemeManager>
)
