import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router'

const Github = () => {

  const data = useLoaderData();


    // const [data ,Setdata] = useState({})
    // useEffect(() => {
    //     fetch("https://api.github.com/users/TanishChauhan14")
    //     .then(resp => resp.json())
    //     .then(data => {
    //     console.log(data);
    //     Setdata(data); 
    // })
    // },[])

  return (
    <div className='flex justify-center '>
        <div className=" w-72 flex  flex-col rounded-xl glass  min-h-72 mt-3 ">
        <div>
          <img
            src={data.avatar_url}
            alt="test"
            width="300"
            height="300"
            className="rounded-t-xl w-full"
          />
        </div>
        <div className="flex flex-col py-3 px-3 pb-7 -mt-4 bg-black rounded-b-xl ">
          <div className="flex justify-between">
            <h1 className="font-RubikBold text-white ">{data.name}</h1>
            <h1 className="font-bold font-RubikBold text-white">Followers : {data.followers}</h1>
          </div>
          <div className="flex font-mono text-white">
            <p>Following : </p>
            <p>{data.following}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Github



export const Githubloader = async () => {
  const data = await fetch("https://api.github.com/users/TanishChauhan14");
  return data.json();
}

