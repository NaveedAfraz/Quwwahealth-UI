// import React, { useState, useEffect } from 'react'
// import LoginForm from '../components/LoginForm'
// import SignupForm from '../components/SignupForm'
// import loginBg from '../assets/images/login.png'
// import { useSearchParams } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router'
import { Outlet } from 'react-router'
import Login from "./login"
import Register from "./register"

import React from 'react'
import { useState } from 'react'
import { Box } from '@mui/material'
const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const switchMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin)
  }

  return (
    <Box sx={{ height: "100vh", overflowY: "hidden" }}>
      <Outlet />
    </Box>
  )
}

export default Auth