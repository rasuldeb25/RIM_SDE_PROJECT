import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your page components
import AppointmentBookingPage from './pages/AppointmentBooking.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
// IMPORT THE NEW PAGE
import ServiceDetailPage from './pages/ServiceDetailPage.jsx';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Route 1: The Home Page */}
                <Route path="/" element={<AppointmentBookingPage />} />

                {/* Route 2: The Patient Dashboard */}
                <Route path="/dashboard" element={<DashboardPage />} />

                {/* --- ADD THIS NEW ROUTE --- */}
                {/* This is a dynamic route. :serviceSlug can be anything. */}
                <Route path="/service/:serviceSlug" element={<ServiceDetailPage />} />
            </Routes>
        </BrowserRouter>
    );
}