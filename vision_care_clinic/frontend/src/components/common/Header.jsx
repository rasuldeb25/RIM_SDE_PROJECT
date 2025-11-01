import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// This component will also handle opening the LoginModal,
// which we'll pass in as the 'onLoginClick' prop from the main page.
export default function Header({ onLoginClick }) {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsMenuOpen(false); // Close mobile menu on language change
    };

    // We get the nav links from our translation file
    const navLinks = [
        { name: t('home'), path: '/' },
        { name: t('services'), path: '/#services' }, // Scroll-to link
        { name: t('contact'), path: '/#contact' }, // Scroll-to link
    ];

    return (
        <header className="bg-white shadow-sm fixed w-full z-30 top-0">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    {/* You will need to add 'vison_care_logo.png' to 'frontend/public/images/' */}
                    <img src="/images/vison_care_logo.png" alt="VisionCare" className="h-8 w-auto" />
                    <span className="text-2xl font-bold text-indigo-600">VisionCare</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            className="text-gray-600 hover:text-indigo-600 font-medium"
                        >
                            {link.name}
                        </a>
                    ))}
                    <button
                        onClick={onLoginClick} // This will trigger the modal
                        className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700"
                    >
                        {t('patient_portal')}
                    </button>

                    {/* Language Switcher */}
                    <div className="flex space-x-2">
                        <button
                            onClick={() => changeLanguage('en')}
                            className={`text-sm font-bold ${i18n.language === 'en' ? 'text-indigo-600' : 'text-gray-500'}`}
                        >
                            EN
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                            onClick={() => changeLanguage('hu')}
                            className={`text-sm font-bold ${i18n.language === 'hu' ? 'text-indigo-600' : 'text-gray-500'}`}
                        >
                            HU
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-lg absolute w-full">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                        >
                            {link.name}
                        </a>
                    ))}
                    <button
                        onClick={() => {
                            onLoginClick();
                            setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 bg-indigo-600 text-white font-medium"
                    >
                        {t('patient_portal')}
                    </button>
                    {/* Mobile Language Switcher */}
                    <div className="flex justify-center space-x-4 py-3 bg-gray-50">
                        <button
                            onClick={() => changeLanguage('en')}
                            className={`text-sm font-bold ${i18n.language === 'en' ? 'text-indigo-600' : 'text-gray-500'}`}
                        >
                            English
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                            onClick={() => changeLanguage('hu')}
                            className={`text-sm font-bold ${i18n.language === 'hu' ? 'text-indigo-600' : 'text-gray-500'}`}
                        >
                            Magyar
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}