import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- IMPORT YOUR 7 PAGE COMPONENTS ---
import AppointmentBookingPage from './pages/AppointmentBooking.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ComprehensivePage from './pages/ComprehensivePage.jsx';
import LasikPage from './pages/LasikPage.jsx';
import PediatricPage from './pages/PediatricPage.jsx';
import CornealPage from './pages/CornealPage.jsx';
import OphthoPage from './pages/OphthoPage.jsx';
import IplPage from './pages/IplPage.jsx';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Main Routes */}
                <Route path="/" element={<AppointmentBookingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />

                {/* --- ADD YOUR 6 NEW STATIC ROUTES --- */}
                {/* These slugs match the ones in clinicData.js */}
                <Route path="/service/comprehensive-eye-exams" element={<ComprehensivePage />} />
                <Route path="/service/lasik-consultation" element={<LasikPage />} />
                <Route path="/service/pediatric-eye-care" element={<PediatricPage />} />
                <Route path="/service/corneal-transplantation" element={<CornealPage />} />
                <Route path="/service/ophthalmoplasty" element={<OphthoPage />} />
                <Route path="/service/ipl-selective-phototherapy" element={<IplPage />} />
            </Routes>
        </BrowserRouter>
    );
}