const BASE_URL = 'https://api.edamam.com'
const APP_ID = 'cde0b431'
const APP_KEY = 'c3065548cc9be81f078ee6777a929550'

import type { Nutrients, Nutrient } from '../types/types'

const getUrl = (endpoint: string) =>
  `${BASE_URL}/${endpoint}?app_id=${APP_ID}&app_key=${APP_KEY}`

function round(value: number, portionSize = 100): number {
  return Math.round((value * portionSize) / 10) / 10
}

const initNutrients: () => Nutrients = () => {
  return {
    ENERC_KCAL: 0,
    PROCNT: 0,
    CHOCDF: 0,
    FAT: 0,
    FIBTG: 0,
  }
}

function roundAll(nutrients: Nutrients, portionSize = 100): Nutrients {
  let newNutrients = initNutrients()

  for (const [key, value] of Object.entries(nutrients)) {
    newNutrients[key as Nutrient] = round(value, portionSize)
  }

  return newNutrients
}

export { getUrl, initNutrients, round, roundAll }
