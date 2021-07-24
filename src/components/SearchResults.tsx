import React from 'react'
import { useSearch } from '../hooks/hooks'

import Result from './Result'

interface Props {
  query: string
}

const SearchResults: React.FC<Props> = ({ query }) => {
  const { results, loadNextPage } = useSearch(query)
  const searchResults = results?.hints

  return (
    <div>
      <div>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 bg-gray-100 items-start'>
          {searchResults?.map((result, index) => (
            <Result key={index} result={result} />
          ))}
        </div>
      </div>
      {/* <div>
        <button onClick={() => loadNextPage()}>Next page...</button>
      </div> */}
    </div>
  )
}

export default SearchResults
