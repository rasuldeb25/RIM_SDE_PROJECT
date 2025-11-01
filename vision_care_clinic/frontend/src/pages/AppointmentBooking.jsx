import React, { useState } from 'react';

// Import all your common and UI components
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeroSlider from '../components/ui/HeroSlider';
import Stats from '../components/ui/Stats';
import Services from '../components/ui/Services';
import AppointmentForm from '../components/ui/AppointmentForm';
import LoginModal from '../components/ui/LoginModal';
import RegisterModal from '../components/ui/RegisterModal'; // We just created this

export default function AppointmentBookingPage() {
    // This state will manage which modal is open: 'none', 'login', or 'register'
    const [modalView, setModalView] = useState('none');

    // Handlers to open modals
    const handleLoginClick = () => setModalView('login');
    const handleRegisterClick = () => setModalView('register');

    // Handler to close any modal
    const handleCloseModal = () => setModalView('none');

    // Handlers to switch between modals
    const handleSwitchToRegister = () => setModalView('register');
    const handleSwitchToLogin = () => setModalView('login');

    return (
        <div className="flex flex-col min-h-screen bg-white">

            {/* 1. Header */}
            {/* We pass the handleLoginClick function to the Header */}
            <Header onLoginClick={handleLoginClick} />

            {/* Page Content */}
            <main className="flex-grow pt-16"> {/* pt-16 to offset the fixed header */}

                {/* 2. Hero Slider */}
                <section className="pt-8 pb-12 bg-gray-50">
                    <HeroSlider />
                </section>

                {/* 3. Stats */}
                <Stats />

                {/* 4. Services */}
                <Services />

                {/* 5. Appointment Form */}
                <AppointmentForm />

            </main>

            {/* 6. Footer */}
            {/* We also pass the handleLoginClick function to the Footer */}
            <Footer onLoginClick={handleLoginClick} />

            {/* 7. Modals */}
            {/* These components are rendered only when the state is correct */}
            {modalView === 'login' && (
                <LoginModal
                    onClose={handleCloseModal}
                    onSwitchToRegister={handleSwitchToRegister}
                />
            )}
            {modalView === 'register' && (
                <RegisterModal
                    onClose={handleCloseModal}
                    onSwitchToLogin={handleSwitchToLogin}
                />
            )}
        </div>
    );
}