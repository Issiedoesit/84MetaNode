import React from 'react'
import { PulseLoader } from 'react-spinners'

const FormButton = ({handleClick, text, disabled}) => {
  return (
    <button onClick={handleClick} disabled={disabled} type='button' className='rounded-md bg-brandBlue1x text-white hover:shadow-md hover:bg-brandBlue3x transition-all ease-in-out duration-300 disabled:bg-brandGray3x py-2 px-4 text-lg w-full'> 
      {
        disabled
        ?
        <PulseLoader size={'10px'} color={'white'} />
        :
        text || 'Create Account'
      }
     </button>
  )
}

export default FormButton