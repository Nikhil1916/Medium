import axios from 'axios';
import { useEffect, useState } from 'react'
import { API_ENDPOINT } from '../config';
import { StorageKeys } from './interfaces';

const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    useEffect(()=>{
        fetchBlogs();
    },[]);

    async function fetchBlogs() {
        const blogs = await axios.get(API_ENDPOINT+"/api/v1/blog/bulk",{
            headers:{
                Authorization: "Bearer "+ localStorage.getItem(StorageKeys.token)
            }
        });
        // console.log(blogs);
        setLoading(false);
        setBlogs(blogs.data.blogs);
    }

    return {
        blogs, 
        loading
    }
}

export default useBlogs