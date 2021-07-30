import React from 'react'

interface Props {
  links: string[] | undefined
  loadPage: (href: string) => Promise<void>
}

const BottomNavigation: React.FC<Props> = ({ links, loadPage }) => {
  return (
    <div className='flex flex-row gap-4 justify-center py-2'>
      {links !== undefined &&
        links?.map((link, i) => (
          <button
            key={i}
            onClick={() => loadPage(link)}
            className='flex flex-row gap-2 py-2 px-4 bg-gray-100 border border-gray-300 rounded-md font-bold'>
            {i + 1}
          </button>
        ))}
    </div>
  )
}

export default BottomNavigation
