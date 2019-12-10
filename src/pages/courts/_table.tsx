/** @format */
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import {
  Box,
  Button,
  Heading,
  InfiniteScroll,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from 'grommet'
import * as React from 'react'
import { setQueryData } from 'react-query'
// @ts-ignore
import { usePagination, useSortBy, useTable } from 'react-table'
import { CourtsApiResponse, CourtsData, CourtsTableProps } from '../../typings/api'
import {
  HeaderColumn,
  HeaderGroup,
  ReactTableCell,
  RowProps,
  TableState,
} from '../../typings/reactTable'

const CourtsTable = (props: CourtsTableProps) => {
  // destructure everything but data
  const {
    totalPageCount,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
    data,
    infiniteScrollEnabled,
    isFetching,
    isFetchingMore,
    canFetchMore,
    fetchMore,
    sortBy,
    setSortBy,
  } = props

  const formatDate = (date: string) =>
    dayjs(date).isValid() ? dayjs(date).format('MM-DD-YYYY') : ''

  const columnsMemo = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'fullName',
      },
      // need to provide from api, accessor: 'count',
      {
        Header: 'Count',
        acessor: 'count',
      },
      {
        Header: 'Jurisdiction',
        accessor: 'jurisdiction',
      },
      {
        Header: 'Homepage',
        accessor: (row: CourtsData) => row.resourceUri.replace('https://www.courtlistener.com', ''),
      },
      {
        Header: 'Citation Abbreviation',
        accessor: 'citationString',
      },
      {
        Header: 'Start Date',
        accessor: (row: CourtsData) => formatDate(row.startDate),
      },
      {
        Header: 'End Date',
        accessor: (row: CourtsData) => formatDate(row.endDate),
      },
      {
        Header: 'In Use',
        accessor: 'inUse',
      },
      {
        Header: 'Modified',
        accessor: (row: CourtsData) => formatDate(row.dateModified),
      },
    ],
    []
  )

  // prettier-ignore
  const dataMemo = React.useMemo(
    () => {
      const results: CourtsData[] = []
      if (data) {
        // @ts-ignore
        data.map(
          (res: any) => {
            if (!!res) { results.push(...res.results) }
          }
        )
      }
      return results
    },
    [data]
  )

  const sortByMemo = React.useMemo(() => sortBy, [sortBy])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canNextPage,
    canPreviousPage,
  } = useTable(
    {
      columns: columnsMemo,
      data: dataMemo,
      manualPagination: true,
      manualSorting: true,
      pageCount: totalPageCount,
      useControlledState: (state: TableState) => ({
          ...state,
          pageIndex: pageIndex,
          pageSize: pageSize,
          sortBy: sortByMemo,
        }),
    },
    useSortBy,
    usePagination
  )

  const loadMore = async () => {
    try {
      const nextUrl = await data[data.length - 1].next
      const nextPageUrl = parseInt(nextUrl.slice(-1), 10)
      console.log('LOADING MORE', nextUrl)
      if (!isFetchingMore) {
        fetchMore({ page: nextUrl })
      }
    } catch (err) {
      console.error(err)
    }
  }

  const Headers = () =>
    headerGroups.map((headerGroup: HeaderGroup, index: number) => {
      const { key, style } = headerGroup.getHeaderGroupProps()
      return (
        <TableHeader key={key} style={style}>
          <TableRow>
            <HeaderColumns headers={headerGroup.headers} />
          </TableRow>
        </TableHeader>
      )
    })

  // use any as type until the bug that prevents
  // typescript from processing a component that has
  // multiple root elements (i.e. an array) is solved
  // see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20356
  const HeaderColumns: any = (headerProps: { headers: HeaderColumn[] }) =>
    headerProps.headers.map((column: HeaderColumn, index: number) => {
      // function to toggle the sortby State
      // first check if we are already sorting by the requested columnId
      // if so, cycle through the states (descending => ascending => reset)
      const toggleColumnSort = (id: string) => {
        // refetch data on sort
        if (!!sortBy[0] && sortBy[0].id === id) {
          sortBy[0].desc ? setSortBy([{ id: id, desc: false }] as never) : setSortBy([])
        } else {
          setSortBy([{ id: id, desc: true }] as never)
        }
      }
      const { key, style } = column.getHeaderProps()
      return (
        <TableCell
          key={key}
          style={style}
          {...column.getSortByToggleProps()}
          onClick={() => toggleColumnSort(column.id)}>
          {column.isSorted &&
            <FontAwesomeIcon icon={column.isSortedDesc ? faCaretDown : faCaretUp} />
          }
          {column.render('Header')}
        </TableCell>
      )
    })

  const Row = ({ result, index }: { result?: CourtsData; index: number }) => {
    const row = rows[index]
    prepareRow(row)
    const rowProps = row.getRowProps()
    return (
      <TableRow {...result} key={rowProps.key} style={rowProps.style}>
        {row.cells.map((cell: ReactTableCell) => {
          const { key, style } = cell.getCellProps()
          return (
            <TableCell key={key} style={style}>
              {cell.render('Cell')}
            </TableCell>
          )
        })}
      </TableRow>
    )
  }

  return (
    <>
      <Table {...getTableProps()}>
        <Headers />
        {infiniteScrollEnabled ?
          <TableBody {...getTableBodyProps()}>
            <InfiniteScroll
              renderMarker={marker =>
                <TableRow>
                  <TableCell>{marker}</TableCell>
                </TableRow>
              }
              scrollableAncestor="document"
              items={rows}
              onMore={() => loadMore()}
              step={5}>
              {(result, index) => <Row key={`row_${index}`} result={result} index={index} />}
            </InfiniteScroll>
          </TableBody>
        ) : (
          // type row as any for now
          rows.map((row: any, rowIndex: number) => (
            <Row key={`row_${rowIndex}`} result={row} index={rowIndex} />
          )
        }
      </Table>
      {!infiniteScrollEnabled &&
        <Box direction="row" gap="large" pad="medium">
          <Button onClick={() => setPageIndex(pageIndex - 1)} disabled={!canPreviousPage}>
            Previous Page
          </Button>
          <Button onClick={() => setPageIndex(pageIndex + 1)} disabled={!canNextPage}>
            Next Page
          </Button>
          <Heading level={4}>Current Page: {pageIndex + 1}</Heading>
        </Box>
      }
    </>
  )
}

export default CourtsTable
