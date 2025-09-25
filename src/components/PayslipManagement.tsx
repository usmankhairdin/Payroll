import React, { useState } from 'react';
import { Download, Eye, Mail, Calendar, Search, FileText, DollarSign, Building, User } from 'lucide-react';
import ClickableEmployeeName from './ClickableEmployeeName';

interface Payslip {
  id: number;
  employeeName: string;
  employeeId: number;
  empCode: string;
  department: string;
  period: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netPay: number;
  status: string;
  generatedDate: string;
}

const PayslipManagement = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-03');
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPayslipModal, setShowPayslipModal] = useState<number | null>(null);

  const payslips: Payslip[] = [
    {
      id: 1,
      employeeName: 'John Smith',
      employeeId: 1,
      empCode: 'EMP001',
      department: 'Engineering',
      period: 'March 2024',
      baseSalary: 7083,
      allowances: 1500,
      deductions: 850,
      netPay: 7733,
      status: 'Generated',
      generatedDate: '2024-03-31'
    },
    {
      id: 2,
      employeeName: 'Sarah Johnson',
      employeeId: 2,
      empCode: 'EMP002',
      department: 'Marketing',
      period: 'March 2024',
      baseSalary: 6000,
      allowances: 1200,
      deductions: 720,
      netPay: 6480,
      status: 'Sent',
      generatedDate: '2024-03-31'
    },
    {
      id: 3,
      employeeName: 'Michael Chen',
      employeeId: 3,
      empCode: 'EMP003',
      department: 'Sales',
      period: 'March 2024',
      baseSalary: 5417,
      allowances: 1000,
      deductions: 650,
      netPay: 5767,
      status: 'Generated',
      generatedDate: '2024-03-31'
    }
  ];

  const filteredPayslips = payslips.filter(payslip => {
    const matchesSearch = payslip.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payslip.empCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEmployee = selectedEmployee === 'all' || payslip.employeeName === selectedEmployee;
    
    return matchesSearch && matchesEmployee;
  });

  const renderPayslipPreview = (payslip: Payslip) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Payslip Preview</h2>
              <button
                onClick={() => setShowPayslipModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            {/* Company Header */}
            <div className="border-b-2 border-gray-200 pb-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">PayrollPro Inc.</h3>
                    <p className="text-gray-600">123 Business Street, City, State 12345</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">PAYSLIP</p>
                  <p className="text-gray-600">{payslip.period}</p>
                </div>
              </div>
            </div>

            {/* Employee Details */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Employee Details</h4>
                <div className="space-y-2">
                  <p><span className="text-gray-600">Name:</span> <ClickableEmployeeName employeeId={payslip.employeeId} employeeName={payslip.employeeName} className="font-medium" /></p>
                  <p><span className="text-gray-600">Employee ID:</span> <span className="font-medium">{payslip.empCode}</span></p>
                  <p><span className="text-gray-600">Department:</span> <span className="font-medium">{payslip.department}</span></p>
                  <p><span className="text-gray-600">Pay Period:</span> <span className="font-medium">{payslip.period}</span></p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Payment Details</h4>
                <div className="space-y-2">
                  <p><span className="text-gray-600">Payment Date:</span> <span className="font-medium">{payslip.generatedDate}</span></p>
                  <p><span className="text-gray-600">Payment Mode:</span> <span className="font-medium">Bank Transfer</span></p>
                  <p><span className="text-gray-600">Bank:</span> <span className="font-medium">Chase Bank</span></p>
                  <p><span className="text-gray-600">Account:</span> <span className="font-medium">****1234</span></p>
                </div>
              </div>
            </div>

            {/* Earnings and Deductions */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-emerald-700">Earnings</h4>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Basic Salary</span>
                      <span className="font-medium">${payslip.baseSalary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>House Rent Allowance</span>
                      <span className="font-medium">${Math.floor(payslip.allowances * 0.6).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transport Allowance</span>
                      <span className="font-medium">${Math.floor(payslip.allowances * 0.4).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-emerald-200 pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total Earnings</span>
                        <span>${(payslip.baseSalary + payslip.allowances).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-red-700">Deductions</h4>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Income Tax</span>
                      <span className="font-medium">${Math.floor(payslip.deductions * 0.6).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Social Security</span>
                      <span className="font-medium">${Math.floor(payslip.deductions * 0.25).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Health Insurance</span>
                      <span className="font-medium">${Math.floor(payslip.deductions * 0.15).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-red-200 pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total Deductions</span>
                        <span>${payslip.deductions.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Pay */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-blue-900">Net Pay</span>
                <span className="text-2xl font-bold text-blue-900">${payslip.netPay.toLocaleString()}</span>
              </div>
              <p className="text-blue-700 text-sm mt-1">
                Net pay amount to be credited to your account
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4 inline mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 min-h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payslip Management</h1>
          <p className="text-gray-600">Generate, view, and distribute employee payslips</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          Bulk Generate
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Payslips</p>
              <p className="text-2xl font-bold text-gray-900">247</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Disbursed</p>
              <p className="text-2xl font-bold text-gray-900">$124.5K</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Mail className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Emails Sent</p>
              <p className="text-2xl font-bold text-gray-900">198</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Download className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Downloads</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by employee name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-3">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="2024-03">March 2024</option>
                <option value="2024-02">February 2024</option>
                <option value="2024-01">January 2024</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Employees</option>
                <option value="John Smith">John Smith</option>
                <option value="Sarah Johnson">Sarah Johnson</option>
                <option value="Michael Chen">Michael Chen</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Payslips Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gross Pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayslips.map((payslip) => (
                <tr key={payslip.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <ClickableEmployeeName
                        employeeId={payslip.employeeId}
                        employeeName={payslip.employeeName}
                        className="text-sm font-medium text-gray-900"
                      />
                      <div className="text-sm text-gray-500">{payslip.empCode}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payslip.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payslip.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${(payslip.baseSalary + payslip.allowances).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${payslip.netPay.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      payslip.status === 'Sent' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {payslip.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowPayslipModal(payslip.id)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Payslip"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="text-emerald-600 hover:text-emerald-900"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        className="text-orange-600 hover:text-orange-900"
                        title="Send Email"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payslip Preview Modal */}
      {showPayslipModal && renderPayslipPreview(payslips.find(p => p.id === showPayslipModal))}
    </div>
  );
};

export default PayslipManagement;
