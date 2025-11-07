import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PatientProfileCard({ patient = {} }) {
    const { t } = useTranslation();

    return (
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-indigo-600 mb-4">{t('dashboard_profile_title')}</h2>
            <div className="space-y-4 text-gray-700">
                <div>
                    <p className="text-sm font-semibold text-gray-500">{t('dashboard_profile_name')}</p>
                    <p className="text-lg">{patient.firstName} {patient.lastName}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-500">{t('dashboard_profile_email')}</p>
                    <p className="text-lg">{patient.email}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-500">{t('dashboard_profile_phone')}</p>
                    <p className="text-lg">{patient.phone || 'N/A'}</p>
                </div>

                {/* --- THIS IS THE NEW SECTION --- */}
                {/* We can now show this because it's part of the User object */}
                <div>
                    <p className="text-sm font-semibold text-gray-500">{t('dashboard_profile_dob')}</p>
                    <p className="text-lg">{patient.dateOfBirth || 'N/A'}</p>
                </div>
                {/* --- END OF NEW SECTION --- */}

            </div>
        </div>
    );
};