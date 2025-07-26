import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden bg-white shadow-md sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-[#191A15]">Admin Panel</h1>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="bg-white border-t border-gray-200 px-4 py-2">
            <ul className="space-y-1">
              <li>
                <NavLink 
                  to="/admin/blogs" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-[#54BD95] text-white' 
                        : 'text-[#848383] hover:bg-gray-100'
                    }`
                  }
                >
                  <span className="mr-3">📝</span>
                  Blogs
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/admin/testimonials" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-[#54BD95] text-white' 
                        : 'text-[#848383] hover:bg-gray-100'
                    }`
                  }
                >
                  <span className="mr-3">💬</span>
                  Testimonials
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#191A15] mb-8">Admin Panel</h1>
          <nav>
            <ul className="space-y-2">
              <li>
                <NavLink 
                  to="/admin/blogs" 
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-[#54BD95] text-white' 
                        : 'text-[#848383] hover:bg-gray-100'
                    }`
                  }
                >
                  <span className="mr-3">📝</span>
                  Blogs
                </NavLink>
                <NavLink 
                  to="/admin/testimonials" 
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-[#54BD95] text-white' 
                        : 'text-[#848383] hover:bg-gray-100'
                    }`
                  }
                >
                  <span className="mr-3">💬</span>
                  Testimonials
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 mt-16 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout; 