import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import NavData from '../../../data/NavData'
import ProfileData from '../../../data/ProfileData'
import Avatar from '../../../assets/media/avatars/avatar-6.png'
import useComponentVisible from "../../../utils/hooks/useHideOnClickOutside"
import useUser from '../../../utils/useUser'

const DashNav = () => {

    const [showProfile, setShowProfile] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const {user, userData, logout} = useUser()

    useComponentVisible('#showProfile', "#profile", ()=>setShowProfile(false))
    useComponentVisible('#showMenu', "#menu", ()=>setShowMenu(false))

  return (
    <nav className={`flex justify-end md:justify-between w-full gap-5 md:gap-10 flex-wrap md:flex-nowrap items-start z-30`}>
        <input type="search" name="search" id="search" placeholder='Search file name, extension or folder' className={`order-1 md:order-none w-full text-sm border-0.25 md:min-w-[280px] border-brandGray3x placeholder:text-brandGray3x px-4 py-2 rounded-md`} />
        <div className={`relative`}>
            <ul id={''} className={`hidden lg:static lg:flex gap-20 text-lg`}>
                {NavData.map((item, idx) => {
                    return <NavLink exact="true" key={idx} end={item.end && 'true'} to={item.link} className={({isActive}) => (isActive ? 'text-brandBlue3x' : '')}>
                    <p className='whitespace-nowrap text-md'>{item.name}</p>
                </NavLink>
                })}
            </ul>
        </div>

        <div className={`relative order-0 md:order-none `}>
            <button id={"showProfile"} type='button' onMouseOver={()=>setShowProfile(prevShowProfile => !prevShowProfile)} onClick={()=>setShowProfile(prevShowProfile => !prevShowProfile)}>
                <img src={Avatar} alt="user" className={`w-10 min-w-[3rem] aspect-square rounded-full`} />
            </button>
            <div id={"profile"} className={`absolute z-30 ${showProfile ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-500 ease-in-out shadow-lg flex flex-col rounded-10 top-0 right-0 bg-brandGray5x  px-4`}>
                <div className='pt-4 pb-6 border-b-2 border-b-brandGray6x flex flex-col gap-4'>
                    <button type='button' onClick={()=>setShowProfile(prevShowProfile => !prevShowProfile)}>
                        <img src={Avatar} alt="user" className={`w-10 aspect-square rounded-full`} />
                    </button>
                    <p>{user.length > 0 && userData[0]?.firstname} {user.length > 0 && userData[0]?.lastname}</p>
                </div>
                <div className={`py-4 flex flex-col gap-1 text-left`}>
                    {ProfileData.map((data, idx) => {
                        return <NavLink key={idx} to={data.link} className={`text-brandBlue1x whitespace-nowrap py-2 px-4 hover:bg-brandGray3x/20 transition-colors duration-300 ease-in-out`}>{data.name}</NavLink>
                    })}
                    <button type="button" onClick={logout} className={`text-brandBlue1x whitespace-nowrap py-2 px-4 hover:bg-brandGray3x/20 transition-colors duration-300 ease-in-out text-left`}>Logout</button>
                </div>
            </div>
        </div>

        <div className='xs:fixed xs:top-10 xs:right-4 xs:block lg:hidden self-center xs:z-70 relative order-0 md:order-none'>
            <button id='showMenu' aria-label='show mobile menu' onClick={()=>setShowMenu(prevShowMenu => !prevShowMenu)} className={ `h-full z-70 ${showMenu && ''} transition-all duration-300 space-y-1 xl:hidden group`}>
                <div className={`bg-brandGray1x w-6 h-0.5 rounded-10 group-hover:bg-brandBlue1x ${showMenu ? 'rotate-45 origin-center translate-y-0.75' : ''} transition-all duration-300 ease-in-out`}></div>
                <div className={`bg-brandGray1x w-6 h-0.5 rounded-10  ${showMenu ? 'hidden transition-all duration-100 ease-in-out' : 'transition-all duration-300 ease-in-out group-hover:bg-brandBlue1x'}`}></div>
                <div className={`bg-brandGray1x w-6 h-0.5 rounded-10 group-hover:bg-brandBlue1x ${showMenu ? '-rotate-45 origin-center  -translate-y-0.75' : ''} transition-all duration-300 ease-in-out`}></div>
                <span className="sr-only">Menu</span>
            </button>
            <ul id={'menu'} className={`absolute z-30 ${showMenu ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-500 ease-in-out shadow-lg flex flex-col gap-5 rounded-10 top-100% right-0 bg-brandGray5x py-8 pl-4 pr-8`}>
                {NavData.map((item, idx) => {
                    return <NavLink exact="true" key={idx} end={item.end && 'true'} to={item.link} className={({isActive}) => (isActive ? 'text-brandBlue3x' : '')}>
                    <p className='whitespace-nowrap text-md'>{item.name}</p>
                </NavLink>
                })}
            </ul>
        </div>
    </nav>
  )
}

export default DashNav