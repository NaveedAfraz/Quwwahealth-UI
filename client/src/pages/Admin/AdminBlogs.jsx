import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminBlogs, createBlog, updateBlog, deleteBlog, getBlogCategories, clearError, clearSuccess } from '../../store/slices/blogSlice';
import BlogEditor from './BlogEditor';

const AdminBlogs = () => {
  const dispatch = useDispatch();
  const { blogs, categories, loading, error, success } = useSelector((state) => state.blog);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editorData, setEditorData] = useState({
    title: '',
    featuredImage: '',
    category: '',
    headings: [{ title: '', content: '' },
    { title: '', content: '' },
    { title: '', content: '' },
    { title: '', content: '' },
    { title: '', content: '' }],
    content: '',
  });
  console.log(blogs);
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
      headings: [{ title: '', content: '' },
      { title: '', content: '' },
      { title: '', content: '' },
      { title: '', content: '' },
      { title: '', content: '' }],
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
    
    // Handle tags whether they come as string, array, or undefined
    let tagsValue = '';
    if (Array.isArray(blog.tags)) {
      // If tags is an array, join with comma and space
      tagsValue = blog.tags.join(', ');
    } else if (typeof blog.tags === 'string') {
      // If tags is already a string, use it as is
      tagsValue = blog.tags;
    } else if (blog.tags === null || blog.tags === undefined) {
      // If tags is null or undefined, default to empty string
      tagsValue = '';
    }

    setEditorData({
      ...blog,
      featured_image: blog.featured_image || blog.featured_image_url || '',
      tags: tagsValue,
      headings: blog.headings || Array(5).fill({ title: '', content: '' }),
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
    console.log('Saving blog with data:', { selectedBlog, dataToSave });

    try {
      if (selectedBlog) {
        const blogId = selectedBlog.id || selectedBlog._id;
        console.log('Updating blog with ID:', blogId);
        if (!blogId) {
          throw new Error('No blog ID found for update');
        }
        await dispatch(updateBlog({ id: blogId, blogData: dataToSave })).unwrap();
      } else {
        console.log('Creating new blog');
        await dispatch(createBlog(dataToSave)).unwrap();
      }
      setIsEditorOpen(false);
      setSelectedBlog(null);
      setEditorData({
        title: '',
        featuredImage: '',
        category: '',
        headings: Array(5).fill({ title: '', content: '' }),
        content: '',
        status: 'draft',
        excerpt: '',
        tags: '',
        meta_title: '',
        meta_description: ''
      });
      // Refresh the blog list
      dispatch(getAdminBlogs());
    } catch (err) {
      console.error('Failed to save blog:', err);
      alert(`Failed to save blog: ${err.message || 'Unknown error'}`);
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

  // Render the BlogEditor if isEditorOpen is true
  if (isEditorOpen) {
    return (
      <div className="px-6 py-8 max-w-screen-2xl mx-auto">
        <BlogEditor
          formData={editorData}
          onFormChange={setEditorData}
          onSave={handleSave}
          onCancel={() => {
            setIsEditorOpen(false);
            setSelectedBlog(null);
            setEditorData({
              title: '',
              featuredImage: '',
              category: '',
              headings: Array(5).fill({ title: '', content: '' }),
              content: '',
              status: 'draft',
              excerpt: '',
              tags: '',
              meta_title: '',
              meta_description: ''
            });
          }}
          categories={categories}
        />
      </div>
    );
  }

  // Render the blog list if not in edit mode
  return (
    <div className="px-6 py-8 max-w-screen-2xl mx-auto">
      <div className="flex flex-wrap justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">Manage Blogs</h1>
          <p className="text-lg text-gray-500 mt-1">Create and manage all your blog content</p>
        </div>
        <button
          onClick={handleCreate}
          className="px-6 py-3 bg-[#54BD95] text-white text-lg rounded-xl hover:bg-[#3e8d74] transition shadow-lg"
        >
          + Create Blog
        </button>
      </div>
  
    {blogs.length === 0 ? (
      <div className="text-center py-40 text-gray-500">
        <div className="text-7xl mb-6">📝</div>
        <h3 className="text-3xl font-bold mb-2">No Blogs Yet</h3>
        <p className="text-lg mb-6">Click below to start your first blog post.</p>
        <button
          onClick={handleCreate}
          className="px-5 py-3 bg-[#54BD95] text-white rounded-lg text-base hover:bg-[#3e8d74]"
        >
          Create Blog
        </button>
      </div>
    ) : (
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
        {blogs.map((blog) => (
          <div
            key={blog._id || blog.id}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 flex flex-col"
          >
            {blog.featured_image_url ? (
              <img
                src={blog.featured_image_url}
                alt={blog.title}
                className="h-72 w-full object-cover"
              />
            ) : (
              <div className="h-72 bg-gray-100 flex items-center justify-center text-gray-400 text-xl">
                No Image
              </div>
            )}
  
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{blog.title}</h2>
                <p className="text-base text-gray-700 mb-4 leading-relaxed line-clamp-4">
                  {blog.excerpt || 'No excerpt available.'}
                </p>
  
                <div className="flex flex-wrap gap-3 mb-4">
                  {(Array.isArray(blog.tags) ? blog.tags : blog.tags?.split(',') || []).map((tag, i) => (
                    <span
                      key={i}
                      className="text-sm bg-gray-200 text-gray-800 px-3 py-1 rounded-full"
                    >
                      {typeof tag === 'object' ? tag.name : tag.trim()}
                    </span>
                  ))}
                </div>
  
                <div className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Category:</span> {blog.category || 'Uncategorized'}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Created:</span> {new Date(blog.created_at).toLocaleString()}
                </div>
                <div className="text-sm mt-3">
                  {getStatusBadge(blog.status || 'draft')}
                </div>
              </div>
  
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => handleEdit(blog)}
                  className="text-[#54BD95] hover:text-[#3e8d74] font-semibold text-base"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id || blog._id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  
  
  
  );
};

export default AdminBlogs; 