import { Box, Grommet, ResponsiveContext } from 'grommet'
import { deepFreeze } from 'grommet/utils'
import * as React from 'react'
import styled from 'styled-components'

const theme = deepFreeze({
  global: {
    colors: {
      'accent-1': '#033F63',
      'accent-2': '#476A6F',
      'accent-3': '#b6c197',
      'accent-4': '#eae2b7',
      'brand': '#c01722',
      'dark-1': '#080708',
      'dark-2': '#353535',
      'dark-3': '#555555',
      'dark-4': '#666370',
      'dark-5': '#777777',
      'focus': '#FFF8F0',
      'neutral-1': '#9B7874',
      'neutral-2': '#69130E',
      'neutral-3': '#1c1f33',
      'neutral-4': '#c8963E',
      'selected': '#C01722',
      'status-critical': '#ff3f3f',
      'status-error': '#DD4B1A',
      'status-ok': '#8A9B6A',
      'status-unknown': '#BDBBB0',
      'status-warning': '#FDCA40',
    },
    font: {
      family: 'Roboto',
      height: '20px',
      size: '12px',
      weight: '300',
    },
  },
})

const FixedBox = styled(Box)` max-width: 1280px;`

const withLayout = (Component: React.FC) => (
  (props: any) => (
    <Grommet theme={theme} full={true}>
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
)
export default withLayout
