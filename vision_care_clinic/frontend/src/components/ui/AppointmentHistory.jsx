import React from 'react';
import { useTranslation } from 'react-i18next';

// This component is kept separate for cleaner code
const AppointmentRow = ({ appointment }) => {
    const { t } = useTranslation();

    // Function to translate status
    const getStatus = (status) => {
        if (status === 'Upcoming') {
            return t('dashboard_appts_status_upcoming');
        }
        return t('dashboard_appts_status_completed');
    };

    return (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 items-center p-4 border-b border-gray-200 hover:bg-indigo-50">
            <div>
                <p className="font-semibold text-gray-800">{appointment.date}</p>
                <p className="text-sm text-gray-500">{appointment.time}</p>
            </div>
            <div className="md:col-span-2">
                <p className="font-semibold text-gray-800">{appointment.service}</p>
                <p className="text-sm text-gray-500">{t('dashboard_appts_with')} {appointment.doctor}</p>
            </div>
            <div className="text-right">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    appointment.status === 'Upcoming'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                }`}>
                    {getStatus(appointment.status)}
                </span>
            </div>
        </div>
    );
};


export default function AppointmentHistory({ appointments = [] }) {
    const { t } = useTranslation();

    const upcomingAppointments = appointments.filter(appt => appt.status === 'Upcoming');
    const pastAppointments = appointments.filter(appt => appt.status !== 'Upcoming');

    return (
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-indigo-600 mb-4">{t('dashboard_appts_title')}</h2>
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2 mt-4">{t('dashboard_appts_upcoming')}</h3>
                {upcomingAppointments.length > 0 ? (
                    upcomingAppointments.map(appt => <AppointmentRow key={appt.id} appointment={appt} />)
                ) : (
                    <p className="text-gray-500 p-4">{t('dashboard_appts_none_upcoming')}</p>
                )}
            </div>
            <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">{t('dashboard_appts_history')}</h3>
                {pastAppointments.length > 0 ? (
                    pastAppointments.map(appt => <AppointmentRow key={appt.id} appointment={appt} />)
                ) : (
                    <p className="text-gray-500 p-4">{t('dashboard_appts_none_past')}</p>
                )}
            </div>
        </div>
    );
};