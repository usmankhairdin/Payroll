import React, { useState } from 'react';
import { Play, Clock, CheckCircle, AlertCircle, Calendar, DollarSign, Users, FileText, ArrowRight, Plus } from 'lucide-react';
import ClickableEmployeeName from './ClickableEmployeeName';

const PayrollManagement = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showRunPayroll, setShowRunPayroll] = useState(false);
  const [viewPayrollId, setViewPayrollId] = useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);
  const [showCustomPeriodModal, setShowCustomPeriodModal] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showProcessConfirm, setShowProcessConfirm] = useState(false);
  interface Adjustment {
    id: number;
    type: string;
    amount: number;
    description: string;
  }

  const [adjustments, setAdjustments] = useState<Adjustment[]>([]);

  const payrollHistory = [
    {
      id: 1,
      period: 'March 2024',
      employees: 247,
      totalAmount: '$124,500',
      status: 'Completed',
      date: '2024-03-31',
      statusColor: 'emerald'
    },
    {
      id: 2,
      period: 'February 2024',
      employees: 245,
      totalAmount: '$122,800',
      status: 'Completed',
      date: '2024-02-29',
      statusColor: 'emerald'
    },
    {
      id: 3,
      period: 'January 2024',
      employees: 243,
      totalAmount: '$121,200',
      status: 'Completed',
      date: '2024-01-31',
      statusColor: 'emerald'
    }
  ];

  const payrollSteps = [
    { title: 'Select Pay Period', icon: Calendar },
    { title: 'Review Data', icon: Users },
    { title: 'Adjustments', icon: DollarSign },
    { title: 'Preview', icon: FileText },
    { title: 'Finalize', icon: CheckCircle }
  ];

  const employees = [
    { id: 1, name: 'John Smith', baseSalary: 7083, overtime: 0, bonus: 0, deductions: 0 },
    { id: 2, name: 'Sarah Johnson', baseSalary: 6000, overtime: 0, bonus: 0, deductions: 0 },
    { id: 3, name: 'Michael Chen', baseSalary: 5417, overtime: 0, bonus: 0, deductions: 0 }
  ];

  const addAdjustment = (employeeId: number, type: string, amount: number, description: string) => {
    setAdjustments(prev => [...prev, { employeeId, type, amount, description, id: Date.now() }]);
  };



  const getTotalPayroll = () => {
    let total = employees.reduce((sum, emp) => sum + emp.baseSalary, 0);
    adjustments.forEach(adj => {
      if (adj.type === 'bonus') total += adj.amount;
      if (adj.type === 'deduction') total -= adj.amount;
    });
    return total;
  };

  const renderPayrollWizard = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Select Pay Period</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedPeriod('April 2024')}
                className={`p-4 border-2 rounded-lg text-left transition-colors ${
                  selectedPeriod === 'April 2024' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-medium text-gray-900">April 2024</h4>
                <p className="text-sm text-gray-500">April 1 - April 30, 2024</p>
                <p className="text-xs text-gray-400">247 active employees</p>
              </button>
              <button
                onClick={() => setShowCustomPeriodModal(true)}
                className={`p-4 border-2 rounded-lg text-left transition-colors ${
                  selectedPeriod === 'Custom' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-medium text-gray-900">Custom Period</h4>
                <p className="text-sm text-gray-500">Select custom date range</p>
                <p className="text-xs text-gray-400">Advanced options</p>
              </button>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Review Attendance & Leave Data</h3>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-600 mr-3" />
                <div>
                  <p className="text-emerald-800 font-medium">Data Sync Complete</p>
                  <p className="text-emerald-700 text-sm">Attendance and leave data has been automatically imported</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Attendance</h4>
                <p className="text-2xl font-bold text-emerald-600">98.5%</p>
                <p className="text-sm text-gray-500">Average attendance</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Leave Days</h4>
                <p className="text-2xl font-bold text-orange-600">127</p>
                <p className="text-sm text-gray-500">Total leave days</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Overtime</h4>
                <p className="text-2xl font-bold text-blue-600">89</p>
                <p className="text-sm text-gray-500">Total overtime hours</p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Manual Adjustments</h3>
              <button
                onClick={() => setShowAdjustmentModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Adjustment
              </button>
            </div>

            <div className="space-y-4">
              {employees.map(employee => (
                <div key={employee.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <ClickableEmployeeName
                      employeeId={employee.id}
                      employeeName={employee.name}
                      className="font-medium text-gray-900"
                    />
                    <span className="text-sm text-gray-500">Base: ${employee.baseSalary.toLocaleString()}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="bg-emerald-50 p-3 rounded">
                      <p className="text-xs text-emerald-600 font-medium">Base Salary</p>
                      <p className="text-sm font-bold">${employee.baseSalary.toLocaleString()}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-xs text-blue-600 font-medium">Bonuses</p>
                      <p className="text-sm font-bold">
                        ${adjustments
                          .filter(adj => adj.employeeId === employee.id && adj.type === 'bonus')
                          .reduce((sum, adj) => sum + adj.amount, 0)
                          .toLocaleString()
                        }
                      </p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded">
                      <p className="text-xs text-orange-600 font-medium">Deductions</p>
                      <p className="text-sm font-bold">
                        ${adjustments
                          .filter(adj => adj.employeeId === employee.id && adj.type === 'deduction')
                          .reduce((sum, adj) => sum + adj.amount, 0)
                          .toLocaleString()
                        }
                      </p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <p className="text-xs text-purple-600 font-medium">Net Pay</p>
                      <p className="text-sm font-bold">
                        ${(employee.baseSalary + 
                          adjustments
                            .filter(adj => adj.employeeId === employee.id && adj.type === 'bonus')
                            .reduce((sum, adj) => sum + adj.amount, 0) -
                          adjustments
                            .filter(adj => adj.employeeId === employee.id && adj.type === 'deduction')
                            .reduce((sum, adj) => sum + adj.amount, 0)
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Payroll Preview</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-blue-600 text-sm font-medium">Employees</p>
                  <p className="text-2xl font-bold text-blue-900">{employees.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-blue-600 text-sm font-medium">Gross Pay</p>
                  <p className="text-2xl font-bold text-blue-900">${getTotalPayroll().toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-blue-600 text-sm font-medium">Total Tax</p>
                  <p className="text-2xl font-bold text-blue-900">${(getTotalPayroll() * 0.15).toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-blue-600 text-sm font-medium">Net Pay</p>
                  <p className="text-2xl font-bold text-blue-900">${(getTotalPayroll() * 0.85).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gross</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tax</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {employees.map(employee => {
                    const gross = employee.baseSalary + 
                      adjustments
                        .filter(adj => adj.employeeId === employee.id && adj.type === 'bonus')
                        .reduce((sum, adj) => sum + adj.amount, 0) -
                      adjustments
                        .filter(adj => adj.employeeId === employee.id && adj.type === 'deduction')
                        .reduce((sum, adj) => sum + adj.amount, 0);
                    const tax = gross * 0.15;
                    const net = gross - tax;

                    return (
                      <tr key={employee.id}>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <ClickableEmployeeName
                            employeeId={employee.id}
                            employeeName={employee.name}
                          />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">${gross.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">${tax.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">${net.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Finalize Payroll</h3>
            
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-emerald-600 mr-3" />
                <h4 className="text-lg font-medium text-emerald-900">Payroll Ready for Processing</h4>
              </div>
              <p className="text-emerald-800 mb-4">
                All validations passed. Payroll is ready to be processed and disbursed.
              </p>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowProcessConfirm(true)}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  Process & Disburse Payroll
                </button>
                <button
                  onClick={() => {
                    alert('Payroll draft saved successfully!');
                    setShowRunPayroll(false);
                    setCurrentStep(0);
                  }}
                  className="bg-white text-emerald-600 border border-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors font-medium"
                >
                  Save as Draft
                </button>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
                <div>
                  <p className="text-yellow-800 font-medium">Important Notice</p>
                  <p className="text-yellow-700 text-sm">Once processed, this payroll cannot be modified. Please ensure all information is correct.</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showRunPayroll) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setShowRunPayroll(false)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Payroll Management
            </button>
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {payrollSteps.length}
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {payrollSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' :
                      isActive ? 'border-blue-500 text-blue-500 bg-blue-50' :
                      'border-gray-300 text-gray-300'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`mt-2 text-xs font-medium ${
                      isActive ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / payrollSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            {renderPayrollWizard()}
          </div>

          {/* Wizard Modals */}
          {/* Custom Period Modal */}
          {showCustomPeriodModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-md w-full">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Select Custom Pay Period</h2>
                    <button onClick={() => setShowCustomPeriodModal(false)} className="text-gray-400 hover:text-gray-600">×</button>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (customStartDate && customEndDate) {
                        setSelectedPeriod('Custom');
                        setShowCustomPeriodModal(false);
                      }
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                        <input type="date" required value={customStartDate} onChange={(e) => setCustomStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                        <input type="date" required value={customEndDate} onChange={(e) => setCustomEndDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button type="button" onClick={() => setShowCustomPeriodModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Apply</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Add Adjustment Modal */}
          {showAdjustmentModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-md w-full">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Add Adjustment</h2>
                    <button onClick={() => setShowAdjustmentModal(false)} className="text-gray-400 hover:text-gray-600">×</button>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget as HTMLFormElement;
                      const formData = new FormData(form);
                      const employeeId = parseInt(formData.get('employeeId') as string);
                      const type = formData.get('type') as string;
                      const amount = parseFloat(formData.get('amount') as string);
                      const description = formData.get('description') as string;
                      if (!Number.isNaN(employeeId) && type && !Number.isNaN(amount) && description) {
                        addAdjustment(employeeId, type, amount, description);
                        setShowAdjustmentModal(false);
                        form.reset();
                      }
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Employee</label>
                      <select name="employeeId" required defaultValue="" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="" disabled>Select employee</option>
                        {employees.map(e => (
                          <option key={e.id} value={e.id}>{e.id} - {e.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                        <select name="type" required defaultValue="bonus" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="bonus">Bonus</option>
                          <option value="deduction">Deduction</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                        <input name="amount" type="number" step="0.01" min="0" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0.00" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <input name="description" type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Reason for adjustment" />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button type="button" onClick={() => setShowAdjustmentModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (currentStep < payrollSteps.length - 1) {
                  setCurrentStep(currentStep + 1);
                } else {
                  setShowRunPayroll(false);
                  setCurrentStep(0);
                }
              }}
              disabled={currentStep === 0 && !selectedPeriod}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {currentStep === payrollSteps.length - 1 ? 'Complete' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-content p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
          <p className="text-gray-600">Manage and process employee payrolls</p>
        </div>
        <button
          onClick={() => setShowRunPayroll(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Play className="w-5 h-5 mr-2" />
          Run Payroll
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Employees</p>
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
              <p className="text-sm text-gray-600">Last Payroll</p>
              <p className="text-2xl font-bold text-gray-900">$124.5K</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Next Payroll</p>
              <p className="text-2xl font-bold text-gray-900">3 days</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending Actions</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payroll History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Payroll History</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pay Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Processed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payrollHistory.map((payroll) => (
                <tr key={payroll.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payroll.period}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payroll.employees}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payroll.totalAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-${payroll.statusColor}-100 text-${payroll.statusColor}-800`}>
                      {payroll.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payroll.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setViewPayrollId(payroll.id)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        alert(`Downloading report for ${payroll.period}`);
                        console.log(`Downloading report for payroll ID: ${payroll.id}`);
                      }}
                      className="text-emerald-600 hover:text-emerald-900"
                    >
                      Download Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */
      }
      {showRunPayroll && viewPayrollId && (
        (() => {
          const payroll = payrollHistory.find(p => p.id === viewPayrollId);
          if (!payroll) return null;
          return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Payroll Details - {payroll.period}</h2>
                    <button
                      onClick={() => setViewPayrollId(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Pay Period</p>
                      <p className="text-lg font-semibold text-gray-900">{payroll.period}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Employees</p>
                      <p className="text-lg font-semibold text-gray-900">{payroll.employees}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-lg font-semibold text-gray-900">{payroll.totalAmount}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Processed On</p>
                      <p className="text-lg font-semibold text-gray-900">{payroll.date}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-900 mb-3">Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-emerald-50">
                        <p className="text-xs text-emerald-700">Status</p>
                        <p className="mt-1 font-bold text-emerald-900">{payroll.status}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-blue-50">
                        <p className="text-xs text-blue-700">Gross</p>
                        <p className="mt-1 font-bold text-blue-900">{payroll.totalAmount}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-purple-50">
                        <p className="text-xs text-purple-700">Records</p>
                        <p className="mt-1 font-bold text-purple-900">{payroll.employees}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setViewPayrollId(null)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        console.log(`Downloading report for payroll ID: ${payroll.id}`);
                        alert(`Downloading report for ${payroll.period}`);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Download Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()
      )}

      {/* Process & Disburse Confirmation */}
      {showRunPayroll && showProcessConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Confirm Processing</h2>
                <button onClick={() => setShowProcessConfirm(false)} className="text-gray-400 hover:text-gray-600">×</button>
              </div>
              <p className="text-gray-700 mb-6">Are you sure you want to process and disburse this payroll? This action cannot be undone.</p>
              <div className="flex justify-end space-x-3">
                <button onClick={() => setShowProcessConfirm(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                <button
                  onClick={() => {
                    setShowProcessConfirm(false);
                    setShowRunPayroll(false);
                    setCurrentStep(0);
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Yes, Process Payroll
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Period Modal */}
      {showCustomPeriodModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Select Custom Pay Period</h2>
                <button onClick={() => setShowCustomPeriodModal(false)} className="text-gray-400 hover:text-gray-600">×</button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (customStartDate && customEndDate) {
                    setSelectedPeriod('Custom');
                    setShowCustomPeriodModal(false);
                  }
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input type="date" required value={customStartDate} onChange={(e) => setCustomStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input type="date" required value={customEndDate} onChange={(e) => setCustomEndDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={() => setShowCustomPeriodModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Apply</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Adjustment Modal */}
      {showAdjustmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Add Adjustment</h2>
                <button onClick={() => setShowAdjustmentModal(false)} className="text-gray-400 hover:text-gray-600">×</button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  const formData = new FormData(form);
                  const employeeId = parseInt(formData.get('employeeId') as string);
                  const type = formData.get('type') as string;
                  const amount = parseFloat(formData.get('amount') as string);
                  const description = formData.get('description') as string;
                  if (!Number.isNaN(employeeId) && type && !Number.isNaN(amount) && description) {
                    addAdjustment(employeeId, type, amount, description);
                    setShowAdjustmentModal(false);
                    form.reset();
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee</label>
                  <select name="employeeId" required defaultValue="" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="" disabled>Select employee</option>
                    {employees.map(e => (
                      <option key={e.id} value={e.id}>{e.id} - {e.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select name="type" required defaultValue="bonus" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="bonus">Bonus</option>
                      <option value="deduction">Deduction</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                    <input name="amount" type="number" step="0.01" min="0" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input name="description" type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Reason for adjustment" />
                </div>
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={() => setShowAdjustmentModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default PayrollManagement;
