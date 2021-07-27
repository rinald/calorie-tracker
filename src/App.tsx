import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import SearchPage from './components/SearchPage'
import Header from './components/Header'
import type { INutrients, IFoodData } from '../types/interfaces'
import NutritionPage from './components/NutritionPage'

// class Nutrients implements INutrients {
//   ENERC_KCAL: number
//   PROCNT: number
//   CHOCDF: number
//   FAT: number
//   FIBTG: number

//   constructor() {
//     this.ENERC_KCAL = 0
//     this.PROCNT = 0
//     this.CHOCDF = 0
//     this.FAT = 0
//     this.FIBTG = 0
//   }

//   add(other: INutrients) {
//     this.ENERC_KCAL += other.ENERC_KCAL
//     this.PROCNT += other.PROCNT
//     this.CHOCDF += other.CHOCDF
//     this.FAT += other.FAT
//     this.FIBTG += other.FIBTG
//   }

//   get energy() {
//     return this.ENERC_KCAL
//   }

//   get protein() {
//     return this.PROCNT
//   }

//   get carbs() {
//     return this.CHOCDF
//   }

//   get fat() {
//     return this.FAT
//   }

//   get fiber() {
//     return this.FIBTG
//   }
// }

const App = () => {
  const [nutrients, setNutrients] = useState<INutrients>({
    ENERC_KCAL: 0,
    PROCNT: 0,
    CHOCDF: 0,
    FAT: 0,
    FIBTG: 0,
  })

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

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/info'>
            <NutritionPage nutrients={nutrients} />
          </Route>
          <Route path='/'>
            <SearchPage addFood={addFood} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
