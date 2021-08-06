import React from 'react'

import type { PaginationState } from '../hooks/hooks'
import { ArrowLeft24Filled, ArrowRight24Filled } from '@fluentui/react-icons'

interface Props {
  state: PaginationState
  paginator: {
    goBack: () => void
    goForward: () => void
    goTo: (index: number) => void
  }
}

const BottomNavigation: React.FC<Props> = ({ state, paginator }) => {
  const { links, index } = state
  const n = links.length ? links.length - index : 0

  return (
    <div className='flex flex-row gap-4 justify-center py-2'>
      <button
        onClick={() => paginator.goBack()}
        className='flex flex-row gap-2 py-2 px-4 bg-gray-100 border border-gray-300 rounded-md font-bold'>
        <ArrowLeft24Filled />
      </button>
      {[...Array(n)].map((x, i) => (
        <button
          key={index + i}
          onClick={() => paginator.goTo(index + i)}
          className='flex flex-row gap-2 py-2 px-4 bg-gray-100 border border-gray-300 rounded-md font-bold'>
          {index + i + 1}
        </button>
      ))}
      <button
        onClick={() => paginator.goForward()}
        className='flex flex-row gap-2 py-2 px-4 bg-gray-100 border border-gray-300 rounded-md font-bold'>
        <ArrowRight24Filled />
      </button>
    </div>
  )
}

export default BottomNavigation
