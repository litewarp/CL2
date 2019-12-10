/** @format */

export interface CourtsData {
  resourceUri: string
  id: string
  pacerCourtId: string
  pacerHasRssFeed: string
  fjcCourtId: string
  dateModified: string
  inUse: boolean
  hasOpinionScraper: boolean
  hasOralArgumentScraper: boolean
  position: number
  citationString: string
  shortName: string
  fullName: string
  url: string
  startDate: string
  endDate: string
  jurisdiction: string
}

export interface CourtsApiResponse {
  count: number
  next: string
  results: CourtsData[]
}

export interface OpinionData {
  absoluteUrl: string
  caseName: string
  resourceUri: string
  dateCreated: string
  docket: string
  status?: string
  natureSuit?: string
  duration?: string
}

export interface OpinionApiResponse {
  count: number
  next: string
  results: OpinionData[]
}
export interface HeaderColumn {
  getHeaderProps: () => { key: string; style: {} }
  render: (name: string) => React.ReactNode
}

export interface ReactTableCell {
  getCellProps: () => { key: string; style: {} }
  render: (name: string) => React.ReactNode
}

export interface HeaderGroup {
  getHeaderGroupProps: () => { key: string; style: {} }
  headers: any[]
}

export interface CourtsTableProps {
  totalPageCount: number
  infiniteScrollEnabled: boolean
  setPageSize: (arg: number) => void
  setPageIndex: (arg: number) => void
  pageIndex: number
  pageSize: number
  isFetching: boolean
  isFetchingMore: boolean
  canFetchMore: boolean
  fetchMore: ({ page }: { page: number }) => void
  data: CourtsApiResponse[] | []
  sortBy: Array<{ id: string; desc: boolean }>
  setSortBy: (arg: Array<{ id: string; desc: boolean }>) => void
}
