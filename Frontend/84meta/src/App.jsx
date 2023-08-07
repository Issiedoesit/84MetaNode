import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Auth/Login/Login'
import Signup from './components/Auth/Signup/Signup'
import PrivateRoute from './utils/PrivateRoute'
import DashHome from './components/Dashboard/DashHome/DashHome'

function App() {

  return (
    <div className='font-jost text-base'>
      <Routes>
        <Route path='' element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<DashHome />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
