import React, { useContext } from 'react'
import { NutritionContext, FoodListContext } from '../App'

import { Doughnut } from 'react-chartjs-2'
import { roundAll } from '../util'

const NutritionPage = () => {
  let [nutrients] = useContext(NutritionContext)
  const [foodList] = useContext(FoodListContext)

  nutrients = roundAll(nutrients)

  const showChart = () => {
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
        responsive: false,
      },
    }

    return (
      <div className='h-64'>
        <Doughnut data={data} />
      </div>
    )
  }

  return (
    <div className='flex flex-col sm:flex-row gap-4 h-auto'>
      <div className='flex flex-col justify-start gap-4 w-64 h-96 mx-auto bg-gray-50 m-2 border rounded-md border-gray-200 px-5'>
        <div className='font-bold text-xl py-2'>
          Calories: {nutrients.ENERC_KCAL}
        </div>
        {showChart()}
      </div>
      <div className='flex flex-col mx-auto sm:mx-2 divide-y w-1/2 bg-gray-50 m-2 border rounded-md border-gray-200'>
        {foodList.map((data, index) => (
          <div className='p-2' key={`${data.label}-${index}`}>
            {data.label} - {data.servingSize} g, {data.nutrients.ENERC_KCAL}{' '}
            kcal
          </div>
        ))}
      </div>
    </div>
  )
}

export default NutritionPage
