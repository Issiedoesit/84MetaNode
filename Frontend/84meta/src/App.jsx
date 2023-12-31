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
import Saved from './components/Dashboard/Saved/Saved'
import ErrorPage from './components/Error/ErrorPage'
import FileType from './components/Dashboard/Folders/FileType'

function App() {

  return (
    <div className='font-jost text-base'>
      <Routes>
        <Route path='' element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' >
            <Route path={''}  element={<DashHome />} />
            <Route path={'saved'}  element={<Saved />} />
            <Route path={'files'}  element={<FileType />} />
          </Route>
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path={"*"} element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App
