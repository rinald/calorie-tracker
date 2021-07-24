import React from 'react'

import { Food24Filled } from '@fluentui/react-icons'

const Header = () => {
  return (
    <div className='flex flex-row gap-4 sm:justify-start justify-center text-xl text-white font-bold bg-indigo-900 p-4'>
      <Food24Filled /> Calorie Tracker
    </div>
  )
}

export default Header
