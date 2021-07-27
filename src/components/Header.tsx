import React from 'react'

import { Food24Filled } from '@fluentui/react-icons'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex flex-row gap-4 sm:justify-start justify-center text-xl text-white font-bold bg-blue-900 p-4'>
      <Food24Filled />
      <div>Calorie Tracker</div>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/info'>Info</Link>
      </div>
    </div>
  )
}

export default Header
