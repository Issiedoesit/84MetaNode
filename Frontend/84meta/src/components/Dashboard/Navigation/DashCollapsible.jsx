import React from 'react'
import { useState } from 'react'

const DashCollapsible = ({data, sideOpen}) => {

    const [open, setOpen] = useState(false)

  return (
    <div>
        <button type='button' onClick={()=>setOpen(prevOpen => !prevOpen)} className={`flex items-center gap-3`}>
            {data.icon}
            <p className={`${sideOpen ? "visible overflow-visible w-auto h-auto opacity-100" : "invisible overflow-hidden w-0 h-0 opacity-0"} whitespace-nowrap transition-all duration-500 ease-linear`}>{data.name}</p>
        </button>
        <div className={`flex flex-col gap-5 px-4 ${open ? "h-auto py-4 overflow-visible visible opacity-100" : "h-0 py-0 overflow-hidden invisible opacity-0"} transition-all duration-200 ease-linear`}>
            {data.sub.map((sub, i) => {
                return <button key={i} className={`flex items-center gap-3`}>
                {sub.icon}
                <p className={`${sideOpen ? "visible overflow-visible w-auto h-auto opacity-100" : "invisible overflow-hidden w-0 h-0 opacity-0"} whitespace-nowrap transition-all duration-500 ease-linear`}>{sub.name}</p>
            </button>
            })}
        </div>
    </div>
  )
}

export default DashCollapsible