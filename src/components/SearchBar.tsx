import React from 'react'

import type { IField } from '../util'

interface Props {
  textField: IField
  onSearch: React.MouseEventHandler<HTMLButtonElement>
}

const SearchBar: React.FC<Props> = ({ textField, onSearch }) => (
  <div>
    <form className='w-full max-w-sm'>
      <div className='flex items-center border-b border-indigo-500 py-2'>
        <input
          {...textField}
          className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
        />
      </div>
      <button onClick={onSearch}>Search</button>
    </form>
  </div>
)

export default SearchBar
