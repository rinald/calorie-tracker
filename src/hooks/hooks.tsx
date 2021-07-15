import React, { useState, useEffect } from 'react'
import axios from 'axios'

import type { ParserResponse } from '../util'

const BASE_URL = 'https://api.edamam.com'
const APP_ID = 'cde0b431'
const APP_KEY = 'c3065548cc9be81f078ee6777a929550'

const getUrl = (endpoint: string) =>
  `${BASE_URL}/${endpoint}?app_id=${APP_ID}&app_key=${APP_KEY}`

const useField = (type: string) => {
  const [value, setValue] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return { type, value, onChange }
}

const useSearch = (query: string) => {
  const [results, setResults] = useState<ParserResponse | null>(null)

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const response = await axios.get(
          `${getUrl(
            'api/food-database/v2/parser',
          )}&ingr=${query}&nutrition-type=cooking`,
        )

        setResults(response.data)
      } catch (error) {
        console.error('Error')
        setResults(null)
      }
    }

    getSearchResults()
  }, [query])

  return results
}

export { useField, useSearch }
