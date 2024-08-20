import React from 'react'
import Blogcard from '../Components/Blogcard'
import useBlogs from '../utils/useBlogs'
import { Blog } from '../utils/interfaces';
import { Link } from 'react-router-dom';
import Skeleton from '../Components/Skeleton';

const Blogs = () => {
    const { blogs , loading } = useBlogs();
    if(loading) {
      return (<div className='flex justify-center'>
        <div>
        {[1,2,3,4,5,6,7,8]?.map((d,i)=>{
          return <Skeleton key={i} />
        })}
        </div>
      </div>)
    }
  return (
    <div className='flex justify-center'>
    <div className='min-w-[15rem] max-w-[10rem] md:max-w-[30rem]'>
        {
            blogs?.map((blog:Blog)=>{
                return<Link key={blog?.id} to={`/blog/${blog?.id}`}><Blogcard
                key={blog?.id}
                title={blog?.title}
                authorName={blog?.author?.name}
                content={blog?.content}
                publishedDate={blog?.created_at?.split("T")?.[0]}
                /></Link>
            })
        }
    </div>
    
    </div>
  )
}

export default Blogs