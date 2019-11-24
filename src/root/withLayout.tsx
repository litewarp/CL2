import { Box, Grommet, ResponsiveContext } from 'grommet'
import * as React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import theme from './theme'

const FixedBox = styled(Box)` max-width: 1280px;`

const withLayout = (Component: React.ComponentType<{}>) => (
    (props: any) => {
      // inject darkMode flag from state
    const darkMode = useSelector(({ layout }: { layout: { darkMode: boolean }}) => layout.darkMode)
    return (
      <Grommet theme={theme} themeMode={darkMode ? 'dark' : 'light'} full={true}>
        <ResponsiveContext.Consumer>
          {(size) => (
            <Box fill={true} alignContent="center">
              <FixedBox alignSelf="center" fill={true}>
                <Component size={size} {...props} />
              </FixedBox>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    )
  }
  )
export default withLayout
