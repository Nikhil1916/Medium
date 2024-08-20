import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_ENDPOINT } from '../config';
import { StorageKeys } from './interfaces';

const useBlog = (id:string) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState();
    useEffect(()=>{
        fetchBlogs();
    },[]);

    async function fetchBlogs() {
        const blogDetail = await axios.get(API_ENDPOINT+"/api/v1/blog/"+id,{
            headers:{
                Authorization: "Bearer "+ localStorage.getItem(StorageKeys.token)
            }
        });
        console.log(blogDetail);
        setLoading(false);
        setBlog(blogDetail.data.blog);
    }

    return {
        blog, 
        loading
    }
}

export default useBlog