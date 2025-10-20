import React from 'react';
// Import useNavigate to handle logging out
import { useNavigate } from 'react-router-dom';

// =====================================================================================
// The components are now included directly in this file to resolve the import errors.
// =====================================================================================

// --- UI Components ---
// (Your PatientProfileCard, AppointmentRow, and AppointmentHistory components
// are already here and are correct. No changes needed to them.)

const PatientProfileCard = ({ patient = {} }) => (
    <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-indigo-600 mb-4">Patient Information</h2>
        <div className="space-y-4 text-gray-700">
            <div>
                <p className="text-sm font-semibold text-gray-500">Name</p>
                <p className="text-lg">{patient.name}</p>
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-500">Email</p>
                <p className="text-lg">{patient.email}</p>
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-500">Phone</p>
                <p className="text-lg">{patient.phone}</p>
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-500">Date of Birth</p>
                <p className="text-lg">{patient.dob}</p>
            </div>
        </div>
    </div>
);

const AppointmentRow = ({ appointment }) => (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 items-center p-4 border-b border-gray-200 hover:bg-indigo-50">
        <div>
            <p className="font-semibold text-gray-800">{appointment.date}</p>
            <p className="text-sm text-gray-500">{appointment.time}</p>
        </div>
        <div className="md:col-span-2">
            <p className="font-semibold text-gray-800">{appointment.service}</p>
            <p className="text-sm text-gray-500">with {appointment.doctor}</p>
        </div>
        <div className="text-right">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                appointment.status === 'Upcoming'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
            }`}>
                {appointment.status}
            </span>
        </div>
    </div>
);

const AppointmentHistory = ({ appointments = [] }) => {
    const upcomingAppointments = appointments.filter(appt => appt.status === 'Upcoming');
    const pastAppointments = appointments.filter(appt => appt.status !== 'Upcoming');

    return (
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-indigo-600 mb-4">Your Appointments</h2>
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2 mt-4">Upcoming</h3>
                {upcomingAppointments.length > 0 ? (
                    upcomingAppointments.map(appt => <AppointmentRow key={appt.id} appointment={appt} />)
                ) : (
                    <p className="text-gray-500 p-4">You have no upcoming appointments.</p>
                )}
            </div>
            <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">History</h3>
                {pastAppointments.length > 0 ? (
                    pastAppointments.map(appt => <AppointmentRow key={appt.id} appointment={appt} />)
                ) : (
                    <p className="text-gray-500 p-4">You have no past appointments.</p>
                )}
            </div>
        </div>
    );
};


// --- Main Page Component ---

export default function DashboardPage() {
    const navigate = useNavigate(); // Add this hook

    // Function to handle logout
    const handleLogout = () => {
        // In a real app, you'd clear tokens here
        navigate('/'); // Navigate back to the home page
    };

    // Mock data for the patient
    const mockPatient = {
        name: 'Spongebob Squarepants ',
        email: 'spongebobsquarepants@example.com',
        phone: '+36 30 123 4567',
        dob: 'January 1, 1990'
    };

    // Mock data for appointments
    const mockAppointments = [
        { id: 1, date: 'October 27, 2025', time: '10:00 AM', service: 'Comprehensive Eye Exam', doctor: 'Dr. Evelyn Reed', status: 'Upcoming' },
        { id: 2, date: 'September 15, 2025', time: '2:30 PM', service: 'Contact Lens Fitting', doctor: 'Dr. Evelyn Reed', status: 'Completed' },
        { id: 3, date: 'March 5, 2025', time: '11:00 AM', service: 'LASIK Consultation', doctor: 'Dr. Ben Carter', status: 'Completed' }
    ];

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <header className="bg-white shadow-md">
                <div className="container mx-auto flex justify-between items-center p-4">
                    <div className="flex items-center space-x-2 text-2xl font-bold text-indigo-600">
                        <span role="img" aria-label="eye">👁️</span>
                        <span>VisionCare Portal</span>
                    </div>
                    {/* Add the onClick handler here */}
                    <button
                        onClick={handleLogout}
                        className="text-gray-600 hover:text-indigo-600 font-medium"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {mockPatient.name}!</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <PatientProfileCard patient={mockPatient} />
                    <AppointmentHistory appointments={mockAppointments} />
                </div>
            </main>
        </div>
    );
}