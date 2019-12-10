/** @format */

export interface HeaderColumn {
  id: string
  getHeaderProps: () => { key: string; style: {} }
  getSortByToggleProps: () => { title: string; style: {}; onClick: () => void }
  render: (name: string) => React.ReactNode
  isSorted: boolean
  isSortedDesc: boolean
}

export interface ReactTableCell {
  getCellProps: () => { key: string; style: {} }
  render: (name: string) => React.ReactNode
}

export interface HeaderGroup {
  getHeaderGroupProps: () => { key: string; style: {} }
  headers: any[]
}

interface SortByState {
  id: string
  desc: boolean
}

export interface TableState {
  pageSize: number
  pageIndex: number
  expanded: []
  filters: []
  groupBy: []
  sortBy: SortByState[]
}

export interface CellProps {
  render: (name: string) => React.ReactNode
}

export interface RowProps {
  cells: CellProps[]
  values: { columnId: any }
  getRowProps: (props?: any) => void
  index: number
  original: {}
  path: string[]
  subRows: Array<[]>
  state: {}
}
