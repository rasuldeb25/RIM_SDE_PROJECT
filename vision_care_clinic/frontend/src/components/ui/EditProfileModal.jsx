import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function EditProfileModal({ patient, onSave, onClose }) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        firstName: patient.firstName || '',
        lastName: patient.lastName || '',
        phone: patient.phone || '',
        dateOfBirth: patient.dateOfBirth || '',
        hasPet: patient.hasPet || false,
        petType: patient.petType || '',
        petName: patient.petName || '',
        petFavoriteTreat: patient.petFavoriteTreat || ''
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch('http://localhost:8080/api/auth/update-profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                const updatedPatient = await response.json();
                onSave(updatedPatient);
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-indigo-600 mb-6">{t('edit_profile')}</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Personal Information */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('first_name')}
                                </label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => handleChange('firstName', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('last_name')}
                                </label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => handleChange('lastName', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('dashboard_profile_phone')}
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('dashboard_profile_dob')}
                            </label>
                            <input
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Pet Information Section */}
                        <div className="border-t pt-4">
                            <h3 className="text-lg font-semibold text-indigo-600 mb-3">{t('pet_information')}</h3>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('has_pet')}
                                </label>
                                <div className="flex space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="hasPet"
                                            checked={formData.hasPet === true}
                                            onChange={() => handleChange('hasPet', true)}
                                            className="mr-2"
                                        />
                                        {t('yes')}
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="hasPet"
                                            checked={formData.hasPet === false}
                                            onChange={() => handleChange('hasPet', false)}
                                            className="mr-2"
                                        />
                                        {t('no')}
                                    </label>
                                </div>
                            </div>

                            {/* Show pet details only if user has a pet */}
                            {formData.hasPet && (
                                <div className="space-y-4 bg-indigo-50 p-4 rounded-lg">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {t('pet_type')}
                                        </label>
                                        <select
                                            value={formData.petType}
                                            onChange={(e) => handleChange('petType', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="">{t('select_pet_type')}</option>
                                            <option value="dog">Dog</option>
                                            <option value="cat">Cat</option>
                                            <option value="bird">Bird</option>
                                            <option value="rabbit">Rabbit</option>
                                            <option value="hamster">Hamster</option>
                                            <option value="fish">Fish</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {t('pet_name')}
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.petName}
                                            onChange={(e) => handleChange('petName', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder={t('pet_name_placeholder')}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {t('favorite_treat')}
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.petFavoriteTreat}
                                            onChange={(e) => handleChange('petFavoriteTreat', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            placeholder={t('favorite_treat_placeholder')}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-3 pt-4">
                            <button
                                type="submit"
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                            >
                                {t('save_changes')}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                            >
                                {t('cancel')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}