import React from 'react'

import type { Nutrients } from '../../types/types'
import { roundAll } from '../util'

type Props = {
  nutrients: Nutrients
}

const NutritionTable: React.FC<Props> = ({ nutrients }) => {
  nutrients = roundAll(nutrients)

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
              {nutrients.ENERC_KCAL} kcal
            </td>
          </tr>
          <tr>
            <td className='border border-indigo-400 px-2 py-2'>Carbs</td>
            <td className='border border-indigo-400 px-2 py-2'>
              {nutrients.CHOCDF}
            </td>
          </tr>
          <tr>
            <td className='border border-indigo-400 px-2 py-2'>Fat</td>
            <td className='border border-indigo-400 px-2 py-2'>
              {nutrients.FAT}
            </td>
          </tr>
          <tr>
            <td className='border border-indigo-400 px-2 py-2'>Protein</td>
            <td className='border border-indigo-400 px-2 py-2'>
              {nutrients.PROCNT}
            </td>
          </tr>
          <tr>
            <td className='border border-indigo-400 px-2 py-2'>Fiber</td>
            <td className='border border-indigo-400 px-2 py-2'>
              {nutrients.FIBTG}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default NutritionTable
