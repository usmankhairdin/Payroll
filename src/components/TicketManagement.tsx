import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, MessageSquare, Clock, User, AlertCircle, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import ClickableEmployeeName from './ClickableEmployeeName';

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  assignedTo: number;
  assignedToName: string;
  createdBy: number;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  tags: string[];
  comments: number;
}

const TicketManagement = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      title: 'Payroll System Integration Issue',
      description: 'Users are experiencing delays in payroll processing. The system seems to hang when calculating overtime hours for employees with multiple shifts.',
      status: 'open',
      priority: 'high',
      category: 'Technical',
      assignedTo: 2,
      assignedToName: 'John Smith',
      createdBy: 1,
      createdByName: 'Sarah Johnson',
      createdAt: '2024-01-15 09:30:00',
      updatedAt: '2024-01-15 14:20:00',
      dueDate: '2024-01-20',
      tags: ['payroll', 'integration', 'urgent'],
      comments: 3
    },
    {
      id: 2,
      title: 'Employee Portal Access Request',
      description: 'New employee Michael Chen needs access to the employee portal and training materials.',
      status: 'in-progress',
      priority: 'medium',
      category: 'Access Request',
      assignedTo: 3,
      assignedToName: 'Emily Davis',
      createdBy: 4,
      createdByName: 'Michael Chen',
      createdAt: '2024-01-14 11:15:00',
      updatedAt: '2024-01-15 10:30:00',
      dueDate: '2024-01-18',
      tags: ['access', 'new-employee'],
      comments: 2
    },
    {
      id: 3,
      title: 'Expense Report Approval Workflow',
      description: 'Request to update the expense report approval workflow to include additional approval levels for amounts over $500.',
      status: 'resolved',
      priority: 'low',
      category: 'Process Improvement',
      assignedTo: 5,
      assignedToName: 'David Wilson',
      createdBy: 6,
      createdByName: 'Lisa Anderson',
      createdAt: '2024-01-10 14:45:00',
      updatedAt: '2024-01-14 16:20:00',
      tags: ['workflow', 'expenses', 'approval'],
      comments: 5
    },
    {
      id: 4,
      title: 'Tax Document Generation Error',
      description: 'System throws an error when generating W-2 forms for employees hired after November 2023.',
      status: 'open',
      priority: 'urgent',
      category: 'Bug Report',
      assignedTo: 2,
      assignedToName: 'John Smith',
      createdBy: 7,
      createdByName: 'Robert Brown',
      createdAt: '2024-01-15 16:00:00',
      updatedAt: '2024-01-15 16:00:00',
      dueDate: '2024-01-17',
      tags: ['tax', 'w2', 'bug'],
      comments: 1
    },
    {
      id: 5,
      title: 'Leave Balance Calculation Discrepancy',
      description: 'Employee leave balances are not updating correctly after approved time-off requests.',
      status: 'closed',
      priority: 'medium',
      category: 'Bug Report',
      assignedTo: 3,
      assignedToName: 'Emily Davis',
      createdBy: 8,
      createdByName: 'Jennifer Garcia',
      createdAt: '2024-01-12 10:20:00',
      updatedAt: '2024-01-14 15:45:00',
      tags: ['leave', 'balance', 'calculation'],
      comments: 4
    }
  ]);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.assignedToName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'closed': return <XCircle className="w-4 h-4 text-gray-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const ticketStats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    urgent: tickets.filter(t => t.priority === 'urgent').length
  };

  if (selectedTicket) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button
                onClick={() => setSelectedTicket(null)}
                className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Ticket #{selectedTicket.id}</h1>
                <p className="text-gray-600">Created by <ClickableEmployeeName employeeId={selectedTicket.createdBy} employeeName={selectedTicket.createdByName} /> on {selectedTicket.createdAt}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(selectedTicket.status)}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTicket.status)}`}>
                {selectedTicket.status.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{selectedTicket.title}</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">{selectedTicket.description}</p>
                
                {/* Tags */}
                {selectedTicket.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTicket.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments Section */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Comments ({selectedTicket.comments})</h3>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Add Comment
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <ClickableEmployeeName employeeId={selectedTicket.assignedTo} employeeName={selectedTicket.assignedToName} className="font-medium" />
                        <span className="text-sm text-gray-500">2 hours ago</span>
                      </div>
                      <p className="text-gray-700">I'm currently investigating this issue. Initial findings suggest it's related to the overtime calculation module.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Details</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Priority:</span>
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(selectedTicket.priority)}`}>
                        {selectedTicket.priority}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Category:</span>
                      <span className="ml-2 text-sm text-gray-900">{selectedTicket.category}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Assigned to:</span>
                      <div className="mt-1">
                        <ClickableEmployeeName employeeId={selectedTicket.assignedTo} employeeName={selectedTicket.assignedToName} />
                      </div>
                    </div>
                    {selectedTicket.dueDate && (
                      <div>
                        <span className="text-sm text-gray-600">Due date:</span>
                        <span className="ml-2 text-sm text-gray-900">{selectedTicket.dueDate}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-sm text-gray-600">Last updated:</span>
                      <span className="ml-2 text-sm text-gray-900">{selectedTicket.updatedAt}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                      Update Status
                    </button>
                    <button className="w-full bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-700 transition-colors">
                      Reassign Ticket
                    </button>
                    <button className="w-full bg-orange-600 text-white px-3 py-2 rounded text-sm hover:bg-orange-700 transition-colors">
                      Change Priority
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
            <p className="text-gray-600 mt-1">Manage and track support tickets</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Ticket
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-xl font-bold text-gray-900">{ticketStats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Open</p>
                <p className="text-xl font-bold text-red-600">{ticketStats.open}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-xl font-bold text-yellow-600">{ticketStats.inProgress}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-xl font-bold text-green-600">{ticketStats.resolved}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Urgent</p>
                <p className="text-xl font-bold text-red-600">{ticketStats.urgent}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">#{ticket.id} {ticket.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{ticket.description}</div>
                        <div className="flex items-center mt-1">
                          <MessageSquare className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">{ticket.comments} comments</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(ticket.status)}
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('-', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ClickableEmployeeName employeeId={ticket.assignedTo} employeeName={ticket.assignedToName} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ticket.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
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
  );
};

export default TicketManagement;
