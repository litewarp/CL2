import { Box, Button, CheckBox, Grid, Heading, Text, TextInput } from 'grommet'
import React from 'react'
import Helmet from 'react-helmet'
import { useDispatch } from 'react-redux'
import withLayout from '../../root/layout/withLayout'
import { fetchData } from '../../root/redux/home'
import { ApplicationState, CtxProps } from '../../types'

import { AboutCourtListener, AboutFreeLawProject } from './_about'
import { ScotusNetwork, TheNumbers } from './_analytics'
import { LatestAudioList, LatestOpinionList } from './_latest'
import Newsletter from './_newsletter'
import SearchBar from './_search'

const Home = () => (
  <Grid
    fill
    gap="medium"
    rows={[ 'auto', 'auto', 'auto', 'auto', 'auto' ]}
    columns={[ '1/2', '1/2' ]}
    areas={[
      { name: 'search', start: [0, 0], end: [1, 0] },
      { name: 'about', start: [0, 1 ], end: [1, 1] },
      { name: 'latest', start: [0, 2], end: [1, 2] },
      { name: 'analytics', start: [0, 3], end: [1, 3] },
      { name: 'newsletter', start: [0, 4], end: [1, 4] },
    ]}
  >
    <Helmet>
      <title>Non-Profit Free Legal Search Engine and Alert System</title>
    </Helmet>

    <Box align="center" pad="small" gridArea="search">
      <SearchBar />
    </Box>

    <Box direction="row" gap="large" gridArea="about">
      <Box basis="1/2">
        <AboutCourtListener />
      </Box>
      <Box basis="1/2">
        <AboutFreeLawProject />
      </Box>
    </Box>

    <Box direction="row" gap="large" gridArea="latest">
      <Box basis="1/2">
        <LatestOpinionList />
      </Box>
      <Box basis="1/2">
        <LatestAudioList />
      </Box>
    </Box>

    <Box direction="row" gap="large" gridArea="analytics">
      <Box basis="1/2">
        <ScotusNetwork />
      </Box>
      <Box basis="1/2">
        <TheNumbers />
      </Box>
    </Box>

    <Box
      direction="row"
      pad="small"
      align="center"
      justify="start"
      background="dark-2"
      gridArea="newsletter"
    >
      <Newsletter />
    </Box>
  </Grid>
)

// Call getInitialProps prior to initial render
Home.getInitialProps = async (props: CtxProps) => {
  // dispatch any async API calls or functions
  const dispatch = useDispatch()
  dispatch(fetchData())
  // return the props to the page; no need to wait
  return { ...props }
}

// wrap the page with our layout
export default (withLayout(Home))
