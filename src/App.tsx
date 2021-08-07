import React, { useState, createContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import SearchPage from './components/SearchPage'
import Header from './components/Header'
import type { Nutrients, FoodSummary } from '../types/types'
import NutritionPage from './components/NutritionPage'

import { initNutrients } from './util'

const NutritionContext = createContext<
  [Nutrients, React.Dispatch<React.SetStateAction<Nutrients>>]
>([initNutrients(), () => {}])

const FoodListContext = createContext<
  [FoodSummary[], React.Dispatch<React.SetStateAction<FoodSummary[]>>]
>([[], () => {}])

const App = () => {
  const [nutrients, setNutrients] = useState<Nutrients>(initNutrients())
  const [foodList, setFoodList] = useState<FoodSummary[]>([])

  return (
    <Router>
      <div>
        <Header />
        <NutritionContext.Provider value={[nutrients, setNutrients]}>
          <FoodListContext.Provider value={[foodList, setFoodList]}>
            <Switch>
              <Route path='/info'>
                <NutritionPage />
              </Route>
              <Route path='/'>
                <SearchPage />
              </Route>
            </Switch>
          </FoodListContext.Provider>
        </NutritionContext.Provider>
      </div>
    </Router>
  )
}

export default App
export { NutritionContext, FoodListContext }
