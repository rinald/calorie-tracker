import React from 'react'
import { useSearch } from '../hooks/hooks'

interface Props {
  query: string
}

const SearchResults: React.FC<Props> = ({ query }) => {
  const { results, loadNextPage } = useSearch(query)
  const searchResults = results?.hints

  return (
    <div>
      <div>
        <ul className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-100'>
          {searchResults?.map((result, index) => (
            <li
              key={index}
              className='bg-gray-50 border-gray-200 border rounded-lg py-2 px-2 m-4'>
              <div className='text-2xl font-bold'>{result.food.label}</div>
              <div className='flex flex-row flex-auto gap-4'>
                <div>
                  {result.food.brand !== undefined ? (
                    <div>brand: {result.food.brand}</div>
                  ) : (
                    <></>
                  )}
                  <div>category: {result.food.category}</div>
                </div>
              </div>
              <br />
              <table className='table-auto'>
                <tbody>
                  <tr>
                    <th className='border border-indigo-400 px-2 py-2 bg-indigo-100'>
                      Nutrients
                    </th>
                    <th className='border border-indigo-400 px-2 py-2 bg-indigo-100'>
                      Value per 100g
                    </th>
                  </tr>
                  <tr>
                    <td className='border border-indigo-400 px-2 py-2'>
                      Energy
                    </td>
                    <td className='border border-indigo-400 px-2 py-2'>
                      {result.food.nutrients.ENERC_KCAL} kcal
                    </td>
                  </tr>
                  <tr>
                    <td className='border border-indigo-400 px-2 py-2'>
                      Carbs
                    </td>
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
                    <td className='border border-indigo-400 px-2 py-2'>
                      Fiber
                    </td>
                    <td className='border border-indigo-400 px-2 py-2'>
                      {result.food.nutrients.FIBTG}
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={() => loadNextPage()}>Next page...</button>
      </div>
    </div>
  )
}

export default SearchResults
