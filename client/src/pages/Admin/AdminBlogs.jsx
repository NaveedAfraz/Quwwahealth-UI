import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminBlogs, createBlog, updateBlog, deleteBlog, getBlogCategories, clearError, clearSuccess } from '../../store/slices/blogSlice';
import BlogEditor from './BlogEditor';

const AdminBlogs = () => {
  const dispatch = useDispatch();
  const { blogs, categories, loading, error, success } = useSelector((state) => state.blog);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editorData, setEditorData] = useState(null);

  useEffect(() => {
    dispatch(getAdminBlogs());
    dispatch(getBlogCategories());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setTimeout(() => dispatch(clearSuccess()), 3000);
    }
    if (error) {
      setTimeout(() => dispatch(clearError()), 5000);
    }
  }, [success, error, dispatch]);

  const handleEditorChange = (newData) => {
    setEditorData(newData);
  };

  const handleCreate = () => {
    setSelectedBlog(null);
    setEditorData({
      title: '',
      content: '',
      category: '',
      status: 'draft',
      excerpt: '',
      tags: '',
      featuredImage: '',
      meta_title: '',
      meta_description: ''
    });
    setIsEditorOpen(true);
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setEditorData({
      ...blog,
      featured_image: blog.featured_image || '',
      tags: blog.tags ? blog.tags.join(', ') : '',
      meta_title: blog.meta_title || '',
      meta_description: blog.meta_description || ''
    });
    setIsEditorOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      dispatch(deleteBlog(id));
    }
  };

  const handleSave = async (blogData) => {
    const dataToSave = { ...blogData };

    try {
      if (selectedBlog) {
        await dispatch(updateBlog({ id: selectedBlog._id, blogData: dataToSave })).unwrap();
      } else {
        await dispatch(createBlog(dataToSave)).unwrap();
      }
      setIsEditorOpen(false);
      setEditorData(null);
    } catch (err) {
      console.error('Failed to save blog:', err);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { color: 'bg-green-100 text-green-800', icon: '✅' },
      draft: { color: 'bg-yellow-100 text-yellow-800', icon: '📄' }
    };
    const config = statusConfig[status] || statusConfig.draft;
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.color}`}>
        {config.icon} {status}
      </span>
    );
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#54BD95]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-[#848383] mt-1">Create, edit, and manage your blog posts</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-6 py-3 bg-[#54BD95] text-white rounded-lg hover:bg-[#4a9f7f] transition-colors flex items-center"
        >
          <span className="mr-2">📝</span>
          Create New Blog
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{typeof error === 'string' ? error : (error.message || 'An unexpected error occurred.')}</span>
          {error.errors && Array.isArray(error.errors) && (
            <ul className="mt-2 list-disc list-inside">
              {error.errors.map((err, index) => (
                <li key={index}>{err.msg}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {isEditorOpen && editorData && (
        <BlogEditor
          formData={editorData}
          onFormChange={handleEditorChange}
          onSave={handleSave}
          onCancel={() => setIsEditorOpen(false)}
          categories={categories}
        />
      )}

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Blog Posts ({blogs.length})</h2>
        </div>
        
        {blogs.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
            <p className="text-[#848383] mb-4">Get started by creating your first blog post</p>
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-[#54BD95] text-white rounded-md hover:bg-[#4a9f7f] transition-colors"
            >
              Create Your First Blog
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#A6A6A6] uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#A6A6A6] uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#A6A6A6] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#A6A6A6] uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-[#A6A6A6] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                        {blog.excerpt && (
                          <div className="text-sm text-[#A6A6A6] truncate max-w-xs">
                            {blog.excerpt}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(blog.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#A6A6A6]">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="text-[#54BD95] hover:text-[#4a9f7f] mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogs; 