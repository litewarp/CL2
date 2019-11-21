import React from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { fetchTest } from "../root/actions";
import withLayout from "../root/withLayout"
import Header from "./_header"
import OptionBar from "./_optionBar"
import styled from 'styled-components'
import { Anchor, Box, Button, Heading, Paragraph, Text, TextInput } from "grommet"
import { DocumentText, Search, Volume } from 'grommet-icons'
import { fakeLatestData,fakeAudioData } from "./_fakeData"

// override grommet heading constraints
const FullHeading = styled(Heading)` max-width: 100%`
const ItalicHeading = styled(FullHeading)` font-variant: italic`
const DocumentIcon = styled(DocumentText)` margin-left: 1rem`
const SoundIcon = styled(Volume)` margin-left: 1rem`
const FlatButton = styled(Button)`border-radius: 0; max-width: 50%; margin-left: auto`

const clLink = <Anchor label="CourtListener" href="https://github.com/freelawproject/courtlistener"/>
const jsLink = <Anchor label="Juriscraper" href="https://github.com/freelawproject/juriscraper"/>
const recapLink = <Anchor label="RECAP" href="https://free.law/recap"/>
const freelawLink = <Anchor label="Free Law Project" href="https://free.law"/>

const LatestOpinion = (props: {
  caption: string,
  link: string,
  dateFiled: string,
  docketNumber: string,
  status: string,
  natureSuit: string,
}) => (
  <Box margin={{ vertical: 'small' }}>
    <Anchor size="large" label={props.caption} href={props.link}/>
    <Box direction="row" gap="medium">
      <Text size="small">{`Date Filed: ${props.dateFiled}`}</Text>
      <Text size="small">{`Status: ${props.status}`}</Text>
      <Text size="small">{`Docket Number: ${props.docketNumber}`}</Text>
      {props.natureSuit && <Text size="small">{`Nature of Suit: ${props.natureSuit}`}</Text>}
    </Box>
  </Box>
)

const LatestAudio = (props: {
  caption: string,
  link: string,
  dateArgued: string,
  docketNumber: string,
  duration: string
}) => (
  <Box margin={{ vertical: 'small' }}>
    <Anchor size="large" label={props.caption} href={props.link}/>
    <Box direction="row" gap="medium">
      <Text size="small">{`Date Filed: ${props.dateArgued}`}</Text>
      <Text size="small">{`Docket Number: ${props.docketNumber}`}</Text>
      <Text size="small">{`Duration: ${props.duration}`}</Text>
    </Box>
  </Box>
)

const Home = props => (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Header/>
      <OptionBar/>

      <Box align="center" pad="medium" gap="medium">
        <FullHeading level={3} margin="none">
          Search millions of opinions by case name, topic, or citation.
        </FullHeading>
        <FullHeading level={4} margin="none">
          403 Jurisdictions. Sponsored by the Non-Profit Free Law Project.
        </FullHeading>
        <Box width="large" direction="row" align="center" round="small" border="all">
          <TextInput type="search" plain={true} />
          <Button icon={<Search />} label="Search" color="accent-2" primary={true} onClick={()=>{}}/>
        </Box>
        <ItalicHeading level={4} margin="none">- or -</ItalicHeading>
        <Anchor href="/opinion" label={<FullHeading level={4} margin="none">Advanced Search</FullHeading>}/>
      </Box>

      <Box direction="row" gap="large">
        <Box basis="1/2">
          <Heading level={3}>About CourtListener</Heading>
          <Paragraph margin="none" fill={true}>
            CourtListener is a free legal research website containing millions of legal opinions from federal and state courts. With CourtListener, lawyers, journalists, academics, and the public can research an important case, stay up to date with new opinions as they are filed, or do deep analysis using our raw data.
          </Paragraph>
        </Box>
        <Box basis="1/2">
          <Heading level={3}>About Free Law Project</Heading>
          <Paragraph margin="none" fill={true}>
            {freelawLink} seeks to provide free access to primary legal materials, develop legal research tools, and support academic research on legal corpora. We work diligently with volunteers to expand our efforts at building an open source, open access, legal research ecosystem. Currently Free Law Project sponsors the development of {clLink}, {jsLink}, and {recapLink}
          </Paragraph>
        </Box>
      </Box>

      <Box direction="row" gap="large">
        <Box basis="1/2">
          <Heading level={3} margin={{ top: 'medium', bottom: 'none' }} >Latest Opinions<DocumentIcon /></Heading>
          <Text size="xxsmall" margin={{ vertical: 'small'}}>
            We download opinions from many jurisdictions on an ongoing basis. Here are the most recent ones.
          </Text>
          {fakeLatestData.map((opinion, index) => <LatestOpinion key={`opinion_${index}`} {...opinion} />)}
          <FlatButton label="See Recent Opinions" href="/?order_by=dateFiled+desc" color="accent-2" primary={true} />
        </Box>
        <Box basis="1/2">
          <Heading level={3} margin={{ top: 'medium', bottom: 'none' }}>Latest Oral Arguments<SoundIcon /></Heading>
          <Text size="xxsmall" margin={{ vertical: 'small'}}>
            We download oral arguments from many jurisdictions on an ongoing basis. Here are the most recent ones.
          </Text>

          {fakeAudioData.map((opinion, index) => <LatestAudio key={`audio_${index}`} {...opinion} />)}
          <FlatButton
            label="See Recent Oral Arguments"
            href="/?order_by=dateArgued+desc&type=OA"
            color="accent-2"
            primary={true}
          />
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
