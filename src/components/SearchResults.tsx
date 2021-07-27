import React, { useState, useEffect } from 'react'
import { useSearch } from '../hooks/hooks'

import Result from './Result'
import BottomNavigation from './BottomNavigation'

interface Props {
  query: string
  addFood
}

const SearchResults: React.FC<Props> = ({ query, addFood }) => {
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
        <div className='flex flex-wrap flex-col justify-start gap-2 md:max-h-2000 lg:max-h-1500 bg-gray-100'>
          {searchResults?.map((result, index) => (
            <Result key={index} result={result} addFood={addFood} />
          ))}
        </div>
      </div>

      <BottomNavigation links={links} loadPage={loadPage} />
    </div>
  )
}

export default SearchResults
