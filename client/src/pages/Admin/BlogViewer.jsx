import React from 'react';
import { FiUser, FiClock, FiEdit2, FiX } from 'react-icons/fi';

const BlogViewer = ({ blog, onClose, onEdit }) => {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{blog.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {/* Featured Image */}
          {blog.featured_image_url && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={blog.featured_image_url}
                alt={blog.title}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-8">
            <div className="flex items-center">
              <FiClock className="mr-2" />
              {new Date(blog.created_at).toLocaleDateString()}
            </div>
            {blog.readTime && (
              <div className="flex items-center">
                <FiClock className="mr-2" />
                {blog.readTime}
              </div>
            )}
            <div className="ml-auto">
              {getStatusBadge(blog.status || 'draft')}
            </div>
          </div>

          {/* Content */}
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Headings */}
          {Array.isArray(blog.headings) && blog.headings.some(h => h.title) && (
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Sections</h3>
              <div className="space-y-6">
                {blog.headings
                  .filter(h => h.title)
                  .map((heading, index) => (
                    <div key={index} className="border-l-4 border-[#54BD95] pl-4 py-2">
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Heading</h2>
                      <h4 className="text-md text-gray-800 dark:text-gray-200">
                        {heading.title}
                      </h4>
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Content</h2>
                      <div
                        className="prose dark:prose-invert max-w-none mt-2"
                        dangerouslySetInnerHTML={{ __html: heading.content }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={() => {
              onEdit(blog);
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#54BD95] text-white rounded-lg hover:bg-[#3e8d74] transition-colors mr-2"
          >
            <FiEdit2 />
            Edit Post
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogViewer;
