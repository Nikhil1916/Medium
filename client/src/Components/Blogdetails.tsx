import React from 'react'
import useBlog from '../utils/useBlog'
import { useParams } from 'react-router-dom'
import Avatar from './Avatar';

const Blogdetails = () => {
    const {id} = useParams();
    // console.log(id);
    const blogDetail:any = useBlog(id as string);
  return (
    <div>
        <div className='grid grid-cols-12'>
            <div className='col-span-7'>
                <div className='p-2 shadow-sm'>
                    <h1 className='font-bold text-2xl break-words'>{blogDetail?.blog?.title}</h1>
                    <p className='text-gray-500 text-sm'>Posted on {blogDetail?.blog?.created_at?.split("T")?.[0]}</p>
                    <div>
                        {blogDetail?.blog?.content}
                    </div>
                </div>
            </div>
            <div className='col-span-1'></div>
            <div className='col-span-4'>
                <div className='p-2 shadow-sm'>
                    <p className='p-1'>{blogDetail?.blog?.author?.name}</p>
                    <div className='flex items-center p-2'>
                    <Avatar name={blogDetail?.blog?.author?.name} />
                    <p className='pl-2'>{"Author Details"}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Blogdetails