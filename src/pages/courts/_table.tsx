import dayjs from 'dayjs'
import {
  InfiniteScroll,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from 'grommet'
import * as React from 'react'
import { useTable } from 'react-table'
import { CourtsApiResponse, CourtsData, CourtsTableProps } from '../../typings/api'
import { HeaderColumn, HeaderGroup, ReactTableCell } from '../../typings/reactTable'

const CourtsTable = (props: CourtsTableProps) => {
  // destructure everything but data
  const {
    nextUrl,
    isFetching,
    isFetchingMore,
    canFetchMore,
    fetchMore
  } = props

  const data = props && props.data

  const formatDates = (date: string) => {
    const isValid = dayjs(date).isValid()
    return isValid ? dayjs(date).format('MM-DD-YYYY') : ''
  }

  const columns = React.useMemo(
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
        accessor: (row: CourtsData) =>
          row.resourceUri.replace('https://www.courtlistener.com', ''),
      },
      {
        Header: 'Citation Abbreviation',
        accessor: 'citationString',
      },
      {
        Header: 'Start Date',
        accessor: (row: CourtsData) => formatDates(row.startDate),
      },
      {
        Header: 'End Date',
        accessor: (row: CourtsData) => formatDates(row.endDate),
      },
      {
        Header: 'In Use',
        accessor: 'inUse',
      },
      {
        Header: 'Modified',
        accessor: (row: CourtsData) => formatDates(row.dateModified),
      },
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

  const loadMore = () => {
      const next = props.nextUrl
      const nextPage = parseInt(next.slice(-1), 10)
      if (!isFetchingMore) {
        fetchMore({ page: nextPage })
      } else {
        console.info('Nothing left to fetch', props)
    }
  }

  const Headers = () => headerGroups.map(
    (headerGroup: HeaderGroup, index: number) => {
      const { key, style } = headerGroup.getHeaderGroupProps()
      return (
        <TableHeader key={key} style={style}>
          <TableRow>
            <HeaderColumns headers={headerGroup.headers} />
          </TableRow>
        </TableHeader>
      )
    }
  )

  // use any as type until the bug that prevents
  // typescript from processing a component that has
  // multiple root elements (i.e. an array) is solved
  // see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20356
  const HeaderColumns: any = (headerProps: { headers: HeaderColumn[] }) =>
    headerProps.headers.map(
      (column: HeaderColumn, index: number) => {
        const { key, style } = column.getHeaderProps()
        return (
          <TableCell key={key} style={style}>{column.render('Header')}</TableCell>
        )
      }
    )

  return (
    <Table {...getTableProps()} >
      <Headers />
      <TableBody {...getTableBodyProps()} >
        <InfiniteScroll
          renderMarker={(marker) => (
            <TableRow>
              <TableCell>{marker}</TableCell>
            </TableRow>
          )}
          scrollableAncestor="document"
          items={rows}
          onMore={() => loadMore()}
          step={5}
        >
          {(result, index) => {
            const row = rows[index]
            prepareRow(row)
            const rowProps = row.getRowProps()
            return (
              <TableRow key={rowProps.key} style={rowProps.style}>
                {row.cells.map(
                  (cell: ReactTableCell) => {
                    const { key, style } = cell.getCellProps()
                    return (
                      <TableCell key={key} style={style} >
                        {cell.render('Cell')}
                      </TableCell>
                    )
                  }
                )}
              </TableRow>
            )
          }}
        </InfiniteScroll>
      </TableBody>
    </Table>
  )
}

export default CourtsTable
