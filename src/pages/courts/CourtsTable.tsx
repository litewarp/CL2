import * as React from 'react'
import { useQuery } from 'react-query'

const DataFetcher = () => {
  const customFetch = async (...args) => {
    console.log("fetchParams", ...args);
    const res = await fetch(...args);
    return await res.json();
  };
  const {
    data,
    isLoading,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore
  } = useQuery(
    'getData',
    ({ page }={}) => customFetch('https://www.courtlistener.com/api/rest/v3/courts/?page=' + (page || 1)),
    {
      paginated: true,
      getCanFetchMore: (lastPage) => lastPage && !!lastPage.next
    }
  )
  const loadMore = async () => {
    try {
      const lastPage = data[data.length - 1]
      const { next } = lastPage
      const nextPage = parseInt(next.slice(-1), 10)
      console.log(nextPage)
      await fetchMore({ page: nextPage })
    } catch {}
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
          (p,i) => <p key={i*22}>{JSON.stringify(p)}</p>
        )}
        <div>
          {isFetching && !isFetchingMore ? 'Background Updating...' : null}
        </div>
      </>
    ) : null;
  };

export default DataFetcher
