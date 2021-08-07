import React, { useState, useContext } from 'react'
import { Add24Regular, Info24Regular } from '@fluentui/react-icons'
import { Doughnut } from 'react-chartjs-2'

import { NutritionContext, FoodListContext } from '../App'
import type { FoodData, Nutrients } from '../../types/types'
import { round, roundAll } from '../util'
import { useNumberField } from '../hooks/inputHook'

type Props = {
  result: FoodData
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

  const showChart = () => {
    const data = {
      labels: ['Protein', 'Carbs', 'Fat', 'Fiber'],
      datasets: [
        {
          label: 'Nutritional facts',
          data: [
            resultNutrients.PROCNT,
            resultNutrients.CHOCDF,
            resultNutrients.FAT,
            resultNutrients.FIBTG,
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
      options: {
        responsive: true,
        animation: false,
      },
    }

    return <Doughnut data={data} />
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
          {expanded && <div>Calories: {resultNutrients.ENERC_KCAL} kcal</div>}
        </div>
      </div>
      <br />
      {expanded && (
        <div className='mx-auto p-4 w-64 h-64 sm:w-full sm:h-full'>
          {showChart()}
        </div>
      )}
      {expanded && (
        <div className='flex flex-row gap-2'>
          <span className='my-auto w-full'>Serving size:</span>
          <input
            className='bg-transparent w-full text-gray-700 p-2 leading-tight border rounded-md focus:outline-none focus:ring-1 focus:border-indigo-700'
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
