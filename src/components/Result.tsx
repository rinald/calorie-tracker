import React, { useState, useContext } from 'react'
import { Add24Regular, Info24Regular } from '@fluentui/react-icons'
import { Doughnut } from 'react-chartjs-2'

import NutritionTable from './NutritionTable'
import { NutritionContext, FoodListContext } from '../App'
import type { FoodData, Nutrients } from '../../types/types'
import { round, roundAll } from '../util'
import { useNumberField } from '../hooks/inputHook'

type Props = {
  result: FoodData
}

const ResultPlaceholder = () => {
  return (
    <div className='animate-pulse flex flex-col gap-2 break-inside bg-gray-50 border-gray-200 border rounded-lg p-2 m-2 '>
      <div className='h-8 w-12 bg-gray-400 rounded'></div>
      <div className='h-6 w-24 bg-gray-400 rounded'></div>
      <br />

      <div className='flex flex-row gap-2 justify-between'>
        <div className='h-10 w-32 bg-gray-400 rounded'></div>
        <div className='h-10 w-10 bg-gray-400 rounded'></div>
      </div>
    </div>
  )
}

const Result: React.FC<Props> = ({ result }) => {
  const servingValue = round(result.measures[0].weight)

  const [expanded, setExpanded] = useState(false)
  const portionSize = useNumberField(servingValue)

  const [nutrients, setNutrients] = useContext(NutritionContext)
  const [foodList, setFoodList] = useContext(FoodListContext)

  const resultNutrients = roundAll(result.food.nutrients, portionSize.value)

  const addFood = () => {
    const newNutrients: Nutrients = {
      ENERC_KCAL: nutrients.ENERC_KCAL + resultNutrients.ENERC_KCAL,
      PROCNT: nutrients.PROCNT + resultNutrients.PROCNT,
      CHOCDF: nutrients.CHOCDF + resultNutrients.CHOCDF,
      FAT: nutrients.FAT + resultNutrients.FAT,
      FIBTG: nutrients.FIBTG + resultNutrients.FIBTG,
    }

    setNutrients(newNutrients)
    setFoodList([
      ...foodList,
      {
        label: result.food.label,
        nutrients: resultNutrients,
        servingSize: servingValue,
      },
    ])
  }

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  return (
    <div className='break-inside bg-gray-50 border-gray-200 border rounded-lg p-2 m-2 '>
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
        <div className='mx-auto py-4'>
          <NutritionTable nutrients={resultNutrients} />
        </div>
      )}
      {expanded && (
        <div className='flex flex-row gap-2'>
          <span className='my-auto w-full'>Serving size:</span>
          <input
            className='bg-transparent w-full text-gray-700 p-2 leading-tight border rounded-md focus:outline-none focus:ring-1 focus:border-indigo-700'
            min='0'
            {...portionSize}></input>
          <span className='my-auto'>g</span>
        </div>
      )}
      <br />

      <div className='flex flex-row gap-2 justify-between'>
        <button
          className='flex flex-row gap-2 p-2 bg-gray-200 border border-gray-300 rounded-md font-bold'
          onClick={toggleExpand}>
          {expanded ? 'Show less' : 'Show more'} <Info24Regular />
        </button>

        <button
          className='p-2 bg-blue-500 border border-blue-600 rounded-md text-white'
          onClick={() => addFood()}>
          <Add24Regular />
        </button>
      </div>
    </div>
  )
}

export default Result
export { ResultPlaceholder }
