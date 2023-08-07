import React from 'react'

const FormInput = ({label, placeholder, name, id, value, type, fieldError, handleBlur, handleChange}) => {
  return (
    <fieldset className={`flex flex-col gap-2`}>
        <label htmlFor={id} className={`text-left`}>{label || 'Username'}</label>
        <input onBlur={handleBlur} onChange={handleChange} type={type || "text"} name={name || 'username'} id={id || 'username'} value={value} placeholder={placeholder || ''} className={`bg-transparent border-0.25 border-brandGray3x py-2 px-4 autofill:bg-brandDarkBlue4x ${ fieldError ? 'ring ring-red-500' : ''}`} />
        {fieldError && <p className={`text-xs text-red-500 text-left`}>{fieldError}</p>}
    </fieldset>
  )
}

export default FormInput