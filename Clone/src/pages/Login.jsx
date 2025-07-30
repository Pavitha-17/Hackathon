import React, { useState } from 'react';
import { ChevronDown, Download, ArrowRight } from 'lucide-react';
import logo from '../assets/images/logo-w.png'
import { useNavigate } from 'react-router-dom'; // Add this at the top


const countries = [
    { code: 'IN', name: 'India', dialCode: '+91', flag: 'https://flagcdn.com/w20/in.png' },
    { code: 'US', name: 'United States', dialCode: '+1', flag: 'https://flagcdn.com/w20/us.png' },
    { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: 'https://flagcdn.com/w20/gb.png' },
    { code: 'CA', name: 'Canada', dialCode: '+1', flag: 'https://flagcdn.com/w20/ca.png' },
    { code: 'AU', name: 'Australia', dialCode: '+61', flag: 'https://flagcdn.com/w20/au.png' },
    { code: 'DE', name: 'Germany', dialCode: '+49', flag: 'https://flagcdn.com/w20/de.png' },
    { code: 'FR', name: 'France', dialCode: '+33', flag: 'https://flagcdn.com/w20/fr.png' },
    { code: 'JP', name: 'Japan', dialCode: '+81', flag: 'https://flagcdn.com/w20/jp.png' },
    { code: 'BR', name: 'Brazil', dialCode: '+55', flag: 'https://flagcdn.com/w20/br.png' },
    { code: 'SG', name: 'Singapore', dialCode: '+65', flag: 'https://flagcdn.com/w20/sg.png' },
    { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: 'https://flagcdn.com/w20/ae.png' },
    { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: 'https://flagcdn.com/w20/sa.png' },
    { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: 'https://flagcdn.com/w20/my.png' },
    { code: 'TH', name: 'Thailand', dialCode: '+66', flag: 'https://flagcdn.com/w20/th.png' },
    { code: 'PH', name: 'Philippines', dialCode: '+63', flag: 'https://flagcdn.com/w20/ph.png' },
    { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: 'https://flagcdn.com/w20/id.png' },
    { code: 'VN', name: 'Vietnam', dialCode: '+84', flag: 'https://flagcdn.com/w20/vn.png' },
    { code: 'KR', name: 'South Korea', dialCode: '+82', flag: 'https://flagcdn.com/w20/kr.png' },
    { code: 'CN', name: 'China', dialCode: '+86', flag: 'https://flagcdn.com/w20/cn.png' },
    { code: 'HK', name: 'Hong Kong', dialCode: '+852', flag: 'https://flagcdn.com/w20/hk.png' }
];

export default function WhatsAppPhoneInput() {
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [errors, setErrors] = useState({});

    const validatePhoneNumber = (number) => {
        const cleaned = number.replace(/\D/g, '');
        if (!cleaned) return 'Phone number is required';
        if (cleaned.length < 10) return 'Phone number must be at least 10 digits';
        if (cleaned.length > 15) return 'Phone number cannot exceed 15 digits';
        return null;
    };
    const navigate = useNavigate(); // Initialize navigation


    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);

        // Clear errors when user starts typing
        if (errors.phone) {
            setErrors(prev => ({ ...prev, phone: null }));
        }
    };

    const handleNext = () => {
        const phoneError = validatePhoneNumber(phoneNumber);

        if (phoneError) {
            setErrors({ phone: phoneError });
            return;
        }

        // Clear errors and proceed
        setErrors({});
        navigate("/chat");
        
       
    };

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setShowDropdown(false);
    };

    return (
        <div className="min-h-screen bg-[#f0f2f5] flex flex-col">
            {/* WhatsApp Logo */}
            <div className="flex justify-start w-xs">

                <img src={logo} alt="" className='w-3xs' />
            </div>

            <div className="flex flex-col items-center flex-grow px-4">
                {/* Download Banner */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex items-center p-4 mb-8 max-w-2xl w-full">
                    <div className="flex items-center mr-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex-grow">
                        <h3 className="font-semibold text-gray-800 mb-1">Download WhatsApp for Windows</h3>
                        <p className="text-sm text-gray-600">
                            Make calls, share your screen and get a faster experience when you download the Windows app.
                        </p>
                    </div>
                    <a
                        href="https://www.whatsapp.com/download"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="bg-[#25d366] hover:bg-[#20bd5a] text-white px-6 py-2 rounded-full font-medium flex items-center space-x-2 transition-colors">
                            <Download size={16} />
                            <span>Download</span>

                        </button>
                    </a>

                </div>

                {/* Phone Number Form */}
                <div className="bg-white p-8 rounded-3xl shadow-sm max-w-md w-full text-center border border-gray-100">
                    <h2 className="text-3xl font-light text-gray-800 mb-2">Enter phone number</h2>
                    <p className="text-gray-500 mb-8">Select a country and enter your phone number.</p>

                    {/* Country Selector */}
                    <div className="mb-4 relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-xl hover:border-gray-400 transition-colors bg-white"
                        >
                            <div className="flex items-center space-x-3">
                                <img
                                    src={selectedCountry.flag}
                                    alt={selectedCountry.name}
                                    className="w-6 h-4 object-cover rounded-sm"
                                />
                                <span className="text-gray-700 font-medium">{selectedCountry.name}</span>
                            </div>
                            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown */}
                        {showDropdown && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                                {countries.map((country) => (
                                    <button
                                        key={country.code}
                                        onClick={() => handleCountrySelect(country)}
                                        className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors text-left"
                                    >
                                        <img
                                            src={country.flag}
                                            alt={country.name}
                                            className="w-6 h-4 object-cover rounded-sm"
                                        />
                                        <span className="text-gray-700">{country.name}</span>
                                        <span className="text-gray-500 text-sm ml-auto">{country.dialCode}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Phone Number Input */}
                    <div className="mb-6">
                        <div className={`flex border rounded-xl overflow-hidden ${errors.phone ? 'border-red-500' : 'border-gray-300'} hover:border-gray-400 transition-colors`}>
                            <div className="flex items-center bg-gray-50 px-4 py-4 border-r border-gray-300">
                                <span className="text-gray-700 font-medium">{selectedCountry.dialCode}</span>
                            </div>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={handlePhoneChange}
                                placeholder="Enter your phone number"
                                className="flex-1 p-4 outline-none bg-white"
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-2 text-left">{errors.phone}</p>
                        )}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={handleNext}
                        className="bg-[#25d366] hover:bg-[#20bd5a] text-white px-8 py-3 rounded-full font-medium transition-colors mb-6"
                    >
                        Next
                    </button>

                    {/* QR Code Link */}
                    <button className="text-[#007bff] hover:underline text-sm flex items-center justify-center space-x-1 mx-auto">
                        <span>Log in with QR code</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}