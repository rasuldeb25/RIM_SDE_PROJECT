import React from 'react';

// This component is responsible for the site's navigation and primary actions.
// It receives functions (props) from its parent to handle clicks.
export default function Header({ onLoginClick, onNavClick, refs }) {
    return (
        <header className="bg-white/95 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="flex items-center space-x-2 text-2xl font-bold text-indigo-600 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <span role="img" aria-label="eye">👁️</span>
                    <span>VisionCare</span>
                </div>
                <nav className="hidden md:flex items-center space-x-6">
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-indigo-600 font-medium">Home</button>
                    <button onClick={() => onNavClick(refs.servicesRef)} className="text-gray-600 hover:text-indigo-600 font-medium">Services</button>
                    <button onClick={() => onNavClick(refs.appointmentRef)} className="text-gray-600 hover:text-indigo-600 font-medium">Contact</button>
                </nav>
                <button
                    onClick={onLoginClick}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-2 rounded-full hover:shadow-lg transition-transform transform hover:-translate-y-0.5"
                >
                    Patient Portal
                </button>
            </div>
        </header>
    );
};

