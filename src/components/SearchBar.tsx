import React from 'react'

import { useTextField } from '../hooks/inputHook'
import { Search24Filled } from '@fluentui/react-icons'

type Props = {
  onSearch: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string,
  ) => void
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const textField = useTextField('text')

  return (
    <div>
      <form className='flex flex-row w-full max-w-sm sm:max-w-md justify-between m-auto'>
        <div className='w-3/5 sm:w-3/4'>
          <input
            {...textField}
            className='bg-transparent w-full text-gray-700 p-4 my-4 leading-tight border rounded-md focus:outline-none focus:ring-1 focus:border-indigo-700'
          />
        </div>
        <button
          className='flex flex-row gap-2 p-2 bg-blue-600 border border-blue-900 rounded-md my-auto text-white'
          onClick={event => onSearch(event, textField.value)}>
          <Search24Filled /> Search
        </button>
      </form>
    </div>
  )
}

export default SearchBar
