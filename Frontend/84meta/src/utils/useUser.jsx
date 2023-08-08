import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const useUser = () => {

    const navigate = useNavigate()

    const [token, setToken] = useState(() => {
        try {
            const storedToken = sessionStorage.getItem('token');
            // console.log('Stored token is => ', storedToken);
            return storedToken !== null ? JSON.parse(storedToken) : null;
        } catch (err) {
        console.error(err);
        return null;
        }
    });

    const [userData, setUserData] = useState(() => {
        try {
            const storedUser = sessionStorage.getItem('user');
            // console.log('Stored user is => ', storedUser);
            return storedUser !== null ? JSON.parse(storedUser) : null;
        } catch (err) {
        console.error(err);
        return null;
        }
    })


    const [user, setUser] = useState(userData !== null ? Object.keys(userData).length > 0 ? [userData] : [] : [])

    // console.log("userData => ", userData);
    // console.log("user => ", user);

    const logout = () => {
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('token')
        setUser([])
        setUserData([])
        setToken(null)
        navigate("/login")
    }


  return {
    user, 
    userData,
    setUser,
    token, 
    setToken,
    logout
  }
}

export default useUser