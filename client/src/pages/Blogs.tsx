import React from 'react'
import Blogcard from '../Components/Blogcard'
import useBlogs from '../utils/useBlogs'
import { Blog } from '../utils/interfaces';

const Blogs = () => {
    const { blogs , loading } = useBlogs();
    if(loading) {
      return <div>Loading...</div>
    }
  return (
    <div className='flex justify-center'>
    <div className='max-w-[30rem]'>
        {
            blogs?.map((blog:Blog)=>{
                return <Blogcard
                key={blog?.id}
                title={blog?.title}
                authorName={blog?.author?.name}
                content={blog?.content}
                publishedDate={blog?.created_at?.split("T")?.[0]}
                />
            })
        }
    </div>
    
    </div>
  )
}

export default Blogs