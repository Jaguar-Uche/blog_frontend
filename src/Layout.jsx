import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main>
      <Header/>
      <Outlet/>
      <marquee behavior="" direction="right">Do Keep Up With The News</marquee>
    </main>
  )
}

export default Layout