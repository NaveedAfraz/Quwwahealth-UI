import React from 'react'
import { Outlet, useLocation } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import Chatbot from './Chatbot'

const Layout = () => {
  const login = true
  const location = useLocation();

  const isAuthPage = location.pathname === "/auth/login" || location.pathname === "/auth/register";
  return (

    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isAuthPage && login && <Footer />}
      <Chatbot />
    </div>
  )
}

export default Layout 