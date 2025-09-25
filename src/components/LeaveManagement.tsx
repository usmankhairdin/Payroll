import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, AlertTriangle, Plus, Search, Download, Eye, Users } from 'lucide-react';
import ClickableEmployeeName from './ClickableEmployeeName';
import Footer from './Footer';

const LeaveManagement = () => {
  const [selectedTab, setSelectedTab] = useState('requests');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewLeaveId, setViewLeaveId] = useState<number | null>(null);
  const initialLeaveRequests = [
    {
      id: 1,
      employeeName: 'John Smith',
      employeeId: 1,
      empCode: 'EMP001',
      leaveType: 'Annual Leave',
      startDate: '2024-04-15',
      endDate: '2024-04-19',
      days: 5,
      status: 'Pending',
      reason: 'Family vacation',
      appliedDate: '2024-04-01',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 2,
      employeeName: 'Sarah Johnson',
      employeeId: 2,
      empCode: 'EMP002',
      leaveType: 'Sick Leave',
      startDate: '2024-04-10',
      endDate: '2024-04-12',
      days: 3,
      status: 'Approved',
      reason: 'Medical treatment',
      appliedDate: '2024-04-08',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 3,
      employeeName: 'Michael Chen',
      employeeId: 3,
      empCode: 'EMP003',
      leaveType: 'Personal Leave',
      startDate: '2024-04-20',
      endDate: '2024-04-20',
      days: 1,
      status: 'Rejected',
      reason: 'Personal matters',
      appliedDate: '2024-04-18',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  const [leaveRequestsList, setLeaveRequestsList] = useState(initialLeaveRequests);

  const leaveTypes = [
    { name: 'Annual Leave', balance: 15, used: 5, color: 'blue' },
    { name: 'Sick Leave', balance: 10, used: 2, color: 'red' },
    { name: 'Personal Leave', balance: 5, used: 1, color: 'purple' },
    { name: 'Maternity Leave', balance: 90, used: 0, color: 'pink' }
  ];

  const attendanceData = [
    { date: '2024-04-01', status: 'Present', hours: 8 },
    { date: '2024-04-02', status: 'Present', hours: 8 },
    { date: '2024-04-03', status: 'Late', hours: 7.5 },
    { date: '2024-04-04', status: 'Absent', hours: 0 },
    { date: '2024-04-05', status: 'Present', hours: 8 }
  ];

  const tabs = [
    { id: 'requests', name: 'Leave Requests', icon: Calendar },
    { id: 'balance', name: 'Leave Balance', icon: Clock },
    { id: 'attendance', name: 'Attendance', icon: Users },
    { id: 'policies', name: 'Leave Policies', icon: AlertCircle }
  ];

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'requests':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search requests..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Request
              </button>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-blue-50/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leaveRequestsList.map((request) => (
                      <tr key={request.id} className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 transition-all duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={request.avatar}
                              alt={request.employeeName}
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-400/30"
                            />
                            <div className="ml-4">
                              <ClickableEmployeeName
                                employeeId={request.employeeId}
                                employeeName={request.employeeName}
                                className="text-sm font-medium text-gray-900"
                              />
                              <div className="text-sm text-gray-500">{request.empCode}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{request.leaveType}</span>
                          <div className="text-sm text-gray-500">{request.reason}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{request.startDate} to {request.endDate}</div>
                          <div className="text-sm text-gray-500">{request.days} days</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                            request.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                            request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setViewLeaveId(request.id)}
                              className="text-blue-600 hover:text-blue-900 hover:scale-110 transition-all duration-200"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {request.status === 'Pending' && (
                              <>
                                <button
                                  onClick={() => {
                                    setLeaveRequestsList(prev => prev.map(req =>
                                      req.id === request.id ? {...req, status: 'Approved'} : req
                                    ));
                                    alert(`Leave request approved for ${request.employeeName}`);
                                  }}
                                  className="text-emerald-600 hover:text-emerald-900 hover:scale-110 transition-all duration-200"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    setLeaveRequestsList(prev => prev.map(req =>
                                      req.id === request.id ? {...req, status: 'Rejected'} : req
                                    ));
                                    alert(`Leave request rejected for ${request.employeeName}`);
                                  }}
                                  className="text-red-600 hover:text-red-900 hover:scale-110 transition-all duration-200"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'balance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {leaveTypes.map((type, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{type.name}</h3>
                    <div className={`w-3 h-3 bg-gradient-to-r from-${type.color}-400 to-${type.color}-600 rounded-full animate-pulse`}></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total</span>
                      <span className="text-sm font-medium">{type.balance} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Used</span>
                      <span className="text-sm font-medium text-red-600">{type.used} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Remaining</span>
                      <span className="text-sm font-medium text-emerald-600">{type.balance - type.used} days</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r from-${type.color}-400 to-${type.color}-600 h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${((type.balance - type.used) / type.balance) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'attendance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Present Days</p>
                    <p className="text-2xl font-bold text-emerald-600">22</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-red-400 to-red-600 shadow-lg">
                    <XCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Absent Days</p>
                    <p className="text-2xl font-bold text-red-600">3</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Late Days</p>
                    <p className="text-2xl font-bold text-yellow-600">5</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Attendance</h3>
              <div className="space-y-3">
                {attendanceData.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl hover:shadow-md transition-all duration-200">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        record.status === 'Present' ? 'bg-emerald-500' :
                        record.status === 'Late' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}></div>
                      <span className="font-medium text-gray-900">{record.date}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        record.status === 'Present' ? 'bg-emerald-100 text-emerald-800' :
                        record.status === 'Late' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {record.status}
                      </span>
                      <span className="text-sm text-gray-600">{record.hours}h</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'policies':
        return (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Policies</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50/50 rounded-xl border border-blue-200/50">
                  <h4 className="font-medium text-gray-900 mb-2">Annual Leave Policy</h4>
                  <p className="text-sm text-gray-600">Employees are entitled to 15 days of annual leave per year. Leave must be requested at least 2 weeks in advance.</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50/50 rounded-xl border border-red-200/50">
                  <h4 className="font-medium text-gray-900 mb-2">Sick Leave Policy</h4>
                  <p className="text-sm text-gray-600">Employees can take up to 10 days of sick leave per year. Medical certificate required for leaves exceeding 3 consecutive days.</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50/50 rounded-xl border border-purple-200/50">
                  <h4 className="font-medium text-gray-900 mb-2">Personal Leave Policy</h4>
                  <p className="text-sm text-gray-600">5 days of personal leave available per year for personal matters. Subject to manager approval.</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 min-h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Leave & Attendance Management</h1>
          <p className="text-gray-600">Manage employee leave requests and attendance tracking</p>
        </div>
        <button
          onClick={() => {
            alert('Exporting leave and attendance report...');
            console.log('Exporting report:', { leaveRequestsList, attendanceData });
          }}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 flex items-center shadow-lg"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Add Leave Request Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">New Leave Request</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const newRequest = {
                    id: Math.max(...leaveRequestsList.map(r => r.id)) + 1,
                    employeeName: formData.get('employeeName') as string,
                    employeeId: Math.floor(Math.random() * 100) + 10, // Random employee ID for demo
                    empCode: `EMP${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
                    leaveType: formData.get('leaveType') as string,
                    startDate: formData.get('startDate') as string,
                    endDate: formData.get('endDate') as string,
                    days: 1, // Calculate based on dates
                    status: 'Pending',
                    reason: formData.get('reason') as string,
                    appliedDate: new Date().toISOString().split('T')[0],
                    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
                  };
                  setLeaveRequestsList(prev => [...prev, newRequest]);
                  setShowAddModal(false);
                  alert('Leave request submitted successfully!');
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name</label>
                  <input
                    name="employeeName"
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter employee name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
                  <select
                    name="leaveType"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Annual Leave">Annual Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Personal Leave">Personal Leave</option>
                    <option value="Maternity Leave">Maternity Leave</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      name="startDate"
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      name="endDate"
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                  <textarea
                    name="reason"
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter reason for leave"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Leave Details Modal */}
      {viewLeaveId && (() => {
        const req = leaveRequestsList.find(r => r.id === viewLeaveId);
        if (!req) return null;
        return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Leave Details</h2>
                  <button onClick={() => setViewLeaveId(null)} className="text-gray-400 hover:text-gray-600">×</button>
                </div>
                <div className="flex items-center mb-4">
                  <img src={req.avatar} alt={req.employeeName} className="w-12 h-12 rounded-full object-cover mr-4" />
                  <div>
                    <div className="font-semibold text-gray-900">{req.employeeName} <span className="text-gray-500 text-sm ml-2">({req.empCode})</span></div>
                    <div className="text-sm text-gray-600">{req.leaveType}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs text-gray-500">Start Date</div>
                    <div className="font-medium text-gray-900">{req.startDate}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs text-gray-500">End Date</div>
                    <div className="font-medium text-gray-900">{req.endDate}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs text-gray-500">Days</div>
                    <div className="font-medium text-gray-900">{req.days}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs text-gray-500">Status</div>
                    <div className="font-medium text-gray-900">{req.status}</div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="text-xs text-gray-500 mb-1">Reason</div>
                  <div className="text-sm text-gray-800">{req.reason}</div>
                </div>
                <div className="flex justify-end">
                  <button onClick={() => setViewLeaveId(null)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Close</button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      <Footer />
    </div>
  );
};

export default LeaveManagement;
