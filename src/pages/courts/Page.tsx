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

  const [activePageIndex, setActivePageIndex] = React.useState(0)
  const [itemsPerPage, setItemsPerPage] = React.useState(20)
  const [infiniteScrollEnabled, toggleInfiniteScroll] = React.useState(true)

  // type lastPage as any until it is properly typed as a data object
  // see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/40899
  const paginationOptions: QueryOptionsPaginated<CourtsApiResponse> = {
    getCanFetchMore: (lastPage: any) => lastPage && !!lastPage.next,
    paginated: true,
  }

  const infiniteQuery: QueryResultPaginated<CourtsApiResponse, { page?: number }> = useQuery(
    'getInfiniteCourtPage',
    ({ page }: {page?: number} = {}) =>
      apiFetch('https://www.courtlistener.com/api/rest/v3/courts/?page=' + (page || 1)),
    paginationOptions
  )

  const singlePageQuery: QueryResult<CourtsApiResponse, { page: number }> = useQuery(
    !infiniteScrollEnabled && ['getSingleCourtPage', { page: activePageIndex + 1 }],
    ({ page }) => apiFetch('https://www.courtlistener.com/api/rest/v3/courts/?page=' + page)
  )

  const {
    data,
    isLoading,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore
  } = infiniteQuery

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
    () => infiniteScrollEnabled ? flattenData(data) : flattenData([singlePageQuery.data] || null),
    [data, singlePageQuery.data]
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
                activePageIndex={activePageIndex}
                setActivePageIndex={setActivePageIndex}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                data={tableData}
                canFetchMore={canFetchMore}
                isFetchingMore={isFetchingMore}
                fetchMore={fetchMore}
                isFetching={isFetching}
                infiniteScrollEnabled={infiniteScrollEnabled}
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
  const prefetchedData: Promise<CourtsApiResponse> = prefetchQuery(
    'getCourts',
    () =>
      apiFetch('https://www.courtlistener.com/api/rest/v3/courts/?page=1')
  )
  return { ...props, ...prefetchedData }
}

// wrap the page with our layout
export default (withLayout(Jurisdictions))
