import { useState, useEffect } from 'react'
import axios from 'axios'

import type { IDatabaseResponse, IField } from '../../types/interfaces'

const BASE_URL = 'https://api.edamam.com'
const APP_ID = 'cde0b431'
const APP_KEY = 'c3065548cc9be81f078ee6777a929550'

const getUrl = (endpoint: string) =>
  `${BASE_URL}/${endpoint}?app_id=${APP_ID}&app_key=${APP_KEY}`

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

  // const loadNextPage = async () => {
  //   try {
  //     const response = await axios.get(
  //       results?._links?.next.href ||
  //         `${getUrl(
  //           'api/food-database/v2/parser',
  //         )}&ingr=${query}&nutrition-type=cooking`,
  //     )

  //     setResults(response.data)
  //   } catch (error) {
  //     setResults(null)
  //   }
  // }

  const loadPage = async (href: string) => {
    try {
      const response = await axios.get(href)

      setResults(response.data)
    } catch (error) {
      setResults(null)
    }
  }

  const getLinks = async (n: number = 5) => {
    const links: string[] = []

    let response = await axios.get(
      `${getUrl(
        'api/food-database/v2/parser',
      )}&ingr=${query}&nutrition-type=cooking`,
    )

    links.push(
      `${getUrl(
        'api/food-database/v2/parser',
      )}&ingr=${query}&nutrition-type=cooking`,
    )

    for (let i = 0; i < n - 1; i++) {
      response = await axios.get(response.data?._links.next.href)

      if (response.data?._links === undefined) {
        break
      }

      links.push(response.data?._links?.next?.href)
    }

    return links
  }

  const getAllLinks = async () => {
    const links = []

    let response = await axios.get(
      `${getUrl(
        'api/food-database/v2/parser',
      )}&ingr=${query}&nutrition-type=cooking`,
    )

    links.push(
      `${getUrl(
        'api/food-database/v2/parser',
      )}&ingr=${query}&nutrition-type=cooking`,
    )

    while (response.data?._links !== undefined) {
      console.log(response.data?._links)
      response = await axios.get(response.data?._links.next.href)
      if (response.data?._links === undefined) {
        break
      }

      links.push(response.data?._links?.next?.href)
    }

    return links
  }

  return { results, getLinks, loadPage }
}

export { useField, useSearch, IField }
