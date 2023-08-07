import React from 'react'
import DashNav from '../../Navigation/DashNav'
import DashSideBar from '../../Navigation/DashSideBar'

const DashTemplate = ({children}) => {
  return (
    <div className={`min-h-screen flex w-full`}>
        <div className={`min-w-fit`}>
          <DashSideBar />
        </div>
        <div className={`px-4 md:px-8 py-8 w-full`}>
          <DashNav />
          <div className={`py-8`}>
            {children}
          </div>
        </div>
    </div>
  )
}

export default DashTemplate