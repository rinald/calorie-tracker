import React, { useState } from 'react'

import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'

const SearchPage = () => {
  const [query, setQuery] = useState('')

  const search = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string,
  ) => {
    event.preventDefault()
    setQuery(value)
  }

  return (
    <div>
      <SearchBar onSearch={search} />
      <SearchResults query={query} />
    </div>
  )
}

export default SearchPage
