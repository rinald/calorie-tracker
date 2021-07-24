import React from 'react'

import type { INutrients } from '../../types/interfaces'

interface Props {
  nutrients: INutrients
}

const NutritionTable: React.FC<Props> = ({ nutrients }) => {
  return (
    <div>
      <table className='table-auto m-auto'>
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
            <td className='border border-indigo-400 px-2 py-2'>Energy</td>
            <td className='border border-indigo-400 px-2 py-2'>
              {Math.round(nutrients.ENERC_KCAL * 10) / 10} kcal
            </td>
          </tr>
          <tr>
            <td className='border border-indigo-400 px-2 py-2'>Carbs</td>
            <td className='border border-indigo-400 px-2 py-2'>
              {Math.round(nutrients.CHOCDF * 10) / 10}
            </td>
          </tr>
          <tr>
            <td className='border border-indigo-400 px-2 py-2'>Fat</td>
            <td className='border border-indigo-400 px-2 py-2'>
              {Math.round(nutrients.FAT * 10) / 10}
            </td>
          </tr>
          <tr>
            <td className='border border-indigo-400 px-2 py-2'>Protein</td>
            <td className='border border-indigo-400 px-2 py-2'>
              {Math.round(nutrients.PROCNT * 10) / 10}
            </td>
          </tr>
          <tr>
            <td className='border border-indigo-400 px-2 py-2'>Fiber</td>
            <td className='border border-indigo-400 px-2 py-2'>
              {Math.round(nutrients.FIBTG * 10) / 10}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default NutritionTable
