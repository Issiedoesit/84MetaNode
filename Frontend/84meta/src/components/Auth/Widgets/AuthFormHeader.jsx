import React from 'react'
import { NavLink } from 'react-router-dom'

const AuthFormHeader = ({heading, actionText, link, linkText}) => {
  return (
    <div className={`py-4`}>
        <h2 className='font-medium text-center text-xl'>{heading || 'Login Account'}</h2>
        {/* <p className='py-2 text-xs'>{actionText || 'Already have an account?'}  <NavLink to={link || '/login'} className={`text-brandBlue1x font-bold underline underline-offset-2`}>{linkText || 'Log in'}</NavLink></p> */}
    </div>
  )
}

export default AuthFormHeader