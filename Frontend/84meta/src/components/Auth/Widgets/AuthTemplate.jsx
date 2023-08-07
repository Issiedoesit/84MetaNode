import React from 'react'
import AuthNav from "../Navigation/AuthNav"

const AuthTemplate = ({altAction, link, linkText, children}) => {
  return (
    <div className={`min-h-screen w-full bg-brandBlue2x`}>
        <AuthNav altAction={altAction} link={link} linkText={linkText} />
        <div className={`px-4 md:px-8 lg:px-10 py-10 flex items-center h-full min-h-screen `}>
            {children}
        </div>
    </div>
  )
}

export default AuthTemplate