import React from 'react'

import type { IField } from '../../types/interfaces'
import { Search24Filled } from '@fluentui/react-icons'

interface Props {
  textField: IField
  onSearch: React.MouseEventHandler<HTMLButtonElement>
}

const SearchBar: React.FC<Props> = ({ textField, onSearch }) => (
  <div>
    <form className='flex flex-row w-full max-w-sm justify-between m-auto'>
      <div>
        <input
          {...textField}
          className='bg-transparent w-full text-gray-700 p-4 my-4 leading-tight border rounded-md focus:outline-none focus:ring-1 focus:border-indigo-700'
        />
      </div>
      <button
        className='flex flex-row gap-2 p-2 bg-indigo-600 border border-indigo-700 rounded-xl my-auto text-white'
        onClick={onSearch}>
        <Search24Filled /> Search
      </button>
    </form>
  </div>
)

export default SearchBar
