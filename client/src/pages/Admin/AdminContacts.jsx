import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getContactSubmissions, 
  updateSubmissionStatus, 
  deleteSubmission, 
  markAsReplied,
  archiveSubmission,
  clearError, 
  clearSuccess 
} from '../../store/slices/adminContactSlice';

const AdminContacts = () => {
  const dispatch = useDispatch();
  const { submissions, loading, error, success } = useSelector((state) => state.adminContact);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    dispatch(getContactSubmissions());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setTimeout(() => dispatch(clearSuccess()), 3000);
    }
    if (error) {
      setTimeout(() => dispatch(clearError()), 5000);
    }
  }, [success, error, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this submission? This action cannot be undone.')) {
      dispatch(deleteSubmission(id));
    }
  };

  const handleStatusChange = (id, status) => {
    dispatch(updateSubmissionStatus({ id, status }));
  };

  const handleMarkReplied = (id) => {
    dispatch(markAsReplied(id));
  };

  const handleArchive = (id) => {
    dispatch(archiveSubmission(id));
  };

  const handleView = (submission) => {
    setSelectedSubmission(submission);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { color: 'bg-blue-100 text-blue-800', icon: '🆕' },
      replied: { color: 'bg-green-100 text-green-800', icon: '✅' },
      archived: { color: 'bg-gray-100 text-[#191A15]', icon: '📁' }
    };
    const config = statusConfig[status] || statusConfig.new;
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.color}`}>
        {config.icon} {status}
      </span>
    );
  };

  const filteredSubmissions = filterStatus === 'all' 
    ? submissions 
    : submissions.filter(sub => sub.status === filterStatus);

  if (loading && submissions.length === 0) {
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
          <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
          <p className="text-[#848383] mt-1">Manage and respond to contact form submissions</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#54BD95] focus:border-[#54BD95]"
          >
            <option value="all">All Submissions</option>
            <option value="new">New</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>
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

      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-6 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">{selectedSubmission.subject}</h3>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-400 hover:text-[#848383] text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="text-gray-900">{selectedSubmission.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{selectedSubmission.email}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <p className="text-gray-900">{selectedSubmission.subject}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-1">
                    {getStatusBadge(selectedSubmission.status)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <p className="text-gray-900">
                    {new Date(selectedSubmission.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Contact Submissions ({filteredSubmissions.length})
          </h2>
        </div>
        
        {filteredSubmissions.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">📧</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
            <p className="text-[#848383]">
              {filterStatus === 'all' 
                ? 'No contact form submissions yet' 
                : `No ${filterStatus} submissions found`
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#A6A6A6] uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#A6A6A6] uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#A6A6A6] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#A6A6A6] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-[#A6A6A6] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubmissions.map((submission) => (
                  <tr key={submission._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{submission.name}</div>
                        <div className="text-sm text-[#A6A6A6]">{submission.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {submission.subject}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={submission.status}
                        onChange={(e) => handleStatusChange(submission._id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-[#54BD95] focus:border-[#54BD95]"
                      >
                        <option value="new">New</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#A6A6A6]">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleView(submission)}
                          className="text-[#54BD95] hover:text-[#4a9f7f]"
                          title="View Details"
                        >
                          👁️
                        </button>
                        {submission.status === 'new' && (
                          <button
                            onClick={() => handleMarkReplied(submission._id)}
                            className="text-green-600 hover:text-green-900"
                            title="Mark as Replied"
                          >
                            ✅
                          </button>
                        )}
                        {submission.status !== 'archived' && (
                          <button
                            onClick={() => handleArchive(submission._id)}
                            className="text-[#848383] hover:text-gray-900"
                            title="Archive"
                          >
                            📁
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(submission._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
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

export default AdminContacts; 