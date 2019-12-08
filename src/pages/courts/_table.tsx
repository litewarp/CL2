import dayjs from 'dayjs'
import { Box, Text } from 'grommet'
import * as React from 'react'
import { QueryResultPaginated, useQuery } from 'react-query'
import { useBlockLayout, useTable } from 'react-table'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import { apiFetch, fetchCourts } from '../../root/api'
import { CourtsApiResponse, CourtsData } from '../../typings/api'

interface TableProps {
  isFetching: boolean,
  isFetchingMore: boolean,
  isLoading: boolean,
  canFetchMore: boolean,
  fetchMore: ({page}: { page: number }) => void,
  data: Promise<CourtsApiResponse[]> | CourtsApiResponse[],
  nextUrl: string
}

const Table = (props: TableProps) => {
  // destructure everything but data
  const {
    isFetching,
    isFetchingMore,
    isLoading,
    canFetchMore,
    fetchMore
  } = props

  const data = props && props.data

  const columns = React.useMemo(
    () => [
      { Header: 'Name', accessor: 'fullName', },
        // need to provide from api, accessor: 'count',
      { Header: 'Count', acessor: 'count' },
      { Header: 'Jurisdiction', accessor: 'jurisdiction', },
      { Header: 'Homepage', accessor: 'resourceUri', },
      { Header: 'Citation Abbreviation', accessor: 'citationString', },
      { Header: 'Start Date', accessor: (row: CourtsData) => dayjs(row.startDate).format('MM-DD-YYYY'), },
      { Header: 'End Date', accessor: (row: CourtsData) => dayjs(row.endDate).format('MM-DD-YYYY') },
      { Header: 'In Use', accessor: 'inUse', },
      { Header: 'Modified', accessor: (row: CourtsData) => dayjs(row.dateModified).format('MM-DD-YYYY') },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data
    }
)

  const itemCount = canFetchMore ? rows.length + 1 : rows.length
  const isItemLoaded = (index: number) => (!canFetchMore || index < rows.length)

  const loadMore = async () => {
    try {
      const next = props.nextUrl
      const nextPage = parseInt(next.slice(-1), 10)
      if (!isFetchingMore) {
        fetchMore({ page: nextPage })
      }
    } catch {
      console.log('LOAD MORE ERROR')
    }
  }

  const Item = (itemProps: { index: number, style: {} }) => {
    const row = rows[itemProps.index]
    if (!row) {
      return <div>Loading...</div>
    } else {
      prepareRow(row)
      return(
        <Box direction="row" {...row.getRowProps}>
          {row.cells.map(
            (cell: { getCellProps: () => {}, render: (str: string) => React.ReactNode}, cellIndex: number) => (
              <Box key={`cellIndex_${cellIndex}`} {...cell.getCellProps()}>
                {cell.render('Cell')}
              </Box>
            )
          )}
        </Box>
      )
    }
  }

  return (
    <Box
      fill
      direction="column"
      {...getTableProps()}
    >
      {headerGroups.map(
        (hG: { getHeaderGroupProps: () => {}, headers: any[] }, index: number) => (
          <Box direction="row" key={`hG_${index}`} {...hG.getHeaderGroupProps()}>
            {hG.headers.map((column, colIndex) => (
              <Text key={`col_index_${colIndex}`} {...column.getHeaderProps()}>
                {column.render('Header')}
              </Text>
          ))}
        </Box>
      ))}
      <AutoSizer>
        {({height, width}) => (
        <InfiniteLoader
          threshold={5}
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMore}
        >
          {({ onItemsRendered, ref }) => (
            <FixedSizeList
              height={height}
              width={width}
              itemCount={itemCount}
              itemSize={50}
              onItemsRendered={onItemsRendered}
              ref={ref}
              {...getTableBodyProps()}
            >
              {Item}
            </FixedSizeList>
          )}
        </InfiniteLoader>
        )}
      </AutoSizer>
    </Box>
  )
}

export default Table
