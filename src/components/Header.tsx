import React from 'react'

import {
  Food24Filled,
  MoreHorizontal32Filled,
  Home24Filled,
  Home24Regular,
  DataPie24Regular,
  DataPie24Filled,
} from '@fluentui/react-icons'
import { Link } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'

const Header = () => {
  return (
    <div className='relative flex flex-row gap-4 justify-between sm:justify-start text-xl text-white font-bold bg-blue-900 p-4'>
      <Food24Filled />
      <div>Calorie Tracker</div>
      <div>
        <Menu>
          <Menu.Button>
            <MoreHorizontal32Filled />
          </Menu.Button>
          <Transition
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'>
            <Menu.Items
              as='div'
              className='absolute flex right-2 sm:right-auto flex-col bg-blue-600 rounded-md border border-blue-800 p-4'>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    className={`${active ? 'font-bold' : 'font-normal'}`}
                    to='/'>
                    <div className='inline-flex gap-2'>
                      {active ? <Home24Filled /> : <Home24Regular />} Home
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    className={`${active ? 'font-bold' : 'font-normal'}`}
                    to='/info'>
                    <div className='inline-flex gap-2'>
                      {active ? <DataPie24Filled /> : <DataPie24Regular />} Info
                    </div>
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}

export default Header
