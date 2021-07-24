import React, { useState } from 'react'
import { Add24Regular, Info24Regular } from '@fluentui/react-icons'

import type { IFoodData } from '../../types/interfaces'
import NutritionTable from './NutritionTable'

interface Props {
  result: IFoodData
}

const Result: React.FC<Props> = ({ result }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  return (
    <div className='bg-gray-50 border-gray-200 border rounded-lg py-2 px-2 m-4'>
      <div className='text-2xl font-bold'>{result.food.label}</div>
      <div className='flex flex-row flex-auto gap-4'>
        <div>
          {result.food.brand !== undefined && (
            <div>Brand: {result.food.brand}</div>
          )}
          <div>Category: {result.food.category}</div>
        </div>
      </div>
      <br />
      {expanded && (
        <div>
          <NutritionTable nutrients={result.food.nutrients} />
          <br />
        </div>
      )}

      <div className='flex flex-row gap-2 justify-between'>
        <button
          className='flex flex-row gap-2 p-2 bg-gray-200 border border-gray-300 rounded-md font-bold'
          onClick={toggleExpand}>
          {expanded ? 'Show less' : 'Show more'} <Info24Regular />
        </button>
        <button className='px-4 py-2 bg-indigo-500 rounded-full text-white font-bold hover:bg-indigo-300'>
          <Add24Regular />
        </button>
      </div>
    </div>
  )
}

export default Result
