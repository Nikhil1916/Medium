import React from 'react'
import Avatar from './Avatar'

const Header = () => {
  return (
    <div className='flex justify-between px-10 py-4 shadow-lg'>
        <div className='text-lg font-bold'>Medium</div>
        <div>
            <Avatar initials='JS' size={8} />
        </div>
    </div>
  )
}

export default Header