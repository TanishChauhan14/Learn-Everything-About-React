import React from 'react'
import { useDispatch } from "react-redux";
import  authService  from "../../appwriter/Auth";
import { logout as authlogout } from "../../features/authSlice";

const Logout = () => {

    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(authlogout())
        })
    }

  return (
     <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default Logout
