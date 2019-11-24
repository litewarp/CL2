import { Anchor, Box, Button, Heading, Table, TableBody, TableCell, TableRow, Text } from 'grommet'
import * as React from 'react'
import { FaChartLine, FaChartPie } from 'react-icons/fa'
import styled from 'styled-components'

// tslint:disable:no-var-requires
const fakeScotusChart = require('./fakeScotusChart.png')

const PieChartIcon = styled(FaChartPie)` margin-left: 1rem `
const ArrowChartIcon = styled(FaChartLine)` margin-left: 1rem `

export const ScotusNetwork = () => (
  <>
    <Heading level={3} margin="none">
      Supreme Court Network Visualizations
      <ArrowChartIcon />
    </Heading>
    <Text size="xxsmall" margin={{ vertical: 'small' }}>
      Supreme Court Network Visualizations allow you to see and analyze lines of precedent in Supreme Court cases.
    </Text>
    <img src={fakeScotusChart} width="470" height="250"/>
    <Box direction="row" justify="start">
      <Button
        label="See Gallery"
        color="light-1"
        href="/visualizations/gallery"
      />
      <Button
        label="Learn More About SCOTUS Networks"
        color="accent-2"
        href="/visualizations/scotus-mapper"
        primary={true}
        margin={{ left: 'auto' }}
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
    { name: '3,605,863', text: <Text size="small">Number of {precedentLink} in CourtListener.</Text> },
    { name: '3,287', text: <Text size="small">Opinions added in last ten days.</Text> },
    { name: '1,466', text: <Text size="small">Duration of {oralArgLink} in CourtListener, in days.</Text> },
    { name: '306', text: <Text size="small">Oral arguments added in the last ten days.</Text> },
    { name: '118,611', text: <Text size="small">Number of queries made in the last ten days.</Text> },
    { name: '7,529', text: <Text size="small">Number of {alertEmailLink} sent in the last ten days.</Text> },
    { name: '1,356,472', text: <Text size="small">{apiLink} made against our system in last ten days.</Text> }
  ]
  return (
    <>
      <Heading level={3} margin="none" >
        The Numbers
        <PieChartIcon />
      </Heading>
      <Table>
        <TableBody>
          {rows.map((column, index) => (
            <TableRow key={`unique_key_${index}`}>
              <TableCell scope="col" align="center">{column.name}</TableCell>
              <TableCell scope="col" align="center">{column.text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
