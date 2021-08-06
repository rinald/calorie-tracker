import { useState, useReducer, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'

import type {
  IDatabaseResponse,
  IField,
  INumberField,
} from '../../types/interfaces'

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

const useNumberField: (val: number) => INumberField = (val = 0) => {
  const [value, setValue] = useState(val)

  return {
    type: 'number',
    value,
    onChange: event => {
      setValue(parseInt(event.target.value))
    },
  }
}

type PaginationState = {
  isLoading: boolean
  results?: IDatabaseResponse
  links: string[]
  index: number
}

type PaginationResponse = { results?: IDatabaseResponse; links: string[] }

type PaginationAction =
  | { type: 'search' }
  | { type: 'navigate'; to: number }
  | {
      type: 'success'
      data: PaginationResponse
    }
  | { type: 'error' }

type Reducer<PaginationState, PaginationAction> = (
  state: PaginationState,
  action: PaginationAction,
) => PaginationState

const usePagination = (query: string, histSize: number = 5) => {
  const initialState: PaginationState = {
    isLoading: false,
    links: [],
    index: 0,
  }

  const search = async (): Promise<PaginationResponse> => {
    const links: string[] = []
    let response: AxiosResponse<IDatabaseResponse> | undefined
    let results: IDatabaseResponse | undefined

    try {
      response = await axios.get(
        `${getUrl(
          'api/food-database/v2/parser',
        )}&ingr=${query}&nutrition-type=cooking`,
      )

      results = { ...response }?.data

      if (response) {
        links.push(
          `${getUrl(
            'api/food-database/v2/parser',
          )}&ingr=${query}&nutrition-type=cooking`,
        )
      }
    } catch (error) {
      return { results, links }
    }

    for (let i = 0; i < histSize - 1; i++) {
      try {
        response = await axios.get(response?.data?._links?.next?.href || '')

        if (response?.data?._links === undefined) {
          break
        }

        links.push(response?.data?._links?.next?.href)
      } catch (error) {}
    }

    return { results, links }
  }

  const navigate = async (
    state: PaginationState,
  ): Promise<PaginationResponse> => {
    const links = [...state.links]
    const index = state.index

    let response: AxiosResponse<IDatabaseResponse> | undefined
    let results: IDatabaseResponse | undefined

    try {
      response = await axios.get(links[index])

      results = { ...response }?.data

      if (response) {
        links.push(
          `${getUrl(
            'api/food-database/v2/parser',
          )}&ingr=${query}&nutrition-type=cooking`,
        )
      }
    } catch (error) {
      return { results, links }
    }

    for (let i = 0; i < histSize + index - links.length - 1; i++) {
      try {
        response = await axios.get(response?.data?._links?.next?.href || '')

        if (response?.data?._links === undefined) {
          break
        }

        links.push(response?.data?._links?.next?.href)
      } catch (error) {}
    }

    return { results, links }
  }

  const paginationReducer: Reducer<PaginationState, PaginationAction> = (
    state,
    action,
  ) => {
    switch (action.type) {
      case 'search':
        return { ...initialState, isLoading: true }
      case 'navigate':
        return { ...state, isLoading: true, index: action.to }
      case 'success':
        return { ...state, ...action.data, isLoading: false }
      case 'error':
        return initialState
      default:
        return initialState
    }
  }
  const [state, dispatch] = useReducer(paginationReducer, initialState)

  const goBack = () => {
    const { index } = state

    if (index !== 0) {
      dispatch({ type: 'navigate', to: index - 1 })
    }
  }

  const goForward = () => {
    const { index } = state

    dispatch({ type: 'navigate', to: index + 1 })
  }

  const goTo = (index: number) => {
    console.log(index)
    dispatch({ type: 'navigate', to: index })
  }

  useEffect(() => {
    navigate(state).then(data => {
      dispatch({ type: 'success', data })
      console.log('Changed page')
    })
  }, [state.index])

  useEffect(() => {
    dispatch({ type: 'search' })
    search().then(data => {
      dispatch({ type: 'success', data })
      console.log('Loaded data')
    })
  }, [query])

  return { state, goBack, goForward, goTo }
}

export {
  getUrl,
  useField,
  IField,
  useNumberField,
  usePagination,
  PaginationAction,
  PaginationState,
}
