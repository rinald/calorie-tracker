import { useReducer, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import type { DatabaseResponse } from '../../types/types'
import { getUrl } from '../util'

type PaginationState = {
  isLoading: boolean
  results?: DatabaseResponse
  links: string[]
  index: number
}

type PaginationResponse = { results?: DatabaseResponse; links: string[] }

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
    let response: AxiosResponse<DatabaseResponse> | undefined
    let results: DatabaseResponse | undefined

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

    let response: AxiosResponse<DatabaseResponse> | undefined
    let results: DatabaseResponse | undefined

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
    dispatch({ type: 'navigate', to: index })
  }

  useEffect(() => {
    navigate(state).then(data => {
      dispatch({ type: 'success', data })
    })
  }, [state.index])

  useEffect(() => {
    dispatch({ type: 'search' })
    search().then(data => {
      dispatch({ type: 'success', data })
    })
  }, [query])

  return { state, goBack, goForward, goTo }
}

export { usePagination, PaginationState }
