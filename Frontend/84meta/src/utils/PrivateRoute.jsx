import React, { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useUser from './useUser'

const PrivateRoute = () => {

    const {user} = useUser()
    const location = useLocation()

  return (
    <>
        {user.length > 0 ? <Outlet /> : <Navigate to={'/login'} state={{from:location, search:location.search}} />}
    </>
  )
}

export default PrivateRoute