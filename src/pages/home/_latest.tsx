import { Anchor, Button, Heading, Text } from 'grommet'
import * as React from 'react'
import { FaRegFileAlt, FaVolumeUp } from 'react-icons/fa'
import styled from 'styled-components'

// mock api call
import { fakeAudioData, fakeLatestData } from './_fakeData'

// override grommet with styled-components
const DocumentIcon = styled(FaRegFileAlt)` margin-left: 1rem`
const SoundIcon = styled(FaVolumeUp)` margin-left: 1rem`
const FlatButton = styled(Button)`
  max-width: 75%;
  margin: .5rem 0 0 auto;
  font-size: 1em;
`

// local components
const LatestOpinion = (props: {
  caption: string,
  link: string,
  dateFiled: string,
  docketNumber: string,
  status: string,
  natureSuit: string,
}) => {
  const dateString = `Date Filed: ${props.dateFiled}`
  const statusString = `Status: ${props.status}`
  const docketString = `Docket Number: ${props.docketNumber}`
  const natureString = `Nature of Suit: ${props.natureSuit}`
  return (
    <>
      <Anchor size="medium" label={props.caption} href={props.link}/>
      <Text size="small">
        {dateString} {statusString} {docketString} {props.natureSuit && natureString}
      </Text>
    </>
  )
}

const LatestAudio = (props: {
  caption: string,
  link: string,
  dateArgued: string,
  docketNumber: string,
  duration: string
}) => {
  const dateString = `Date Argued: ${props.dateArgued}`
  const docketString = `Docket Number: ${props.docketNumber}`
  const durationString = `Duration: ${props.duration}`
  return (
    <>
      <Anchor size="medium" label={props.caption} href={props.link}/>
      <Text size="small">{dateString} {docketString} {durationString}</Text>
    </>
  )
}

// exported components
export const LatestOpinionList = () => (
  <>
    <Heading level={3} margin={{ top: 'medium', bottom: 'none' }} >
      Latest Opinions
      <DocumentIcon />
    </Heading>
    <Text size="xxsmall" margin={{ vertical: 'small'}}>
      We download opinions from many jurisdictions on an ongoing basis. Here are the most recent ones.
    </Text>
    {fakeLatestData.map((opinion, index) => <LatestOpinion key={`opinion_${index}`} {...opinion} />)}
    <FlatButton label="See Recent Opinions" href="/?order_by=dateFiled+desc" color="accent-2" primary/>
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
      primary
    />
  </>
)
