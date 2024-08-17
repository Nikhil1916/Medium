import React from 'react'
import Quotes from '../Components/Quotes'
import SignupInForm from '../Components/SignupInForm'

export const Signup = () => {
  return (
    <div className='block md:grid grid-cols-2'>
        <div className=' h-screen'>
            <SignupInForm/>
        </div>
        <div className='hidden md:block'>
            <Quotes/>
        </div>
    </div>
  )
}
