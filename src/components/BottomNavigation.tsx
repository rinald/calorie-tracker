import React from 'react'

import { ArrowLeft24Filled, ArrowRight24Filled } from '@fluentui/react-icons'

const BottomNavigation = () => {
  return (
    <div className='flex flex-row gap-4 justify-center py-2'>
      <button className='flex flex-row gap-2 p-2 bg-gray-200 border border-gray-300 rounded-md font-bold'>
        <ArrowLeft24Filled />
      </button>
      <button className='flex flex-row gap-2 p-2 bg-gray-200 border border-gray-300 rounded-md font-bold'>
        <ArrowRight24Filled />
      </button>
    </div>
  )
}

export default BottomNavigation
