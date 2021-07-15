import React, { useState } from 'react'
import { useField, useSearch } from '../hooks/hooks'

const SearchBar = () => {
  const textField = useField('text')
  const [query, setQuery] = useState('')

  const rawSearchResults = useSearch(query)
  const searchResults = rawSearchResults?.hints

  const search: React.MouseEventHandler<HTMLButtonElement> = event => {
    event.preventDefault()
    setQuery(textField.value)
  }

  return (
    <div>
      <form className='w-full max-w-sm'>
        <div className='flex items-center border-b border-indigo-500 py-2'>
          <input
            {...textField}
            className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
          />
        </div>
        <button onClick={search}>Search</button>
      </form>
      <br />
      <div>
        <ul className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-100'>
          {searchResults?.map((result, index) => (
            <li
              key={index}
              className='bg-gray-50 border-gray-200 border rounded-lg py-2 px-2 m-4'>
              <div className='text-2xl font-bold'>{result.food.label}</div>
              <div className='flex flex-row flex-auto gap-4'>
                <div>
                  <img src={result.food.image} width={100} height={200}></img>
                </div>
                <div>
                  <div>brand: {result.food.brand}</div>
                  <div>category: {result.food.category}</div>
                  <div>
                    servings per container: {result.food.servingsPerContainer}
                  </div>
                </div>
              </div>
              <br />
              <table className='table-auto'>
                <tr>
                  <th className='border border-indigo-400 px-2 py-2 bg-indigo-100'>
                    Nutrients
                  </th>
                  <th className='border border-indigo-400 px-2 py-2 bg-indigo-100'>
                    Value per 100g
                  </th>
                </tr>
                <tr>
                  <td className='border border-indigo-400 px-2 py-2'>Energy</td>
                  <td className='border border-indigo-400 px-2 py-2'>
                    {result.food.nutrients.ENERC_KCAL} kcal
                  </td>
                </tr>
                <tr>
                  <td className='border border-indigo-400 px-2 py-2'>Carbs</td>
                  <td className='border border-indigo-400 px-2 py-2'>
                    {result.food.nutrients.CHOCDF}
                  </td>
                </tr>
                <tr>
                  <td className='border border-indigo-400 px-2 py-2'>Fat</td>
                  <td className='border border-indigo-400 px-2 py-2'>
                    {result.food.nutrients.FAT}
                  </td>
                </tr>
                <tr>
                  <td className='border border-indigo-400 px-2 py-2'>
                    Protein
                  </td>
                  <td className='border border-indigo-400 px-2 py-2'>
                    {result.food.nutrients.PROCNT}
                  </td>
                </tr>
                <tr>
                  <td className='border border-indigo-400 px-2 py-2'>Fiber</td>
                  <td className='border border-indigo-400 px-2 py-2'>
                    {result.food.nutrients.FIBTG}
                  </td>
                </tr>
              </table>
              <br />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <a href={rawSearchResults?._links?.next.href}>Next page...</a>
      </div>
    </div>
  )
}

export default SearchBar
