import * as React from 'react'
import { useQuery } from 'react-query'
import { useTable } from 'react-table'
import { fetchJurisidictions } from '../../root/api'
import { GetCourtsResponse } from '../../typings/api'

const Table = (props: {
}) => {
  const courtsTable = useQuery('jurisdictions', fetchJurisidictions)

  console.log(courtsTable)
  const data = React.useMemo(
    () => courtsTable.data ? courtsTable.data.results : [],
    [courtsTable.data]
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'fullName',
      },
      {
        Header: 'Count',
        // need to provide from api
        // accessor: 'count',
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
        accessor: 'startDate',
      },
      {
        Header: 'End Date',
        accessor: 'endDate',
      },
      {
        Header: 'In Use',
        accessor: 'inUse',
      },
      {
        Header: 'Modified',
        accessor: 'dateModified',
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
  } = useTable({
    columns,
    data
  })

  return (
    <>
    {data && (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((hG, index) => (
          <tr key={`hG_${index}`} {...hG.getHeaderGroupProps()}>
            {hG.headers.map((column, colIndex) => (
              <th key={`col_index_${colIndex}`} {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr key={`rowIndex_${rowIndex}`} {...row.getRowProps()}>
              {row.cells.map((cell, cellIndex) => (
                <td key={`cellIndex_${cellIndex}`} {...cell.getCellProps()}>{cell.render('Cell')}</td>
        ))}
            </tr>
          )
        })}
      </tbody>
    </table>
      )}
    </>
)}

export default Table
