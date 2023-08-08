import React from 'react'

const useFlat = () => {

    const flat = (obj, out) => {
        Object.keys(obj).forEach(key => {
            if (typeof obj[key] == 'object') {
                out = flat(obj[key], out) //recursively call for nesteds
            } else {
                out[key] = obj[key] //direct assign for values
            }
    
        })
        return out
    }

  return {flat}
}

export default useFlat