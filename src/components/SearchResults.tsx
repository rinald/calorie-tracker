import React, { useState, useEffect } from 'react'
import { usePagination } from '../hooks/hooks'

import Result from './Result'
import BottomNavigation from './BottomNavigation'
// import MyDialog from './Dialog'

import Masonry from 'react-masonry-css'

interface Props {
  query: string
}

const SearchResults: React.FC<Props> = ({ query }) => {
  const { state, ...paginator } = usePagination(query)
  const searchResults = state?.results?.hints

  return (
    <div>
      {state.isLoading ? (
        'Loading...'
      ) : (
        <>
          <div>
            <Masonry
              breakpointCols={{ default: 4, 1024: 3, 768: 2, 640: 1 }}
              className='my-masonry-grid'
              columnClassName='my-masonry-grid-column'>
              {searchResults?.map(result => (
                <Result key={`${result.food.foodId}`} result={result} />
              ))}
            </Masonry>
            {/* <MyDialog /> */}
          </div>

          <BottomNavigation state={state} paginator={paginator} />
        </>
      )}
    </div>
  )
}

export default SearchResults
