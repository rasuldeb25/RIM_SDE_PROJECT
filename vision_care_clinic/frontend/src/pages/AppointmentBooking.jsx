import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Import all your components for this page
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeroSlider from '../components/ui/HeroSlider'; // <-- IMPORT NEW SLIDER
import Services from '../components/ui/Services';
import AppointmentForm from '../components/ui/AppointmentForm';

// Import your Login/Register Modal
import AuthModal from './LandingPage';

export default function AppointmentBookingPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    // Refs for scrolling
    // We only need the refs for services and appointments now
    const servicesRef = useRef(null);
    const appointmentRef = useRef(null);

    const handleLoginSuccess = () => {
        setIsModalOpen(false);
        navigate('/dashboard');
    };

    const handleNavClick = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header
                onLoginClick={() => setIsModalOpen(true)}
                onNavClick={handleNavClick}
                refs={{ servicesRef, appointmentRef }}
            />

            {/* This 'main' tag no longer needs padding-top
              because we put it inside the HeroSlider component
            */}
            <main className="flex-grow">

                {/* --- THIS IS THE BIG CHANGE --- */}
                {/* We replace the old Hero with the new HeroSlider */}
                <HeroSlider />
                {/* --- END OF CHANGE --- */}

                <div ref={servicesRef}>
                    <Services />
                </div>

                <div ref={appointmentRef}>
                    <AppointmentForm />
                </div>
            </main>

            <Footer onLoginClick={() => setIsModalOpen(true)} />

            {isModalOpen && (
                <AuthModal
                    onClose={() => setIsModalOpen(false)}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </div>
    );
}