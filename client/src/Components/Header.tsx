import React, { useState } from 'react'
import Avatar from './Avatar'
import { Link, useNavigate } from 'react-router-dom'
import { StorageKeys } from '../utils/interfaces'
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropDown] = useState(false);
  const toggleDropdown = (val:boolean) => {
    setIsDropDown(val);
  }

  const logout = () => {
    localStorage.clear();
    navigate("/signin");
  }
  const isLoggedIn = localStorage.getItem(StorageKeys.token);
  return (
    <div className='flex justify-between px-10 py-4 shadow-lg' onMouseLeave={() => toggleDropdown(false)}>
        <Link to={"/"}><div className='text-lg font-bold'>Medium</div></Link>
        <div className='flex items-center'>
          {
           isLoggedIn && location.pathname!="/publish" && 
          <Link to={"/publish"} >
            <button type="button" className="text-white focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-4 py-1.5 text-center me-2 bg-green-600 hover:bg-green-700 focus:ring-green-800">NEW</button>
          </Link>
          }
          {
            isLoggedIn && <div className='flex items-center gap-1 relative'>
                <Avatar name={localStorage.getItem(StorageKeys.name) as string} size={2} />  
                {!isDropdownOpen ? (
              <FontAwesomeIcon
                icon={faAngleDown}
                className="text-sm block"
                onMouseEnter={() => toggleDropdown(true)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faAngleUp}
                className="text-sm block"
              />
            )}
            {
              isDropdownOpen && (
                <div className='bg-white shadow-sm absolute top-10 w-20 pl-2 p-[7px] cursor-pointer' onClick={                  
                  logout
                } >
                  <span>Log Out</span>
                </div>
              )
            }
              </div>
          } 
        </div>
    </div>
  )
}

export default Header