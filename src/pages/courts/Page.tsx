/** @format */

import { InitialProps } from '@jaredpalmer/after'
import { Anchor, Box, Button, CheckBox, Heading, Text } from 'grommet'
import * as React from 'react'
import Helmet from 'react-helmet'
import {
  prefetchQuery,
  QueryOptionsPaginated,
  QueryResult,
  QueryResultPaginated,
  useQuery,
} from 'react-query'
import { apiFetch } from '../../root/api'
import withLayout from '../../root/layout/withLayout'
import Spinner from '../../root/spinner'
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
    ({ page }: { page?: number } = {}) =>
      apiFetch({
        url: 'https://www.courtlistener.com/api/rest/v3/courts/',
        params: {
          page: page || 1,
        },
      }),
    paginationOptions
  )

  const singlePageQuery: QueryResult<CourtsApiResponse, { page: number }> = useQuery(
    !infiniteScrollEnabled && ['getSingleCourtPage', { page: activePageIndex + 1 }],
    ({ page }) =>
      apiFetch({
        url: 'https://www.courtlistener.com/api/rest/v3/courts/',
        params: {
          page: page,
        },
      })
  )

  const data = infiniteScrollEnabled
    ? infiniteQuery.data
    : singlePageQuery.data
    ? [singlePageQuery.data]
    : []

  const isLoading = infiniteScrollEnabled ? infiniteQuery.isLoading : singlePageQuery.isLoading

  const { isFetching, isFetchingMore, canFetchMore, fetchMore } = infiniteQuery

  const totalItemCount = data && data[0] && data[0].count

  const flattenData = (responses: CourtsApiResponse[] | null) => {
    const results: CourtsData[] = []
    if (responses) {
      responses.map(res => (res === null ? null : results.push(...res.results)))
    }
    return results
  }

  const tableData = React.useMemo(() => flattenData(data), [data])

  const nextUrl =
    !infiniteScrollEnabled || !data ? '' : data.length > 0 ? data[data.length - 1].next : ''
  const totalPageCount = totalItemCount ? totalItemCount / itemsPerPage : 1

  return (
    <>
      <Helmet>
        <title>Available Jurisdictions</title>
      </Helmet>

      <Box direction="row-responsive" pad="medium" gap="large" align="center">
        <Heading level={3} margin={{ right: 'auto' }}>
          <strong>Available Jurisdictions</strong>
        </Heading>
        <Box direction="row" gap="large">
          {infiniteScrollEnabled && isFetchingMore && <Text size="small">Loading</Text>}
          {infiniteScrollEnabled && isFetchingMore && <Spinner spin size="2x" />}
          <CheckBox
            reverse
            toggle
            onChange={() => toggleInfiniteScroll(!infiniteScrollEnabled)}
            label={`Toggle ${infiniteScrollEnabled ? 'Pagination' : 'Infinite Scroll'}`}
          />
        </Box>
      </Box>
      <Box direction="column" pad="medium" gap="medium">
        <Text size="small">
          We currently have {totalItemCount} jurisdictions available on CourtListener. These
          jurisdictions are available via our API or can be used in our bulk data queries.
        </Text>
        <Text size="small">
          Some of the data below is incomplete, missing dates or other information. If you are a
          legal researcher interested in helping us research this or other data, please get in touch
          via our contact form. We welcome your contribution.
        </Text>
      </Box>
      <Box border="all" overflow={{ vertical: 'auto' }} margin={{ vertical: 'medium' }}>
        {isLoading ? (
          <Heading level={3}>Loading ...</Heading>
        ) : data ? (
          <CourtsTable
            totalPageCount={totalPageCount}
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
        ) : null}
      </Box>
    </>
  )
}

Jurisdictions.getInitialProps = async (props: InitialProps) => {
  const prefetchedData: Promise<CourtsApiResponse> = prefetchQuery('getInfiniteCourtPage', () =>
    apiFetch({
      url: 'https://www.courtlistener.com/api/rest/v3/courts',
      params: { page: 1 },
    })
  )
  return { ...props, ...prefetchedData }
}

// wrap the page with our layout
export default withLayout(Jurisdictions)
