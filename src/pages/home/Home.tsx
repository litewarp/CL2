import { Box, Button, Grid, Heading, Text, TextInput } from 'grommet'
import { Article } from 'grommet-icons'

import React from 'react';
import Helmet from 'react-helmet';
import { connect, shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { fetchTest } from '../../root/actions'
import withLayout from '../../root/withLayout'
import { CtxProps } from '../../typings/root'

import { AboutCourtListener, AboutFreeLawProject } from './_about'
import { ScotusNetwork, TheNumbers } from './_analytics'
import { Footer, FooterIcons } from './_footer'
import Header from './_header'
import { LatestAudioList, LatestOpinionList } from './_latest'
import Newsletter from './_newsletter'
import OptionBar from './_options'
import SearchBar from './_search'

const Home = (props: CtxProps) => {
  // get data from the redux store
  // pass useSelector a getter function and an optional equality function
  // const selectedData: {} = useSelector((state) => state.home, shallowEqual)
  return (
    <Grid
      align="start"
      gap="xlarge"
      fill={true}
      rows={[ 'xsmall', 'xxsmall', 'small', 'xsmall', 'medium', 'medium', 'xsmall', 'small', 'xxsmall' ]}
      columns={[ '1/2', '1/2' ]}
      areas={[
        { name: 'header', start: [0, 0], end: [1, 0] },
        { name: 'options', start: [0, 1], end: [1, 1] },
        { name: 'search', start: [0, 2], end: [1, 2] },
        { name: 'about', start: [0, 3], end: [1, 3] },
        { name: 'latest', start: [0, 4], end: [1, 4] },
        { name: 'analytics', start: [0, 5], end: [1, 5] },
        { name: 'newsletter', start: [0, 6], end: [1, 6] },
        { name: 'footer', start: [0, 7], end: [1, 7] },
        { name: 'icons', start: [0, 8], end: [1, 8] }
      ]}
    >
      <Helmet>
        <title>Non-Profit Free Legal Search Engine and Alert System</title>
      </Helmet>

      <Box direction="row" justify="end" pad="small" gridArea="header">
        <Header/>
      </Box>
      <Box direction="row" align="center" justify="around" border="horizontal" gridArea="options">
        <OptionBar/>
      </Box>
      <Box align="center" pad="medium" gridArea="search">
        <SearchBar />
      </Box>

      <Box pad="small" direction="row" gap="large" gridArea="about">
        <Box basis="1/2">
          <AboutCourtListener />
        </Box>
        <Box basis="1/2">
          <AboutFreeLawProject />
        </Box>
      </Box>

      <Box pad="small" direction="row" gap="large" gridArea="latest">
        <Box basis="1/2">
          <LatestOpinionList />
        </Box>
        <Box basis="1/2">
          <LatestAudioList />
        </Box>
      </Box>

      <Box pad="small" direction="row" gap="large" gridArea="analytics">
        <Box basis="1/2">
          <ScotusNetwork />
        </Box>
        <Box basis="1/2">
          <TheNumbers />
        </Box>
      </Box>

      <Box
        direction="row"
        pad="medium"
        align="center"
        justify="start"
        background="#e5ecf9"
        border="all"
        gridArea="newsletter"
      >
        <Newsletter />
      </Box>

      <Box direction="row" justify="start" gridArea="footer" align="center">
        <Footer />
      </Box>

      <Box direction="row" justify="center" gridArea="icons">
        <FooterIcons />
      </Box>
    </Grid>
  )
}

// Call getInitialProps prior to initial render
Home.getInitialProps = async (props: CtxProps) => {
  // dispatch any async API calls or functions
  const dispatch = useDispatch()
  dispatch(fetchTest())
  // return the props to the page; no need to wait
  return { ...props }
}

// wrap the page with our layout
export default (withLayout(Home))
