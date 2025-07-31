import React, { useContext, useState } from 'react'
import usersContext from '../Context/UserContext';

const Login = () => {

    const {setData} = useContext(usersContext);

    const [username , setusername] = useState('')
    const [password, setpassword] = useState('')


    const handlesubmit = (e) => {
        e.preventDefault();
        setData({username , password})
        console.log(username , password);
        
    }

  return (
    <div className="min-h-full flex items-center justify-center className='bg-gray-900'">
      <form
        className="bg-gray-500 p-8 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={handlesubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value) }
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value) }
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login
