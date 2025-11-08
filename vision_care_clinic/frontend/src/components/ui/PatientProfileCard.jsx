import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PatientProfileCard({ patient = {}, onEdit }) {
    const { t } = useTranslation();

    return (
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg relative">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-indigo-600">{t('dashboard_profile_title')}</h2>
                {onEdit && (
                    <button 
                        onClick={onEdit}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        {t('edit_profile')}
                    </button>
                )}
            </div>
            
            <div className="space-y-4 text-gray-700">
                {/* Personal Information */}
                <div>
                    <p className="text-sm font-semibold text-gray-500">{t('Profile Name')}</p>
                    <p className="text-lg">{patient.firstName} {patient.lastName}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-500">{t('Profile email')}</p>
                    <p className="text-lg">{patient.email}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-500">{t('Profile phone')}</p>
                    <p className="text-lg">{patient.phone || 'N/A'}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-500">{t('Profile date of birth')}</p>
                    <p className="text-lg">{patient.dateOfBirth || 'N/A'}</p>
                </div>

                <div className="border-t pt-4 mt-4">
                    <h3 className="text-lg font-semibold text-indigo-600 mb-3">{t('Pet information')}</h3>
                    
                    {/* Has Pet Question */}
                    <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-500">{t('Do you have a pet')}</p>
                        <p className="text-lg">
                            {patient.hasPet === true ? t('yes') : 
                             patient.hasPet === false ? t('no') : 'N/A'}
                        </p>
                    </div>
                    {/* Show pet details only if they have a pet */}
                    {patient.hasPet && (
                        <div className="space-y-3 bg-indigo-50 p-4 rounded-lg">
                            <div>
                                <p className="text-sm font-semibold text-gray-500">{t('Pet Type')}</p>
                                <p className="text-lg">{patient.petType || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-500">{t('Your Pet name')}</p>
                                <p className="text-lg">{patient.petName || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-500">{t('Their Favorite treat')}</p>
                                <p className="text-lg">{patient.petFavoriteTreat || 'N/A'}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}