import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function RegisterModal({ onClose, onSwitchToLogin }) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        dateOfBirth: '', // <-- 1. ADDED THIS
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        const apiUrl = 'http://localhost:8080/api/auth/register';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // This now sends dateOfBirth
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `HTTP error! status: ${response.status}`);
            }

            console.log("Registration successful!");
            setSuccess("Registration successful! Please log in.");

            setTimeout(() => {
                onSwitchToLogin();
            }, 2000);

        } catch (error) {
            console.error('Registration failed:', error.message);
            setError(error.message);
        }
    };
    // --- END OF MODIFIED FUNCTION ---

    return (
        // The overlay
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
        >
            {/* The modal content */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl"
                    aria-label="Close modal"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">{t('modal_register_title')}</h2>

                {/* (Success and Error messages remain the same) */}
                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{success}</span>
                    </div>
                )}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* (First Name) */}
                        <div>
                            <label htmlFor="reg-firstName" className="block text-sm font-medium text-gray-700 mb-1">{t('modal_label_firstname')}</label>
                            <input
                                id="reg-firstName"
                                name="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        {/* (Last Name) */}
                        <div>
                            <label htmlFor="reg-lastName" className="block text-sm font-medium text-gray-700 mb-1">{t('modal_label_lastname')}</label>
                            <input
                                id="reg-lastName"
                                name="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                    {/* (Phone) */}
                    <div>
                        <label htmlFor="reg-phone" className="block text-sm font-medium text-gray-700 mb-1">{t('modal_label_phone')}</label>
                        <input
                            id="reg-phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* --- 2. ADD THE NEW 'dateOfBirth' FIELD --- */}
                    <div>
                        <label htmlFor="reg-dob" className="block text-sm font-medium text-gray-700 mb-1">{t('modal_label_dob')}</label>
                        <input
                            id="reg-dob"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    {/* --- END OF NEW FIELD --- */}

                    {/* (Email) */}
                    <div>
                        <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 mb-1">{t('modal_label_email')}</label>
                        <input
                            id="reg-email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    {/* (Password) */}
                    <div>
                        <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 mb-1">{t('modal_label_password')}</label>
                        <input
                            id="reg-password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700">
                        {t('modal_button_register')}
                    </button>
                    <p className="text-center text-sm text-gray-600 pt-2">
                        {t('modal_register_prompt')}{' '}
                        <button
                            type="button"
                            onClick={onSwitchToLogin}
                            className="font-medium text-indigo-600 hover:underline bg-transparent border-none p-0 cursor-pointer"
                        >
                            {t('modal_register_prompt_link')}
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};