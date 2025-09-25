import React, { useState, createContext, useContext } from 'react';
import { Users, FileText, Settings as SettingsIcon, Bell, Menu, X, ChevronDown, Home, Building, Calculator, BarChart3, UserCog, LogOut, Shield, Clock, CreditCard, HelpCircle, BookOpen, AlertTriangle, CheckCircle, Info, MessageCircle } from 'lucide-react';
import Dashboard from './components/Dashboard';
import EmployeeManagement from './components/EmployeeManagement';
import PayrollManagement from './components/PayrollManagement';
import PayslipManagement from './components/PayslipManagement';
import Reports from './components/Reports';
import Settings from './components/Settings';
import LeaveManagement from './components/LeaveManagement';
import TaxCompliance from './components/TaxCompliance';
import BankingIntegration from './components/BankingIntegration';
import AuditLogs from './components/AuditLogs';
import HelpSupport from './components/HelpSupport';
import UserProfile from './components/UserProfile';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Notifications from './components/Notifications';
import Communication from './components/Communication';
import Footer from './components/Footer';

// Auth Context
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  setCurrentView: (view: string) => void;
  showEmployeeProfile: (employeeId: number) => void;
  logout: () => void;
}>({
  user: null,
  setUser: () => {},
  setCurrentView: () => {},
  showEmployeeProfile: () => {},
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

// Sample user data
const sampleUser: User = {
  id: 1,
  name: 'Sarah Johnson',
  email: 'sarah.johnson@company.com',
  role: 'Admin',
  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
};

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(sampleUser);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

  const logout = () => {
    setUser(null);
    handleViewChange('dashboard');
  };

  const showEmployeeProfile = (employeeId: number) => {
    setSelectedEmployeeId(employeeId);
    setCurrentView('employees');
  };

  // Clear selected employee when changing views (except to employees)
  const handleViewChange = (view: string) => {
    if (view !== 'employees') {
      setSelectedEmployeeId(null);
    }
    setCurrentView(view);
  };

  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'Payroll Due Soon',
      message: 'Monthly payroll processing due in 2 days',
      time: '2 hours ago',
      unread: true,
      category: 'payroll'
    },
    {
      id: 2,
      type: 'success',
      title: 'Tax Filing Complete',
      message: 'March 2024 tax filing submitted successfully',
      time: '1 day ago',
      unread: true,
      category: 'tax'
    },
    {
      id: 3,
      type: 'info',
      title: 'New Employee Added',
      message: 'Michael Chen has been added to the system',
      time: '2 days ago',
      unread: false,
      category: 'employee'
    },
    {
      id: 4,
      type: 'warning',
      title: 'Bank Details Missing',
      message: '5 employees need to update their bank details',
      time: '3 days ago',
      unread: false,
      category: 'banking'
    }
  ];

  const handleNotificationClick = (notification: any) => {
    setNotificationOpen(false);

    // Navigate to specific page based on notification category
    switch (notification.category) {
      case 'payroll':
        handleViewChange('payroll');
        break;
      case 'tax':
        handleViewChange('tax');
        break;
      case 'employee':
        handleViewChange('employees');
        break;
      case 'banking':
        handleViewChange('banking');
        break;
      default:
        handleViewChange('notifications');
        break;
    }
  };
  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'employees', name: 'Employees', icon: Users },
    { id: 'payroll', name: 'Payroll', icon: Calculator },
    { id: 'payslips', name: 'Payslips', icon: FileText },
    { id: 'leave', name: 'Leave & Attendance', icon: Clock },
    { id: 'tax', name: 'Tax & Compliance', icon: Shield },
    { id: 'banking', name: 'Banking', icon: CreditCard },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
    { id: 'communication', name: 'Communication', icon: MessageCircle },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'audit', name: 'Audit Logs', icon: BookOpen },
    { id: 'settings', name: 'Settings', icon: SettingsIcon },
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return <EmployeeManagement selectedEmployeeId={selectedEmployeeId} />;
      case 'payroll':
        return <PayrollManagement />;
      case 'payslips':
        return <PayslipManagement />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      case 'leave':
        return <LeaveManagement />;
      case 'tax':
        return <TaxCompliance />;
      case 'banking':
        return <BankingIntegration />;
      case 'audit':
        return <AuditLogs />;
      case 'help':
        return <HelpSupport />;
      case 'profile':
        return <UserProfile />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <TermsOfService />;
      case 'communication':
        return <Communication />;
      case 'notifications':
        return <Notifications />;
      default:
        return <Dashboard />;
    }
  };


  return (
    <AuthContext.Provider value={{ user, setUser, setCurrentView: handleViewChange, showEmployeeProfile, logout }}>
      <div className="h-screen bg-gray-50 flex overflow-hidden">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700/50">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-200">
                <Building className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">PayrollPro</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="mt-8 px-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleViewChange(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`group w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 ${
                      currentView === item.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg'
                        : 'text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/50'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 transition-all duration-200 ${currentView === item.id ? 'text-blue-400' : 'group-hover:text-blue-400'}`} />
                    {item.name}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 shadow-2xl border-b border-slate-700/50 backdrop-blur-sm relative z-50">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-600 transition-all duration-200 transform hover:scale-110"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <h1 className="ml-4 lg:ml-0 text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent capitalize">
                  {currentView}
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative z-50">
                  <button
                    onClick={() => setNotificationOpen(!notificationOpen)}
                    className="relative p-2 text-slate-300 hover:text-blue-300 hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/50 rounded-full transition-all duration-200 transform hover:scale-110"
                  >
                  <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
                  </button>

                  {notificationOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl py-2 z-[9999] border border-gray-200/50 animate-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => {
                          const getIcon = () => {
                            switch (notification.type) {
                              case 'warning': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
                              case 'success': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
                              case 'info': return <Info className="w-4 h-4 text-blue-500" />;
                              default: return <Bell className="w-4 h-4 text-gray-500" />;
                            }
                          };

                          return (
                            <div
                              key={notification.id}
                              onClick={() => handleNotificationClick(notification)}
                              className={`px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 border-l-4 cursor-pointer ${
                                notification.unread ? 'bg-blue-50/30 border-blue-400' : 'border-transparent'
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-1">
                                  {getIcon()}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                    {notification.unread && (
                                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="px-4 py-3 border-t border-gray-200">
                        <button
                          onClick={() => {
                            handleViewChange('notifications');
                            setNotificationOpen(false);
                          }}
                          className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View All Notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative z-50">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/50 transition-all duration-200 transform hover:scale-105"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-300/50 hover:ring-blue-300 transition-all duration-200"
                    />
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-white">{user?.name}</p>
                      <p className="text-xs text-slate-300">{user?.role}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-300" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl py-2 z-[9999] border border-gray-200/50 animate-in slide-in-from-top-2 duration-200">
                      <button
                        onClick={() => {
                          handleViewChange('profile');
                          setUserMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 transition-all duration-200"
                      >
                        <UserCog className="mr-3 h-4 w-4" />
                        Profile Settings
                      </button>
                      <button
                        onClick={() => {
                          handleViewChange('help');
                          setUserMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 transition-all duration-200"
                      >
                        <HelpCircle className="mr-3 h-4 w-4" />
                        Help & Support
                      </button>
                      <hr className="my-1 border-gray-200" />
                      <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 transition-all duration-200"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-100 via-blue-100/30 to-purple-100/30 min-h-0">
            {renderCurrentView()}
          </main>
        </div>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
