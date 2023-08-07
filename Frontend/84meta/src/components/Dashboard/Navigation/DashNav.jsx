import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import NavData from '../../../data/NavData'
import ProfileData from '../../../data/ProfileData'
import Avatar from '../../../assets/media/avatars/avatar-6.png'
import useComponentVisible from "../../../utils/hooks/useHideOnClickOutside"

const DashNav = () => {

    const [showProfile, setShowProfile] = useState(false)

    useComponentVisible('#showProfile', "#profile", ()=>setShowProfile(false))

  return (
    <nav className={`flex justify-between w-full gap-10 items-start`}>
        <input type="search" name="search" id="search" placeholder='Search file name, extension or folder' className={`text-sm border-0.25 md:min-w-[280px] border-brandGray3x placeholder:text-brandGray3x px-4 py-2 rounded-md`} />
        <ul className={`hidden lg:flex gap-20 text-lg`}>
            {NavData.map((item, idx) => {
                return <NavLink exact="true" key={idx} end={item.end && 'true'} to={item.link} className={({isActive}) => (isActive ? 'text-brandBlue3x' : '')}>
                <p className='whitespace-nowrap text-md'>{item.name}</p>
              </NavLink>
            })}
        </ul>
        <div className={`relative`}>
            <button id={"showProfile"} type='button' onMouseOver={()=>setShowProfile(prevShowProfile => !prevShowProfile)} onClick={()=>setShowProfile(prevShowProfile => !prevShowProfile)}>
                <img src={Avatar} alt="user" className={`w-10 aspect-square rounded-full`} />
            </button>
            <div id={"profile"} className={`absolute ${showProfile ? "visible opacity-100" : "invisible opacity-0"} rounded-10 top-0 right-0 bg-brandGray5x drop-shadow-lg px-4 w-fit`}>
                <div className='pt-4 pb-10 border-b-2 border-b-brandGray6x'>
                    <button type='button' onClick={()=>setShowProfile(prevShowProfile => !prevShowProfile)}>
                        <img src={Avatar} alt="user" className={`w-10 aspect-square rounded-full`} />
                    </button>
                </div>
                <div className={`py-4 flex flex-col gap-1 text-left`}>
                    {ProfileData.map((data, idx) => {
                        return <NavLink key={idx} to={data.link} className={`text-brandBlue1x whitespace-nowrap py-2 px-4 hover:bg-brandGray3x/20 transition-colors duration-300 ease-in-out`}>{data.name}</NavLink>
                    })}
                </div>
            </div>
        </div>
    </nav>
  )
}

export default DashNav