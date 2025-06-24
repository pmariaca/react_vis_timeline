import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './views/Dashboard'
// import Configuration from './views/Configuration'


function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/dashboard' element={<Dashboard />} />
      {/* <Route path='/configuration' element={<Configuration />} /> */}
    </Routes>
  )
}

export default AppRoutes