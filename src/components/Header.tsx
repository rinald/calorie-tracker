import React from 'react'

import { Food24Filled } from '@fluentui/react-icons'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex flex-row sm:relative gap-4 justify-between sm:justify-start text-xl text-white font-bold bg-blue-900 p-4'>
      <Food24Filled />
      <div>Calorie Tracker</div>
      <Link to='/'>
        <div className='inline-flex gap-2'>Home</div>
      </Link>
      <Link to='/info'>
        <div className='inline-flex gap-2'>Info</div>
      </Link>
    </div>
  )
}

export default Header
