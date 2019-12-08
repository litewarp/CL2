import * as React from 'react'
import { useQuery } from 'react-query'
import { apiFetch } from '../../root/api'
import { CourtsApiResponse } from '../../typings/api'

const DataFetcher = () => {
  const {
    data,
    isLoading,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore
  } = useQuery(
    'getData',
    ({ page }: { page?: number }) =>
      apiFetch('https://www.courtlistener.com/api/rest/v3/courts/?page=' + (page || 1)),
    {
      getCanFetchMore: (lastPage) => lastPage && !!lastPage.next
      paginated: true,
    }
  )
  const loadMore = async () => {
    try {
      const lastPage = data[data.length - 1]
      const { next } = lastPage
      const nextPage = parseInt(next.slice(-1), 10)
      console.log(nextPage)
      await fetchMore({ page: nextPage })
    } catch {
      console.log('LOAD MORE ERROR', data)
    }
  };
  return isLoading ? (
      <p>Loading ...</p>
    ) : data ? (
      <>
        <div className="App">
          <h1>React-Query Test</h1>
          <h2>Data Array Length: {data && data.length}</h2>
          {canFetchMore ? (
            <button onClick={loadMore} disabled={isFetchingMore}>
              {isFetchingMore ? 'Loading More' : 'Load More'}
            </button>
          ) : (
            'Nothing more to fetch'
          )}
        </div>
        {data.map(
          (p: CourtsApiResponse, i: number) => <p key={i * 22}>{JSON.stringify(p)}</p>
        )}
        <div>
          {isFetching && !isFetchingMore ? 'Background Updating...' : null}
        </div>
      </>
    ) : null;
  };

export default DataFetcher
