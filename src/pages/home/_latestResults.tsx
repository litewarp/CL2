import * as React from 'react'
import { Anchor, Box, Button, Heading, Text } from 'grommet'
import { DocumentText, Search, Volume } from 'grommet-icons'
import styled from 'styled-components'

// mock api call
import { fakeLatestData,fakeAudioData } from "./_fakeData"

// override grommet with styled-components
const DocumentIcon = styled(DocumentText)` margin-left: 1rem`
const SoundIcon = styled(Volume)` margin-left: 1rem`
const FlatButton = styled(Button)`margin-top: 1rem; max-width: 50%; margin-left: auto`

// local components
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

// exported components
export const LatestOpinionList = () => (
  <>
    <Heading level={3} margin={{ top: 'medium', bottom: 'none' }} >Latest Opinions<DocumentIcon /></Heading>
    <Text size="xxsmall" margin={{ vertical: 'small'}}>
      We download opinions from many jurisdictions on an ongoing basis. Here are the most recent ones.
    </Text>
    {fakeLatestData.map((opinion, index) => <LatestOpinion key={`opinion_${index}`} {...opinion} />)}
    <FlatButton label="See Recent Opinions" href="/?order_by=dateFiled+desc" color="accent-2" primary={true} />
  </>
)

export const LatestAudioList = () => (
  <>
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
  </>
)
