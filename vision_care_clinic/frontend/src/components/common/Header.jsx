import React, { useState, useEffect } from 'react'; // <-- 1. IMPORT useEffect
import { Link, useNavigate } from 'react-router-dom'; // <-- 2. IMPORT useNavigate
import { useTranslation } from 'react-i18next';

export default function Header({ onLoginClick }) {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate(); // <-- 3. Initialize navigate

    // --- 4. NEW STATE TO TRACK LOGIN STATUS ---
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // --- 5. NEW "SMART" HOOK ---
    // This hook runs every time the component loads
    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        // We also add an event listener to check for login/logout from other tabs
        const handleStorageChange = () => {
            const token = localStorage.getItem('userToken');
            setIsLoggedIn(!!token);
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // --- 6. NEW LOGOUT FUNCTION ---
    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setIsLoggedIn(false);
        navigate('/'); // Navigate to homepage on logout
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsMenuOpen(false);
    };

    const navLinks = [
        { name: t('home'), path: '/' },
        { name: t('services'), path: '/#services' },
        { name: t('contact'), path: '/#contact' },
    ];

    return (
        <header className="bg-white shadow-sm fixed w-full z-30 top-0">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                <Link to="/" className="flex items-center space-x-2">
                    <img src="/images/vison_care_logo.png" alt="VisionCare" className="h-8 w-auto" />
                    <span className="text-2xl font-bold text-indigo-600">VisionCare</span>
                </Link>

                {/* --- 7. NEW DYNAMIC DESKTOP NAV --- */}
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.path} className="text-gray-600 hover:text-indigo-600 font-medium">
                            {link.name}
                        </a>
                    ))}

                    {isLoggedIn ? (
                        // --- IF LOGGED IN ---
                        <>
                            <Link
                                to="/dashboard"
                                className="bg-gray-100 text-indigo-600 px-5 py-2 rounded-full font-medium hover:bg-gray-200"
                            >
                                My Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700"
                            >
                                {t('dashboard_logout')}
                            </button>
                        </>
                    ) : (
                        // --- IF LOGGED OUT ---
                        <button
                            onClick={onLoginClick}
                            className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700"
                        >
                            {t('patient_portal')}
                        </button>
                    )}

                    <div className="flex space-x-2">
                        <button onClick={() => changeLanguage('en')} className={`text-sm font-bold ${i18n.language === 'en' ? 'text-indigo-600' : 'text-gray-500'}`}>EN</button>
                        <span className="text-gray-300">|</span>
                        <button onClick={() => changeLanguage('hu')} className={`text-sm font-bold ${i18n.language === 'hu' ? 'text-indigo-600' : 'text-gray-500'}`}>HU</button>
                    </div>
                </div>

                {/* --- 8. (Small fix for mobile menu logic) --- */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                    </button>
                </div>
            </nav>

            {/* --- 9. NEW DYNAMIC MOBILE MENU --- */}
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-lg absolute w-full">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.path} onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-gray-700 hover:bg-gray-100">
                            {link.name}
                        </a>
                    ))}

                    {isLoggedIn ? (
                        // --- IF LOGGED IN (MOBILE) ---
                        <>
                            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-gray-700 hover:bg-gray-100">My Dashboard</Link>
                            <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-3 bg-indigo-600 text-white font-medium">
                                {t('dashboard_logout')}
                            </button>
                        </>
                    ) : (
                        // --- IF LOGGED OUT (MOBILE) ---
                        <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-3 bg-indigo-600 text-white font-medium">
                            {t('patient_portal')}
                        </button>
                    )}

                    <div className="flex justify-center space-x-4 py-3 bg-gray-50">
                        <button onClick={() => changeLanguage('en')} className={`text-sm font-bold ${i18n.language === 'en' ? 'text-indigo-600' : 'text-gray-500'}`}>English</button>
                        <span className="text-gray-300">|</span>
                        <button onClick={() => changeLanguage('hu')} className={`text-sm font-bold ${i18n.language === 'hu' ? 'text-indigo-600' : 'text-gray-500'}`}>Magyar</button>
                    </div>
                </div>
            )}
        </header>
    );
}
