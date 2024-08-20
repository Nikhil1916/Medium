import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'
import { StorageKeys } from '../utils/interfaces'
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  return (
    <div className='flex justify-between md:px-10 py-4 shadow-lg'>
        <Link to={"/"}><div className='text-lg font-bold'>Medium</div></Link>
        <div>
          {
            location.pathname!="/publish" && 
          <Link to={"/publish"} >
            <button type="button" className="text-white focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-4 py-1.5 text-center me-2 bg-green-600 hover:bg-green-700 focus:ring-green-800">NEW</button>
          </Link>
          }
            <Avatar name={localStorage.getItem(StorageKeys.name) as string} size={2} />
        </div>
    </div>
  )
}

export default Header