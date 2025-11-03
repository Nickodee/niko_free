import { Upload, CheckCircle, Building2, Mail, Phone, Tag, FileText, ArrowRight, ArrowLeft, MapPin, PenTool } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface BecomePartnerProps {
  onNavigate: (page: string) => void;
}

export default function BecomePartner({ onNavigate }: BecomePartnerProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    logo: null as File | null,
    location: '',
    categories: [] as string[],
    interests: '',
    email: '',
    phone: '',
    signature: '',
    acceptTerms: false
  });
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { id: 'travel', name: 'Travel', icon: '✈️' },
    { id: 'sports', name: 'Sports & Fitness', icon: '🏋️' },
    { id: 'social', name: 'Social Activities', icon: '👥' },
    { id: 'music', name: 'Music & Culture', icon: '🎵' },
    { id: 'health', name: 'Health & Wellbeing', icon: '❤️' },
    { id: 'pets', name: 'Pets & Animals', icon: '🐕' },
    { id: 'autofest', name: 'Autofest', icon: '🚗' },
    { id: 'hobbies', name: 'Hobbies & Interests', icon: '✨' },
    { id: 'gaming', name: 'Gaming', icon: '🎮' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️' },
    { id: 'religious', name: 'Religious', icon: '⛪' },
    { id: 'dance', name: 'Dance', icon: '🎯' },
  ];

  const handleCategoryToggle = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const canProceedStep1 = formData.businessName && formData.location;
  const canProceedStep2 = formData.categories.length > 0;
  const canProceedStep3 = formData.email && formData.phone;
  const canProceedStep4 = formData.signature && formData.acceptTerms;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onNavigate={onNavigate} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
            <p className="text-xl text-gray-600 mb-4">
              Thank you for your interest in becoming a partner.
            </p>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
              <p className="text-lg font-semibold text-blue-900 mb-2">What's Next?</p>
              <p className="text-gray-700">
                Our admin team will review your application within 24 hours. You'll receive an email at <strong>{formData.email}</strong> with the approval status.
              </p>
            </div>
            <button
              onClick={() => onNavigate('landing')}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={onNavigate} />

      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Become a Partner
          </h1>
          <p className="text-lg text-blue-100 text-center mb-8">
            Join thousands of event organizers using Niko Free
          </p>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      currentStep >= step
                        ? 'bg-white text-blue-600'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {step}
                  </div>
                  <span className="text-xs text-blue-100 mt-2 hidden sm:block">
                    {step === 1 && 'Basic Info'}
                    {step === 2 && 'Categories'}
                    {step === 3 && 'Contact'}
                    {step === 4 && 'Sign'}
                  </span>
                </div>
                {step < 4 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-all ${
                      currentStep > step ? 'bg-white' : 'bg-blue-500'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Basic Information</h2>
                <p className="text-gray-600">Tell us about your business</p>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <Building2 className="w-4 h-4" />
                  <span>Business/Brand Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter your business or brand name"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <Upload className="w-4 h-4" />
                  <span>Logo Upload</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setFormData({ ...formData, logo: e.target.files?.[0] || null })}
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Location *</span>
                </label>
                <select
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="">Select your location</option>
                  <option value="Nairobi">Nairobi</option>
                  <option value="Mombasa">Mombasa</option>
                  <option value="Kisumu">Kisumu</option>
                  <option value="Nakuru">Nakuru</option>
                  <option value="Eldoret">Eldoret</option>
                  <option value="Thika">Thika</option>
                  <option value="Malindi">Malindi</option>
                  <option value="Meru">Meru</option>
                </select>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleNext}
                  disabled={!canProceedStep1}
                  className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center space-x-2 ${
                    canProceedStep1
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Categories & Interests */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Categories & Interests</h2>
                <p className="text-gray-600">What type of events will you organize?</p>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-4">
                  <Tag className="w-4 h-4" />
                  <span>Select Categories * (Choose at least one)</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleCategoryToggle(category.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        formData.categories.includes(category.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <div className="text-sm font-semibold text-gray-900">{category.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <FileText className="w-4 h-4" />
                  <span>Additional Interests (Optional)</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.interests}
                  onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us more about specific interests or niche event types you plan to organize..."
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={handlePrevious}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-blue-500 hover:text-blue-600 transition-all flex items-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canProceedStep2}
                  className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center space-x-2 ${
                    canProceedStep2
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Contact Details</h2>
                <p className="text-gray-600">How can we reach you?</p>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4" />
                  <span>Email to Receive RSVPs *</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="email@example.com"
                />
                <p className="text-sm text-gray-500 mt-1">You'll receive event confirmations and attendee notifications here</p>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4" />
                  <span>Contact Phone Number *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="+254 700 000 000"
                />
                <p className="text-sm text-gray-500 mt-1">This will be displayed to attendees for inquiries</p>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={handlePrevious}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-blue-500 hover:text-blue-600 transition-all flex items-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canProceedStep3}
                  className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center space-x-2 ${
                    canProceedStep3
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Sign Contract */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Partner Agreement</h2>
                <p className="text-gray-600">Review and sign the partner contract</p>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Partner Terms & Conditions</span>
                </h3>
                <div className="text-sm text-gray-700 space-y-2 mb-4 max-h-60 overflow-y-auto bg-white p-4 rounded-lg">
                  <p className="font-semibold">By signing this agreement, you agree to:</p>
                  <p>• Pay a 7% commission on all ticket sales processed through Niko Free</p>
                  <p>• Ensure all events comply with local laws and regulations</p>
                  <p>• Maintain high quality standards and attendee satisfaction</p>
                  <p>• Provide accurate event information and timely updates</p>
                  <p>• Respond to attendee inquiries within 24 hours</p>
                  <p>• Accept that Niko Free reserves the right to remove events that violate guidelines</p>
                  <p>• Understand that payment processing takes 2-3 business days</p>
                  <p>• Maintain ownership of your event content and data</p>
                  <p>• Comply with our data protection and privacy policies</p>
                  <p className="pt-2 font-semibold">Cancellation & Refund Policy:</p>
                  <p>• Refunds must be processed according to your stated event policy</p>
                  <p>• Partners are responsible for communicating cancellations to attendees</p>
                </div>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                  Read Full Terms & Conditions →
                </button>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <PenTool className="w-4 h-4" />
                  <span>Digital Signature *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.signature}
                  onChange={(e) => setFormData({ ...formData, signature: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors font-cursive text-xl"
                  placeholder="Type your full name as signature"
                  style={{ fontFamily: 'Brush Script MT, cursive' }}
                />
                <p className="text-sm text-gray-500 mt-1">By typing your name, you agree to sign this contract electronically</p>
              </div>

              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                    className="mt-1 w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    I have read and agree to the Partner Terms & Conditions and Privacy Policy. I understand that my digital signature above constitutes a legally binding agreement.
                  </span>
                </label>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={handlePrevious}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-blue-500 hover:text-blue-600 transition-all flex items-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!canProceedStep4}
                  className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center space-x-2 ${
                    canProceedStep4
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Submit Application</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
}
