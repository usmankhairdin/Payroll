import React, { useState } from 'react';
import { Download, Calendar, TrendingUp, BarChart3, PieChart, FileText, DollarSign, Users, Building } from 'lucide-react';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('payroll-summary');
  const [dateRange, setDateRange] = useState('last-3-months');
  const [department, setDepartment] = useState('all');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const reportTypes = [
    { id: 'payroll-summary', name: 'Payroll Summary Report', icon: BarChart3 },
    { id: 'employee-cost', name: 'Employee Cost Report', icon: DollarSign },
    { id: 'department-budget', name: 'Department Budget Report', icon: Building },
    { id: 'tax-liability', name: 'Tax Liability Report', icon: FileText },
    { id: 'attendance-payroll', name: 'Attendance vs Payroll', icon: Users },
    { id: 'year-end', name: 'Year-end Summary', icon: TrendingUp }
  ];

  const departments = ['All Departments', 'Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'];

  const summaryData = {
    totalPayroll: 498600,
    totalEmployees: 247,
    averageSalary: 2019,
    totalTax: 74790,
    departmentBreakdown: [
      { name: 'Engineering', amount: 180000, percentage: 36.1 },
      { name: 'Sales', amount: 125000, percentage: 25.1 },
      { name: 'Marketing', amount: 98000, percentage: 19.7 },
      { name: 'HR', amount: 52000, percentage: 10.4 },
      { name: 'Finance', amount: 43600, percentage: 8.7 }
    ]
  };



  const renderReportContent = () => {
    switch (selectedReport) {
      case 'payroll-summary':
        return (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-blue-600 text-sm font-medium">Total Payroll</p>
                    <p className="text-2xl font-bold text-blue-900">${summaryData.totalPayroll.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-emerald-600" />
                  <div className="ml-4">
                    <p className="text-emerald-600 text-sm font-medium">Total Employees</p>
                    <p className="text-2xl font-bold text-emerald-900">{summaryData.totalEmployees}</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <div className="flex items-center">
                  <BarChart3 className="w-8 h-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-orange-600 text-sm font-medium">Average Salary</p>
                    <p className="text-2xl font-bold text-orange-900">${summaryData.averageSalary.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <div className="flex items-center">
                  <FileText className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-purple-600 text-sm font-medium">Total Tax</p>
                    <p className="text-2xl font-bold text-purple-900">${summaryData.totalTax.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Payroll Trends - Full Width */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Payroll Trends</h3>
                <div className="h-80 bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-xl p-6 relative">
                  {/* Chart Container */}
                  <div className="relative h-full">
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4">
                      <span>$180K</span>
                      <span>$175K</span>
                      <span>$170K</span>
                      <span>$165K</span>
                      <span>$160K</span>
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
                          { x: 0, y: 120, month: 'Jan', amount: 165000, index: 0 },
                          { x: 100, y: 100, month: 'Feb', amount: 168000, index: 1 },
                          { x: 200, y: 80, month: 'Mar', amount: 170000, index: 2 },
                          { x: 300, y: 90, month: 'Apr', amount: 172000, index: 3 },
                          { x: 400, y: 110, month: 'May', amount: 175000, index: 4 },
                          { x: 500, y: 60, month: 'Jun', amount: 178000, index: 5 },
                          { x: 600, y: 85, month: 'Jul', amount: 176000, index: 6 },
                          { x: 700, y: 95, month: 'Aug', amount: 174000, index: 7 },
                          { x: 800, y: 75, month: 'Sep', amount: 177000, index: 8 },
                          { x: 900, y: 105, month: 'Oct', amount: 173000, index: 9 },
                          { x: 1000, y: 70, month: 'Nov', amount: 178500, index: 10 },
                          { x: 1100, y: 65, month: 'Dec', amount: 180000, index: 11 }
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
                            ${([165000, 168000, 170000, 172000, 175000, 178000, 176000, 174000, 177000, 173000, 178500, 180000][hoveredPoint] / 1000).toFixed(0)}K
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
                      <div className="text-sm font-bold text-emerald-600">$180K</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200/50">
                      <div className="text-xs text-gray-500">Avg</div>
                      <div className="text-sm font-bold text-blue-600">$174.2K</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200/50">
                      <div className="text-xs text-gray-500">Growth</div>
                      <div className="text-sm font-bold text-purple-600">+9.1%</div>
                    </div>
                  </div>
                </div>
              </div>

            {/* Department-wise Distribution - Full Width */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Distribution</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Donut Chart */}
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {summaryData.departmentBreakdown.map((dept, index) => {
                          const strokeDasharray = `${dept.percentage * 2.51} 251`;
                          const strokeDashoffset = index === 0 ? 0 : -summaryData.departmentBreakdown.slice(0, index).reduce((sum, d) => sum + (d.percentage * 2.51), 0);
                          
                          return (
                            <circle
                              key={index}
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke={`hsl(${index * 72}, 70%, 50%)`}
                              strokeWidth="8"
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={strokeDashoffset}
                              className="transition-all duration-500 hover:stroke-width-10"
                            />
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="space-y-2">
                  {summaryData.departmentBreakdown.map((dept, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: `hsl(${index * 72}, 70%, 50%)` }}></div>
                          <span className="font-medium text-gray-900">{dept.name}</span>
                      </div>
                      <div className="text-right">
                          <p className="font-semibold text-gray-900">${dept.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>

            {/* Detailed Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Detailed Breakdown</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employees</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Payroll</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Average Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tax Deducted</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {summaryData.departmentBreakdown.map((dept, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {Math.floor(summaryData.totalEmployees * (dept.percentage / 100))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${dept.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${Math.floor(dept.amount / (summaryData.totalEmployees * (dept.percentage / 100))).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${Math.floor(dept.amount * 0.15).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'employee-cost':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Cost Analysis</h3>
              <p className="text-gray-600 mb-4">Comprehensive analysis of employee costs including salaries, benefits, and taxes.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-600 text-sm font-medium">Direct Costs</p>
                  <p className="text-2xl font-bold text-blue-900">$425,000</p>
                  <p className="text-blue-700 text-xs">Salaries & wages</p>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <p className="text-emerald-600 text-sm font-medium">Benefits</p>
                  <p className="text-2xl font-bold text-emerald-900">$51,000</p>
                  <p className="text-emerald-700 text-xs">Health, retirement, etc.</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-orange-600 text-sm font-medium">Taxes & Compliance</p>
                  <p className="text-2xl font-bold text-orange-900">$22,600</p>
                  <p className="text-orange-700 text-xs">Employer taxes</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Report Preview</h3>
            <p className="text-gray-600">Select a report type to view detailed analytics and insights.</p>
          </div>
        );
    }
  };

  return (
    <div className="p-6 min-h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate comprehensive payroll and employee reports</p>
        </div>
        <button
          onClick={() => {
            const reportName = reportTypes.find(r => r.id === selectedReport)?.name || 'Report';
            alert(`Exporting ${reportName} as PDF...`);
            console.log('Exporting report:', {
              type: selectedReport,
              dateRange,
              department,
              timestamp: new Date().toISOString()
            });
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Report Types Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="font-semibold text-gray-900 mb-4">Report Types</h2>
            <div className="space-y-2">
              {reportTypes.map((report) => {
                const Icon = report.icon;
                return (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report.id)}
                    className={`w-full flex items-center p-3 text-sm font-medium rounded-lg transition-colors ${
                      selectedReport === report.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {report.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="font-semibold text-gray-900 mb-4">Filters</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="last-month">Last Month</option>
                  <option value="last-3-months">Last 3 Months</option>
                  <option value="last-6-months">Last 6 Months</option>
                  <option value="last-year">Last Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept.toLowerCase().replace(' ', '-')}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  alert(`Filters applied: Date Range - ${dateRange}, Department - ${department}`);
                  console.log('Applying filters:', { dateRange, department, selectedReport });
                  // In a real app, this would trigger data refresh with new filters
                }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {reportTypes.find(r => r.id === selectedReport)?.name || 'Select a Report'}
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Last updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>

            {renderReportContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
