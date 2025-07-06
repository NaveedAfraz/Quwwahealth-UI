import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-[#191A15] mb-8">Admin Panel</h1>
          <nav>
            <ul className="space-y-2">
              {/* <li>
                <NavLink 
                  to="/admin/dashboard" 
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-[#54BD95] text-white' 
                        : 'text-[#848383] hover:bg-gray-100'
                    }`
                  }
                >
                  <span className="mr-3">📊</span>
                  Dashboard
                </NavLink>
              </li> */}
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
              </li>
              <li>
                <NavLink 
                  to="/admin/contacts" 
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-[#54BD95] text-white' 
                        : 'text-[#848383] hover:bg-gray-100'
                    }`
                  }
                >
                  <span className="mr-3">📧</span>
                  Contact Submissions
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout; 