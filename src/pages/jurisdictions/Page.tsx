import { Box, Heading, Paragraph, Text } from 'grommet'
import * as React from 'react'
import Helmet from 'react-helmet'
import { prefetchQuery, useQuery } from 'react-query'
import AutoSizer from 'react-virtualized-auto-sizer'
import { fetchCourts } from '../../root/api'
import withLayout from '../../root/layout/withLayout'
import { StatelessPage } from '../../typings'
import Table from './_table'

const Jurisdictions: StatelessPage<{}> = (props) => (
  <AutoSizer disableWidth>
    {({height}) => (
      <>
        <Helmet>
          <title>Available Jurisdictions</title>
        </Helmet>
        <Box fill>
          <Heading level={3} margin="none">Available Jurisdictions</Heading>
          <Text size="small">
            We currently have {props.data && props.data.results[0].count} jurisdictions available on CourtListener.
            These jurisdictions are available via our API or can be used in our bulk data queries.
          </Text>
          <Text size="small">
            Some of the data below is incomplete, missing dates or other information.
            If you are a legal researcher interested in helping us research this or other
            data, please get in touch via our contact form. We welcome your contribution.
          </Text>
          <Table height={height}/>
        </Box>
      </>
    )}
  </AutoSizer>
  )

Jurisdictions.getInitialProps = async (props: InitialProps) => {
  prefetchQuery('getCourts', fetchCourts)
  return { ...props }
}

// wrap the page with our layout
export default (withLayout(Jurisdictions))
