import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalContacts: 0,
    newContacts: 0,
    repliedContacts: 0
  });

  useEffect(() => {
    // Fetch dashboard statistics
    // This would typically come from your API
    setStats({
      totalBlogs: 12,
      publishedBlogs: 8,
      draftBlogs: 4,
      totalContacts: 25,
      newContacts: 5,
      repliedContacts: 20
    });
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${color}`}>
      <div className="flex items-center">
        <div className="text-3xl mr-4">{icon}</div>
        <div>
          <p className="text-sm font-medium text-[#848383]">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-[#848383]">Welcome to your admin dashboard. Here's an overview of your content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total Blogs" 
          value={stats.totalBlogs} 
          icon="📝" 
          color="border-blue-500" 
        />
        <StatCard 
          title="Published Blogs" 
          value={stats.publishedBlogs} 
          icon="✅" 
          color="border-green-500" 
        />
        <StatCard 
          title="Draft Blogs" 
          value={stats.draftBlogs} 
          icon="📄" 
          color="border-yellow-500" 
        />
        <StatCard 
          title="Total Contacts" 
          value={stats.totalContacts} 
          icon="📧" 
          color="border-purple-500" 
        />
        <StatCard 
          title="New Messages" 
          value={stats.newContacts} 
          icon="🆕" 
          color="border-red-500" 
        />
        <StatCard 
          title="Replied Messages" 
          value={stats.repliedContacts} 
          icon="💬" 
          color="border-indigo-500" 
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#54BD95] hover:bg-gray-50 transition-colors">
            <span className="mr-2">📝</span>
            <span className="font-medium">Create New Blog</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#54BD95] hover:bg-gray-50 transition-colors">
            <span className="mr-2">📧</span>
            <span className="font-medium">View Messages</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 