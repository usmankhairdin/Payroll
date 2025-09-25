import React, { useState } from 'react';
import { HelpCircle, Search, Book, MessageCircle, Phone, Mail, FileText, Video, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import Footer from './Footer';

const HelpSupport = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    { id: 'all', name: 'All Topics', icon: HelpCircle },
    { id: 'payroll', name: 'Payroll', icon: Zap },
    { id: 'employees', name: 'Employees', icon: Users },
    { id: 'reports', name: 'Reports', icon: FileText },
    { id: 'settings', name: 'Settings', icon: CheckCircle }
  ];

  const faqs = [
    {
      id: 1,
      category: 'payroll',
      question: 'How do I run payroll for the first time?',
      answer: 'To run payroll, navigate to the Payroll section and click "Run Payroll". Follow the step-by-step wizard to select pay period, review data, make adjustments, preview, and finalize.',
      helpful: 45,
      views: 1250
    },
    {
      id: 2,
      category: 'employees',
      question: 'How do I add a new employee to the system?',
      answer: 'Go to Employee Management, click "Add Employee", and fill out the wizard with personal info, job details, salary & benefits, and tax & bank information.',
      helpful: 38,
      views: 980
    },
    {
      id: 3,
      category: 'payroll',
      question: 'Can I make adjustments to payroll after processing?',
      answer: 'Once payroll is finalized and disbursed, it cannot be modified. However, you can make corrections in the next payroll cycle or process a separate adjustment.',
      helpful: 29,
      views: 756
    },
    {
      id: 4,
      category: 'reports',
      question: 'How do I generate tax reports?',
      answer: 'Navigate to Reports & Analytics, select the tax report type you need, choose your date range and filters, then click "Generate Report" to download.',
      helpful: 33,
      views: 642
    },
    {
      id: 5,
      category: 'settings',
      question: 'How do I configure tax settings?',
      answer: 'Go to Settings > Tax Configuration to set up tax rates, filing status options, and automatic calculation preferences for your organization.',
      helpful: 27,
      views: 534
    },
    {
      id: 6,
      category: 'employees',
      question: 'How do I manage employee leave requests?',
      answer: 'Use the Leave & Attendance section to view, approve, or reject leave requests. You can also set up leave policies and track balances.',
      helpful: 31,
      views: 489
    }
  ];

  const supportChannels = [
    {
      name: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      availability: 'Available 24/7',
      responseTime: 'Avg. 2 minutes',
      color: 'blue'
    },
    {
      name: 'Phone Support',
      description: 'Speak directly with a support specialist',
      icon: Phone,
      availability: 'Mon-Fri 9AM-6PM EST',
      responseTime: 'Immediate',
      color: 'emerald'
    },
    {
      name: 'Email Support',
      description: 'Send us a detailed message',
      icon: Mail,
      availability: 'Available 24/7',
      responseTime: 'Within 4 hours',
      color: 'purple'
    },
    {
      name: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      icon: Video,
      availability: 'Available 24/7',
      responseTime: 'Self-service',
      color: 'orange'
    }
  ];

  const quickLinks = [
    { name: 'Getting Started Guide', icon: Book, description: 'Complete setup walkthrough' },
    { name: 'Video Tutorials', icon: Video, description: 'Visual learning resources' },
    { name: 'API Documentation', icon: FileText, description: 'Developer resources' },
    { name: 'System Status', icon: CheckCircle, description: 'Check service availability' }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 min-h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Help & Support</h1>
          <p className="text-gray-600">Find answers and get assistance with PayrollPro</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center shadow-lg">
          <MessageCircle className="w-4 h-4 mr-2" />
          Contact Support
        </button>
      </div>

      {/* Quick Search */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-8 mb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How can we help you?</h2>
          <p className="text-gray-600">Search our knowledge base or browse categories below</p>
        </div>
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for help articles, guides, or tutorials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Support Channels */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Get Support</h3>
              <div className="space-y-4">
                {supportChannels.map((channel, index) => {
                  const Icon = channel.icon;
                  return (
                    <button key={index} className={`w-full p-4 rounded-xl border border-gray-200 hover:bg-gradient-to-r hover:from-${channel.color}-50 hover:to-${channel.color}-100 hover:border-${channel.color}-300 hover:shadow-lg hover:scale-105 transition-all duration-200 text-left group`}>
                      <div className="flex items-center mb-2">
                        <Icon className={`w-5 h-5 mr-3 text-${channel.color}-600 group-hover:scale-110 transition-transform duration-200`} />
                        <span className="font-medium text-gray-900">{channel.name}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{channel.description}</p>
                      <div className="text-xs text-gray-500">
                        <p>{channel.availability}</p>
                        <p>{channel.responseTime}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-3">
                {quickLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <button key={index} className="w-full flex items-center p-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:shadow-md transition-all duration-200 text-left group">
                      <Icon className="w-4 h-4 mr-3 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{link.name}</p>
                        <p className="text-xs text-gray-500">{link.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="lg:col-span-3">
          {/* Category Filters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h3>
            <div className="flex flex-wrap gap-3">
              {faqCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center px-4 py-2 rounded-xl border transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg'
                        : 'border-gray-300 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-900 flex-1">{faq.question}</h4>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    faq.category === 'payroll' ? 'bg-blue-100 text-blue-800' :
                    faq.category === 'employees' ? 'bg-emerald-100 text-emerald-800' :
                    faq.category === 'reports' ? 'bg-purple-100 text-purple-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {faq.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{faq.answer}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>{faq.helpful} people found this helpful</span>
                    <span>{faq.views} views</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors duration-200">
                      Helpful
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                      Not Helpful
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-12 text-center">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search terms or browse different categories.</p>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                Contact Support
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HelpSupport;