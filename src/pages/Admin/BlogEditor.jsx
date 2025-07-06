import React, { useState } from 'react';

const BlogEditor = ({ formData, onFormChange, onSave, onCancel, categories = [] }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormChange({ ...formData, [name]: value });
  };

  const showNewCategoryInput = formData.category === 'add-new' || categories.length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category) {
      alert('Please enter a category.');
      return;
    }
    const submitData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    onSave(submitData);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto w-full max-w-7xl">
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg shadow-xl">
          
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-[#191A15]">
              {formData._id ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>
            <div className="space-x-4">
               <button type="button" onClick={onCancel} className="px-6 py-2 border border-gray-300 text-[#191A15] font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300">
                Cancel
              </button>
              <button type="submit" className="px-6 py-2 bg-[#54BD95] text-white font-semibold rounded-lg hover:bg-[#4a9f7f] transition-colors duration-300 shadow-md">
                {formData._id ? 'Update' : 'Publish'}
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-12 gap-8">
            {/* Main Content Area */}
            <div className="col-span-12 md:col-span-8 space-y-6">
              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="w-full text-2xl font-bold border-none focus:ring-0 px-0" required placeholder="Enter blog title" />
              </div>
              
              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea name="content" id="content" rows="15" value={formData.content} onChange={handleChange} className="w-full border-none focus:ring-0 px-0" required placeholder="Write your blog content here..."></textarea>
              </div>

              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                <textarea name="excerpt" id="excerpt" rows="4" value={formData.excerpt} onChange={handleChange} className="w-full border-none focus:ring-0 px-0" placeholder="Brief description of the blog post"></textarea>
              </div>
            </div>

            {/* Sidebar Area */}
            <div className="col-span-12 md:col-span-4 space-y-6">
              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select name="status" id="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#54BD95]">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              
              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input type="text" name="category" id="category" value={formData.category || ''} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#54BD95]" placeholder="Enter category name" required />
              </div>

              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <input type="text" name="tags" id="tags" value={formData.tags} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#54BD95]" placeholder="Enter tags separated by commas" />
              </div>
              
              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
                <input type="url" name="featured_image" id="featured_image" value={formData.featured_image} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#54BD95]" placeholder="https://example.com/image.png" />
              </div>
              
              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="meta_title" className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                    <input type="text" name="meta_title" id="meta_title" value={formData.meta_title} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#54BD95]" placeholder="SEO title (max 60 chars)" maxLength="60" />
                    <p className="text-xs text-right text-[#A6A6A6] mt-1">{formData.meta_title?.length || 0}/60</p>
                  </div>
                  <div>
                    <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                    <textarea name="meta_description" id="meta_description" rows="3" value={formData.meta_description} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#54BD95]" placeholder="SEO description (max 160 chars)" maxLength="160"></textarea>
                    <p className="text-xs text-right text-[#A6A6A6] mt-1">{formData.meta_description?.length || 0}/160</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEditor; 