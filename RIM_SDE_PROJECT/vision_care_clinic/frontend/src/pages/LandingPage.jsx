import React, { useState, useRef } from 'react';

// --- Reusable UI Components (from /components/ui/) ---
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Hero from "../components/ui/Hero";
import Services from "../components/ui/Services";
import AppointmentForm from "../components/ui/AppointmentForm";
import LoginModal from "../components/ui/LoginModal";

// --- Main Page Component ---

// This component assembles the entire landing page.
export default function LandingPage() {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    // Refs are used for smooth scrolling
    const servicesRef = useRef(null);
    const appointmentRef = useRef(null);

    const scrollToRef = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-gray-50 font-sans text-gray-800">
            <Header
                onLoginClick={() => setLoginModalOpen(true)}
                onNavClick={scrollToRef}
                refs={{ servicesRef, appointmentRef }}
            />
            <main className="pt-20"> {/* Padding to offset the fixed header */}
                <Hero
                    onBookClick={() => scrollToRef(appointmentRef)}
                    onServicesClick={() => scrollToRef(servicesRef)}
                />
                <div ref={servicesRef} className="services">
                    <Services />
                </div>
                <div ref={appointmentRef}>
                    <AppointmentForm />
                </div>
            </main>
            <Footer onLoginClick={() => setLoginModalOpen(true)} />

            {/* The modal is only rendered when its state is true */}
            {isLoginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)} />}
        </div>
    );
}

