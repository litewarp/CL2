import { Box, Text } from 'grommet'
import * as React from 'react'
import { QueryResultPaginated, useQuery } from 'react-query'
import { useAbsoluteLayout, useTable } from 'react-table'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import { customFetch, fetchCourts } from '../../root/api'
import { CourtsData } from '../../typings/api'

const Table = () => {

  const courtData: QueryResult<CourtsData[], {}> = useQuery(
    'getCourts',
    ({ next }= {}) => !!next ? customFetch(next) : fetchCourts(),
    {
      getCanFetchMore: (lastPage) => lastPage && !!lastPage.next,
      paginated: true,
    }
  )
  // Set rowHeight in State for future plans to pass users ability to set their own row height
  const {
    data: pages,
    isFetching,
    isFetchingMore,
    isLoading,
    canFetchMore,
    fetchMore
  } = courtData

  const data = React.useMemo(
    () => {
      const allData: any[] = []
      pages.map((page) => allData.push(...page.results))
      return allData
    },
    [pages]
  )

  const columns = React.useMemo(
    () => [
      { Header: 'Name', accessor: 'fullName', },
        // need to provide from api, accessor: 'count',
      { Header: 'Count', acessor: 'count' },
      { Header: 'Jurisdiction', accessor: 'jurisdiction', },
      { Header: 'Homepage', accessor: 'resourceUri', },
      { Header: 'Citation Abbreviation', accessor: 'citationString', },
      { Header: 'Start Date', accessor: 'startDate', },
      { Header: 'End Date', accessor: 'endDate', },
      { Header: 'In Use', accessor: 'inUse', },
      { Header: 'Modified', accessor: 'dateModified', },
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
    { columns, data },
    useAbsoluteLayout
  )

  console.log(rows)

  const itemCount = canFetchMore ? rows.length + 1 : rows.length
  const isItemLoaded = (index: number) => (!canFetchMore || index < rows.length)

  const loadMore = () => {
    const lastPage = (pages.length > 0) ? pages[pages.length - 1] : false
    return (!!lastPage && !isFetching) ? fetchMore({next: lastPage.next}) : null
  }
  const [rowHeight, setRowHeight] = React.useState(50)

  // grab total item count from first page results
  const totalItemCount = pages[0] && pages[0].count

  const Item = (itemProps: { index: number, style: {} }) => {
    const row = rows[itemProps.index]
    prepareRow(row)
    return(
      <Box {...row.getRowProps}>
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
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMore}
      >
        {({ onItemsRendered, ref }) => (
          <AutoSizer disableWidth>
            {({height}) => (
              <FixedSizeList
                height={height}
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
