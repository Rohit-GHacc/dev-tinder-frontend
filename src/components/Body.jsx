import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

const Body = () => {
  return (
    <div className = 'flex flex-col min-h-screen'>
        <NavBar/>
        <Outlet/>
    </div>
  )
}

export default Body
