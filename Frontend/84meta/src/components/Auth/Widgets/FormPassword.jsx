import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const FormPassword = ({label, placeholder, name, id, value, type, fieldError, handleBlur, handleChange, forgotPassword}) => {

    const [visible, setVisible] = useState(false)

  return (
    <fieldset className={`flex flex-col gap-2`}>
        <p className={`text-left`}>{label || 'Password'}</p>
        <label htmlFor={id} className={`flex items-center justify-between gap-4 px-4 autofill:bg-brandDarkBlue4x border-0.25 border-brandGray3x ${ fieldError ? 'focus-within:ring-1  focus-within:ring-red-500 focus-within:ring-offset-1 focus-within:ring-offset-white focus:-within:outline focus-within:border-2 focus-within:border-black' : 'focus-within:ring-1  focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-black'}`}>
            <input onBlur={handleBlur} onChange={handleChange} type={visible ? 'text' : 'password'} name={name || 'password'} id={id || 'password'} value={value} placeholder={placeholder || ''} className={`w-full py-2 bg-transparent border-none focus:outline-none`} />
            <button type={'button'} onClick={()=>setVisible(prevVisible => !prevVisible)} className='w-fit relative flex'>
                <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.9425 7.19625C19.9133 7.12219 19.2075 5.36062 17.6383 3.59531C15.5475 1.24312 12.9067 0 10 0C7.09333 0 4.4525 1.24312 2.36166 3.59531C0.792493 5.36062 0.0833254 7.125 0.0574921 7.19625C0.0195863 7.29217 0 7.39597 0 7.50094C0 7.60591 0.0195863 7.70971 0.0574921 7.80562C0.0866587 7.87969 0.792493 9.64031 2.36166 11.4056C4.4525 13.7569 7.09333 15 10 15C12.9067 15 15.5475 13.7569 17.6383 11.4056C19.2075 9.64031 19.9133 7.87969 19.9425 7.80562C19.9804 7.70971 20 7.60591 20 7.50094C20 7.39597 19.9804 7.29217 19.9425 7.19625ZM10 13.5C7.435 13.5 5.19416 12.4509 3.33916 10.3828C2.57803 9.53128 1.93048 8.56027 1.41666 7.5C1.93034 6.43963 2.57791 5.4686 3.33916 4.61719C5.19416 2.54906 7.435 1.5 10 1.5C12.565 1.5 14.8058 2.54906 16.6608 4.61719C17.4234 5.4684 18.0724 6.43942 18.5875 7.5C17.9867 8.76188 15.3692 13.5 10 13.5ZM10 3C9.20887 3 8.43551 3.26392 7.77772 3.75839C7.11992 4.25285 6.60723 4.95566 6.30448 5.77792C6.00173 6.60019 5.92251 7.50499 6.07686 8.37791C6.2312 9.25082 6.61216 10.0526 7.17157 10.682C7.73098 11.3113 8.44371 11.7399 9.21964 11.9135C9.99556 12.0872 10.7998 11.9981 11.5307 11.6575C12.2616 11.3169 12.8864 10.7401 13.3259 10.0001C13.7654 9.26005 14 8.39002 14 7.5C13.9989 6.30691 13.5771 5.16304 12.8272 4.31939C12.0773 3.47575 11.0605 3.00124 10 3ZM10 10.5C9.47258 10.5 8.95701 10.3241 8.51848 9.99441C8.07995 9.66476 7.73815 9.19623 7.53632 8.64805C7.33449 8.09987 7.28168 7.49667 7.38457 6.91473C7.48746 6.33279 7.74144 5.79824 8.11438 5.37868C8.48732 4.95912 8.96247 4.6734 9.47976 4.55764C9.99704 4.44189 10.5332 4.5013 11.0205 4.72836C11.5078 4.95542 11.9242 5.33994 12.2173 5.83329C12.5103 6.32664 12.6667 6.90666 12.6667 7.5C12.6667 8.29565 12.3857 9.05871 11.8856 9.62132C11.3855 10.1839 10.7072 10.5 10 10.5Z" fill="#043187"/>
                </svg>
                {visible && <span className={`absolute top-50% left-50% -translate-y-50% -translate-x-50% text-2xl text-brandBlue1x`}>/</span>}
            </button>
        </label>
        {forgotPassword && 
        <div className={`flex justify-between gap-8 items-center pt-4`}>
            <label htmlFor="remember" className={`flex gap-2 items-center text-sm text-brandGray3x`}>
                <input type="checkbox" name="remember" id="remember" className={`rounded-full accent-brandBlue1x`} />
                Remember Me
            </label>
            <NavLink to={'#'} className={'text-brandBlue1x font-normal text-sm text-right'}>Forgot your password?</NavLink>
        </div>
        }
        {fieldError && <p className={`text-xs text-red-500 text-left`}>{fieldError}</p>}
    </fieldset>
  )
}

export default FormPassword