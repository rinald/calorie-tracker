import React from 'react'
import { usePagination } from '../hooks/paginationHook'

import Result, { ResultPlaceholder } from './Result'
import BottomNavigation from './BottomNavigation'

import Masonry from 'react-masonry-css'

type Props = {
  query: string
}

const SearchResults: React.FC<Props> = ({ query }) => {
  const paginator = usePagination(query, 3)
  const searchResults = paginator.state.results?.hints

  return (
    <div>
      <Masonry
        breakpointCols={{ default: 4, 1024: 3, 768: 2, 640: 1 }}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid-column'>
        {/* {searchResults === undefined
          ? [...Array(20)].map(_ => <ResultPlaceholder />)
          : searchResults.map((result, index) => (
              <Result key={`${result.food.foodId}-${index}`} result={result} />
            ))} */}
        {searchResults === undefined && paginator.state.isLoading
          ? [...Array(20)].map(_ => <ResultPlaceholder />)
          : searchResults?.map((result, index) =>
              paginator.state.isLoading ? (
                <ResultPlaceholder />
              ) : (
                <Result
                  key={`${result.food.foodId}-${index}`}
                  result={result}
                />
              ),
            )}
      </Masonry>

      <BottomNavigation {...paginator} />
    </div>
  )
}

export default SearchResults
