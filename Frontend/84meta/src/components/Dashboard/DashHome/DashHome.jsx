import React from 'react'
import DashTemplate from '../Widgets/Wraps/DashTemplate'

const DashHome = () => {
  return (
    <DashTemplate>
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 py-6`}>
            <div className={`w-full border-dashed border border-brandBlue1x p-4 h-80 rounded-2xl`}>

            </div>
            <div className={`w-full border border-brandBlue1x p-4 h-80 rounded-2xl`}>

            </div>
        </div>
    </DashTemplate>
  )
}

export default DashHome