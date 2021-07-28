import React, { useState } from 'react'
import { useField } from '../hooks/hooks'

import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

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
