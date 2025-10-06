import React from 'react';

// This component provides closing information and links.
// It receives the onLoginClick function to allow opening the modal from the footer.
export default function Footer({ onLoginClick }) {
    return (
        <footer className="bg-gray-800 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-center md:text-left">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <p className="text-gray-400">123 Vision St, Eye City</p>
                        <p className="text-gray-400">(555) 123-4567</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Hours</h3>
                        <p className="text-gray-400">Mon - Fri: 8am - 6pm</p>
                        <p className="text-gray-400">Saturday: 9am - 4pm</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul>
                            <li><a href="#services" className="text-gray-400 hover:text-white">Services</a></li>
                            <li><button onClick={onLoginClick} className="text-gray-400 hover:text-white text-left bg-transparent">Patient Portal</button></li>
                        </ul>
                    </div>
                    <div className="flex items-center justify-center md:justify-start space-x-2">
                        <span className="text-3xl">👁️</span>
                        <span className="text-2xl font-bold">VisionCare</span>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-8 text-center text-gray-500">
                    &copy; {new Date().getFullYear()} VisionCare. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

