import React, { useState } from 'react';
import { Ticket, CheckSquare, Bell, Mail } from 'lucide-react';
import TicketManagement from './TicketManagement';
import TaskManagement from './TaskManagement';
import MessageManagement from './MessageManagement';
import Notifications from './Notifications';

const Communication = () => {
  const [activeTab, setActiveTab] = useState('tickets');

  const tabs = [
    { id: 'tickets', name: 'Tickets', icon: Ticket, component: TicketManagement },
    { id: 'tasks', name: 'Tasks', icon: CheckSquare, component: TaskManagement },
    { id: 'notifications', name: 'Notifications', icon: Bell, component: Notifications },
    { id: 'messages', name: 'Messages', icon: Mail, component: MessageManagement },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || TicketManagement;

  return (
    <div className="p-6 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Communication</h1>
          <p className="text-gray-600 mt-1">Manage tickets, tasks, notifications, and messages</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`-ml-0.5 mr-2 h-5 w-5 ${
                      activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[600px]">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
};

export default Communication;
