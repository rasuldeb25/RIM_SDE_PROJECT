import React, { useState } from 'react';

// This component now handles both Login and Registration.
export default function LoginModal({ onClose, onLoginSuccess }) {
    // This state tracks whether we are in "login" or "register" mode.
    const [isRegistering, setIsRegistering] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // In a real app, you would check if isRegistering is true
        // and send data to a '/api/auth/register' endpoint.
        // For now, any successful submission will lead to the dashboard.
        onLoginSuccess();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative transition-all duration-300">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">&times;</button>

                <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
                    {isRegistering ? 'Create Your Account' : 'Patient Portal Login'}
                </h2>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* These fields only show when isRegistering is true */}
                    {isRegistering && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input id="firstName" type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"/>
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input id="lastName" type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input id="phone" type="tel" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"/>
                            </div>
                        </>
                    )}

                    {/* These fields are for both login and registration */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input id="email" type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input id="password" type="password" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"/>
                    </div>

                    <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-all">
                        {isRegistering ? 'Register' : 'Sign In'}
                    </button>

                    <p className="text-center text-sm text-gray-600 pt-2">
                        {isRegistering ? (
                            <>
                                Already have an account?{' '}
                                <button type="button" onClick={() => setIsRegistering(false)} className="font-medium text-indigo-600 hover:underline">Sign In</button>
                            </>
                        ) : (
                            <>
                                Don't have an account?{' '}
                                <button type="button" onClick={() => setIsRegistering(true)} className="font-medium text-indigo-600 hover:underline">Register here</button>
                            </>
                        )}
                    </p>
                </form>
            </div>
        </div>
    );
};

