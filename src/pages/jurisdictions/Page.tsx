import { Box, Heading, Paragraph } from 'grommet'
import * as React from 'react'
import Helmet from 'react-helmet'
import { prefetchQuery, useQuery } from 'react-query'
import { fetchJurisidictions } from '../../root/api'
import withLayout from '../../root/layout/withLayout'
import { StatelessPage } from '../../typings'
import Table from './_table'

const Jurisdictions: StatelessPage<{}> = () => (
    <>
      <Helmet>
        <title>Available Jurisdictions</title>
      </Helmet>
      <Box>
        <Heading level={3}>Available Jurisdictions</Heading>
        <Paragraph size="small">
          We currently have 420 jurisdictions available on CourtListener.
          These jurisdictions are available via our API or can be used in our bulk data queries.
        </Paragraph>
        <Paragraph size="small">
          Some of the data below is incomplete, missing dates or other information.
          If you are a legal researcher interested in helping us research this or other
          data, please get in touch via our contact form. We welcome your contribution.
        </Paragraph>
        <Table/>
      </Box>
    </>
  )

Jurisdictions.getInitialProps = async (props: InitialProps) => {
  prefetchQuery('jurisdictions', fetchJurisidictions)
  return { ...props }
}

// wrap the page with our layout
export default (withLayout(Jurisdictions))
