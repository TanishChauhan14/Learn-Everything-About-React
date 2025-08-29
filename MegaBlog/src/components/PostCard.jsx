import React from 'react'
import  authservices  from "../appwriter/File";
import { Link } from "react-router-dom";

const PostCard = ({$id,title,featuredimage}) => {
  return (
    <Link to={`post/${$id}`}>
        <div className='w-full bg-gray-600 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={authservices.getfilePreview(featuredimage)} alt={title} className='rounded-xl' />
            </div>
            <h2 className=' font-bold text-2xl'>
                {title}
            </h2>
        </div>
    </Link>
  )
}

export default PostCard
