import React from 'react'
import {Link, NavLink, useNavigate} from "react-router-dom";;


const Header = () => {
    let username = localStorage.getItem('username')
    let navigate = useNavigate()
  return (
    <div className='wrapper header'>
        <h1 onClick={()=>navigate('/')} style={{cursor: 'default'}}>Blog</h1>
        <div className='nav'>
            <NavLink to='/'>Home</NavLink>
            {username ? 
            <NavLink to={`/profile/${username}`}>Profile</NavLink> :
            <></>
}
            <NavLink to={'/create_post'}>
                Write
            </NavLink>
            <button className='fill_btn' style={{height:40, width:150}}>Subscribe</button>
        </div>

    </div>
  )
}

export default Header