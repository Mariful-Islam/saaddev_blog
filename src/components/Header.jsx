import React from 'react'
import {NavLink} from "react-router-dom";

const Header = () => {
  return (
    <div>

      <NavLink to='/'>Home</NavLink>3
      <NavLink to='/signup'>Sing Up</NavLink>
      <NavLink to='/login'>Login</NavLink>
    </div>
  )
}

export default Header