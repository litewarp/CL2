/** @format */

import { faChartLine, faChartPie, faFileAlt, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Anchor, Box, Button, Heading, Image, Text } from 'grommet'
import * as React from 'react'
import { QueryResult, useQuery } from 'react-query'
import styled from 'styled-components'
import { fetchLatestAudio, fetchLatestOpinion } from './../root/api'
import Spinner from './../root/spinner'
import { OpinionApiResponse, OpinionData } from './../typings/api'

// tslint:disable:no-var-requires
const scotusChart = require('./_assets/scotusChart.png')

// override grommet with styled-components
const StyledIcon = styled(FontAwesomeIcon)`
  margin-left: 1rem;
`
const FlatButton = styled(Button)`
  max-width: 75%;
  margin: 0.5rem 0 0 auto;
  font-size: 1em;
`
// local components
const LatestOpinion = (props: OpinionData) => (
  <>
    <Anchor size="medium" label={props.caseName} href={props.absoluteUrl} />
    <Box direction="row" gap="large">
      <Text size="small">Date Filed: {props.dateCreated}</Text>
      <Text size="small">
        Docket Number: {props.docket && props.docket.split('/')[props.docket.split('/').length - 2]}
      </Text>
      <Text size="small">
        {props.precedentialStatus && (
          <Text size="small">{`Status: ${props.precedentialStatus}`} </Text>
        )}
      </Text>
    </Box>
  </>
)

const LatestAudio = (props: OpinionData) => (
  <>
    <Anchor size="medium" label={props.caseName} href={props.absoluteUrl} />
    <Box direction="row" gap="large">
      <Text size="small">Date Argued: {props.dateCreated}</Text>
      <Text size="small">
        Docket Number: {props.docket && props.docket.split('/')[props.docket.split('/').length - 2]}
      </Text>
      <Text size="small">Duration: {props.duration}</Text>
    </Box>
  </>
)

// exported components
export const LatestOpinionList = (props: {
  data: OpinionApiResponse | null
  isLoading: boolean
}) => {
  const firstFiveResults = props.data ? props.data.results.slice(0, 5) : []
  return props.isLoading ? (
    <Spinner size="4x" spin />
  ) : (
    <>
      <Heading level={3}>
        Latest Opinions
        <StyledIcon icon={faFileAlt} />
      </Heading>
      <Box gap="small">
        <Text size="xxsmall">
          We download opinions from many jurisdictions on an ongoing basis. Here are the most recent
          ones.
        </Text>
        {props.data &&
          firstFiveResults.map((opinion: OpinionData, index: number) => (
            <LatestOpinion key={`opinion_${index}`} {...opinion} />
          ))}
        <FlatButton
          label="See Recent Opinions"
          href="/?order_by=dateFiled+desc"
          color="accent-2"
          primary
        />
      </Box>
    </>
  )
}

export const LatestAudioList = (props: { data: OpinionApiResponse | null; isLoading: boolean }) => {
  const firstFiveResults = props.data ? props.data.results.slice(0, 5) : []
  return props.isLoading ? (
    <Spinner size="4x" spin />
  ) : (
    <>
      <Heading level={3}>
        Latest Oral Arguments
        <StyledIcon icon={faVolumeUp} />
      </Heading>
      <Box gap="small">
        <Text size="xxsmall">
          We download oral arguments from many jurisdictions on an ongoing basis. Here are the most
          recent ones.
        </Text>
        {props.data &&
          firstFiveResults.map((opinion: OpinionData, index: number) => (
            <LatestAudio key={`audio_${index}`} {...opinion} />
          ))}
        <FlatButton
          label="See Recent Oral Arguments"
          href="/?order_by=dateArgued+desc&type=OA"
          color="accent-2"
          primary
        />
      </Box>
    </>
  )
}

