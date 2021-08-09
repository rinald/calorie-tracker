import React from 'react'

import { ArrowLeft24Filled, ArrowRight24Filled } from '@fluentui/react-icons'
import type { Paginator } from '../hooks/paginationHook'

type Props = Paginator

const BottomNavigation: React.FC<Props> = ({
  state,
  histSize,
  goBack,
  goForward,
  goTo,
}) => {
  const { links, index } = state
  const n = links.length ? Math.min(links.length - index, histSize) : 0

  return (
    <div className='flex flex-row gap-4 justify-center py-2'>
      {n !== 0 && (
        <button
          onClick={() => goBack()}
          className='flex flex-row gap-2 py-2 px-4 bg-gray-100 border border-gray-300 rounded-md font-bold'>
          <ArrowLeft24Filled />
        </button>
      )}

      {[...Array(n)].map((x, i) => (
        <button
          key={index + i}
          onClick={() => goTo(index + i)}
          className='flex flex-row gap-2 py-2 px-4 bg-gray-100 border border-gray-300 rounded-md font-bold'>
          {index + i + 1}
        </button>
      ))}
      {n !== 0 && (
        <button
          onClick={() => goForward()}
          className='flex flex-row gap-2 py-2 px-4 bg-gray-100 border border-gray-300 rounded-md font-bold'>
          <ArrowRight24Filled />
        </button>
      )}
    </div>
  )
}

export default BottomNavigation
