import { InitialProps } from '@jaredpalmer/after'
import { Box, Heading, Text } from 'grommet'
import * as React from 'react'
import Helmet from 'react-helmet'
import { prefetchQuery, QueryOptionsPaginated, QueryResult, QueryResultPaginated, useQuery } from 'react-query'
import { apiFetch } from '../../root/api'
import withLayout from '../../root/layout/withLayout'
import { CourtsApiResponse, CourtsData } from '../../typings/api'
import CourtsTable from './_table'

const Jurisdictions = () => {

  // type lastPage as any until it is properly typed as a data object
  // see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/40899
  const paginationOptions: QueryOptionsPaginated<CourtsApiResponse> = {
    getCanFetchMore: (lastPage: any) => lastPage && !!lastPage.next,
    paginated: true,
  }

  const courtsQuery: QueryResultPaginated<CourtsApiResponse, {}> = useQuery(
    'getCourts',
    ({ page }: {page?: number} = {}) =>
      apiFetch('https://www.courtlistener.com/api/rest/v3/courts/?page=' + (page || 1)),
    paginationOptions
  )
  const {
    data,
    isLoading,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore
  } = courtsQuery

  const totalItemCount = data && data[0] && data[0].count

  const flattenData = (responses: CourtsApiResponse[] | null) => {
    const results: CourtsData[]  = []
    if (responses) {
      responses.map(
        (res) => res.results ? results.push(...res.results) : null
      )
    }
    return results
  }

  const tableData = React.useMemo(
    () => flattenData(data),
    [data]
  )

  const nextUrl = (data && data.length > 0) ? data[data.length - 1].next : ''

  return (
    <>
      <Helmet>
        <title>Available Jurisdictions</title>
      </Helmet>
      <Heading level={3}>
        <strong>Available Jurisdictions</strong>
      </Heading>
      <Text size="small">
        We currently have {totalItemCount} jurisdictions available on CourtListener.
        These jurisdictions are available via our API or can be used in our bulk data queries.
      </Text>
      <Text size="small">
        Some of the data below is incomplete, missing dates or other information.
        If you are a legal researcher interested in helping us research this or other
        data, please get in touch via our contact form. We welcome your contribution.
      </Text>
      <Heading level={3}>{isFetchingMore ? 'Loading Courts ...' : `Courts Loaded: ${tableData.length}`}</Heading>
      <Box border="all" overflow={{ vertical: 'auto' }} margin={{ vertical: 'medium' }}>
        {isLoading
          ? <Heading level={3}>Loading ...</Heading>
          : data
            ? (
              <CourtsTable
                data={tableData}
                canFetchMore={canFetchMore}
                isFetchingMore={isFetchingMore}
                fetchMore={fetchMore}
                isFetching={isFetching}
                nextUrl={nextUrl}
              />
            )
            : null
        }
      </Box>
    </>
  )
}

Jurisdictions.getInitialProps = async (props: InitialProps) => {
  prefetchQuery(
    'getCourts',
    () =>
      apiFetch('https://www.courtlistener.com/api/rest/v3/courts/?page=1')
  )
  return { ...props  }
}

// wrap the page with our layout
export default (withLayout(Jurisdictions))
