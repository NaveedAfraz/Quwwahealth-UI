import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { updateProfile } from '../store/slices/authSlice';
import { FaUser, FaEnvelope, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
  });

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        avatar: user.avatar || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 //   await dispatch(updateProfile(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      avatar: user?.avatar || '',
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#54BD95]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#191A15]">Profile</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 text-[#54BD95] hover:text-green-600 transition-colors"
            >
              <FaEdit size={16} />
              <span>Edit</span>
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <FaUser size={32} className="text-gray-400" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#191A15]">{user.name}</h3>
                <p className="text-[#848383] flex items-center">
                  <FaEnvelope size={14} className="mr-2" />
                  {user.email}
                </p>
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#54BD95]"
                  required
                />
              ) : (
                <p className="p-3 bg-gray-50 rounded-lg text-[#191A15]">{user.name}</p>
              )}
            </div>

            {/* Email Field (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <p className="p-3 bg-gray-50 rounded-lg text-[#191A15]">{user.email}</p>
            </div>

            {/* Avatar URL Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar URL
              </label>
              {isEditing ? (
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#54BD95]"
                />
              ) : (
                <p className="p-3 bg-gray-50 rounded-lg text-[#191A15]">
                  {user.avatar || 'No avatar set'}
                </p>
              )}
            </div>

            {/* Additional User Info */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type
                </label>
                <p className="p-3 bg-gray-50 rounded-lg text-[#191A15]">
                  {user.googleId ? 'Google Account' : 'Email Account'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Verified
                </label>
                <p className="p-3 bg-gray-50 rounded-lg text-[#191A15]">
                  {user.isEmailVerified ? 'Yes' : 'No'}
                </p>
              </div>
            </div> */}

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center space-x-2 bg-[#54BD95] text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  <FaSave size={16} />
                  <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <FaTimes size={16} />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile; 