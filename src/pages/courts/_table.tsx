import dayjs from 'dayjs'
import { Box, Text } from 'grommet'
import * as React from 'react'
import { QueryResultPaginated, useQuery } from 'react-query'
import { useBlockLayout, useTable } from 'react-table'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import { customFetch, fetchCourts } from '../../root/api'
import { CourtsApiResponse, CourtsData } from '../../typings/api'

const Table = (props: QueryResultPaginated<CourtsApiResponse, {}> ) => {
  console.log(props)

  // Set rowHeight in State for future plans to pass users ability to set their own row height
  const {
    data: pages,
    isFetching,
    isFetchingMore,
    isLoading,
    canFetchMore,
    fetchMore
  } = props

  const nextUrl = pages && pages[0] && pages[0].next

  const data = React.useMemo(
    () => {
      const allData: any[] = []
      pages.map((page) => allData.push(...page.results))
      return allData
    },
    []
  )

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
  console.log(pages && pages[0] && pages[0].next)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns, data },
    useBlockLayout
  )

  const itemCount = canFetchMore ? rows.length + 1 : rows.length
  const isItemLoaded = (index: number) => (!canFetchMore || index < rows.length)

  const loadMore = async () => {
    try {
      const { next } = pages[pages.length - 1]

      await fetchMore({ next })
    } catch {
      console.log('ERROR')
    }
  }
  const [rowHeight, setRowHeight] = React.useState(50)

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
    <Box fill {...getTableProps()}>
      <Box>
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
      </Box>
      <InfiniteLoader
        threshold={5}
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMore}
      >
        {({ onItemsRendered, ref }) => (
          <AutoSizer disableWidth>
            {({height, width}) => (
              <FixedSizeList
                height={height}
                width={width}
                itemCount={itemCount}
                itemSize={rowHeight}
                onItemsRendered={onItemsRendered}
                ref={ref}
                {...getTableBodyProps()}
              >
                {Item}
              </FixedSizeList>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </Box>
  )
}

export default Table
