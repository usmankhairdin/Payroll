import React, { useContext } from 'react';
import { ArrowLeft, Bell, Clock, User, CheckCircle, AlertTriangle, Info, ExternalLink } from 'lucide-react';
import { AuthContext } from '../App';

interface NotificationDetailProps {
  notificationId?: number;
  category?: string;
}

const NotificationDetail: React.FC<NotificationDetailProps> = ({ notificationId, category }) => {
  const { setCurrentView } = useContext(AuthContext);

  // Mock notification data - in a real app, this would come from an API
  const getNotificationDetail = (id: number | undefined, cat: string | undefined) => {
    if (cat === 'payroll' || id === 1) {
      return {
        id: 1,
        type: 'warning',
        title: 'Payroll Due Soon',
        message: 'Monthly payroll processing due in 2 days',
        fullDescription: 'The monthly payroll for March 2024 is scheduled to be processed in 2 days. Please ensure all employee timesheets are submitted and reviewed before the deadline.',
        time: '2 hours ago',
        category: 'payroll',
        priority: 'high',
        actionRequired: true,
        deadline: '2024-04-03 17:00:00',
        affectedEmployees: 247,
        estimatedAmount: '$124,500',
        steps: [
          'Review all employee timesheets',
          'Verify overtime calculations',
          'Process salary adjustments',
          'Generate payroll reports',
          'Submit for final approval'
        ],
        relatedItems: [
          { title: 'Employee Timesheets', view: 'leave' },
          { title: 'Payroll Settings', view: 'payroll' },
          { title: 'Tax Calculations', view: 'tax' }
        ]
      };
    } else if (cat === 'tax' || id === 2) {
      return {
        id: 2,
        type: 'success',
        title: 'Tax Filing Complete',
        message: 'March 2024 tax filing submitted successfully',
        fullDescription: 'The tax filing for March 2024 has been successfully submitted to the tax authorities. All required documents and calculations have been processed.',
        time: '1 day ago',
        category: 'tax',
        priority: 'medium',
        actionRequired: false,
        confirmationNumber: 'TX-2024-MAR-001',
        filingDate: '2024-04-01 14:30:00',
        totalTaxAmount: '$18,750',
        steps: [
          'Collected employee tax data ✓',
          'Calculated tax liabilities ✓',
          'Generated tax forms ✓',
          'Submitted to tax authority ✓',
          'Received confirmation ✓'
        ],
        relatedItems: [
          { title: 'Tax Reports', view: 'tax' },
          { title: 'Employee Tax Documents', view: 'employees' },
          { title: 'Compliance Dashboard', view: 'tax' }
        ]
      };
    } else if (cat === 'employee' || id === 3) {
      return {
        id: 3,
        type: 'info',
        title: 'New Employee Added',
        message: 'Michael Chen has been added to the system',
        fullDescription: 'A new employee, Michael Chen, has been successfully added to the PayrollPro system. Please ensure all required documentation is collected and onboarding tasks are completed.',
        time: '2 days ago',
        category: 'employee',
        priority: 'low',
        actionRequired: true,
        employeeName: 'Michael Chen',
        employeeId: 'EMP003',
        department: 'Sales',
        startDate: '2024-04-01',
        steps: [
          'Employee profile created ✓',
          'Collect ID documents',
          'Setup bank details',
          'Assign to department',
          'Complete onboarding checklist'
        ],
        relatedItems: [
          { title: 'Employee Profile', view: 'employees' },
          { title: 'Onboarding Checklist', view: 'employees' },
          { title: 'Department Management', view: 'employees' }
        ]
      };
    } else if (cat === 'banking' || id === 4) {
      return {
        id: 4,
        type: 'warning',
        title: 'Bank Details Missing',
        message: '5 employees need to update their bank details',
        fullDescription: 'Several employees have missing or incomplete bank account information which will prevent payroll processing. Please contact these employees to update their banking details.',
        time: '3 days ago',
        category: 'banking',
        priority: 'high',
        actionRequired: true,
        affectedEmployees: 5,
        employeeList: ['John Doe', 'Jane Smith', 'Alex Wilson', 'Maria Garcia', 'David Brown'],
        deadline: '2024-04-05',
        steps: [
          'Identify employees with missing bank details ✓',
          'Send notification emails',
          'Follow up with phone calls',
          'Collect updated bank information',
          'Verify account details'
        ],
        relatedItems: [
          { title: 'Employee Banking', view: 'banking' },
          { title: 'Payroll Settings', view: 'payroll' },
          { title: 'Employee Management', view: 'employees' }
        ]
      };
    }

    // Default notification if not found
    return {
      id: 0,
      type: 'info',
      title: 'Notification Not Found',
      message: 'The requested notification could not be found.',
      fullDescription: 'This notification may have been deleted or moved.',
      time: 'Unknown',
      category: 'system',
      priority: 'low',
      actionRequired: false,
      steps: [],
      relatedItems: []
    };
  };

  const notification = getNotificationDetail(notificationId, category);

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-8 h-8 text-orange-500" />;
      case 'success': return <CheckCircle className="w-8 h-8 text-emerald-500" />;
      case 'info': return <Info className="w-8 h-8 text-blue-500" />;
      default: return <Bell className="w-8 h-8 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-blue-100 text-blue-800'
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  return (
    <div className="p-6 min-h-full">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentView('notifications')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Notifications
          </button>
        </div>

        {/* Notification Detail Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className={`p-6 border-l-4 ${
            notification.type === 'warning' ? 'border-orange-400 bg-orange-50' :
            notification.type === 'success' ? 'border-emerald-400 bg-emerald-50' :
            'border-blue-400 bg-blue-50'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                {getIcon(notification.type)}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{notification.title}</h1>
                  <p className="text-gray-600 mb-3">{notification.fullDescription}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {notification.time}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(notification.priority)}`}>
                      {notification.priority.toUpperCase()} PRIORITY
                    </span>
                    {notification.actionRequired && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        ACTION REQUIRED
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Key Information */}
                {(notification.deadline || notification.affectedEmployees || notification.estimatedAmount) && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Key Information</h3>
                    <div className="space-y-2">
                      {notification.deadline && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Deadline:</span>
                          <span className="font-medium">{new Date(notification.deadline).toLocaleString()}</span>
                        </div>
                      )}
                      {notification.affectedEmployees && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Affected Employees:</span>
                          <span className="font-medium">{notification.affectedEmployees}</span>
                        </div>
                      )}
                      {notification.estimatedAmount && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-medium">{notification.estimatedAmount}</span>
                        </div>
                      )}
                      {notification.confirmationNumber && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Confirmation #:</span>
                          <span className="font-medium">{notification.confirmationNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Steps */}
                {notification.steps && notification.steps.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      {notification.type === 'success' ? 'Completed Steps' : 'Required Steps'}
                    </h3>
                    <div className="space-y-2">
                      {notification.steps.map((step, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            step.includes('✓') ? 'bg-emerald-500 text-white' : 'bg-gray-300 text-gray-600'
                          }`}>
                            {step.includes('✓') ? '✓' : index + 1}
                          </div>
                          <span className={step.includes('✓') ? 'text-gray-600 line-through' : 'text-gray-900'}>
                            {step.replace(' ✓', '')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Employee List */}
                {notification.employeeList && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Affected Employees</h3>
                    <div className="space-y-2">
                      {notification.employeeList.map((employee, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <User className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900">{employee}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={() => setCurrentView(notification.category)}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Go to {notification.category.charAt(0).toUpperCase() + notification.category.slice(1)}
                    </button>
                    <button className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                      Mark as Read
                    </button>
                    <button className="w-full bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors">
                      Delete Notification
                    </button>
                  </div>
                </div>

                {/* Related Items */}
                {notification.relatedItems && notification.relatedItems.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Related</h3>
                    <div className="space-y-2">
                      {notification.relatedItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentView(item.view)}
                          className="w-full flex items-center justify-between p-2 text-left text-gray-700 hover:bg-white hover:shadow-sm rounded transition-all"
                        >
                          <span className="text-sm">{item.title}</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetail;
