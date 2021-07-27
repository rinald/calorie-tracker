import React, { useState } from 'react'

import { Doughnut } from 'react-chartjs-2'

const NutritionPage = ({ nutrients }) => {
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

    return <Doughnut data={data} />
  }

  return (
    <div className='flex flex-col justify-start gap-4 w-96 h-96 mx-auto'>
      <div className='font-bold text-xl py-2'>
        Calories: {nutrients.ENERC_KCAL}
      </div>
      {showChart()}
    </div>
  )
}

export default NutritionPage
