import React from 'react'

const DashTableSkeleton = ({skeleton}) => {
  return (
    <div className={`w-full grid grid-cols-6 ${skeleton ? skeleton : ""}`}>
        <div className={`w-full h-16 skeleton`}></div>
        <div className={`w-full h-16 skeleton`}></div>
        <div className={`w-full h-16 skeleton`}></div>
        <div className={`w-full h-16 skeleton`}></div>
        <div className={`w-full h-16 skeleton`}></div>
        <div className={`w-full h-16 skeleton`}></div>
    </div>
  )
}

export default DashTableSkeleton