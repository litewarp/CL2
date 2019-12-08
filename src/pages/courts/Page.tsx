import { InitialProps } from '@jaredpalmer/after'
import { Box, Heading, Paragraph, Text } from 'grommet'
import * as React from 'react'
import Helmet from 'react-helmet'
import { prefetchQuery, QueryResultPaginated, useQuery } from 'react-query'
import { apiFetch, fetchCourts } from '../../root/api'
import withLayout from '../../root/layout/withLayout'
import { StatelessPage } from '../../typings'
import { CourtsApiResponse, CourtsData } from '../../typings/api'
import Table from './_table'

const Jurisdictions = (props) => {

  const courtsData: QueryResultPaginated<CourtsApiResponse, {}> = useQuery(
    'getCourts',
    ({ next }= {}) => apiFetch(next || 'https://www.courtlistener.com/api/rest/v3/courts'),
    {
      getCanFetchMore: (lastPage: CourtsApiResponse) => lastPage && !!lastPage.next,
      paginated: true,
    }
  )
  const totalItemCount = courtsData.data && courtsData.data[0] && courtsData.data[0].count

  return (
    <>
      <Helmet>
        <title>Available Jurisdictions</title>
      </Helmet>
      <Box fill>
        <Heading level={3} margin="none">Available Jurisdictions</Heading>
        <Text size="small">
          We currently have {totalItemCount} jurisdictions available on CourtListener.
          These jurisdictions are available via our API or can be used in our bulk data queries.
        </Text>
        <Text size="small">
          Some of the data below is incomplete, missing dates or other information.
          If you are a legal researcher interested in helping us research this or other
          data, please get in touch via our contact form. We welcome your contribution.
        </Text>
        {courtsData.isLoading
          ? <Heading level={3}>Loading ...</Heading>
          : <Table {...courtsData}/>
        }
      </Box>
    </>
  )
}

Jurisdictions.getInitialProps = async (props: InitialProps) => {
  const courtsData: QueryResultPaginated<CourtsApiResponse, {}> = await prefetchQuery(
    'getCourts',
    () => apiFetch('https://www.courtlistener.com/api/rest/v3/courts'),
    { paginated: true }
  )
  return { ...props  }
}

// wrap the page with our layout
export default (withLayout(Jurisdictions))
