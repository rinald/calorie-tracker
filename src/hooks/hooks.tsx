import React, { useState, useEffect } from 'react'
import axios from 'axios'

import type { IDatabaseResponse, IField } from '../util'

const BASE_URL = 'https://api.edamam.com'
const APP_ID = 'cde0b431'
const APP_KEY = 'c3065548cc9be81f078ee6777a929550'

const getUrl = (endpoint: string) =>
  `${BASE_URL}/${endpoint}?app_id=${APP_ID}&app_key=${APP_KEY}`

// type FieldHook = (type: string) => IField

const useField: (type: string) => IField = type => {
  const [value, setValue] = useState('')

  return {
    type,
    value,
    onChange: event => {
      setValue(event.target.value)
    },
  }
}

const useSearch = (query: string) => {
  const [results, setResults] = useState<IDatabaseResponse | null>(null)

  useEffect(() => {
    const getSearchResults = async () => {
      if (query !== '') {
        try {
          const response = await axios.get(
            `${getUrl(
              'api/food-database/v2/parser',
            )}&ingr=${query}&nutrition-type=cooking`,
          )

          setResults(response.data)
        } catch (error) {
          setResults(null)
        }
      }
    }

    getSearchResults()
  }, [query])

  const loadNextPage = async () => {
    try {
      const response = await axios.get(
        results?._links?.next.href ||
          `${getUrl(
            'api/food-database/v2/parser',
          )}&ingr=${query}&nutrition-type=cooking`,
      )

      setResults(response.data)
    } catch (error) {
      setResults(null)
    }
  }

  return { results, loadNextPage }
}

export { useField, useSearch, IField }
