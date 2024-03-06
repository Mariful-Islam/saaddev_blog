import React from 'react'
import {NavLink} from "react-router-dom";

const Header = () => {
    let username = localStorage.getItem('username')
  return (
    <div className='wrapper header'>
        <h1>Blog - Saad Dev</h1>
        <div className='nav'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to={`/profile/${username}`}>Profile</NavLink>
            <NavLink to='/signup'>Sing Up</NavLink>
            <NavLink to='/login'>Login</NavLink>
        </div>

    </div>
  )
}

export default Header