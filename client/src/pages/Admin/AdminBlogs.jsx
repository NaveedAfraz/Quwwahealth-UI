import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit2, FiTrash2, FiPlus, FiClock, FiUser, FiTag, FiFolder } from 'react-icons/fi';
import BlogViewer from './BlogViewer';
import { getAdminBlogs, createBlog, updateBlog, deleteBlog, clearError, clearSuccess } from '../../store/slices/blogSlice';
import BlogEditor from './BlogEditor';

const AdminBlogs = () => {
  const dispatch = useDispatch();
  const { blogs, categories, loading, error, success } = useSelector((state) => state.blog);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editorData, setEditorData] = useState({
    title: '',
    featured_image_url: '',
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
    // dispatch(getBlogCategories());
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
      tags: '',
      featured_image_url: '',
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
      featured_image_url: blog.featured_image_url || '',
      tags: tagsValue,
      headings: blog.headings || Array(5).fill({ title: '', content: '' }),
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
        featured_image_url: '',
        category: '',
        headings: Array(5).fill({ title: '', content: '' }),
        content: '',
        status: 'draft',
        tags: '',
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
      published: { 
        color: 'bg-green-50 text-green-700 border border-green-100', 
        icon: '•',
        label: 'Published'
      },
      draft: { 
        color: 'bg-yellow-50 text-yellow-700 border border-yellow-100', 
        icon: '•',
        label: 'Draft'
      },
      archived: {
        color: 'bg-gray-50 text-gray-600 border border-gray-200',
        icon: '•',
        label: 'Archived'
      }
    };
    
    const config = statusConfig[status?.toLowerCase()] || statusConfig.draft;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <span className="mr-1.5">{config.icon}</span>
        {config.label}
      </span>
    );
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#54BD95]"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading your blogs...</p>
        </div>
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
              featured_image_url: '',
              category: '',
              headings: Array(5).fill({ title: '', content: '' }),
              content: '',
              status: 'draft',
              tags: '',
            });
          }}
          categories={categories}
        />
      </div>
    );
  }

  // Render the blog list if not in edit mode
  return (

    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#54BD95] to-[#3e8d74] bg-clip-text text-transparent">
            Blog Management
          </h1>
          <p className="text-gray-600 mt-2">Create, edit, and manage your blog content</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#54BD95] to-[#3e8d74] text-white text-base font-medium rounded-xl hover:shadow-lg transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98]"
        >
          <FiPlus className="text-lg" />
          New Blog Post
        </button>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-20 sm:py-32 px-4 bg-white rounded-2xl shadow-sm border border-gray-100 animate-fadeIn">
          <div className="text-7xl mb-6">✍️</div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">No Blog Posts Yet</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">Get started by creating your first blog post. Share your knowledge and engage with your audience.</p>
          <button
            onClick={handleCreate}
            className="px-6 py-3 bg-gradient-to-r from-[#54BD95] to-[#3e8d74] text-white rounded-xl text-base font-medium hover:shadow-lg transition-all hover:scale-[1.03] active:scale-[0.98]"
          >
            Create Your First Post
          </button>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => (
            <div 
              key={blog._id || blog.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100 hover:-translate-y-1 cursor-pointer"
              onClick={() => {
                setSelectedBlog(blog);
                setIsViewerOpen(true);
              }}
            >
              <div className="relative h-52 w-full overflow-hidden">
                {blog.featured_image_url ? (
                  <img
                    src={blog.featured_image_url}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-gray-400">
                    <div className="text-center p-4">
                      <div className="text-4xl mb-2">🖼️</div>
                      <p className="text-sm">No featured image</p>
                    </div>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  {getStatusBadge(blog.status || 'draft')}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <FiFolder className="text-[#54BD95]" />
                    <span className="text-sm font-medium text-gray-500">
                      {blog.category || 'Uncategorized'}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{blog.title}</h2>
                  
                  {/* Meta Information */}
                  <div className="space-y-2 mt-4 text-sm text-gray-600">
                    {blog.author?.name && (
                      <div className="flex items-center gap-2">
                        <FiUser className="text-gray-400" />
                        <span>{blog.author.name}</span>
                        {blog.author.title && (
                          <span className="text-gray-400">• {blog.author.title}</span>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <FiClock className="text-gray-400" />
                      <span>
                        {blog.date 
                          ? new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                          : new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        {blog.readTime && ` • ${blog.readTime}`}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  {((Array.isArray(blog.tags) && blog.tags.length > 0) || 
                    (typeof blog.tags === 'string' && blog.tags.trim() !== '')) && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(Array.isArray(blog.tags) ? blog.tags : blog.tags.split(','))
                        .filter(tag => tag.trim() !== '')
                        .slice(0, 3)
                        .map((tag, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                          >
                            <FiTag className="mr-1" size={10} />
                            {tag.trim()}
                          </span>
                        ))}
                      {(Array.isArray(blog.tags) ? blog.tags : blog.tags.split(','))
                        .length > 3 && (
                        <span className="text-xs text-gray-500 self-center">
                          +{(Array.isArray(blog.tags) ? blog.tags : blog.tags.split(',')).length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Headings Preview */}
                  {Array.isArray(blog.headings) && blog.headings.some(h => h.title) && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Sections</h4>
                      <ul className="space-y-1.5">
                        {blog.headings
                          .filter(h => h.title)
                          .slice(0, 3)
                          .map((heading, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-[#54BD95] mr-2">•</span>
                              <span className="text-sm text-gray-600 line-clamp-1">{heading.title}</span>
                            </li>
                          ))}
                      </ul>
                      {blog.headings.filter(h => h.title).length > 3 && (
                        <p className="text-xs text-gray-400 mt-1">
                          +{blog.headings.filter(h => h.title).length - 3} more sections
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    Last updated: {new Date(blog.updated_at || blog.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 text-gray-600 hover:text-[#54BD95] rounded-lg hover:bg-gray-50 transition-colors hover:scale-105 active:scale-95"
                      title="Edit"
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id || blog._id)}
                      className="p-2 text-gray-600 hover:text-red-500 rounded-lg hover:bg-gray-50 transition-colors hover:scale-105 active:scale-95"
                      title="Delete"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Blog Viewer Modal */}
      {isViewerOpen && selectedBlog && (
        <BlogViewer 
          blog={selectedBlog} 
          onClose={() => setIsViewerOpen(false)}
          onEdit={(blog) => {
            setSelectedBlog(blog);
            setIsViewerOpen(false);
            setIsEditorOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default AdminBlogs; 