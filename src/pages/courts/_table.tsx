import dayjs from 'dayjs'
import {
  Box,
  Button,
  InfiniteScroll,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text
} from 'grommet'
import * as React from 'react'
import { QueryResultPaginated, useQuery } from 'react-query'
import { useBlockLayout, useTable } from 'react-table'
import { apiFetch, fetchCourts } from '../../root/api'
import { CourtsApiResponse, CourtsData } from '../../typings/api'

interface TableProps {
  isFetching: boolean,
  isFetchingMore: boolean,
  canFetchMore: boolean,
  fetchMore: ({page}: { page: number }) => void,
  data: Promise<CourtsApiResponse[]> | CourtsApiResponse[],
  nextUrl: string
}

const CourtsTable = (props: TableProps) => {
  // destructure everything but data
  const {
    nextUrl,
    isFetching,
    isFetchingMore,
    canFetchMore,
    fetchMore
  } = props

  const data = props && props.data

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
        accessor: 'resourceUri',
      },
      {
        Header: 'Citation Abbreviation',
        accessor: 'citationString',
      },
      {
        Header: 'Start Date',
        accessor: (row: CourtsData) => dayjs(row.startDate).format('MM-DD-YYYY'),
      },
      {
        Header: 'End Date',
        accessor: (row: CourtsData) => dayjs(row.endDate).format('MM-DD-YYYY'),
      },
      {
        Header: 'In Use',
        accessor: 'inUse',
      },
      {
        Header: 'Modified',
        accessor: (row: CourtsData) => dayjs(row.dateModified).format('MM-DD-YYYY'),
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
    if (canFetchMore) {
      console.log("loading more", !isFetchingMore, nextPage)
      if (!isFetchingMore) { fetchMore({ page: nextPage }) }
    } else {
      console.info('Nothing left to fetch')
    }
  }

  const Item = ({index, style}: { index: number, style: {} }) => {
    const row = rows[index]
    if (!row) {
      return (
        <TableRow>
          <TableCell>Loading...</TableCell>
        </TableRow>
      )
    } else {
      prepareRow(row)
      return (
        <TableRow {...row.getRowProps}>
          {row.cells.map(
            (cell: { getCellProps: () => {}, render: (str: string) => React.ReactNode}, cellIndex: number) => (
              <TableCell key={`cellIndex_${cellIndex}`} {...cell.getCellProps()}>
                {cell.render('Cell')}
              </TableCell>
            )
          )}
        </TableRow>
      )
    }
  }

  console.log('PRIOR TO RENDER', props)
  return (
    <Table {...getTableProps()} >
      {headerGroups.map(
        (hG: { getHeaderGroupProps: () => {}, headers: any[] }, index: number) => (
          <TableHeader key={`hG_${index}`} {...hG.getHeaderGroupProps()}>
            <TableRow>
              {hG.headers.map((column, colIndex) => (
                <TableCell key={`col_index_${colIndex}`} {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
        )
      )}
      <TableBody {...getTableBodyProps()} >
        <InfiniteScroll
          renderMarker={(marker) => (
            <TableRow>
              <TableCell>{marker}</TableCell>
            </TableRow>
          )}
          scrollableAncestor="window"
          items={rows}
          onMore={() => loadMore()}
          step={25}
        >
          {(result, index) => (
            <Item key={index} index={index} style={}/>
          )}
        </InfiniteScroll>
      </TableBody>
    </Table>
  )
}

export default CourtsTable
