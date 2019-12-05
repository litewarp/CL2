import { Box, InfiniteScroll, Text } from 'grommet'
import * as React from 'react'
import { useQuery } from 'react-query'
import { useTable } from 'react-table'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import { customFetch, fetchCourts } from '../../root/api'
import { GetCourtsResponse } from '../../typings/api'

const Table = ({ height }: { height: number }) => {
  // Set rowHeight in State for future plans to pass users ability to set their own row height
  const [rowHeight, setRowHeight] = React.useState(50)

  const {
    // rename data to avoid conflict
    data: pages,
    isLoading,
    fetchMore,
    canFetchMore
  } = useQuery(
    // name of the fetch query for caching and optimization
    'getCourts',
    // fetch method
    // if the currentPage has a next prop, then fetch the next url
    // else fetch the first batch by running the normal fetchCourts function
    ({ next } = {}) => !!next ? customFetch(next) : fetchCourts(),
    // react-table configuration options
    // getCanFetchMore lets hook know whether more data is available
    // if the lastPage has no next
    {
      getCanFetchMore: (lastPage, allPages) => lastPage && lastPage.next,
      paginated: true,
    }
  )

  // grab total item count from first page results
  const totalItemCount = pages[0] && pages[0].count

  const data = React.useMemo(
    () => {
      const allData = []
      console.log(pages)
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

  const loadMore = () => {
    const lastPage = pages[pages.length - 1]
    console.log(lastPage)
    return (lastPage && canFetchMore) && fetchMore({next: lastPage.next})
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data
  })

  const itemCount = canFetchMore ? rows.length + 1 : rows.length
  const isItemLoaded = (index: number) => (!canFetchMore || index < rows.length)

  const Item = ({ index, style }) => {
    const row = rows[index]
    prepareRow(row)
    return (
      <Box >
        {row && row.cells.map(
          (cell, cellIndex) => (
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
        {headerGroups.map((hG, index) => (
          <Box direction="row" key={`hG_${index}`} {...hG.getHeaderGroupProps()}>
            {hG.headers.map((column, colIndex) => (
              <Text key={`col_index_${colIndex}`} {...column.getHeaderProps()}>
                {column.render('Header')}
              </Text>
            ))}
          </Box>
        ))}
      </Box>

      <Box {...getTableBodyProps()}>
        <InfiniteLoader
          threshold={5}
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMore}
        >
          {({ onItemsRendered, ref }) => (
            <FixedSizeList
              height={height ? height : 500}
              itemCount={rows.length}
              itemSize={rowHeight}
              onItemsRendered={onItemsRendered}
              ref={ref}
            >
              {Item}
            </FixedSizeList>
          )}
        </InfiniteLoader>
      </Box>

    </Box>
  )
}

export default Table
