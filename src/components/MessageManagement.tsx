import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Mail, Send, Reply, Star, Paperclip, ArrowLeft, Users, Clock } from 'lucide-react';
import ClickableEmployeeName from './ClickableEmployeeName';

interface Message {
  id: number;
  subject: string;
  content: string;
  type: 'inbox' | 'sent' | 'draft';
  priority: 'low' | 'medium' | 'high';
  fromId: number;
  fromName: string;
  toIds: number[];
  toNames: string[];
  ccIds?: number[];
  ccNames?: string[];
  sentAt: string;
  readAt?: string;
  isRead: boolean;
  isStarred: boolean;
  hasAttachment: boolean;
  threadId: number;
  replyCount: number;
  category: string;
}

const MessageManagement = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      subject: 'Q1 Performance Review Results',
      content: 'Hello team,\n\nI wanted to share the Q1 performance review results. Overall, the team has shown excellent growth and productivity. Please find the detailed report attached.\n\nKey highlights:\n- 95% of goals were met or exceeded\n- Employee satisfaction increased by 12%\n- Training completion rate: 98%\n\nLet\'s schedule individual meetings to discuss your personal development plans.\n\nBest regards,\nSarah Johnson',
      type: 'sent',
      priority: 'high',
      fromId: 1,
      fromName: 'Sarah Johnson',
      toIds: [2, 3, 4, 5],
      toNames: ['John Smith', 'Emily Davis', 'Michael Chen', 'David Wilson'],
      sentAt: '2024-01-15 09:30:00',
      isRead: true,
      isStarred: false,
      hasAttachment: true,
      threadId: 1,
      replyCount: 3,
      category: 'HR Updates'
    },
    {
      id: 2,
      subject: 'Payroll System Maintenance Scheduled',
      content: 'Dear HR Team,\n\nWe have scheduled maintenance for the payroll system this weekend (January 20-21). The system will be unavailable from Saturday 11 PM to Sunday 6 AM.\n\nPlease ensure all payroll processing is completed before the maintenance window.\n\nIf you have any questions, please contact the IT support team.\n\nThanks,\nIT Support',
      type: 'inbox',
      priority: 'medium',
      fromId: 8,
      fromName: 'IT Support',
      toIds: [1, 2, 3],
      toNames: ['Sarah Johnson', 'John Smith', 'Emily Davis'],
      sentAt: '2024-01-14 14:15:00',
      isRead: false,
      isStarred: true,
      hasAttachment: false,
      threadId: 2,
      replyCount: 1,
      category: 'IT Maintenance'
    },
    {
      id: 3,
      subject: 'New Employee Onboarding - Michael Chen',
      content: 'Hi Sarah,\n\nI wanted to confirm the onboarding schedule for Michael Chen who starts next Monday.\n\nSchedule:\n- 9:00 AM: Welcome and office tour\n- 10:00 AM: HR orientation\n- 11:00 AM: IT setup\n- 2:00 PM: Team introductions\n- 3:00 PM: Department overview\n\nPlease let me know if you need any changes to this schedule.\n\nBest,\nEmily',
      type: 'inbox',
      priority: 'high',
      fromId: 3,
      fromName: 'Emily Davis',
      toIds: [1],
      toNames: ['Sarah Johnson'],
      ccIds: [2],
      ccNames: ['John Smith'],
      sentAt: '2024-01-14 11:45:00',
      readAt: '2024-01-14 12:30:00',
      isRead: true,
      isStarred: false,
      hasAttachment: false,
      threadId: 3,
      replyCount: 2,
      category: 'Onboarding'
    },
    {
      id: 4,
      subject: 'Benefits Enrollment Reminder',
      content: 'Hello everyone,\n\nThis is a friendly reminder that benefits enrollment closes this Friday, January 19th at 5:00 PM.\n\nIf you haven\'t completed your enrollment yet, please:\n1. Log into the benefits portal\n2. Review available plans\n3. Make your selections\n4. Submit before the deadline\n\nThe HR team is available to answer any questions.\n\nRegards,\nHR Benefits Team',
      type: 'sent',
      priority: 'high',
      fromId: 1,
      fromName: 'Sarah Johnson',
      toIds: [2, 3, 4, 5, 6, 7],
      toNames: ['John Smith', 'Emily Davis', 'Michael Chen', 'David Wilson', 'Lisa Anderson', 'Robert Brown'],
      sentAt: '2024-01-13 16:20:00',
      isRead: true,
      isStarred: false,
      hasAttachment: true,
      threadId: 4,
      replyCount: 0,
      category: 'Benefits'
    },
    {
      id: 5,
      subject: 'Draft: Policy Update - Remote Work Guidelines',
      content: 'Dear Team,\n\nWe are updating our remote work policy to better support work-life balance and productivity. The new guidelines will include:\n\n- Flexible core hours (10 AM - 3 PM)\n- Required in-office days (Tuesday and Thursday)\n- Home office equipment allowance\n- Virtual meeting best practices\n\nPlease review and provide feedback by next Friday.\n\n[DRAFT - NOT SENT]',
      type: 'draft',
      priority: 'medium',
      fromId: 1,
      fromName: 'Sarah Johnson',
      toIds: [2, 3, 4, 5, 6, 7],
      toNames: ['John Smith', 'Emily Davis', 'Michael Chen', 'David Wilson', 'Lisa Anderson', 'Robert Brown'],
      sentAt: '2024-01-12 10:30:00',
      isRead: true,
      isStarred: false,
      hasAttachment: false,
      threadId: 5,
      replyCount: 0,
      category: 'Policies'
    },
    {
      id: 6,
      subject: 'Training Schedule Update',
      content: 'Hi Sarah,\n\nI need to reschedule the compliance training session originally planned for this Thursday. Due to a conflict with the quarterly review meetings, I propose moving it to next Tuesday.\n\nThe new session details:\n- Date: January 23rd\n- Time: 2:00 PM - 4:00 PM\n- Location: Conference Room B\n- Topic: Data Privacy and Security\n\nPlease confirm if this works for everyone.\n\nThanks,\nRobert',
      type: 'inbox',
      priority: 'low',
      fromId: 7,
      fromName: 'Robert Brown',
      toIds: [1],
      toNames: ['Sarah Johnson'],
      sentAt: '2024-01-12 08:15:00',
      isRead: false,
      isStarred: false,
      hasAttachment: false,
      threadId: 6,
      replyCount: 0,
      category: 'Training'
    }
  ]);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.fromName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || message.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || message.priority === priorityFilter;
    
    return matchesSearch && matchesType && matchesPriority;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'inbox': return <Mail className="w-4 h-4 text-blue-500" />;
      case 'sent': return <Send className="w-4 h-4 text-green-500" />;
      case 'draft': return <Clock className="w-4 h-4 text-gray-500" />;
      default: return <Mail className="w-4 h-4 text-gray-500" />;
    }
  };

  const messageStats = {
    total: messages.length,
    inbox: messages.filter(m => m.type === 'inbox').length,
    sent: messages.filter(m => m.type === 'sent').length,
    drafts: messages.filter(m => m.type === 'draft').length,
    unread: messages.filter(m => !m.isRead && m.type === 'inbox').length,
    starred: messages.filter(m => m.isStarred).length
  };

  if (selectedMessage) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button
                onClick={() => setSelectedMessage(null)}
                className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{selectedMessage.subject}</h1>
                <p className="text-gray-600">Thread #{selectedMessage.threadId} • {selectedMessage.replyCount} replies</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getTypeIcon(selectedMessage.type)}
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(selectedMessage.priority)}`}>
                {selectedMessage.priority} priority
              </span>
              {selectedMessage.isStarred && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
            </div>
          </div>

          {/* Message Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Message Content */}
              <div className="lg:col-span-2">
                {/* Message Header */}
                <div className="border-b pb-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <ClickableEmployeeName employeeId={selectedMessage.fromId} employeeName={selectedMessage.fromName} className="font-semibold text-lg" />
                      <span className="ml-2 text-sm text-gray-500">({selectedMessage.type})</span>
                    </div>
                    <span className="text-sm text-gray-500">{selectedMessage.sentAt}</span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">To: </span>
                      <span className="text-gray-900">
                        {selectedMessage.toNames.map((name, index) => (
                          <span key={index}>
                            <ClickableEmployeeName 
                              employeeId={selectedMessage.toIds[index]} 
                              employeeName={name}
                              className="text-blue-600 hover:text-blue-800"
                            />
                            {index < selectedMessage.toNames.length - 1 && ', '}
                          </span>
                        ))}
                      </span>
                    </div>
                    {selectedMessage.ccNames && selectedMessage.ccNames.length > 0 && (
                      <div>
                        <span className="text-gray-600">CC: </span>
                        <span className="text-gray-900">
                          {selectedMessage.ccNames.map((name, index) => (
                            <span key={index}>
                              <ClickableEmployeeName 
                                employeeId={selectedMessage.ccIds![index]} 
                                employeeName={name}
                                className="text-blue-600 hover:text-blue-800"
                              />
                              {index < selectedMessage.ccNames!.length - 1 && ', '}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Body */}
                <div className="prose max-w-none mb-6">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {selectedMessage.content}
                  </div>
                </div>

                {/* Attachments */}
                {selectedMessage.hasAttachment && (
                  <div className="border-t pt-4 mb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Attachments</h3>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Paperclip className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">performance_review_q1.pdf</span>
                      <span className="text-xs text-gray-500 ml-2">(2.4 MB)</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Reply className="w-4 h-4 mr-2" />
                    Reply
                  </button>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Reply All
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                    <Send className="w-4 h-4 mr-2" />
                    Forward
                  </button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Message Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Message Info</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Category:</span>
                      <span className="ml-2 text-sm text-gray-900">{selectedMessage.category}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Thread ID:</span>
                      <span className="ml-2 text-sm text-gray-900">#{selectedMessage.threadId}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Recipients:</span>
                      <span className="ml-2 text-sm text-gray-900">{selectedMessage.toNames.length}</span>
                    </div>
                    {selectedMessage.readAt && (
                      <div>
                        <span className="text-sm text-gray-600">Read at:</span>
                        <span className="ml-2 text-sm text-gray-900">{selectedMessage.readAt}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-sm text-gray-600">Has attachment:</span>
                      <span className="ml-2 text-sm text-gray-900">
                        {selectedMessage.hasAttachment ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full bg-yellow-600 text-white px-3 py-2 rounded text-sm hover:bg-yellow-700 transition-colors flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      {selectedMessage.isStarred ? 'Unstar' : 'Star'}
                    </button>
                    <button className="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                      Mark as Unread
                    </button>
                    <button className="w-full bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-700 transition-colors">
                      Move to Folder
                    </button>
                    <button className="w-full bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>

                {/* Thread Messages */}
                {selectedMessage.replyCount > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Thread Messages</h3>
                    <div className="space-y-2">
                      <div className="text-xs text-gray-600 p-2 bg-white rounded border">
                        Reply from John Smith - 2 hours ago
                      </div>
                      <div className="text-xs text-gray-600 p-2 bg-white rounded border">
                        Reply from Emily Davis - 1 hour ago
                      </div>
                    </div>
                  </div>
                )}
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
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600 mt-1">Manage team communications and messages</p>
          </div>
          <button
            onClick={() => setShowComposeModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Compose
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-xl font-bold text-gray-900">{messageStats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Inbox</p>
                <p className="text-xl font-bold text-blue-600">{messageStats.inbox}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Send className="w-4 h-4 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Sent</p>
                <p className="text-xl font-bold text-green-600">{messageStats.sent}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-gray-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Drafts</p>
                <p className="text-xl font-bold text-gray-600">{messageStats.drafts}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-xl font-bold text-red-600">{messageStats.unread}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Starred</p>
                <p className="text-xl font-bold text-yellow-600">{messageStats.starred}</p>
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
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-3">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="inbox">Inbox</option>
                <option value="sent">Sent</option>
                <option value="draft">Drafts</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Messages Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From/To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMessages.map((message) => (
                  <tr key={message.id} className={`hover:bg-gray-50 transition-colors ${!message.isRead && message.type === 'inbox' ? 'bg-blue-50/30' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <div className={`text-sm font-medium ${!message.isRead && message.type === 'inbox' ? 'text-gray-900 font-semibold' : 'text-gray-900'}`}>
                              {message.subject}
                            </div>
                            {message.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current ml-2" />}
                            {message.hasAttachment && <Paperclip className="w-4 h-4 text-gray-400 ml-2" />}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs mt-1">
                            {message.content.substring(0, 100)}...
                          </div>
                          <div className="flex items-center mt-1">
                            <Reply className="w-4 h-4 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">{message.replyCount} replies</span>
                          </div>
                        </div>
                        {!message.isRead && message.type === 'inbox' && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getTypeIcon(message.type)}
                        <span className="ml-2 text-sm text-gray-900 capitalize">{message.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(message.priority)}`}>
                        {message.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ClickableEmployeeName employeeId={message.fromId} employeeName={message.fromName} />
                      {message.toNames.length > 1 && (
                        <span className="text-xs text-gray-500 block">+{message.toNames.length - 1} more</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {message.sentAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setSelectedMessage(message)}
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

export default MessageManagement;
