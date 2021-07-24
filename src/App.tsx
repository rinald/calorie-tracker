import React from 'react'

import SearchPage from './components/SearchPage'
import Header from './components/Header'
import BottomNavigation from './components/BottomNavigation'

const App = () => {
  return (
    <div>
      <Header />
      <SearchPage />
      <BottomNavigation />
    </div>
  )
}

export default App
