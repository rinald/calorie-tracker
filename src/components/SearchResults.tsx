import React from 'react'
import { usePagination } from '../hooks/paginationHook'

import Result from './Result'
import BottomNavigation from './BottomNavigation'

import Masonry from 'react-masonry-css'

type Props = {
  query: string
}

const SearchResults: React.FC<Props> = ({ query }) => {
  const paginator = usePagination(query)
  const searchResults = paginator.state?.results?.hints

  return (
    <div>
      {paginator.state.isLoading ? (
        'Loading...'
      ) : (
        <>
          <div>
            <Masonry
              breakpointCols={{ default: 4, 1024: 3, 768: 2, 640: 1 }}
              className='my-masonry-grid'
              columnClassName='my-masonry-grid-column'>
              {searchResults?.map((result, index) => (
                <Result
                  key={`${result.food.foodId}-${index}`}
                  result={result}
                />
              ))}
            </Masonry>
          </div>
          <BottomNavigation {...paginator} />
        </>
      )}
    </div>
  )
}

export default SearchResults
