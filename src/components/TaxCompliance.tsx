import React, { useState } from 'react';
import { Shield, FileText, Calculator, AlertTriangle, CheckCircle, Download, Upload, Calendar, DollarSign, TrendingUp, Settings } from 'lucide-react';
import Footer from './Footer';

const TaxCompliance = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const taxSummary = {
    totalTaxDeducted: 74790,
    employeeTax: 52350,
    employerTax: 22440,
    pendingFiling: 3,
    nextDeadline: '2024-04-30'
  };

  const taxSlabs = [
    { range: '$0 - $12,000', rate: '0%', employees: 45 },
    { range: '$12,001 - $45,000', rate: '12%', employees: 89 },
    { range: '$45,001 - $95,000', rate: '22%', employees: 78 },
    { range: '$95,001 - $182,000', rate: '24%', employees: 28 },
    { range: '$182,001+', rate: '32%', employees: 7 }
  ];

  const complianceItems = [
    { name: 'Monthly Tax Filing', status: 'completed', dueDate: '2024-03-31', description: 'March 2024 tax returns filed' },
    { name: 'Quarterly Report', status: 'pending', dueDate: '2024-04-30', description: 'Q1 2024 quarterly tax report' },
    { name: 'Annual W-2 Forms', status: 'completed', dueDate: '2024-01-31', description: 'Employee W-2 forms distributed' },
    { name: 'State Tax Filing', status: 'overdue', dueDate: '2024-04-15', description: 'State income tax filing' }
  ];

  const tabs = [
    { id: 'overview', name: 'Tax Overview', icon: Shield },
    { id: 'calculations', name: 'Tax Calculations', icon: Calculator },
    { id: 'compliance', name: 'Compliance', icon: FileText },
    { id: 'reports', name: 'Tax Reports', icon: TrendingUp },
    { id: 'settings', name: 'Tax Settings', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Tax Deducted</p>
                    <p className="text-2xl font-bold text-blue-600">${taxSummary.totalTaxDeducted.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Employee Tax</p>
                    <p className="text-2xl font-bold text-emerald-600">${taxSummary.employeeTax.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Employer Tax</p>
                    <p className="text-2xl font-bold text-orange-600">${taxSummary.employerTax.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-red-400 to-red-600 shadow-lg">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Pending Filings</p>
                    <p className="text-2xl font-bold text-red-600">{taxSummary.pendingFiling}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Slabs */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Slab Distribution</h3>
              <div className="space-y-4">
                {taxSlabs.map((slab, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl hover:shadow-md hover:scale-105 transition-all duration-200">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4"></div>
                      <div>
                        <p className="font-medium text-gray-900">{slab.range}</p>
                        <p className="text-sm text-gray-600">{slab.employees} employees</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">{slab.rate}</p>
                      <p className="text-sm text-gray-500">tax rate</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'calculations':
        return (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Calculation Engine</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Annual Salary</label>
                    <input
                      type="number"
                      placeholder="Enter annual salary"
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Filing Status</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Single</option>
                      <option>Married Filing Jointly</option>
                      <option>Married Filing Separately</option>
                      <option>Head of Household</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Deductions</label>
                    <input
                      type="number"
                      placeholder="Enter deductions"
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <button
                    onClick={() => {
                      const income = document.querySelector('input[placeholder="Enter annual income"]')?.value;
                      const deductions = document.querySelector('input[placeholder="Enter deductions"]')?.value;
                      if (income) {
                        alert(`Tax calculated for income $${income} with deductions $${deductions || 0}`);
                      } else {
                        alert('Please enter income amount');
                      }
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  >
                    Calculate Tax
                  </button>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50/50 rounded-xl p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Tax Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Federal Tax</span>
                      <span className="font-medium">$8,250</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">State Tax</span>
                      <span className="font-medium">$2,100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Social Security</span>
                      <span className="font-medium">$3,720</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Medicare</span>
                      <span className="font-medium">$870</span>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Tax</span>
                      <span className="text-blue-600">$14,940</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'compliance':
        return (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Compliance Checklist</h3>
                <button
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.pdf,.doc,.docx';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        alert(`Document ${file.name} uploaded successfully!`);
                        console.log('File uploaded:', file);
                      }
                    };
                    input.click();
                  }}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105"
                >
                  <Upload className="w-4 h-4 mr-2 inline" />
                  Upload Document
                </button>
              </div>
              <div className="space-y-4">
                {complianceItems.map((item, index) => (
                  <div key={index} className={`p-4 rounded-xl border-l-4 hover:scale-105 transition-all duration-200 ${
                    item.status === 'completed' ? 'bg-emerald-50 border-emerald-400' :
                    item.status === 'pending' ? 'bg-yellow-50 border-yellow-400' :
                    'bg-red-50 border-red-400'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {item.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                        ) : item.status === 'pending' ? (
                          <Calendar className="w-5 h-5 text-yellow-600 mr-3" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-red-600 mr-3" />
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">Due: {item.dueDate}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          item.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                          item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Monthly Tax Report', description: 'Detailed monthly tax summary', icon: FileText },
                { name: 'Quarterly Filing', description: 'Quarterly tax filing report', icon: Calendar },
                { name: 'Annual Summary', description: 'Year-end tax summary', icon: TrendingUp },
                { name: 'Employee Tax Summary', description: 'Individual employee tax details', icon: Shield },
                { name: 'Compliance Report', description: 'Tax compliance status report', icon: CheckCircle },
                { name: 'Audit Trail', description: 'Tax calculation audit trail', icon: FileText }
              ].map((report, index) => {
                const Icon = report.icon;
                return (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                    <div className="flex items-center mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400 to-purple-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="ml-3 font-medium text-gray-900">{report.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                    <button
                      onClick={() => {
                        alert(`Generating ${report.name}...`);
                        console.log('Generating report:', report.name);
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                    >
                      <Download className="w-4 h-4 mr-2 inline" />
                      Generate
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax Year</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>2024</option>
                    <option>2023</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default State</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>California</option>
                    <option>New York</option>
                    <option>Texas</option>
                    <option>Florida</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Federal Tax Rate</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Enter rate"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State Tax Rate</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Enter rate"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Automatic Tax Calculation</p>
                    <p className="text-sm text-gray-600">Automatically calculate taxes for all employees</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Compliance Alerts</p>
                    <p className="text-sm text-gray-600">Send alerts for upcoming tax deadlines</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 min-h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Tax & Compliance</h1>
          <p className="text-gray-600">Manage tax calculations and compliance requirements</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 flex items-center shadow-lg">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center shadow-lg">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
      <Footer />
    </div>
  );
};

export default TaxCompliance;
