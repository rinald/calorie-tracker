import React, { useState } from 'react'
import { useField } from '../hooks/hooks'

import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

const SearchPage = () => {
  const textField = useField('text')
  const [query, setQuery] = useState('')

  const search: React.MouseEventHandler<HTMLButtonElement> = event => {
    event.preventDefault()
    setQuery(textField.value)
  }

  return (
    <div>
      <SearchBar textField={textField} onSearch={search} />
      <SearchResults query={query} />
    </div>
  )
}

export default SearchPage
