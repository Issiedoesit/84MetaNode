import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../../assets/media/logos/Logo.png'

const AuthNav = ({page, altAction, link, linkText}) => {
  return (
    <nav className={`px-4 md:px-8 lg:px-10 bg-white flex flex-row justify-between gap-10 py-2 md:py-0`}>
        <NavLink to={'/'}>
            <img src={Logo} alt="84 Meta Logo" />
        </NavLink>
        <div className={`flex flex-col md:flex-row gap-4 w-full justify-end items-end md:items-center`}>
        <>
            <p className={``}>{altAction || "Are you a new user?"}</p>
            <NavLink to={link || '/signup'} className={`flex whitespace-nowrap w-fit text-lg px-6 py-1 hover:shadow-md rounded-10 text-white bg-brandBlue1x hover:bg-brandBlue3x transition-all ease-in-out duration-300`}>{linkText || "Sign Up"}</NavLink>
        </>
        </div>
    </nav>
  )
}

export default AuthNav