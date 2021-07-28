import React, { useState, useContext } from 'react'
import { Add24Regular, Info24Regular } from '@fluentui/react-icons'
import { Doughnut } from 'react-chartjs-2'

import { NutritionContext } from '../App'
import type { IFoodData, INutrients } from '../../types/interfaces'

interface Props {
  result: IFoodData
}

const Result: React.FC<Props> = ({ result }) => {
  const [expanded, setExpanded] = useState(false)
  const [nutrients, setNutrients] = useContext(NutritionContext)

  const addFood = (data: IFoodData) => {
    const _nutrients = data.food.nutrients

    const newNutrients: INutrients = {
      ENERC_KCAL: nutrients.ENERC_KCAL + _nutrients.ENERC_KCAL,
      PROCNT: nutrients.PROCNT + _nutrients.PROCNT,
      CHOCDF: nutrients.CHOCDF + _nutrients.CHOCDF,
      FAT: nutrients.FAT + _nutrients.FAT,
      FIBTG: nutrients.FIBTG + _nutrients.FIBTG,
    }

    setNutrients(newNutrients)
  }

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  const showChart = () => {
    const nutrients = result.food.nutrients

    const data = {
      labels: ['Protein', 'Carbs', 'Fat', 'Fiber'],
      datasets: [
        {
          label: 'Nutritional facts',
          data: [
            nutrients.PROCNT,
            nutrients.CHOCDF,
            nutrients.FAT,
            nutrients.FIBTG,
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
          {expanded && <div>Calories: {result.food.nutrients.ENERC_KCAL}</div>}
        </div>
      </div>
      <br />
      {expanded && <div className='mx-auto p-4'>{showChart()}</div>}

      <div className='flex flex-row gap-2 justify-between'>
        <button
          className='flex flex-row gap-2 p-2 bg-gray-200 border border-gray-300 rounded-md font-bold'
          onClick={toggleExpand}>
          {expanded ? 'Show less' : 'Show more'} <Info24Regular />
        </button>
        <button
          className='p-2 bg-blue-500 border border-blue-600 rounded-md text-white'
          onClick={() => addFood(result)}>
          <Add24Regular />
        </button>
      </div>
    </div>
  )
}

export default Result
