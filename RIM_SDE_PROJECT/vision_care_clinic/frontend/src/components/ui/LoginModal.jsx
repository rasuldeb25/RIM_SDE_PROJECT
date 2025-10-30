import React from 'react';

// This component displays a modal for user login.
// It receives an onClose function prop to tell the parent when to close it.
export default function LoginModal({ onClose }) {
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
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Patient Portal Login</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input id="login-email" type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"/>
                    </div>
                    <div>
                        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input id="login-password" type="password" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"/>
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700">
                        Sign In
                    </button>
                    <p className="text-center text-sm text-gray-600 pt-2">
                        No account? <a href="#" className="font-medium text-indigo-600 hover:underline">Register</a>
                    </p>
                </form>
            </div>
        </div>
    );
};
