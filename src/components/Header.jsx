import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header
      className="h-24 w-full flex items-center justify-between px-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg sticky top-0 z-50"
    >
     
      <Navbar />
      
    </header>
  )
}

export default Header
