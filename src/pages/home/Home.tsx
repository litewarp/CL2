/** @format */

import { InitialProps } from '@jaredpalmer/after'
import { Box, Button, CheckBox, Grid, Heading, Text, TextInput } from 'grommet'
import React from 'react'
import Helmet from 'react-helmet'
import { prefetchQuery, useQuery } from 'react-query'
import { fetchLatestAudio, fetchLatestOpinion } from '../../root/api'
import withLayout from '../../root/layout/withLayout'
import { StatelessPage } from '../../typings'
import { AboutCourtListener, AboutFreeLawProject } from './_about'
import { ScotusNetwork, TheNumbers } from './_analytics'
import { LatestAudioList, LatestOpinionList } from './_latest'
import Newsletter from './_newsletter'
import SearchBar from './_search'

const Home: StatelessPage<{}> = () => (
  <>
    <Helmet>
      <title>Non-Profit Free Legal Search Engine and Alert System</title>
    </Helmet>
    <Box gap="medium" align="center" alignSelf="center" width="1440px">
      <SearchBar />
      <Box direction="row" wrap>
        <Box basis="1/2" pad="medium" gap="medium">
          <AboutCourtListener />
        </Box>
        <Box basis="1/2" pad="medium" gap="medium">
          <AboutFreeLawProject />
        </Box>
        <Box basis="1/2" pad="medium" gap="medium">
          <LatestOpinionList />
        </Box>
        <Box basis="1/2" pad="medium" gap="medium">
          <LatestAudioList />
        </Box>
        <Box basis="1/2" pad="medium" gap="medium">
          <ScotusNetwork />
        </Box>
        <Box basis="1/2" pad="medium" gap="medium">
          <TheNumbers />
        </Box>

        <Box direction="row" pad="medium" align="center" fill="horizontal">
          <Newsletter />
        </Box>
      </Box>
    </Box>
  </>
)

// Call getInitialProps prior to initial render
Home.getInitialProps = async (props: InitialProps) => {
  const latestAudioData = prefetchQuery('latestAudio', fetchLatestAudio)
  const latestOpinionData = prefetchQuery('latestOpinions', fetchLatestOpinion)
  return { ...props, latestAudioData, latestOpinionData }
}

// wrap the page with our layout
export default withLayout(Home)
