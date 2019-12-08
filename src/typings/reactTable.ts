
export interface HeaderColumn {
  getHeaderProps: () => { key: string, style: {} },
  render: (name: string) => React.ReactNode
}

export interface ReactTableCell {
  getCellProps: () => { key: string, style: {} },
  render: (name: string) => React.ReactNode
}

export interface HeaderGroup {
  getHeaderGroupProps: () => { key: string, style: {} },
  headers: any[]
}
