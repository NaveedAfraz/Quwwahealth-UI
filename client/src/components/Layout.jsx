import React from 'react'
import { Outlet, useLocation } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import Chatbot from './Chatbot'
import { useState } from 'react'
const Layout = ({ isChatOpen, setIsChatOpen }) => {
  const login = true
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  
  const isAuthPage = location.pathname === "/auth/login" || location.pathname === "/auth/register";
  return (

    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet setIsChatOpen={setIsChatOpen} isChatOpen={isChatOpen} />
      </main>
      {!isAuthPage && login && <Footer />}
      {!isAuthPage && <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />}
    </div>
  )
}

export default Layout 