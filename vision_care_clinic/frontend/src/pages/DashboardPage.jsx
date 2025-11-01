import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// --- IMPORT YOUR NEWLY SEPARATED COMPONENTS ---
import PatientProfileCard from '../components/ui/PatientProfileCard';
import AppointmentHistory from '../components/ui/AppointmentHistory';

// --- Main Page Component ---
export default function DashboardPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        // In a real app, you'd clear tokens here
        navigate('/'); // Navigate back to the home page
    };

    // --- Mock data for the patient ---
    // In a real app, this would come from an API or user state
    const mockPatient = {
        name: 'Spongebob Squarepants', // This name is hard-coded, but we can change it
        email: 'spongebobsquarepants@example.com',
        phone: '+36 30 123 4567',
        dob: 'January 1, 1990'
    };

    // --- Mock data for appointments ---
    // We will translate the service names, but the doctor name is hard-coded
    const mockAppointments = [
        { id: 1, date: 'October 27, 2025', time: '10:00 AM', service: t('service_comprehensivetitle'), doctor: 'Dr. Evelyn Reed', status: 'Upcoming' },
        { id: 2, date: 'September 15, 2025', time: '2:30 PM', service: t('form_service_contacts'), doctor: 'Dr. Evelyn Reed', status: 'Completed' },
        { id: 3, date: 'March 5, 2025', time: '11:00 AM', service: t('service_lasiktitle'), doctor: 'Dr. Ben Carter', status: 'Completed' }
    ];

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <header className="bg-white shadow-md">
                <div className="container mx-auto flex justify-between items-center p-4">
                    <div className="flex items-center space-x-2 text-2xl font-bold text-indigo-600">
                        {/* We can use the logo here */}
                        <img src="/images/vison_care_logo.png" alt="VisionCare" className="h-8 w-auto" />
                        <span>{t('dashboard_title')}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-gray-600 hover:text-indigo-600 font-medium"
                    >
                        {t('dashboard_logout')}
                    </button>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('dashboard_welcome')} {mockPatient.name}</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Use the imported components */}
                    <PatientProfileCard patient={mockPatient} />
                    <AppointmentHistory appointments={mockAppointments} />
                </div>
            </main>
        </div>
    );
}