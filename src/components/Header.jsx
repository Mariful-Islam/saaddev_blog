import React from 'react'
import {Link, NavLink} from "react-router-dom";;


const Header = () => {
    let username = localStorage.getItem('username')
  return (
    <div className='wrapper header'>
        <h1>Blog - Saad Dev</h1>
        <div className='nav'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to={`/profile/${username}`}>Profile</NavLink>
            <NavLink to={'/create_post'}>
                <svg className='icon-pen' width="25" height="25" viewBox="0 0 32.24800109863281 32.24800109863281" fill="#000000"><g><path d="M 21.172,21.172L 19.39,15.792L 9.11,5.512L 5.512,9.11L 15.792,19.39 zM 0.746,0.746c-0.994,0.994-0.994,2.604,0,3.598l 2.648,2.648l 3.598-3.598L 4.344,0.746 C 3.35-0.248, 1.74-0.248, 0.746,0.746zM 30,6L 15.822,6 l 2,2L 30,8 l0,22 L 8,30 L 8,17.822 l-2-2L 6,30 c0,1.104, 0.896,2, 2,2l 22,0 c 1.104,0, 2-0.896, 2-2L 32,8 C 32,6.896, 31.104,6, 30,6z"/></g></svg>
            </NavLink>
            {/*<NavLink to='/signup'>Sing Up</NavLink>*/}
            {/*<NavLink to='/login'>Login</NavLink>*/}
        </div>

    </div>
  )
}

export default Header