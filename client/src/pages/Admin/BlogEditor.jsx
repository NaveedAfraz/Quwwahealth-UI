import React, { useState } from 'react';
import axios from 'axios';

const BlogEditor = ({ formData, onFormChange, onSave, onCancel, categories = [] }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormChange({ ...formData, [name]: value });
  };

  const handleSubsectionChange = (index, field, value) => {
    const updatedHeadings = [...(formData.headings || [])];
    
    // Ensure we have enough headings
    while (updatedHeadings.length <= index) {
      updatedHeadings.push({ title: '', content: '' });
    }
    
    // Update the specific field
    updatedHeadings[index] = {
      ...updatedHeadings[index],
      [field]: value
    };
    
    // Update the form data with the new headings
    onFormChange({ 
      ...formData, 
      headings: updatedHeadings 
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setUploadError('No file selected');
      return;
    }

    // Reset file input to allow re-uploading the same file
    e.target.value = '';

    // File type validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.');
      return;
    }

    // File size validation (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError('File size exceeds 5MB limit.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('file', file);

    setIsUploading(true);
    setUploadError('');

    try {
      console.log('Starting file upload:', file.name);
      
      const response = await axios.post('http://localhost:3006/api/upload', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
        timeout: 30000 // 30 second timeout
      });

      console.log('Upload response:', response.data);

      if (!response.data || !response.data.url) {
        throw new Error('Upload failed: No image URL returned from server.');
      }

      console.log('Upload successful, image URL:', response.data.url);
      // Update the correct property name that matches the backend's expectation
      onFormChange({ 
        ...formData, 
        featured_image_url: response.data.url,  // Changed from featured_image to featured_image_url
        featuredImage: response.data.url        // Keep both for backward compatibility
      });
      
    } catch (err) {
      console.error('Upload error:', err);
      console.error('Upload error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        code: err.code
      });

      let errorMessage = 'Upload failed';
      
      if (err.response) {
        // Server responded with an error status code
        const { status, data } = err.response;
        if (status === 400) {
          errorMessage = data?.details || data?.message || 'Invalid file format or content';
        } else if (status === 413) {
          errorMessage = 'File is too large. Maximum size is 5MB.';
        } else if (status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = data?.message || `Upload failed with status ${status}`;
        }
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Check your network connection.';
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = 'Upload timed out. Please try again.';
      } else {
        // Other errors
        errorMessage = err.message || 'An unknown error occurred';
      }
      
      setUploadError(errorMessage);
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
      },
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

          {/* Subsections */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">Subsections</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Add up to 5 subsections. Each will be displayed as a numbered section in your blog post.
              </p>
            </div>
            <div className="space-y-6">
              {formData.headings.map((subsection, index) => (
                <div key={index} className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-medium">
                      {index + 1}
                    </span>
                    <h4 className="text-base font-medium text-gray-800 dark:text-gray-200">
                      Section {index + 1}
                    </h4>
                  </div>
                  <div>
                    <label
                      htmlFor={`subsection-${index}-title`}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id={`subsection-${index}-title`}
                      value={subsection.title}
                      onChange={(e) => handleSubsectionChange(index, 'title', e.target.value)}
                      className="input input-bordered w-full bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 text-base"
                      placeholder={`Enter section ${index + 1} title...`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`subsection-${index}-content`}
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Content <span className="text-xs text-gray-500">(supports HTML)</span>
                    </label>
                    <textarea
                      id={`subsection-${index}-content`}
                      value={subsection.content}
                      onChange={(e) => handleSubsectionChange(index, 'content', e.target.value)}
                      className="textarea textarea-bordered w-full bg-white dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 text-base min-h-[100px]"
                      placeholder={`Enter section ${index + 1} content...`}
                    />
                  </div>
                </div>
              ))}
            </div>
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