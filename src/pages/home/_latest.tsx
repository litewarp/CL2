import { Anchor, Button, Heading, Text } from 'grommet'
import * as React from 'react'
import { FaRegFileAlt, FaVolumeUp } from 'react-icons/fa'
import { QueryResult, useQuery } from 'react-query'
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

interface OpinionResult {
  absoluteUrl: string,
  caseName: string,
  resourceUri: string,
  dateCreated: string,
  docket: string,
  status?: string,
  natureSuit?: string,
  duration?: string
}

// local components
const LatestOpinion = (props: OpinionResult) => {
  const docketNumber = props.docket && props.docket.split('/')[props.docket.split('/').length - 2]
  const dateString = `Date Filed: ${props.dateCreated}`
  const statusString = `Status: ${props.status}`
  const docketString = `Docket Number: ${docketNumber}`
  const natureString = `Nature of Suit: ${props.natureSuit}`
  return (
    <>
      <Anchor size="medium" label={props.caseName} href={props.absoluteUrl}/>
      <Text size="small">
        {dateString} {props.status && statusString} {docketString} {props.natureSuit && natureString}
      </Text>
    </>
  )
}

const LatestAudio = (props: OpinionResult) => {
  const docketNumber = props.docket && props.docket.split('/')[props.docket.split('/').length - 2]
  const dateString = `Date Argued: ${props.dateCreated}`
  const docketString = `Docket Number: ${docketNumber}`
  const durationString = `Duration: ${props.duration}`
  return (
    <>
      <Anchor size="medium" label={props.caseName} href={props.absoluteUrl}/>
      <Text size="small">{dateString} {docketString} {durationString}</Text>
    </>
  )
}

// exported components
export const LatestOpinionList = () => {
  const { data, isLoading } = useQuery('latestOpinions', fetchLatestOpinion)
  const firstFiveResults = data && data.results.slice(0, 5)
  return (
    <>
      <Heading level={3} margin={{ top: 'medium', bottom: 'none' }} >
        Latest Opinions
        <DocumentIcon />
      </Heading>
      <Text size="xxsmall" margin={{ vertical: 'small'}}>
        We download opinions from many jurisdictions on an ongoing basis. Here are the most recent ones.
      </Text>
      {data && firstFiveResults.map((opinion: OpinionResult, index: number) =>
        <LatestOpinion key={`opinion_${index}`} {...opinion} />)
      }
      <FlatButton label="See Recent Opinions" href="/?order_by=dateFiled+desc" color="accent-2" primary/>
    </>
  )
}

export const LatestAudioList = () => {
  const { data, isLoading, error } = useQuery('latestAudio', fetchLatestAudio)
  const firstFiveResults = data && data.results.slice(0, 5)
  return (
    <>
      <Heading level={3} margin={{ top: 'medium', bottom: 'none' }}>
        Latest Oral Arguments
        <SoundIcon />
      </Heading>
      <Text size="xxsmall" margin={{ vertical: 'small'}}>
        We download oral arguments from many jurisdictions on an ongoing basis. Here are the most recent ones.
      </Text>
      {data && firstFiveResults.map((opinion: OpinionResult, index: number) =>
        <LatestAudio key={`audio_${index}`} {...opinion} />)
      }
      <FlatButton
        label="See Recent Oral Arguments"
        href="/?order_by=dateArgued+desc&type=OA"
        color="accent-2"
        primary
      />
    </>
  )
}
