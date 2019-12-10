/** @format */

import { faChartLine, faChartPie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Anchor,
  Box,
  Button,
  Heading,
  Image,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Text,
} from 'grommet'
import * as React from 'react'
import styled from 'styled-components'

// tslint:disable:no-var-requires
const scotusChart = require('./_scotusChart.png')

const PieChartIcon = styled(FontAwesomeIcon)`
  margin-left: 1rem;
`
const ArrowChartIcon = styled(FontAwesomeIcon)`
  margin-left: 1rem;
`

const FlatButton = styled(Button)`
  max-width: 75%;
  font-size: 1em;
`
export const ScotusNetwork = () => (
  <>
    <Heading level={3} margin="none">
      Supreme Court Network Visualizations
      <ArrowChartIcon icon={faChartLine} />
    </Heading>
    <Text size="xxsmall">
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
  </>
)

export const TheNumbers = () => {
  const precedentLink = <Anchor label="precedential opinions" href="/?order_by=dateFiled+desc" />
  const oralArgLink = <Anchor label="oral arguments" href="/?type=OA" />
  const alertEmailLink = <Anchor label="alert emails" href="/faq/#explain-alerts" />
  const apiLink = <Anchor label="API calls" href="/api" />
  const rows = [
    {
      name: '3,605,863',
      text: <Text size="small">Number of {precedentLink} in CourtListener.</Text>,
    },
    { name: '3,287', text: <Text size="small">Opinions added in last ten days.</Text> },
    {
      name: '1,466',
      text: <Text size="small">Duration of {oralArgLink} in CourtListener, in days.</Text>,
    },
    { name: '306', text: <Text size="small">Oral arguments added in the last ten days.</Text> },
    {
      name: '118,611',
      text: <Text size="small">Number of queries made in the last ten days.</Text>,
    },
    {
      name: '7,529',
      text: <Text size="small">Number of {alertEmailLink} sent in the last ten days.</Text>,
    },
    {
      name: '1,356,472',
      text: <Text size="small">{apiLink} made against our system in last ten days.</Text>,
    },
  ]
  return (
    <>
      <Heading level={3} margin="none">
        The Numbers
        <PieChartIcon icon={faChartPie} />
      </Heading>
      <Table>
        <TableBody>
          {rows.map((column, index) => (
            <TableRow key={`unique_key_${index}`}>
              <TableCell scope="col" align="center">
                {column.name}
              </TableCell>
              <TableCell scope="col" align="center">
                {column.text}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
