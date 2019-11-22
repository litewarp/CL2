import { Anchor, Box, Button, Heading, Text } from 'grommet'
import { Analytics, Optimize } from 'grommet-icons'
import * as React from 'react'
import styled from 'styled-components'
import fakeScotusChart from './fakeScotusChart.png'

const AnalyticsIcon = styled(Analytics)` margin-left: 1rem `
const OptimizeIcon = styled(Optimize)` margin-left: 1rem `

export const ScotusNetwork = () => (
  <>
    <Heading level={3} margin={{ top: 'medium', bottom: 'none' }}>
      Supreme Court Network Visualizations
      <OptimizeIcon />
    </Heading>
    <Text size="xxsmall" margin={{ vertical: 'small' }}>
      Supreme Court Network Visualizations allow you to see and analyze lines of precedent in Supreme Court cases.
    </Text>
    <img src={fakeScotusChart}/>
  </>
)

export const TheNumbers = () => (
  <>
    <Heading level={3} margin={{ top: 'medium', bottom: 'none' }}>
      The Numbers
      <AnalyticsIcon />
    </Heading>
  </>
)
