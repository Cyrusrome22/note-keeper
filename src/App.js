import React from 'react'
import { Provider } from 'react-redux'
import store from './Redux'
import Home from './Pages/Home/Home'

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}

export default App