export const ScotusNetwork = () => (
  <>
    <Heading level={3}>
      Supreme Court Network Visualizations
      <StyledIcon icon={faChartLine} />
    </Heading>
    <Box direction="column" gap="medium">
      <Text size="small">
        Supreme Court Network Visualizations allow you to see and analyze lines of precedent in
        Supreme Court cases.
      </Text>
      <Image src={scotusChart} fit="contain" margin="small" />
      <Box direction="row" justify="between">
        <FlatButton label="See Gallery" color="light-1" href="/visualizations/gallery" />
        <FlatButton
          primary
          label="Learn More About SCOTUS Networks"
          color="accent-2"
          href="/visualizations/scotus-mapper"
        />
      </Box>
    </Box>
  </>
)

const FixedText = styled(Text)`
  min-width: 75px;
  max-width: 75px;
  padding-right: 2em;
`

interface HomePageNumbersProps {
  opinions: string
  opinionsLastTenDays: string
  oralArgLength: string
  oralArgsAdded: string
  queriesLastTenDays: string
  alertEmails: string
  apiCalls: string
}

export const TheNumbers = (props: { data: HomePageNumbersProps }) => {
  const precedentLink = <Anchor label="precedential opinions" href="/?order_by=dateFiled+desc" />
  const oralArgLink = <Anchor label="oral arguments" href="/?type=OA" />
  const alertEmailLink = <Anchor label="alert emails" href="/faq/#explain-alerts" />
  const apiLink = <Anchor label="API calls" href="/api" />
  return (
    <>
      <Heading level={3}>
        The Numbers
        <StyledIcon icon={faChartPie} />
      </Heading>
      <Box direction="column">
        <Box direction="row" pad="small" align="center">
          <FixedText>{props.data.opinions}</FixedText>
          <Text>Number of {precedentLink} in CourtListener.</Text>
        </Box>
        <Box direction="row" pad="small" align="center">
          <FixedText>{props.data.opinionsLastTenDays}</FixedText>
          <Text>Opinions added in last ten days.</Text>
        </Box>
        <Box direction="row" pad="small" align="center">
          <FixedText>{props.data.oralArgLength}</FixedText>
          <Text>Duration of {oralArgLink} in CourtListener, in days.</Text>
        </Box>
        <Box direction="row" pad="small" align="center">
          <FixedText>{props.data.oralArgsAdded}</FixedText>
          <Text>Number of queries made in the last ten days.</Text>
        </Box>

        <Box direction="row" pad="small" align="center">
          <FixedText>{props.data.alertEmails}</FixedText>
          <Text>Number of {alertEmailLink} sent in the last ten days.</Text>
        </Box>
        <Box direction="row" pad="small" align="center">
          <FixedText>{props.data.apiCalls}</FixedText>
          <Text>{apiLink} made against our system in last ten days.</Text>
        </Box>
      </Box>
    </>
  )
}

export default () => {
  const latestAudio: QueryResult<OpinionApiResponse, {}> = useQuery('latestAudio', fetchLatestAudio)

  const latestOpinions: QueryResult<OpinionApiResponse, {}> = useQuery(
    'latestOpinions',
    fetchLatestOpinion
  )
  const fakeNumbersData = {
    opinions: '3,605,863',
    opinionsLastTenDays: '3,287',
    oralArgLength: '1,466',
    oralArgsAdded: '306',
    queriesLastTenDays: '118,611',
    alertEmails: '7,529',
    apiCalls: '1,356,472',
  }

  return (
    <>
      <Box basis="1/2" pad="medium" gap="medium">
        <LatestOpinionList data={latestOpinions.data} isLoading={latestOpinions.isLoading} />
      </Box>
      <Box basis="1/2" pad="medium" gap="medium">
        <LatestAudioList data={latestAudio.data} isLoading={latestAudio.isLoading} />
      </Box>
      <Box basis="1/2" pad="medium" gap="medium">
        <ScotusNetwork />
      </Box>
      <Box basis="1/2" pad="medium" gap="medium">
        <TheNumbers data={fakeNumbersData} />
      </Box>
    </>
  )
}
