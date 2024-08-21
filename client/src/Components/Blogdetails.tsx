import React from 'react'
import useBlog from '../utils/useBlog'
import { useParams } from 'react-router-dom'
import Avatar from './Avatar';
import Skeleton from './Skeleton';

const Blogdetails = () => {
    const {id} = useParams();
    // console.log(id);
    const blogDetail:any = useBlog(id as string);
    // console.log(blogDetail);
    if(!blogDetail?.blog) {
        return (
            <div className='flex flex-col md:grid grid-cols-12'>
                <div className='col-span-7'>
                <Skeleton/>
                </div>
                <div className='col-span-1'></div>
                <div className='col-span-4'>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                </div>
            </div>
        )
    }
  return (
    <div>
        <div className='flex flex-col gap-2 md:grid grid-cols-12'>
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