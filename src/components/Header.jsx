import React, { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaSearch, FaBars, FaTimes, FaUser, FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { googleLogout } from '@react-oauth/google';
import { logout } from '../store/slices/authSlice'
import Logo from '../assets/images/header.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsUserMenuOpen(false);
  };

  const navLinkClasses = ({ isActive }) =>
    `text-sm sm:text-base md:text-[1.05rem] lg:text-lg font-medium md:font-semibold lg:font-medium whitespace-nowrap transition-colors duration-300 ${isActive ? 'font-semibold text-black' : 'text-[#A6A6A6] hover:text-black'}`;

  const renderUserAvatar = () => {
    if (user?.avatar) {
      return <img src={user.avatar} alt={user.name} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full object-cover" />;
    }
    return <FaUser className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />;
  };

  return (
    <header className="bg-white shadow-sm relative px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="container mx-auto flex items-center justify-between p-3 sm:p-4 md:py-4 md:px-6 lg:py-8 lg:px-10">
        {/* Logo */}
        <div className="flex items-center h-full">
          <Link to="/" className="flex items-center cursor-pointer">
            <img src={Logo} alt="QuwwaHealth Logo" className="h-10 sm:h-12 md:h-10 lg:h-20 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-3 md:space-x-4 lg:space-x-8">
          <NavLink to="/" className={navLinkClasses}>Home</NavLink>
          <NavLink to="/about" className={navLinkClasses}>About Us</NavLink>
          <NavLink to="/programs" className={navLinkClasses}>Our Programs</NavLink>
          <NavLink to="/blogs" className={navLinkClasses}>Blogs</NavLink>
          <NavLink to="/contact" className={navLinkClasses}>Contact Us</NavLink>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center space-x-2 md:space-x-3 lg:space-x-6">
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 text-sm sm:text-base md:text-[1.05rem] lg:text-lg font-medium text-gray-700 hover:text-black transition-colors duration-300 px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5"
              >
                {renderUserAvatar()}
                <span className="hidden md:inline text-sm md:text-[1.05rem] lg:text-lg">{user?.name || 'User'}</span>
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 md:w-56 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b">
                    <div className="font-medium text-sm sm:text-base md:text-lg text-gray-700">{user?.name}</div>
                    <div className="text-xs sm:text-sm md:text-base text-[#A6A6A6]">{user?.email}</div>
                  </div>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin/blogs"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <span>Admin</span>
                    </Link>
                  )}
                  <button
                    onClick={handleProfileClick}
                    className="w-full text-left px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <FaUserCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <FaSignOutAlt className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/auth" className="text-sm sm:text-base md:text-[1.05rem] font-medium text-[#A6A6A6] hover:text-black transition-colors duration-300 px-2 sm:px-3 md:px-3 py-1.5 sm:py-2 md:py-2.5">Login</Link>
              <Link to="/auth?mode=signup" className="text-sm sm:text-base md:text-[1.05rem] font-medium bg-[#54BD95] text-white px-3 sm:px-4 md:px-4 py-2 sm:py-2.5 md:py-2.5 rounded-lg hover:opacity-90 transition-opacity duration-300 min-w-[90px] md:min-w-[100px] lg:min-w-[120px] text-center">
                Sign Up
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-black focus:outline-none p-2">
            {isMenuOpen ? <FaTimes className="w-6 h-6 sm:w-7 sm:h-7" /> : <FaBars className="w-6 h-6 sm:w-7 sm:h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg z-20">
          <nav className="flex flex-col items-center space-y-3 sm:space-y-4 p-4 sm:p-6">
            <NavLink to="/" onClick={toggleMenu} className={navLinkClasses}>Home</NavLink>
            <NavLink to="/about" onClick={toggleMenu} className={navLinkClasses}>About Us</NavLink>
            <NavLink to="/programs" onClick={toggleMenu} className={navLinkClasses}>Our Programs</NavLink>
            <NavLink to="/contact" onClick={toggleMenu} className={navLinkClasses}>Contact Us</NavLink>
            <NavLink to="/blogs" onClick={toggleMenu} className={navLinkClasses}>Blogs</NavLink>
            <hr className="w-full border-gray-200" />
            <div className="flex flex-col items-center space-y-3 sm:space-y-4 w-full">
              <button className="p-2.5 sm:p-3 rounded-md bg-[#54BD95] hover:opacity-90 transition-opacity duration-300 w-full max-w-xs flex items-center justify-center">
                <FaSearch className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
              
              {isAuthenticated && user ? (
                <>
                  <div className="w-full max-w-xs text-center py-2 border border-gray-300 rounded-lg flex items-center justify-center space-x-3">
                    {renderUserAvatar()}
                    <div>
                      <div className="font-medium text-[#191A15] text-sm sm:text-base">{user?.name}</div>
                      <div className="text-xs sm:text-sm text-[#A6A6A6]">{user?.email}</div>
                    </div>
                  </div>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      onClick={toggleMenu}
                      className="text-sm sm:text-base font-medium bg-gray-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:opacity-90 transition-opacity duration-300 w-full text-center max-w-xs flex items-center justify-center space-x-2"
                    >
                      <span>Admin</span>
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    onClick={toggleMenu}
                    className="text-sm sm:text-base font-medium bg-[#54BD95] text-white px-4 sm:px-6 py-2 rounded-lg hover:opacity-90 transition-opacity duration-300 w-full text-center max-w-xs flex items-center justify-center space-x-2"
                  >
                    <FaUserCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="text-sm sm:text-base font-medium bg-red-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:opacity-90 transition-opacity duration-300 w-full text-center max-w-xs flex items-center justify-center space-x-2"
                  >
                    <FaSignOutAlt className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth" onClick={toggleMenu} className="text-sm sm:text-base font-medium text-[#A6A6A6] hover:text-black transition-colors duration-300 border border-gray-300 px-4 sm:px-6 py-2 rounded-lg w-full text-center max-w-xs">Login</Link>
                  <Link to="/auth?mode=signup" onClick={toggleMenu} className="text-sm sm:text-base font-medium bg-[#54BD95] text-white px-4 sm:px-6 py-2 rounded-lg hover:opacity-90 transition-opacity duration-300 w-full text-center max-w-xs">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header