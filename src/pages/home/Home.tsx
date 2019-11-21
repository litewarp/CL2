import { Box } from 'grommet'
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { fetchTest } from '../../root/actions';
import withLayout from '../../root/withLayout'
import { AboutCourtListener, AboutFreeLawProject } from './_about'
import Header from './_header'
import { LatestAudioList, LatestOpinionList } from './_latestResults'
import OptionBar from './_optionBar'
import SearchBar from './_searchBar'

const Home = props => (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <Header/>
      <OptionBar/>

      <Box align="center" pad="medium" gap="medium">
        <SearchBar />
      </Box>

      <Box direction="row" gap="large">
        <Box basis="1/2">
          <AboutCourtListener />
        </Box>
        <Box basis="1/2">
          <AboutFreeLawProject />
        </Box>
      </Box>

      <Box direction="row" gap="large">
        <Box basis="1/2">
          <LatestOpinionList />
        </Box>
        <Box basis="1/2">
          <LatestAudioList />
        </Box>
      </Box>
    </>
  );

Home.getInitialProps = async ({ store }) => {
  await store.dispatch(fetchTest());
  // u can get initial states with store.getState()
  //console.log(store.getState());
};

const mstp = ({ posts }) => ({ posts });

export default connect(
  mstp,
  { fetchTest }
)(withLayout(Home));
