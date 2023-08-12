import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from "../../../assets/media/logos/Logo.png"
import SidebarData from '../../../data/SidebarData'
import DashCollapsible from './DashCollapsible'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'

const DashSideBar = () => {
    const [sideOpen, setSideOpen] = useState(false)

  return (
    <div className={`py-20 h-screen sticky top-0 left-0 ${sideOpen ? "" : "w-16 md:w-28 overflow-hidden"} transition-all duration-1000 ease-in-out overflow-y-auto flex flex-col justify-center border-r border-r-brandGray2x`}>
        <NavLink to={'/dashboard'}>
            <img src={Logo} alt="84 Meta Logo" className={`w-14 md:w-24`} />
        </NavLink>
        <button type='button' onClick={()=>setSideOpen(prevSideOpen => !prevSideOpen)}  className={`absolute shadow-lg transition-all duration-1000 ease-in-out top-40 lg:top-64 right-2 bg-brandBlue2x aspect-square px-1 flex items-center justify-center ring-0.5 ring-offset-1 ring-offset-brandWhite1x rounded-full`}>
            {sideOpen ? <IoIosArrowBack size={'24px'} /> : <IoIosArrowForward size={'24px'} />}
        </button>
        <div className={`pt-20 text-brandBlue3x font-medium px-4 flex flex-col gap-5`}>
            {SidebarData.map((data, idx)=>{
                if(data.sub && data.sub.length > 0){
                    return <DashCollapsible key={idx} data={data} sideOpen={sideOpen} />
                }else{
                    return <NavLink to={data.link} className={`flex items-center gap-3`}>
                    {data.icon}
                    <p className={`${sideOpen ? "visible overflow-visible w-auto h-auto opacity-100" : "invisible overflow-hidden w-0 h-0 opacity-0"} whitespace-nowrap transition-all duration-500 ease-in-out`}>{data.name}</p>
                </NavLink>
                }
            })}
        </div>
    </div>
  )
}

export default DashSideBar