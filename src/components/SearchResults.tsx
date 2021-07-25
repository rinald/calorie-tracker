import React, { useState, useEffect } from 'react'
import { useSearch } from '../hooks/hooks'

import Result from './Result'
import BottomNavigation from './BottomNavigation'

interface Props {
  query: string
}

const SearchResults: React.FC<Props> = ({ query }) => {
  const { results, getLinks, loadPage } = useSearch(query)
  const [links, setLinks] = useState<string[] | null>(null)
  const searchResults = results?.hints

  useEffect(() => {
    getLinks().then(links => setLinks(links))
  }, [query])

  return (
    <div>
      <div>
        <div className='grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 bg-gray-100 items-start'>
          {searchResults?.map((result, index) => (
            <Result key={index} result={result} />
          ))}
        </div>
      </div>

      <BottomNavigation links={links} loadPage={loadPage} />
    </div>
  )
}

export default SearchResults
