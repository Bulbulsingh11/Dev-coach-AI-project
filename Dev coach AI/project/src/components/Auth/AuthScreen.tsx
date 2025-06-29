import React, { useState } from 'react';
import { User, Mail, Phone, Eye, EyeOff, ArrowRight, Shield, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    countryCode: '+1',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const { isLoaded: isGoogleLoaded, signIn: googleSignIn } = useGoogleAuth();

  // Common country codes
  const countryCodes = [
    { code: '+1', country: 'US/CA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+91', country: 'IN', flag: '🇮🇳' },
    { code: '+86', country: 'CN', flag: '🇨🇳' },
    { code: '+81', country: 'JP', flag: '🇯🇵' },
    { code: '+49', country: 'DE', flag: '🇩🇪' },
    { code: '+33', country: 'FR', flag: '🇫🇷' },
    { code: '+39', country: 'IT', flag: '🇮🇹' },
    { code: '+34', country: 'ES', flag: '🇪🇸' },
    { code: '+7', country: 'RU', flag: '🇷🇺' },
    { code: '+55', country: 'BR', flag: '🇧🇷' },
    { code: '+52', country: 'MX', flag: '🇲🇽' },
    { code: '+61', country: 'AU', flag: '🇦🇺' },
    { code: '+82', country: 'KR', flag: '🇰🇷' },
    { code: '+65', country: 'SG', flag: '🇸🇬' },
    { code: '+971', country: 'AE', flag: '🇦🇪' },
    { code: '+966', country: 'SA', flag: '🇸🇦' },
    { code: '+27', country: 'ZA', flag: '🇿🇦' },
    { code: '+234', country: 'NG', flag: '🇳🇬' },
    { code: '+20', country: 'EG', flag: '🇪🇬' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (authMode === 'signup' && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (loginMethod === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    } else {
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else {
        const phoneDigits = formData.phone.replace(/[^\d]/g, '');
        if (phoneDigits.length < 7 || phoneDigits.length > 15) {
          newErrors.phone = 'Please enter a valid phone number';
        }
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (authMode === 'signup') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrors({});
    
    try {
      const user = await googleSignIn();
      if (user) {
        // Store user info in localStorage for demo
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Mark as new user for onboarding
        localStorage.setItem('userJustSignedUp', 'true');
        onAuthSuccess();
      } else {
        setErrors({ general: 'Google sign-in was cancelled or failed. Please try again.' });
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setErrors({ general: 'Google sign-in failed. Please try again or use email/phone.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate form submission with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store demo user info
      const demoUser = {
        id: 'form-user-' + Date.now(),
        name: formData.name || 'User',
        email: formData.email || `${formData.countryCode}${formData.phone}`,
        picture: 'https://via.placeholder.com/96x96/6366f1/ffffff?text=' + (formData.name?.[0] || 'U')
      };
      localStorage.setItem('currentUser', JSON.stringify(demoUser));
      
      // Mark as new user for onboarding if signing up
      if (authMode === 'signup') {
        localStorage.setItem('userJustSignedUp', 'true');
      }
      
      onAuthSuccess();
    } catch (error) {
      setErrors({ general: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    // Different formatting based on country code
    if (formData.countryCode === '+1') {
      // US/Canada format: (XXX) XXX-XXXX
      if (phoneNumberLength < 4) return phoneNumber;
      if (phoneNumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
      }
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    } else if (formData.countryCode === '+44') {
      // UK format: XXXX XXX XXXX
      if (phoneNumberLength < 5) return phoneNumber;
      if (phoneNumberLength < 8) {
        return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4)}`;
      }
      return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7, 11)}`;
    } else {
      // Generic format with spaces every 3-4 digits
      if (phoneNumberLength < 4) return phoneNumber;
      if (phoneNumberLength < 7) {
        return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
      }
      if (phoneNumberLength < 11) {
        return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6)}`;
      }
      return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 9)} ${phoneNumber.slice(9)}`;
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleInputChange('phone', formatted);
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
    setErrors({});
    setFormData({
      email: '',
      phone: '',
      countryCode: '+1',
      password: '',
      name: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-200">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">DevCoach AI</h1>
          <p className="text-gray-600 dark:text-gray-400">Your personal development companion</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8 transition-colors duration-200">
          {/* Auth Mode Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 mb-6">
            <button
              onClick={switchAuthMode}
              disabled={isLoading}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                authMode === 'signin'
                  ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={switchAuthMode}
              disabled={isLoading}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                authMode === 'signup'
                  ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
            </div>
          )}

          {/* Google Auth Status */}
          {!isGoogleLoaded && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center space-x-2">
              <Loader2 className="w-4 h-4 text-blue-500 dark:text-blue-400 animate-spin" />
              <p className="text-sm text-blue-600 dark:text-blue-400">Loading Google authentication...</p>
            </div>
          )}

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-gray-600 dark:text-gray-400" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {isLoading ? 'Signing in...' : 'Continue with Google'}
            </span>
          </button>

          {/* Demo Notice */}
          <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">Demo Mode</p>
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  This is a demo app. Google sign-in will work with a demo account for testing purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">or</span>
            </div>
          </div>

          {/* Login Method Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 mb-6">
            <button
              onClick={() => setLoginMethod('email')}
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                loginMethod === 'email'
                  ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                loginMethod === 'phone'
                  ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>Phone</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {authMode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white ${
                    errors.name 
                      ? 'border-red-300 dark:border-red-600' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Enter your full name"
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </div>
            )}

            {loginMethod === 'email' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white ${
                    errors.email 
                      ? 'border-red-300 dark:border-red-600' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="flex space-x-2">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => handleInputChange('countryCode', e.target.value)}
                    className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white text-sm"
                    disabled={isLoading}
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className={`flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white ${
                      errors.phone 
                        ? 'border-red-300 dark:border-red-600' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Enter phone number"
                    disabled={isLoading}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Format: {formData.countryCode} {formData.countryCode === '+1' ? '(555) 123-4567' : 
                           formData.countryCode === '+44' ? '7700 900123' : '123 456 7890'}
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white ${
                    errors.password 
                      ? 'border-red-300 dark:border-red-600' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
              )}
            </div>

            {authMode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white ${
                    errors.confirmPassword 
                      ? 'border-red-300 dark:border-red-600' 
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {authMode === 'signin' && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{authMode === 'signin' ? 'Signing in...' : 'Creating account...'}</span>
                </>
              ) : (
                <>
                  <span>{authMode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Terms and Privacy */}
          {authMode === 'signup' && (
            <div className="mt-6 flex items-start space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>
                By creating an account, you agree to our{' '}
                <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">Privacy Policy</a>
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Secure authentication powered by industry-standard encryption</p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;