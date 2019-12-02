import { Anchor, Button, Heading, Text } from 'grommet'
import * as React from 'react'
import { FaRegFileAlt, FaVolumeUp } from 'react-icons/fa'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { fetchLatestAudio, fetchLatestOpinion } from './../../root/layout/api'
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
  caseName: string,
  resourceUri: string,
  dateCreated: string,
  docketNumber: string,
  status: string,
  natureSuit: string,
}) => {
  const dateString = `Date Filed: ${props.dateCreated}`
  const statusString = `Status: ${props.status}`
  const docketString = `Docket Number: ${props.docketNumber}`
  const natureString = `Nature of Suit: ${props.natureSuit}`
  return (
    <>
      <Anchor size="medium" label={props.caseName} href={props.resourceUri}/>
      <Text size="small">
        {dateString} {props.status && statusString} {docketString} {props.natureSuit && natureString}
      </Text>
    </>
  )
}

const LatestAudio = (props: {
  caseName: string,
  resourceUri: string,
  dateCreated: string,
  docketNumber: string,
  duration: string
}) => {
  console.log(props)
  const dateString = `Date Argued: ${props.dateCreated}`
  const docketString = `Docket Number: ${props.docketNumber}`
  const durationString = `Duration: ${props.duration}`
  return (
    <>
      <Anchor size="medium" label={props.caseName} href={props.resourceUri}/>
      <Text size="small">{dateString} {docketString} {durationString}</Text>
    </>
  )
}

// exported components
export const LatestOpinionList = () => {
  const { data, isLoading, error } = useQuery('latestOpinions', fetchLatestOpinion)
  return (
    <>
      <Heading level={3} margin={{ top: 'medium', bottom: 'none' }} >
        Latest Opinions
        <DocumentIcon />
      </Heading>
      <Text size="xxsmall" margin={{ vertical: 'small'}}>
        We download opinions from many jurisdictions on an ongoing basis. Here are the most recent ones.
      </Text>
      {data && data.results.map((opinion, index) => <LatestOpinion key={`opinion_${index}`} {...opinion} />)}
      <FlatButton label="See Recent Opinions" href="/?order_by=dateFiled+desc" color="accent-2" primary/>
    </>
  )
}
export const LatestAudioList = () => {
  const { data, isLoading, error } = useQuery('latestAudio', fetchLatestAudio)
  return (
    <>
      <Heading level={3} margin={{ top: 'medium', bottom: 'none' }}>Latest Oral Arguments<SoundIcon /></Heading>
      <Text size="xxsmall" margin={{ vertical: 'small'}}>
        We download oral arguments from many jurisdictions on an ongoing basis. Here are the most recent ones.
      </Text>

      {data && data.results.map((opinion, index) => <LatestAudio key={`audio_${index}`} {...opinion} />)}
      <FlatButton
        label="See Recent Oral Arguments"
        href="/?order_by=dateArgued+desc&type=OA"
        color="accent-2"
        primary
      />
    </>
  )
}
