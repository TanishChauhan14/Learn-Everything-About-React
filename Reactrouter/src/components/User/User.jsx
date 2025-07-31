import React from 'react'
import { useParams } from 'react-router'
const User = () => {
    const {userid} = useParams();
  return (
    <div className='bg-blue-400 flex justify-center'>
      <h1 className='text-6xl text-white'>User ID: {userid}  </h1>
    </div>
  )
}

export default User
