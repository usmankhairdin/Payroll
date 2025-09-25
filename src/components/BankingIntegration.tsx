import React, { useState } from 'react';
import { CreditCard, Building, Plus, Settings, Download, DollarSign, Clock, Shield, Zap } from 'lucide-react';

const BankingIntegration = () => {
  const [selectedTab, setSelectedTab] = useState('accounts');
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showNewTransfer, setShowNewTransfer] = useState(false);

  const bankAccounts = [
    {
      id: 1,
      bankName: 'Chase Bank',
      accountType: 'Business Checking',
      accountNumber: '****1234',
      balance: 125000,
      status: 'Active',
      isDefault: true,
      lastSync: '2024-04-01 10:30 AM'
    },
    {
      id: 2,
      bankName: 'Bank of America',
      accountType: 'Payroll Account',
      accountNumber: '****5678',
      balance: 85000,
      status: 'Active',
      isDefault: false,
      lastSync: '2024-04-01 10:25 AM'
    },
    {
      id: 3,
      bankName: 'Wells Fargo',
      accountType: 'Tax Escrow',
      accountNumber: '****9012',
      balance: 45000,
      status: 'Inactive',
      isDefault: false,
      lastSync: '2024-03-28 02:15 PM'
    }
  ];

  const transactions = [
    {
      id: 1,
      type: 'Payroll Disbursement',
      amount: -124500,
      date: '2024-03-31',
      status: 'Completed',
      employees: 247,
      reference: 'PAY-2024-03-001'
    },
    {
      id: 2,
      type: 'Tax Payment',
      amount: -18750,
      date: '2024-03-30',
      status: 'Completed',
      employees: null,
      reference: 'TAX-2024-03-001'
    },
    {
      id: 3,
      type: 'Direct Deposit',
      amount: -98500,
      date: '2024-03-15',
      status: 'Completed',
      employees: 195,
      reference: 'DD-2024-03-001'
    },
    {
      id: 4,
      type: 'Bank Transfer',
      amount: 50000,
      date: '2024-03-10',
      status: 'Pending',
      employees: null,
      reference: 'TRF-2024-03-001'
    }
  ];

  const paymentMethods = [
    { name: 'Direct Deposit', enabled: true, fee: '$0.00', description: 'Electronic transfer to employee bank accounts' },
    { name: 'ACH Transfer', enabled: true, fee: '$0.25', description: 'Automated Clearing House transfers' },
    { name: 'Wire Transfer', enabled: false, fee: '$15.00', description: 'Same-day wire transfers for urgent payments' },
    { name: 'Check Printing', enabled: true, fee: '$2.50', description: 'Physical checks for employees without bank accounts' }
  ];

  const tabs = [
    { id: 'accounts', name: 'Bank Accounts', icon: Building },
    { id: 'transactions', name: 'Transactions', icon: DollarSign },
    { id: 'payments', name: 'Payment Methods', icon: CreditCard },
    { id: 'settings', name: 'Banking Settings', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'accounts':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Connected Bank Accounts</h3>
              <button
                onClick={() => setShowAddAccount(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Account
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {bankAccounts.map((account) => (
                <div key={account.id} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400 to-purple-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-gray-900">{account.bankName}</h4>
                        <p className="text-sm text-gray-600">{account.accountType}</p>
                      </div>
                    </div>
                    {account.isDefault && (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                        Default
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Account</span>
                      <span className="text-sm font-medium">{account.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Balance</span>
                      <span className="text-sm font-bold text-emerald-600">${account.balance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        account.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {account.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Sync</span>
                      <span className="text-xs text-gray-500">{account.lastSync}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => {
                        alert(`Syncing ${account.bankName} account...`);
                        console.log('Syncing account:', account.id);
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 text-sm"
                    >
                      <Zap className="w-4 h-4 inline mr-1" />
                      Sync
                    </button>
                    <button
                      onClick={() => {
                        alert(`Opening settings for ${account.bankName}`);
                      }}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200 text-sm"
                    >
                      <Settings className="w-4 h-4 inline mr-1" />
                      Settings
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'transactions':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    alert('Exporting transaction history...');
                    console.log('Exporting transactions:', transactions);
                  }}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button
                  onClick={() => setShowNewTransfer(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Transfer
                </button>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-blue-50/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 transition-all duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{transaction.type}</div>
                            {transaction.employees && (
                              <div className="text-sm text-gray-500">{transaction.employees} employees</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-bold ${
                            transaction.amount > 0 ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            transaction.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                            transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.reference}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Payment Methods Configuration</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {paymentMethods.map((method, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400 to-purple-600 shadow-lg">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-gray-900">{method.name}</h4>
                        <p className="text-sm text-gray-600">Fee: {method.fee}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={method.enabled} readOnly />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600">{method.description}</p>
                  <button
                    onClick={() => {
                      alert(`Configuring ${method.name} payment method...`);
                    }}
                    className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                  >
                    Configure
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Banking Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Bank Account</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Chase Bank - ****1234</option>
                    <option>Bank of America - ****5678</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Processing Time</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Same Day</option>
                    <option>Next Business Day</option>
                    <option>2-3 Business Days</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Auto-sync Frequency</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Every Hour</option>
                    <option>Every 4 Hours</option>
                    <option>Daily</option>
                    <option>Manual Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Limit</label>
                  <input
                    type="number"
                    placeholder="Enter limit"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Enable Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Require 2FA for all banking operations</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-600">Send email alerts for all transactions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Automatic Reconciliation</p>
                    <p className="text-sm text-gray-600">Auto-reconcile transactions with bank statements</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
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
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Banking Integration</h1>
          <p className="text-gray-600">Manage bank accounts and payment processing</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 flex items-center shadow-lg">
            <Zap className="w-4 h-4 mr-2" />
            Sync All
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center shadow-lg">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Connected Accounts</p>
              <p className="text-2xl font-bold text-blue-600">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Balance</p>
              <p className="text-2xl font-bold text-emerald-600">$255,000</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending Transactions</p>
              <p className="text-2xl font-bold text-orange-600">1</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Security Score</p>
              <p className="text-2xl font-bold text-purple-600">98%</p>
            </div>
          </div>
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

      {/* Add Bank Account Modal */}
      {showAddAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Add Bank Account</h2>
                <button onClick={() => setShowAddAccount(false)} className="text-gray-400 hover:text-gray-600">×</button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const bankName = fd.get('bankName') as string;
                  const accountType = fd.get('accountType') as string;
                  if (bankName && accountType) {
                    alert(`Bank account ${bankName} (${accountType}) added successfully!`);
                    setShowAddAccount(false);
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                  <input name="bankName" type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                  <input name="accountType" type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={() => setShowAddAccount(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Account</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* New Transfer Modal */}
      {showNewTransfer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">New Transfer</h2>
                <button onClick={() => setShowNewTransfer(false)} className="text-gray-400 hover:text-gray-600">×</button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const amount = fd.get('amount') as string;
                  const recipient = fd.get('recipient') as string;
                  if (amount && recipient) {
                    alert(`Transfer of $${amount} to ${recipient} initiated!`);
                    setShowNewTransfer(false);
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <input name="amount" type="number" min="0" step="0.01" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipient</label>
                  <input name="recipient" type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={() => setShowNewTransfer(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankingIntegration;
