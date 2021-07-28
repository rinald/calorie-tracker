import React, { useState, useEffect } from 'react'
import { useSearch } from '../hooks/hooks'

import Result from './Result'
import BottomNavigation from './BottomNavigation'

import Masonry from 'react-masonry-css'

interface Props {
  query: string
}

const SearchResults: React.FC<Props> = ({ query }) => {
  const { results, getLinks, loadPage } = useSearch(query)
  const [links, setLinks] = useState<string[] | null>(null)
  const searchResults = results?.hints

  useEffect(() => {
    if (query !== '') {
      getLinks().then(links => setLinks(links))
    }
  }, [query])

  return (
    <div>
      <div>
        <Masonry
          breakpointCols={{ default: 4, 1024: 3, 768: 2, 640: 1 }}
          className='my-masonry-grid'
          columnClassName='my-masonry-grid-column'>
          {searchResults?.map((result, index) => (
            <Result key={index} result={result} />
          ))}
        </Masonry>
      </div>

      <BottomNavigation links={links} loadPage={loadPage} />
    </div>
  )
}

export default SearchResults
