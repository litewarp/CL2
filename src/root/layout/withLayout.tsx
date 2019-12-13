/** @format */

// withLayout.tsx - layout high-order-component
// wraps the provided component with the css layout
// and injects layout-related props

import { Box, Grid, Grommet, Main, ResponsiveContext } from 'grommet'
import * as React from 'react'
import { FooterIcons, PageFooter } from './footer'
import Header from './header'
import theme from './theme'
import { ManageThemeContext, ThemeManager } from './themeProvider'

interface LayoutProps {
  mode: string
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { mode, toggleMode } = React.useContext(ManageThemeContext)
  const darkMode = mode === 'dark'
  return (
    <Grommet theme={theme} themeMode={darkMode ? 'dark' : 'light'} full>
      <Box>
        <Header />
        <Main fill>{children}</Main>
        <PageFooter />
      </Box>
    </Grommet>
  )
}

const withLayout = <P extends object>(Component: React.ComponentType<P>) => (
  props: P & LayoutProps
) => (
  <ThemeManager>
    <Layout>
      <Component {...(props as P)} mode={props.mode} />
    </Layout>
  </ThemeManager>
)

export default withLayout
