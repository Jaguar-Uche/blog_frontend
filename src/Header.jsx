import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'

const Header = () => {
  const {userInfo, setUserInfo} = useContext(UserContext);
  useEffect(()=>{
    fetch('https://blog-4jyg.onrender.com/profile', {
      //replace url with backend url 
      credentials:'include',
    }).then(response => {
      response.json().then(userInfo =>{
      setUserInfo(userInfo);
      })
    })
  }, [])

  function LogOut(){
    fetch('https://blog-4jyg.onrender.com/logout', {
      //replace url with backend url 
      credentials:'include',
      method:'POST'
    })
    setUserInfo(null);
  }

  const username = userInfo?.username;
  return (
    <header>
        <Link to='/' className="logo">My Blog</Link>
        <nav>
          {username ? 
          (
            <>
            <span>Hello, {username}</span>
            <Link to='/create'>Create new Post</Link>
            <a onClick={LogOut} style={{cursor: 'pointer'}}>LogOut</a>
            </>
          )
          :
          (
            <>
            <Link to="/login">Log in</Link>
            <Link to="/register">Register</Link>
            </>
          )}
          
        </nav>
      </header>
  )
}

export default Header