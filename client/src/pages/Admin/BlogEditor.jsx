import React, { useState } from 'react';
import axios from 'axios';

const BlogEditor = ({ formData, onFormChange, onSave, onCancel, categories = [] }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [headings, setHeadings] = useState([
    { id: '', title: '' },
    { id: '', title: '' },
    { id: '', title: '' },
    { id: '', title: '' },
    { id: '', title: '' }
  ]);
  const handleHeadingChange = (index, field, value) => {
    const newHeadings = [...headings];
    newHeadings[index][field] = value;
    setHeadings(newHeadings);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormChange({ ...formData, [name]: value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Basic file type validation (optional)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']; // Added webp
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.');
      return;
    }

    // Basic file size validation (optional, e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setUploadError('File size exceeds 5MB limit.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('file', file);

    setIsUploading(true);
    setUploadError(''); // Clear previous errors

    try {
      const response = await axios.post('http://localhost:3006/api/upload', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      if (!response.data || !response.data.url) { // Ensure URL is returned
        throw new Error('Upload failed: No image URL returned from server.');
      }

      onFormChange({ ...formData, featured_image: response.data.url }); // Assuming `featured_image` is the correct key
    } catch (err) {
      console.error('Upload error:', err);
      // More descriptive error messages
      if (err.response) {
        setUploadError(`Upload failed: ${err.response.data?.message || err.response.statusText}`);
      } else if (err.request) {
        setUploadError('Upload failed: No response from server. Check your network or server URL.');
      } else {
        setUploadError(`Upload failed: ${err.message}`);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Client-side validation for required fields
    if (!formData.title || formData.title.trim() === '') {
      alert('Blog Title is required.');
      return;
    }
    if (!formData.category || formData.category.trim() === '') {
      alert('Category is required.');
      return;
    }
    if (!formData.content || formData.content.trim() === '') {
      alert('Blog Content is required.');
      return;
    }

    const submitData = {
      ...formData,
      // Ensure tags is an array, even if empty
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
      // Ensure meta object exists, even if empty, as metaTitle/metaDescription are direct properties
      meta: {
        title: formData.metaTitle || '', // Directly use metaTitle from formData
        description: formData.metaDescription || '' // Directly use metaDescription from formData
      }
      // Author and Headings are completely removed from submitData
    };
    onSave(submitData);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-85 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 text-center border-b pb-4 border-gray-200 dark:border-gray-700">
          Create New Blog Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6"> {/* Simplified to single column layout */}

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Blog Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              placeholder="Catchy title for your blog post..."
              className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 text-base"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category || ''}
              onChange={handleChange}
              className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 text-base"
              required
            />
          </div>

          {/* Featured Image Upload */}
          <div>
            <label htmlFor="featuredImage" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Featured Image</label>
            <input
              type="file"
              id="featuredImage"
              onChange={handleFileUpload}
              className="file-input w-full bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 p-3 text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {isUploading && <p className="text-sm text-blue-500 dark:text-blue-400 mt-2 flex items-center"><svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Uploading...</p>}
            {uploadError && <p className="text-sm text-red-600 dark:text-red-400 mt-2">{uploadError}</p>}
            {formData.featured_image && (
              <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Image Preview:</p>
                <img src={formData.featured_image} alt="Featured Image Preview" className="w-full h-48 object-cover rounded-md shadow" />
              </div>
            )}
          </div>

          {/* Headings and Content Sections */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Headings and Content Sections</label>
            <div className="space-y-4">
              {headings.map((heading, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`heading-${index}-id`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Heading ID</label>
                    <input
                      type="text"
                      id={`heading-${index}-id`}
                      name={`heading-${index}-id`}
                      value={heading.id}
                      onChange={(e) => handleHeadingChange(index, 'id', e.target.value)}
                      className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 text-base"
                      placeholder={`heading-${index + 1}`}
                    />
                  </div>
                  <div>
                    <label htmlFor={`heading-${index}-title`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Heading Title</label>
                    <input
                      type="text"
                      id={`heading-${index}-title`}
                      name={`heading-${index}-title`}
                      value={heading.title}
                      onChange={(e) => handleHeadingChange(index, 'title', e.target.value)}
                      className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 text-base"
                      placeholder={`Heading ${index + 1} Title`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags Input */}
          <div>
            <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tags <span className="text-gray-400 text-xs">(comma-separated)</span></label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags || ''}
              onChange={handleChange}
              placeholder="e.g., health, wellness, fitness"
              className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 text-base"
            />
          </div>

          {/* Content (HTML string) */}
          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Blog Content (HTML) <span className="text-red-500">*</span></label>
            <textarea
              id="content"
              name="content"
              value={formData.content || ''}
              onChange={handleChange}
              placeholder="Write your blog content here using HTML..."
              rows="20"
              className="textarea textarea-bordered w-full resize-y bg-gray-50 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 text-base"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6 col-span-full">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-ghost text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-200 px-6 py-2 rounded-lg font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700 transition-colors duration-200 px-6 py-2 rounded-lg font-semibold"
              disabled={isUploading}
            >
              {isUploading ? 'Saving...' : 'Save Blog Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEditor;