import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {Login, Signup, UserHome} from './components'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
