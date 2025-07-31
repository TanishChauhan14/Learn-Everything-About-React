import React, { useContext } from 'react'
import usersContext from '../Context/UserContext'

const Check = () => {

    const { data } = useContext(usersContext)

    if (data == null)  return <h1>Please login</h1>
    
    return <h1>Welcome {data.username}</h1>
}

export default Check
