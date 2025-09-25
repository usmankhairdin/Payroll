import React, { useState } from 'react';
import { Search, Download, Eye, Shield, AlertTriangle, CheckCircle, Clock, Activity } from 'lucide-react';
import ClickableEmployeeName from './ClickableEmployeeName';
import Footer from './Footer';

const AuditLogs = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('last-7-days');

  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-04-01 14:30:25',
      user: 'Sarah Johnson',
      userId: 2,
      userRole: 'Admin',
      action: 'Payroll Processed',
      module: 'Payroll',
      details: 'Processed payroll for March 2024 - 247 employees',
      ipAddress: '192.168.1.100',
      severity: 'high',
      status: 'success'
    },
    {
      id: 2,
      timestamp: '2024-04-01 13:45:12',
      user: 'John Smith',
      userId: 1,
      userRole: 'HR Manager',
      action: 'Employee Added',
      module: 'Employee Management',
      details: 'Added new employee: Michael Chen (EMP003)',
      ipAddress: '192.168.1.105',
      severity: 'medium',
      status: 'success'
    },
    {
      id: 3,
      timestamp: '2024-04-01 12:20:08',
      user: 'Admin System',
      userId: null, // System user
      userRole: 'System',
      action: 'Tax Calculation',
      module: 'Tax & Compliance',
      details: 'Automated tax calculation completed for all employees',
      ipAddress: 'System',
      severity: 'low',
      status: 'success'
    },
    {
      id: 4,
      timestamp: '2024-04-01 11:15:33',
      user: 'Emily Davis',
      userId: 4,
      userRole: 'Accountant',
      action: 'Bank Account Updated',
      module: 'Banking',
      details: 'Updated bank account details for Chase Bank account',
      ipAddress: '192.168.1.110',
      severity: 'medium',
      status: 'success'
    },
    {
      id: 5,
      timestamp: '2024-04-01 10:05:17',
      user: 'Unknown User',
      userId: null, // Unknown user
      userRole: 'Unknown',
      action: 'Failed Login Attempt',
      module: 'Authentication',
      details: 'Failed login attempt from suspicious IP address',
      ipAddress: '203.45.67.89',
      severity: 'high',
      status: 'failed'
    },
    {
      id: 6,
      timestamp: '2024-04-01 09:30:44',
      user: 'Sarah Johnson',
      userId: 2,
      userRole: 'Admin',
      action: 'Settings Modified',
      module: 'System Settings',
      details: 'Updated payroll frequency settings',
      ipAddress: '192.168.1.100',
      severity: 'medium',
      status: 'success'
    }
  ];

  const activitySummary = {
    totalActions: 1247,
    successfulActions: 1198,
    failedActions: 49,
    criticalAlerts: 3
  };

  const moduleStats = [
    { name: 'Payroll', actions: 342, percentage: 27.4 },
    { name: 'Employee Management', actions: 298, percentage: 23.9 },
    { name: 'Authentication', actions: 187, percentage: 15.0 },
    { name: 'Tax & Compliance', actions: 156, percentage: 12.5 },
    { name: 'Banking', actions: 134, percentage: 10.7 },
    { name: 'System Settings', actions: 130, percentage: 10.4 }
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || log.severity === selectedFilter || log.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 min-h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Audit Logs</h1>
          <p className="text-gray-600">Monitor system activities and security events</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 flex items-center shadow-lg">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center shadow-lg">
            <Shield className="w-4 h-4 mr-2" />
            Security Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Actions</p>
              <p className="text-2xl font-bold text-blue-600">{activitySummary.totalActions.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Successful</p>
              <p className="text-2xl font-bold text-emerald-600">{activitySummary.successfulActions.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-400 to-red-600 shadow-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-red-600">{activitySummary.failedActions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Critical Alerts</p>
              <p className="text-2xl font-bold text-orange-600">{activitySummary.criticalAlerts}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Module Statistics */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity by Module</h3>
            <div className="space-y-4">
              {moduleStats.map((module, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-900">{module.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{module.actions}</p>
                    <p className="text-xs text-gray-500">{module.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="lg:col-span-3">
          {/* Filters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div className="flex space-x-3">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Severity</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="last-7-days">Last 7 Days</option>
                  <option value="last-30-days">Last 30 Days</option>
                  <option value="last-90-days">Last 90 Days</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
            </div>
          </div>

          {/* Logs Table */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-blue-50/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 transition-all duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          {log.userId ? (
                            <ClickableEmployeeName
                              employeeId={log.userId}
                              employeeName={log.user}
                              className="text-sm font-medium text-gray-900"
                            />
                          ) : (
                            <div className="text-sm font-medium text-gray-900">{log.user}</div>
                          )}
                          <div className="text-sm text-gray-500">{log.userRole}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{log.action}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">{log.details}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.module}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(log.severity)}`}>
                          {log.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(log.status)}
                          <span className="ml-2 text-sm text-gray-900 capitalize">{log.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 hover:scale-110 transition-all duration-200">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuditLogs;
