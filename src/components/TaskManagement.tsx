import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, CheckSquare, Clock, User, Calendar, ArrowLeft, Tag } from 'lucide-react';
import ClickableEmployeeName from './ClickableEmployeeName';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  assignedTo: number;
  assignedToName: string;
  createdBy: number;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  completedAt?: string;
  estimatedHours?: number;
  actualHours?: number;
  tags: string[];
  subtasks: { id: number; title: string; completed: boolean }[];
}

const TaskManagement = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Update Employee Handbook',
      description: 'Review and update the employee handbook to include new remote work policies and benefits information.',
      status: 'in-progress',
      priority: 'high',
      category: 'Documentation',
      assignedTo: 2,
      assignedToName: 'John Smith',
      createdBy: 1,
      createdByName: 'Sarah Johnson',
      createdAt: '2024-01-10 09:00:00',
      updatedAt: '2024-01-15 14:30:00',
      dueDate: '2024-01-25',
      estimatedHours: 16,
      actualHours: 8,
      tags: ['handbook', 'policies', 'remote-work'],
      subtasks: [
        { id: 1, title: 'Review current handbook', completed: true },
        { id: 2, title: 'Draft remote work section', completed: true },
        { id: 3, title: 'Update benefits section', completed: false },
        { id: 4, title: 'Legal review', completed: false },
        { id: 5, title: 'Final approval', completed: false }
      ]
    },
    {
      id: 2,
      title: 'Implement New Payroll Software Integration',
      description: 'Set up integration between the new payroll software and existing HR systems to automate data synchronization.',
      status: 'todo',
      priority: 'urgent',
      category: 'Technical',
      assignedTo: 3,
      assignedToName: 'Emily Davis',
      createdBy: 1,
      createdByName: 'Sarah Johnson',
      createdAt: '2024-01-12 11:30:00',
      updatedAt: '2024-01-12 11:30:00',
      dueDate: '2024-01-22',
      estimatedHours: 40,
      tags: ['payroll', 'integration', 'automation'],
      subtasks: [
        { id: 1, title: 'API documentation review', completed: false },
        { id: 2, title: 'Test environment setup', completed: false },
        { id: 3, title: 'Data mapping', completed: false },
        { id: 4, title: 'Integration development', completed: false },
        { id: 5, title: 'Testing and validation', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Conduct Q1 Performance Reviews',
      description: 'Complete performance reviews for all team members in the HR department.',
      status: 'review',
      priority: 'medium',
      category: 'HR Process',
      assignedTo: 5,
      assignedToName: 'David Wilson',
      createdBy: 1,
      createdByName: 'Sarah Johnson',
      createdAt: '2024-01-08 08:00:00',
      updatedAt: '2024-01-14 16:45:00',
      dueDate: '2024-01-31',
      estimatedHours: 20,
      actualHours: 15,
      tags: ['performance', 'reviews', 'q1'],
      subtasks: [
        { id: 1, title: 'Schedule review meetings', completed: true },
        { id: 2, title: 'Prepare review templates', completed: true },
        { id: 3, title: 'Conduct individual reviews', completed: true },
        { id: 4, title: 'Compile review summaries', completed: false },
        { id: 5, title: 'Submit to management', completed: false }
      ]
    },
    {
      id: 4,
      title: 'Organize Team Building Event',
      description: 'Plan and organize a team building event for the entire company to improve collaboration and morale.',
      status: 'completed',
      priority: 'low',
      category: 'Event Planning',
      assignedTo: 6,
      assignedToName: 'Lisa Anderson',
      createdBy: 4,
      createdByName: 'Michael Chen',
      createdAt: '2024-01-05 10:15:00',
      updatedAt: '2024-01-13 17:00:00',
      dueDate: '2024-01-15',
      completedAt: '2024-01-13 17:00:00',
      estimatedHours: 25,
      actualHours: 22,
      tags: ['team-building', 'event', 'morale'],
      subtasks: [
        { id: 1, title: 'Survey team preferences', completed: true },
        { id: 2, title: 'Research venues', completed: true },
        { id: 3, title: 'Book venue and catering', completed: true },
        { id: 4, title: 'Send invitations', completed: true },
        { id: 5, title: 'Coordinate logistics', completed: true }
      ]
    },
    {
      id: 5,
      title: 'Update Compliance Training Materials',
      description: 'Review and update all compliance training materials to meet the latest regulatory requirements.',
      status: 'todo',
      priority: 'medium',
      category: 'Compliance',
      assignedTo: 7,
      assignedToName: 'Robert Brown',
      createdBy: 1,
      createdByName: 'Sarah Johnson',
      createdAt: '2024-01-14 13:20:00',
      updatedAt: '2024-01-14 13:20:00',
      dueDate: '2024-02-01',
      estimatedHours: 30,
      tags: ['compliance', 'training', 'regulations'],
      subtasks: [
        { id: 1, title: 'Review current materials', completed: false },
        { id: 2, title: 'Research regulatory changes', completed: false },
        { id: 3, title: 'Update content', completed: false },
        { id: 4, title: 'Legal review', completed: false },
        { id: 5, title: 'Upload to LMS', completed: false }
      ]
    }
  ]);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedToName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'todo': return <Clock className="w-4 h-4 text-gray-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'review': return <Eye className="w-4 h-4 text-yellow-500" />;
      case 'completed': return <CheckSquare className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
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

  const getProgressPercentage = (subtasks: any[]) => {
    if (subtasks.length === 0) return 0;
    const completed = subtasks.filter(st => st.completed).length;
    return Math.round((completed / subtasks.length) * 100);
  };

  const taskStats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    review: tasks.filter(t => t.status === 'review').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed').length
  };

  if (selectedTask) {
    const progress = getProgressPercentage(selectedTask.subtasks);
    
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button
                onClick={() => setSelectedTask(null)}
                className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Task #{selectedTask.id}</h1>
                <p className="text-gray-600">Created by <ClickableEmployeeName employeeId={selectedTask.createdBy} employeeName={selectedTask.createdByName} /> on {selectedTask.createdAt}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(selectedTask.status)}
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTask.status)}`}>
                {selectedTask.status.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Task Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{selectedTask.title}</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">{selectedTask.description}</p>
                
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">Progress</h3>
                    <span className="text-sm text-gray-600">{progress}% complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Subtasks */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Subtasks ({selectedTask.subtasks.filter(st => st.completed).length}/{selectedTask.subtasks.length})</h3>
                  <div className="space-y-2">
                    {selectedTask.subtasks.map((subtask) => (
                      <div key={subtask.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <input
                          type="checkbox"
                          checked={subtask.completed}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          readOnly
                        />
                        <span className={`ml-3 text-sm ${subtask.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                          {subtask.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                {selectedTask.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTask.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Details</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Priority:</span>
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(selectedTask.priority)}`}>
                        {selectedTask.priority}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Category:</span>
                      <span className="ml-2 text-sm text-gray-900">{selectedTask.category}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Assigned to:</span>
                      <div className="mt-1">
                        <ClickableEmployeeName employeeId={selectedTask.assignedTo} employeeName={selectedTask.assignedToName} />
                      </div>
                    </div>
                    {selectedTask.dueDate && (
                      <div>
                        <span className="text-sm text-gray-600">Due date:</span>
                        <span className="ml-2 text-sm text-gray-900">{selectedTask.dueDate}</span>
                      </div>
                    )}
                    {selectedTask.estimatedHours && (
                      <div>
                        <span className="text-sm text-gray-600">Estimated:</span>
                        <span className="ml-2 text-sm text-gray-900">{selectedTask.estimatedHours}h</span>
                      </div>
                    )}
                    {selectedTask.actualHours && (
                      <div>
                        <span className="text-sm text-gray-600">Actual:</span>
                        <span className="ml-2 text-sm text-gray-900">{selectedTask.actualHours}h</span>
                      </div>
                    )}
                    <div>
                      <span className="text-sm text-gray-600">Last updated:</span>
                      <span className="ml-2 text-sm text-gray-900">{selectedTask.updatedAt}</span>
                    </div>
                    {selectedTask.completedAt && (
                      <div>
                        <span className="text-sm text-gray-600">Completed:</span>
                        <span className="ml-2 text-sm text-gray-900">{selectedTask.completedAt}</span>
                      </div>
                    )}
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
                      Reassign Task
                    </button>
                    <button className="w-full bg-orange-600 text-white px-3 py-2 rounded text-sm hover:bg-orange-700 transition-colors">
                      Change Priority
                    </button>
                    <button className="w-full bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors">
                      Add Comment
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
            <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
            <p className="text-gray-600 mt-1">Manage and track team tasks</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckSquare className="w-4 h-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-xl font-bold text-gray-900">{taskStats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-gray-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">To Do</p>
                <p className="text-xl font-bold text-gray-600">{taskStats.todo}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-xl font-bold text-blue-600">{taskStats.inProgress}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Eye className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Review</p>
                <p className="text-xl font-bold text-yellow-600">{taskStats.review}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckSquare className="w-4 h-4 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-bold text-green-600">{taskStats.completed}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-xl font-bold text-red-600">{taskStats.overdue}</p>
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
                placeholder="Search tasks..."
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
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="completed">Completed</option>
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

        {/* Tasks Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
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
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTasks.map((task) => {
                  const progress = getProgressPercentage(task.subtasks);
                  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';
                  
                  return (
                    <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">#{task.id} {task.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{task.description}</div>
                          <div className="flex items-center mt-1">
                            <CheckSquare className="w-4 h-4 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">{task.subtasks.length} subtasks</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(task.status)}
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {task.status.replace('-', ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ClickableEmployeeName employeeId={task.assignedTo} employeeName={task.assignedToName} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                          {task.dueDate || 'No due date'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setSelectedTask(task)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
