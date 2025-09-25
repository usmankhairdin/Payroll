import React, { useState, useContext } from 'react';
import { Bell, AlertTriangle, CheckCircle, Info, Trash2, Check, Filter, Search } from 'lucide-react';
import { AuthContext } from '../App';

interface Notification {
  id: number;
  type: 'warning' | 'success' | 'info';
  title: string;
  message: string;
  time: string;
  unread: boolean;
  category: string;
  priority: 'high' | 'medium' | 'low';
  actionRequired?: boolean;
}

const Notifications = () => {
  const { setCurrentView } = useContext(AuthContext);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'warning',
      title: 'Payroll Due Soon',
      message: 'Monthly payroll processing due in 2 days',
      time: '2 hours ago',
      unread: true,
      category: 'payroll',
      priority: 'high',
      actionRequired: true
    },
    {
      id: 2,
      type: 'success',
      title: 'Tax Filing Complete',
      message: 'March 2024 tax filing submitted successfully',
      time: '1 day ago',
      unread: true,
      category: 'tax',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'info',
      title: 'New Employee Added',
      message: 'Michael Chen has been added to the system',
      time: '2 days ago',
      unread: false,
      category: 'employee',
      priority: 'low'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Bank Details Missing',
      message: '5 employees need to update their bank details',
      time: '3 days ago',
      unread: false,
      category: 'banking',
      priority: 'high',
      actionRequired: true
    },
    {
      id: 5,
      type: 'info',
      title: 'System Maintenance Scheduled',
      message: 'Scheduled maintenance on Sunday, 2 AM - 4 AM',
      time: '1 week ago',
      unread: false,
      category: 'system',
      priority: 'medium'
    },
    {
      id: 6,
      type: 'success',
      title: 'Leave Request Approved',
      message: 'John Smith\'s leave request for April 15-19 has been approved',
      time: '1 week ago',
      unread: false,
      category: 'leave',
      priority: 'low'
    }
  ]);

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || notification.type === filterType || 
                         (filterType === 'unread' && notification.unread) ||
                         (filterType === 'action-required' && notification.actionRequired);
    
    return matchesSearch && matchesFilter;
  });

  const handleNotificationClick = (notification: Notification) => {
    // Navigate to specific detail page based on notification type/category
    switch (notification.category) {
      case 'payroll':
        setCurrentView('payroll');
        break;
      case 'tax':
        setCurrentView('tax');
        break;
      case 'employee':
        setCurrentView('employees');
        break;
      case 'banking':
        setCurrentView('banking');
        break;
      case 'leave':
        setCurrentView('leave');
        break;
      default:
        // For system notifications, show a detail modal or stay on notifications page
        break;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, unread: false } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, unread: false })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-400 bg-red-50/30';
      case 'medium': return 'border-l-yellow-400 bg-yellow-50/30';
      case 'low': return 'border-l-blue-400 bg-blue-50/30';
      default: return 'border-l-gray-400 bg-gray-50/30';
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired).length;

  return (
    <div className="p-6 min-h-full">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">
              {unreadCount} unread notifications
              {actionRequiredCount > 0 && `, ${actionRequiredCount} require action`}
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={markAllAsRead}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Check className="w-4 h-4 mr-2" />
              Mark All Read
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
                <option value="warning">Warnings</option>
                <option value="success">Success</option>
                <option value="info">Information</option>
                <option value="action-required">Action Required</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <Bell className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-orange-600">{unreadCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Action Required</p>
                <p className="text-2xl font-bold text-red-600">{actionRequiredCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <Filter className="w-8 h-8 text-emerald-600" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Filtered</p>
                <p className="text-2xl font-bold text-emerald-600">{filteredNotifications.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 transition-all duration-200 border-l-4 cursor-pointer ${
                    notification.unread ? getPriorityColor(notification.priority) : 'border-l-gray-200 bg-white'
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {notification.unread && (
                              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                            )}
                            {notification.actionRequired && (
                              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                Action Required
                              </span>
                            )}
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                              notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {notification.priority}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">{notification.time}</p>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {notification.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {notification.unread && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete notification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
