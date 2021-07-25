import React from 'react'

import { ArrowLeft24Filled, ArrowRight24Filled } from '@fluentui/react-icons'

interface Props {
  links: string[] | null
  loadPage: (href: string) => Promise<void>
}

const BottomNavigation: React.FC<Props> = ({ links, loadPage }) => {
  return (
    <div className='flex flex-row gap-4 justify-center py-2'>
      {links === null ? (
        <div>...</div>
      ) : (
        links.map((link, i) => (
          <button
            key={i}
            onClick={() => loadPage(link)}
            className='flex flex-row gap-2 py-2 px-4 bg-gray-200 border border-gray-300 rounded-md font-bold'>
            {i + 1}
          </button>
        ))
      )}
      {/* <button className='flex flex-row gap-2 p-2 bg-gray-200 border border-gray-300 rounded-md font-bold'>
        <ArrowLeft24Filled />
      </button>
      <button className='flex flex-row gap-2 p-2 bg-gray-200 border border-gray-300 rounded-md font-bold'>
        <ArrowRight24Filled />
      </button> */}
    </div>
  )
}

export default BottomNavigation
