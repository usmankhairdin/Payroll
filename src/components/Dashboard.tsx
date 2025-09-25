import React, { useContext, useState } from 'react';
import { Users, DollarSign, Calendar, AlertTriangle, TrendingUp, TrendingDown, FileText, Plus, Play, BarChart3, Clock, Shield, CreditCard, Target, Activity, UserCheck, Gift } from 'lucide-react';
import { AuthContext } from '../App';

const Dashboard = () => {
  const { setCurrentView } = useContext(AuthContext);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const overviewCards = [
    {
      title: 'Total Employees',
      value: '247',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Payroll Expense',
      value: '$124,500',
      change: '+8.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'emerald'
    },
    {
      title: 'Upcoming Payroll',
      value: '3 days',
      change: 'On track',
      trend: 'neutral',
      icon: Calendar,
      color: 'orange'
    },
    {
      title: 'Tax Summary',
      value: '$18,750',
      change: '+3.1%',
      trend: 'up',
      icon: FileText,
      color: 'purple'
    }
  ];

  const additionalKpis = [
    {
      title: 'Average Salary',
      value: '$72,450',
      change: '+4.2%',
      trend: 'up',
      icon: Target,
      color: 'blue',
      description: 'Company-wide average'
    },
    {
      title: 'Attendance Rate',
      value: '96.8%',
      change: '+2.1%',
      trend: 'up',
      icon: UserCheck,
      color: 'emerald',
      description: 'This month'
    },
    {
      title: 'Employee Turnover',
      value: '3.2%',
      change: '-1.5%',
      trend: 'down',
      icon: Activity,
      color: 'red',
      description: 'Annual rate'
    },
    {
      title: 'Benefits Cost',
      value: '$28,900',
      change: '+6.8%',
      trend: 'up',
      icon: Shield,
      color: 'purple',
      description: 'Monthly total'
    },
    {
      title: 'Overtime Hours',
      value: '1,247',
      change: '-8.3%',
      trend: 'down',
      icon: Clock,
      color: 'orange',
      description: 'This month'
    },
    {
      title: 'Direct Deposits',
      value: '98.4%',
      change: '+1.2%',
      trend: 'up',
      icon: CreditCard,
      color: 'cyan',
      description: 'Payment method'
    },
    {
      title: 'Performance Bonus',
      value: '$15,600',
      change: '+12.4%',
      trend: 'up',
      icon: Gift,
      color: 'amber',
      description: 'Quarterly total'
    },
    {
      title: 'Leave Requests',
      value: '23',
      change: '+5 pending',
      trend: 'neutral',
      icon: Calendar,
      color: 'indigo',
      description: 'This week'
    }
  ];

  const alerts = [
    { type: 'warning', message: '5 employees pending bank details verification', urgent: true },
    { type: 'info', message: 'Tax filing deadline in 15 days', urgent: false },
    { type: 'success', message: 'Payroll for March completed successfully', urgent: false }
  ];

  const quickActions = [
    { name: 'Run Payroll', icon: Play, color: 'blue' },
    { name: 'Add Employee', icon: Plus, color: 'emerald' },
    { name: 'Generate Report', icon: FileText, color: 'orange' },
    { name: 'Tax Compliance', icon: Shield, color: 'purple' },
    { name: 'Banking Setup', icon: CreditCard, color: 'indigo' }
  ];



  return (
    <div className="page-container">
      <div className="page-content p-6 space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, index) => {
          const Icon = card.icon;
          const TrendIcon = card.trend === 'up' ? TrendingUp : card.trend === 'down' ? TrendingDown : null;
          
          const handleCardClick = () => {
            switch (card.title) {
              case 'Total Employees':
                setCurrentView('employees');
                break;
              case 'Payroll Expense':
                setCurrentView('payroll');
                break;
              case 'Upcoming Payroll':
                setCurrentView('payroll');
                break;
              case 'Tax Summary':
                setCurrentView('tax');
                break;
              default:
                break;
            }
          };

          const getCardGradient = (color: string) => {
            switch (color) {
              case 'blue':
                return 'bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700';
              case 'emerald':
                return 'bg-gradient-to-br from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700';
              case 'orange':
                return 'bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700';
              case 'purple':
                return 'bg-gradient-to-br from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700';
              default:
                return 'bg-gradient-to-br from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700';
            }
          };

          return (
            <button 
              key={index} 
              onClick={handleCardClick}
              className={`${getCardGradient(card.color)} backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer text-left w-full`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {TrendIcon && (
                  <TrendIcon className={`w-4 h-4 ${card.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`} />
                )}
              </div>
              
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">{card.value}</h3>
                <p className="text-sm text-white/80">{card.title}</p>
                <p className={`text-xs mt-1 ${
                  card.trend === 'up' ? 'text-white/90' : 
                  card.trend === 'down' ? 'text-white/90' : 'text-white/70'
                }`}>
                  {card.change} from last month
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Additional KPIs Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Key Performance Indicators
          </h2>
          <button 
            onClick={() => setCurrentView('reports')}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center group"
          >
            View Detailed Reports
            <BarChart3 className="w-4 h-4 ml-1 group-hover:scale-110 transition-transform duration-200" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalKpis.map((kpi, index) => {
            const Icon = kpi.icon;
            const TrendIcon = kpi.trend === 'up' ? TrendingUp : kpi.trend === 'down' ? TrendingDown : null;
            
            const getKpiStyle = (color: string) => {
              switch (color) {
                case 'blue':
                  return 'border border-blue-500 bg-gradient-to-r from-blue-50 via-white to-blue-50/30';
                case 'emerald':
                  return 'border border-emerald-500 bg-gradient-to-r from-emerald-50 via-white to-emerald-50/30';
                case 'red':
                  return 'border border-red-500 bg-gradient-to-r from-red-50 via-white to-red-50/30';
                case 'purple':
                  return 'border border-purple-500 bg-gradient-to-r from-purple-50 via-white to-purple-50/30';
                case 'orange':
                  return 'border border-orange-500 bg-gradient-to-r from-orange-50 via-white to-orange-50/30';
                case 'indigo':
                  return 'border border-indigo-500 bg-gradient-to-r from-indigo-50 via-white to-indigo-50/30';
                case 'cyan':
                  return 'border border-cyan-500 bg-gradient-to-r from-cyan-50 via-white to-cyan-50/30';
                case 'amber':
                  return 'border border-amber-500 bg-gradient-to-r from-amber-50 via-white to-amber-50/30';
                default:
                  return 'border border-gray-500 bg-gradient-to-r from-gray-50 via-white to-gray-50/30';
              }
            };
            
            const getHoverStyle = (color: string) => {
              switch (color) {
                case 'blue':
                  return 'hover:from-blue-100 hover:via-blue-50 hover:to-blue-100 hover:border-blue-600';
                case 'emerald':
                  return 'hover:from-emerald-100 hover:via-emerald-50 hover:to-emerald-100 hover:border-emerald-600';
                case 'red':
                  return 'hover:from-red-100 hover:via-red-50 hover:to-red-100 hover:border-red-600';
                case 'purple':
                  return 'hover:from-purple-100 hover:via-purple-50 hover:to-purple-100 hover:border-purple-600';
                case 'orange':
                  return 'hover:from-orange-100 hover:via-orange-50 hover:to-orange-100 hover:border-orange-600';
                case 'indigo':
                  return 'hover:from-indigo-100 hover:via-indigo-50 hover:to-indigo-100 hover:border-indigo-600';
                case 'cyan':
                  return 'hover:from-cyan-100 hover:via-cyan-50 hover:to-cyan-100 hover:border-cyan-600';
                case 'amber':
                  return 'hover:from-amber-100 hover:via-amber-50 hover:to-amber-100 hover:border-amber-600';
                default:
                  return 'hover:from-gray-100 hover:via-gray-50 hover:to-gray-100 hover:border-gray-600';
              }
            };

            const getIconBackground = (color: string) => {
              switch (color) {
                case 'blue':
                  return 'bg-gradient-to-br from-blue-400 to-blue-600';
                case 'emerald':
                  return 'bg-gradient-to-br from-emerald-400 to-emerald-600';
                case 'red':
                  return 'bg-gradient-to-br from-red-400 to-red-600';
                case 'purple':
                  return 'bg-gradient-to-br from-purple-400 to-purple-600';
                case 'orange':
                  return 'bg-gradient-to-br from-orange-400 to-orange-600';
                case 'indigo':
                  return 'bg-gradient-to-br from-indigo-400 to-indigo-600';
                case 'cyan':
                  return 'bg-gradient-to-br from-cyan-400 to-cyan-600';
                case 'amber':
                  return 'bg-gradient-to-br from-amber-400 to-amber-600';
                default:
                  return 'bg-gradient-to-br from-gray-400 to-gray-600';
              }
            };
            
            return (
              <div
                key={index}
                className={`${getKpiStyle(kpi.color)} ${getHoverStyle(kpi.color)} rounded-xl p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 group relative overflow-hidden`}
              >
                {/* Background decoration */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-${kpi.color}-100 to-${kpi.color}-200 rounded-full opacity-20 transform translate-x-8 -translate-y-8`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${getIconBackground(kpi.color)} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    {TrendIcon && (
                      <div className="flex items-center space-x-1">
                        <TrendIcon className={`w-4 h-4 ${kpi.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`} />
                        <span className={`text-xs font-semibold ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                          {kpi.change}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                      {kpi.value}
                    </h3>
                    <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                      {kpi.title}
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {kpi.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Payroll Trends - Full Width */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Payroll Trends</h2>
        <div className="h-80 bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-xl p-6 relative">
          {/* Chart Container */}
          <div className="relative h-full">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4">
              <span>$130K</span>
              <span>$125K</span>
              <span>$120K</span>
              <span>$115K</span>
              <span>$110K</span>
            </div>
            
            {/* Chart area */}
            <div className="ml-12 h-full relative">
              {/* Grid lines */}
              <div className="absolute inset-0">
                {[0, 25, 50, 75, 100].map((percent) => (
                  <div 
                    key={percent}
                    className="absolute w-full border-t border-gray-200/50"
                    style={{ top: `${percent}%` }}
                  />
                ))}
              </div>
              
              {/* Data visualization */}
              <div className="relative w-full h-full">
                <svg className="w-full h-full" viewBox="0 0 1100 240" preserveAspectRatio="none">
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
                    <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#EC4899" stopOpacity="0.1"/>
                  </linearGradient>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6"/>
                    <stop offset="50%" stopColor="#8B5CF6"/>
                    <stop offset="100%" stopColor="#EC4899"/>
                  </linearGradient>
                </defs>
                
                {/* Area fill */}
                <path
                  d="M 0 120 Q 50 140 100 100 T 200 80 T 300 90 T 400 110 T 500 60 T 600 85 T 700 95 T 800 75 T 900 105 T 1000 70 T 1100 65 L 1100 240 L 0 240 Z"
                  fill="url(#areaGradient)"
                  className="transition-all duration-1000"
                />
                
                {/* Main line */}
                <path
                  d="M 0 120 Q 50 140 100 100 T 200 80 T 300 90 T 400 110 T 500 60 T 600 85 T 700 95 T 800 75 T 900 105 T 1000 70 T 1100 65"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  className="transition-all duration-1000"
                />
                
                {/* Data points */}
                {[
                  { x: 0, y: 120, month: 'Jan', amount: 120000, index: 0 },
                  { x: 100, y: 100, month: 'Feb', amount: 118000, index: 1 },
                  { x: 200, y: 80, month: 'Mar', amount: 124500, index: 2 },
                  { x: 300, y: 90, month: 'Apr', amount: 126000, index: 3 },
                  { x: 400, y: 110, month: 'May', amount: 122000, index: 4 },
                  { x: 500, y: 60, month: 'Jun', amount: 128000, index: 5 },
                  { x: 600, y: 85, month: 'Jul', amount: 125500, index: 6 },
                  { x: 700, y: 95, month: 'Aug', amount: 123500, index: 7 },
                  { x: 800, y: 75, month: 'Sep', amount: 127000, index: 8 },
                  { x: 900, y: 105, month: 'Oct', amount: 121500, index: 9 },
                  { x: 1000, y: 70, month: 'Nov', amount: 127500, index: 10 },
                  { x: 1100, y: 65, month: 'Dec', amount: 128500, index: 11 }
                ].map((point, index) => (
                  <g key={index}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={hoveredPoint === point.index ? "8" : "6"}
                      fill="white"
                      stroke={hoveredPoint === point.index ? "#8B5CF6" : "#3B82F6"}
                      strokeWidth="3"
                      className="transition-all duration-200 cursor-pointer drop-shadow-lg"
                      onMouseEnter={() => setHoveredPoint(point.index)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="3"
                      fill={hoveredPoint === point.index ? "#8B5CF6" : "#3B82F6"}
                      className="pointer-events-none transition-colors duration-200"
                    />
                  </g>
                ))}
              </svg>
              
              {/* Hover Tooltips */}
              {hoveredPoint !== null && (
                <div 
                  className="absolute bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg pointer-events-none z-10 transform -translate-x-1/2 -translate-y-full"
                  style={{
                    left: `${([0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100][hoveredPoint] / 1100) * 100}%`,
                    top: `${([120, 100, 80, 90, 110, 60, 85, 95, 75, 105, 70, 65][hoveredPoint] / 240) * 100}%`,
                    marginTop: '-10px'
                  }}
                >
                  <div className="font-semibold">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][hoveredPoint]}
                  </div>
                  <div>
                    ${([120000, 118000, 124500, 126000, 122000, 128000, 125500, 123500, 127000, 121500, 127500, 128500][hoveredPoint] / 1000).toFixed(0)}K
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              )}
              
              {/* Month labels */}
              <div className="absolute bottom-0 w-full flex justify-between text-xs text-gray-600 font-medium -mb-6">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                  <span key={index} className="transform -translate-x-1/2">{month}</span>
                ))}
              </div>
              </div>
            </div>
          </div>
          
          {/* Summary cards */}
          <div className="absolute top-4 right-4 flex space-x-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200/50">
              <div className="text-xs text-gray-500">Peak</div>
              <div className="text-sm font-bold text-emerald-600">$128.5K</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200/50">
              <div className="text-xs text-gray-500">Avg</div>
              <div className="text-sm font-bold text-blue-600">$124.2K</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200/50">
              <div className="text-xs text-gray-500">Growth</div>
              <div className="text-sm font-bold text-purple-600">+7.1%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts & Quick Actions - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Alerts */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Alerts & Notifications</h2>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-xl border-l-4 hover:scale-105 transition-transform duration-200 ${
                alert.type === 'warning' ? 'bg-orange-50 border-orange-400' :
                alert.type === 'info' ? 'bg-blue-50 border-blue-400' :
                'bg-emerald-50 border-emerald-400'
              }`}>
                <div className="flex items-start">
                  <AlertTriangle className={`w-4 h-4 mt-0.5 mr-3 ${
                    alert.type === 'warning' ? 'text-orange-600' :
                    alert.type === 'info' ? 'text-blue-600' :
                    'text-emerald-600'
                  }`} />
                  <div>
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    {alert.urgent && (
                      <span className="inline-block mt-1 px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              const handleClick = () => {
                switch (action.name) {
                  case 'Run Payroll':
                    setCurrentView('payroll');
                    break;
                  case 'Add Employee':
                    setCurrentView('employees');
                    break;
                  case 'Generate Report':
                    setCurrentView('reports');
                    break;
                  case 'Tax Compliance':
                    setCurrentView('tax');
                    break;
                  case 'Banking Setup':
                    setCurrentView('banking');
                    break;
                  default:
                    break;
                }
              };

              return (
                <button 
                  key={index} 
                  onClick={handleClick}
                  className="w-full flex items-center p-3 rounded-xl border border-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-100 hover:border-blue-300 hover:shadow-lg hover:scale-105 transition-all duration-200 group cursor-pointer"
                >
                  <Icon className="w-5 h-5 mr-3 text-blue-600 group-hover:scale-110 group-hover:text-purple-600 transition-all duration-200" />
                  <span className="text-sm font-medium text-gray-900 group-hover:text-purple-700 transition-colors duration-200">
                    {action.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
