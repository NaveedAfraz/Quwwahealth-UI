// import React, { useState, useEffect } from 'react'
// import LoginForm from '../components/LoginForm'
// import SignupForm from '../components/SignupForm'
// import loginBg from '../assets/images/login.png'
// import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { Outlet } from 'react-router'
import Login from "./login"
import Register from "./register"
 
// const Auth = () => {
//   const [searchParams] = useSearchParams();
//   const initialMode = searchParams.get('mode') === 'signup' ? false : true;
//   const [isLogin, setIsLogin] = useState(initialMode)

//   useEffect(() => {
//     setIsLogin(searchParams.get('mode') === 'signup' ? false : true);
//   }, [searchParams]);

//   const switchMode = () => {
//     setIsLogin((prevIsLogin) => !prevIsLogin)
//   }

//   return (
//     <div className="min-h-screen flex items-stretch bg-gray-50">
//       <div className="relative flex-1 hidden lg:block">
//         <img
//           className="absolute inset-0 w-full h-full object-cover"
//           src={loginBg}
//           alt="Students playing basketball"
//         />
//       </div>
//       <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FDEECD]">
//         {/* {isLogin ? (
//           <LoginForm onSwitchMode={switchMode} />
//         ) : (
//           <SignupForm onSwitchMode={switchMode} />
//         )} */}
//       </div>
//     </div>
//   )
// }

// export default Auth 
import React from 'react'
import { useState } from 'react'
const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const switchMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin)
  }

  return (
    <>
       <Outlet />
    </>
  )
}

export default Auth