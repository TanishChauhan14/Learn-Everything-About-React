import React, { useState } from 'react'
import usersContext from './UserContext'

const UserContextProvider = ({children}) => {

    const [data,setData] = useState(null);

  return (
    <usersContext.Provider value={{data,setData}} >
      {children}
    </usersContext.Provider>
  )
}

export default UserContextProvider
