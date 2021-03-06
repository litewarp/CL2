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
import { apiFetch } from '../root/api'
import withLayout from '../root/layout/withLayout'
import Spinner from '../root/spinner'
import { CourtsApiResponse } from '../typings/api'
import CourtsTable from './_courtsTable'

const Jurisdictions = () => {
  const [pageIndex, setPageIndex] = React.useState<number>(0)
  const [pageSize, setPageSize] = React.useState<number>(20)
  const [sortBy, setSortBy] = React.useState<Array<{ id: string; desc: boolean }>>([])
  const [infiniteScrollEnabled, toggleInfiniteScroll] = React.useState<boolean>(true)

  const sortByParams =
    sortBy.length > 0 && sortBy[0].id
      ? sortBy[0].desc
        ? { sort_by: '-' + sortBy[0].id }
        : { sort_by: sortBy[0].id }
      : null

  // type lastPage as any until it is properly typed as a data object
  // see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/40899
  const paginationOptions: QueryOptionsPaginated<CourtsApiResponse> = {
    getCanFetchMore: (lastPage: any) => lastPage && !!lastPage.next,
    paginated: true,
  }

  // @ts-ignore
  const infiniteQuery: QueryResultPaginated<CourtsApiResponse, { page?: string }> = useQuery(
    ['getInfiniteCourtPage', { sortBy }],
    ({ page }: { page?: string } = {}) => {
      // use the server nextPage url if present
      if (!!page) {
        return apiFetch({ url: page })
      } else {
        return apiFetch({
          url: 'https://www.courtlistener.com/api/rest/v3/courts/',
          params: {
            page: 1,
            ...sortByParams,
          },
        })
      }
    },
    paginationOptions
  )

  const singlePageQuery: QueryResult<CourtsApiResponse, { page: number }> = useQuery(
    !infiniteScrollEnabled && ['getSingleCourtPage', { page: pageIndex + 1 }],
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
  const totalPageCount = totalItemCount ? totalItemCount / pageSize : 1

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
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageSize={pageSize}
            setPageSize={setPageSize}
            data={data}
            canFetchMore={canFetchMore}
            isFetchingMore={isFetchingMore}
            fetchMore={fetchMore}
            isFetching={isFetching}
            infiniteScrollEnabled={infiniteScrollEnabled}
            sortBy={sortBy}
            setSortBy={setSortBy}
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
