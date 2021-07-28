import React, { useState, createContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import SearchPage from './components/SearchPage'
import Header from './components/Header'
import type { INutrients } from '../types/interfaces'
import NutritionPage from './components/NutritionPage'

const initNutrients: () => INutrients = () => {
  return {
    ENERC_KCAL: 0,
    PROCNT: 0,
    CHOCDF: 0,
    FAT: 0,
    FIBTG: 0,
  }
}

const NutritionContext = createContext<
  [INutrients, React.Dispatch<React.SetStateAction<INutrients>>]
>([initNutrients(), () => {}])

const App = () => {
  const [nutrients, setNutrients] = useState<INutrients>(initNutrients())

  return (
    <Router>
      <div>
        <Header />
        <NutritionContext.Provider value={[nutrients, setNutrients]}>
          <Switch>
            <Route path='/info'>
              <NutritionPage />
            </Route>
            <Route path='/'>
              <SearchPage />
            </Route>
          </Switch>
        </NutritionContext.Provider>
      </div>
    </Router>
  )
}

export default App
export { NutritionContext }
