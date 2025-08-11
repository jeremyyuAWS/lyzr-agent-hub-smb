import React, { useState } from 'react';
import { X, Building, Users, CheckCircle, ArrowRight, Mail, Globe, CreditCard } from 'lucide-react';

interface OnboardingModalProps {
  type: 'si' | 'smb';
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ type, isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const steps = type === 'si' 
    ? [
        { id: 1, title: 'Company Information', icon: Building },
        { id: 2, title: 'Contact & Access', icon: Users }, 
        { id: 3, title: 'License Allocation', icon: CreditCard },
        { id: 4, title: 'Configuration', icon: Globe }
      ]
    : [
        { id: 1, title: 'Company Profile', icon: Building },
        { id: 2, title: 'Team Setup', icon: Users },
        { id: 3, title: 'Agent Selection', icon: CreditCard }
      ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderSISteps = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">System Integrator Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  placeholder="e.g., TechFlow Solutions"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFormData('industry', e.target.value)}
                >
                  <option value="">Select Industry</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="consulting">Consulting</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFormData('companySize', e.target.value)}
                >
                  <option value="">Select Size</option>
                  <option value="startup">Startup (1-10)</option>
                  <option value="small">Small (11-50)</option>
                  <option value="medium">Medium (51-200)</option>
                  <option value="large">Large (200+)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="url"
                  placeholder="https://www.company.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFormData('website', e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Description</label>
              <textarea
                rows={3}
                placeholder="Brief description of your services and target market..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                onChange={(e) => updateFormData('description', e.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">Primary Contact & Access</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFormData('contactName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  placeholder="CEO, CTO, Partner"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFormData('contactTitle', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  placeholder="contact@company.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFormData('email', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFormData('phone', e.target.value)}
                />
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Access Credentials</h4>
              <p className="text-sm text-blue-700 mb-3">We'll create an admin account for your SI portal:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-blue-800 mb-1">Domain Prefix</label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="techflow"
                      className="flex-1 px-3 py-2 border border-blue-300 rounded-l-lg bg-white"
                      onChange={(e) => updateFormData('domainPrefix', e.target.value)}
                    />
                    <span className="px-3 py-2 bg-blue-100 border border-blue-300 rounded-r-lg text-sm text-blue-800">.lyzr.ai</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-blue-800 mb-1">Admin Username</label>
                  <input
                    type="text"
                    placeholder="admin"
                    className="w-full px-3 py-2 border border-blue-300 rounded-lg bg-white"
                    onChange={(e) => updateFormData('adminUsername', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">License Allocation</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Available MSP Licenses: 150</h4>
              <p className="text-sm text-gray-600 mb-4">Allocate licenses to this System Integrator</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">License Package *</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFormData('licensePackage', e.target.value)}
                >
                  <option value="">Select Package</option>
                  <option value="starter">Starter (10 licenses)</option>
                  <option value="professional">Professional (25 licenses)</option>
                  <option value="enterprise">Enterprise (50 licenses)</option>
                  <option value="custom">Custom Amount</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Markup Percentage</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="25"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFormData('markup', e.target.value)}
                />
              </div>
            </div>
            {formData.licensePackage === 'custom' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Custom License Count</label>
                <input
                  type="number"
                  min="1"
                  max="150"
                  placeholder="30"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFormData('customLicenseCount', e.target.value)}
                />
              </div>
            )}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h5 className="font-medium text-green-800 mb-1">License Pricing Summary</h5>
              <div className="text-sm text-green-700 space-y-1">
                <div className="flex justify-between">
                  <span>Base Cost (per license):</span>
                  <span>$50/month</span>
                </div>
                <div className="flex justify-between">
                  <span>SI Price (with markup):</span>
                  <span>$62.50/month</span>
                </div>
                <div className="flex justify-between font-medium border-t border-green-300 pt-2">
                  <span>Total Monthly Cost:</span>
                  <span>$1,562.50</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">White-Label Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Globe className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload your company logo (PNG, JPG)</p>
                  <input type="file" accept="image/*" className="hidden" />
                  <button className="mt-2 bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50">
                    Choose File
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Primary Brand Color</label>
                  <input
                    type="color"
                    className="w-full h-10 border border-gray-300 rounded-lg"
                    onChange={(e) => updateFormData('primaryColor', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Brand Color</label>
                  <input
                    type="color"
                    className="w-full h-10 border border-gray-300 rounded-lg"
                    onChange={(e) => updateFormData('secondaryColor', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label>
                <input
                  type="text"
                  placeholder="TechFlow AI Platform"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFormData('platformName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Welcome Message</label>
                <textarea
                  rows={3}
                  placeholder="Welcome to your AI-powered business automation platform..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  onChange={(e) => updateFormData('welcomeMessage', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderSMBSteps = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">SMB Company Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Global Dynamics"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFormData('industry', e.target.value)}
                >
                  <option value="">Select Industry</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                  <option value="services">Professional Services</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFormData('companySize', e.target.value)}
                >
                  <option value="">Select Size</option>
                  <option value="micro">Micro (1-10 employees)</option>
                  <option value="small">Small (11-50 employees)</option>
                  <option value="medium">Medium (51-250 employees)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Revenue</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFormData('revenue', e.target.value)}
                >
                  <option value="">Select Range</option>
                  <option value="under1m">Under $1M</option>
                  <option value="1m-5m">$1M - $5M</option>
                  <option value="5m-25m">$5M - $25M</option>
                  <option value="over25m">Over $25M</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Contact Name *</label>
                <input
                  type="text"
                  placeholder="Jane Smith"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFormData('contactName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  placeholder="jane@globaldynamics.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => updateFormData('email', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">Team Setup</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Which departments will use AI agents?</label>
              <div className="space-y-3">
                {[
                  { id: 'finance', name: 'Finance & Accounting', users: '3-5 users' },
                  { id: 'marketing', name: 'Marketing & Sales', users: '4-8 users' },
                  { id: 'operations', name: 'Operations & HR', users: '2-4 users' },
                  { id: 'legal', name: 'Legal & Compliance', users: '1-3 users' },
                  { id: 'it', name: 'IT & Support', users: '2-5 users' }
                ].map(dept => (
                  <label key={dept.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 mr-3"
                      onChange={(e) => {
                        const currentDepts = formData.departments || [];
                        if (e.target.checked) {
                          updateFormData('departments', [...currentDepts, dept.id]);
                        } else {
                          updateFormData('departments', currentDepts.filter((d: string) => d !== dept.id));
                        }
                      }}
                    />
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">{dept.name}</span>
                      <span className="text-sm text-gray-600 ml-2">({dept.users})</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Total Users</label>
              <input
                type="number"
                min="1"
                placeholder="20"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => updateFormData('estimatedUsers', e.target.value)}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black">Agent Selection</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-700">Based on your department selection, we recommend these agents:</p>
            </div>
            <div className="space-y-3">
              {[
                { id: 'finance_agent', name: 'Finance Agent', description: 'Financial analysis, budgeting, reporting', recommended: formData.departments?.includes('finance') },
                { id: 'marketing_agent', name: 'Marketing Agent', description: 'Content creation, campaign optimization', recommended: formData.departments?.includes('marketing') },
                { id: 'legal_agent', name: 'Legal Agent', description: 'Contract review, compliance checking', recommended: formData.departments?.includes('legal') },
                { id: 'operations_agent', name: 'Operations Agent', description: 'Process optimization, workflow automation', recommended: formData.departments?.includes('operations') },
                { id: 'support_agent', name: 'Support Agent', description: 'Customer support, ticket management', recommended: formData.departments?.includes('it') },
              ].map(agent => (
                <label key={agent.id} className={`flex items-start p-3 border rounded-lg hover:bg-gray-50 ${agent.recommended ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 mr-3 mt-1"
                    defaultChecked={agent.recommended}
                    onChange={(e) => {
                      const currentAgents = formData.selectedAgents || [];
                      if (e.target.checked) {
                        updateFormData('selectedAgents', [...currentAgents, agent.id]);
                      } else {
                        updateFormData('selectedAgents', currentAgents.filter((a: string) => a !== agent.id));
                      }
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">{agent.name}</span>
                      {agent.recommended && (
                        <span className="ml-2 px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{agent.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-black">
              Add {type === 'si' ? 'System Integrator' : 'SMB Client'}
            </h2>
            <p className="text-sm text-gray-600">
              Step {currentStep} of {steps.length} - {steps[currentStep - 1]?.title}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    isCompleted ? 'bg-green-600 text-white' : 
                    isCurrent ? 'bg-blue-600 text-white' : 
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isCurrent ? 'text-black' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-gray-400 ml-4" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {type === 'si' ? renderSISteps() : renderSMBSteps()}
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>{currentStep === steps.length ? 'Complete Setup' : 'Next'}</span>
            {currentStep < steps.length && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;