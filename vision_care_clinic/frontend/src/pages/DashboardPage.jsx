import React, { useState, useEffect, useMemo } from 'react'; // <-- 1. IMPORT useMemo
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PatientProfileCard from '../components/ui/PatientProfileCard';
import AppointmentHistory from '../components/ui/AppointmentHistory';

// --- 1. IMPORT THE SERVICES DATA ---
import { services } from '../api/clinicData';

// --- Main Page Component ---
export default function DashboardPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [patient, setPatient] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- 2. CREATE A MEMOIZED LOOKUP MAP ---
    // We use useMemo with an empty dependency array []
    // This ensures the Map is created ONLY ONCE, not on every re-render.
    // This is the fix for the infinite loop.
    const serviceKeyMap = useMemo(() => {
        return new Map(services.map(s => [s.slug, s.titleKey]));
    }, []); // <-- 2. THE FIX: Wrap in useMemo and use empty dependency array

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            navigate('/');
            return;
        }

        const fetchDashboardData = async () => {
            try {
                // Fetch Profile and Appointments at the same time
                const [profileResponse, appointmentsResponse] = await Promise.all([
                    fetch('http://localhost:8080/api/auth/me', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch('http://localhost:8080/api/appointments/me', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                ]);

                if (!profileResponse.ok) throw new Error('Failed to fetch profile.');
                const userData = await profileResponse.json();
                setPatient(userData);

                if (!appointmentsResponse.ok) throw new Error('Failed to fetch appointments.');
                const appointmentData = await appointmentsResponse.json();

                // --- 3. THIS IS THE FIXED TRANSLATION LOGIC ---
                const translatedAppointments = appointmentData.map(appt => {
                    const titleKey = serviceKeyMap.get(appt.service) || appt.service;
                    return {
                        ...appt,
                        service: t(titleKey)
                    };
                });
                // --- END OF FIX ---

                setAppointments(translatedAppointments);

            } catch (error) {
                console.error(error.message);
                localStorage.removeItem('userToken');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate, t, serviceKeyMap]); // This dependency is now stable

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        navigate('/');
    };

    if (loading || !patient) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header onLogout={handleLogout} />
                <div className="flex-grow flex justify-center items-center bg-gray-100">
                    <p className="text-xl font-semibold text-indigo-600">Loading profile...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
            <Header onLogout={handleLogout} />
            <main className="container mx-auto p-4 md:p-8 flex-grow pt-20">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('dashboard_welcome')} {patient.firstName}!</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <PatientProfileCard patient={patient} />
                    <AppointmentHistory appointments={appointments} />
                </div>
            </main>
            <Footer />
        </div>
    );
}