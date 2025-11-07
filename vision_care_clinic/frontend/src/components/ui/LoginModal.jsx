import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// This component displays a modal for user login.
export default function LoginModal({ onClose, onSwitchToRegister }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // --- THIS IS THE MODIFIED FUNCTION ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const loginRequest = {
            email: email,
            password: password
        };

        const apiUrl = 'http://localhost:8080/api/auth/login';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginRequest),
            });

            if (!response.ok) {
                // Get error message from backend
                const errorText = await response.text();
                throw new Error(errorText || "Login failed");
            }

            // --- SUCCESS ---
            // 1. Get the response body (which contains the token)
            const loginResponse = await response.json(); // This will be { "token": "..." }

            // 2. IMPORTANT: Save the token to localStorage
            localStorage.setItem('userToken', loginResponse.token);
            console.log("Token saved to localStorage:", loginResponse.token);

            // 3. Navigate to the dashboard
            navigate('/dashboard');

            // 4. Close the modal
            onClose();

        } catch (error) {
            console.error('Login failed:', error.message);
            // Show the error from the backend (e.g., "Invalid email or password")
            setError(error.message);
        }
    };
    // --- END OF MODIFIED FUNCTION ---

    return (
        // The overlay captures clicks to close the modal
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
        >
            {/* stopPropagation prevents clicks inside the modal from closing it */}
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
                <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">{t('modal_login_title')}</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">{t('modal_label_email')}</label>
                        <input
                            id="login-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">{t('modal_label_password')}</label>
                        <input
                            id="login-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700">
                        {t('modal_button_signin')}
                    </button>
                    <p className="text-center text-sm text-gray-600 pt-2">
                        {t('modal_login_prompt')}{' '}
                        <button
                            type="button"
                            onClick={onSwitchToRegister} // This triggers the modal switch
                            className="font-medium text-indigo-600 hover:underline bg-transparent border-none p-0 cursor-pointer"
                        >
                            {t('modal_login_prompt_link')}
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};
