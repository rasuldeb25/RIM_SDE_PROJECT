import React from 'react';

// The Hero component is the main introductory section of the page.
// It receives click handlers from the parent to trigger scrolling.
export default function Hero({ onBookClick, onServicesClick }) {
    return (
        <section className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white text-center py-24 md:py-32">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Your Vision, Our Priority</h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90">
                    Comprehensive eye care services with state-of-the-art technology and experienced professionals.
                </p>
                <div className="flex justify-center items-center gap-4 flex-wrap">
                    <button onClick={onBookClick} className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-2xl">
                        Book Appointment
                    </button>
                    <button onClick={onServicesClick} className="border-2 border-white text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-white/20 transition transform hover:scale-105">
                        Our Services
                    </button>
                </div>
            </div>
        </section>
    );
};

