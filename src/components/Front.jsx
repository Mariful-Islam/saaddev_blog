import React from 'react'
import { useNavigate } from 'react-router-dom'

const Front = () => {
    const navigate = useNavigate()
  return (
    <div className='front'>
        <div className='motto'>
            Share your <span>knowledge</span> 
        </div>
        <div className='sig_btn'>
            <button className='fill_btn' onClick={()=>navigate('/signup')}>Become a member</button>
            <button className='outline_btn' onClick={()=>navigate('/login')}>Login</button>
        </div>
    </div>
  )
}

export default Front