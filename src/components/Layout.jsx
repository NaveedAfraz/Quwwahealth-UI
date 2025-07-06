import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Chatbot from './Chatbot'

const Layout = () => {
  const login = true
  return (

    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
     {!login && <Footer />}
      <Chatbot />
    </div>
  )
}

export default Layout 