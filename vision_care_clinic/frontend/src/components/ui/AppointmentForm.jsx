import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { services } from '../../api/clinicData';

export default function AppointmentForm() {
    const { t } = useTranslation();

    // --- 1. SIMPLIFIED THE INITIAL STATE ---
    // We keep First/Last Name, but remove email, phone, and dob
    const initialFormState = {
        firstName: '',
        lastName: '',
        date: '',
        time: '',
        service: '',
        notes: ''
    };
    // --- END OF CHANGE ---

    const [formData, setFormData] = useState(initialFormState);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(false);
        setError('');

        const token = localStorage.getItem('userToken');
        if (!token) {
            setError("You must be logged in to book an appointment.");
            return;
        }

        const apiUrl = 'http://localhost:8080/api/appointments/book';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                // This now sends: firstName, lastName, date, time, service, notes
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Appointment saved and linked to user:", result);

            setSubmitted(true);
            setFormData(initialFormState); // Reset form
            setTimeout(() => setSubmitted(false), 5000);

        } catch (error) {
            console.error('Error submitting form:', error);
            setError('Failed to submit appointment. Please try again later.');
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-600 mb-12">{t('form_title')}</h2>
                <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-2xl shadow-xl">

                    {/* (Error and Submitted messages remain the same) */}
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md" role="alert">
                            <p className="font-bold">Error!</p>
                            <p>{error}</p>
                        </div>
                    )}
                    {submitted && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md" role="alert">
                            <p className="font-bold">{t('form_alert_success_title')}</p>
                            <p>{t('form_alert_success_desc')}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* --- 2. PERSONAL INFO FIELDS (SIMPLIFIED) --- */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">{t('form_label_firstname')}</label>
                                <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">{t('form_label_lastname')}</label>
                                <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"/>
                            </div>
                        </div>
                        {/* --- Email, Phone, and DOB sections are now REMOVED --- */}

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">{t('form_label_date')}</label>
                                <input type="date" name="date" id="date" value={formData.date} onChange={handleInputChange} min={today} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">{t('form_label_time')}</label>
                                <select name="time" id="time" value={formData.time} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                                    <option value="">{t('form_option_select_time')}</option>
                                    <option value="09:00">{t('form_time_9am')}</option>
                                    <option value="10:00">{t('form_time_10am')}</option>
                                    <option value="11:00">{t('form_time_11am')}</option>
                                    <option value="12:00">{t('form_time_12pm')}</option>
                                    <option value="13:00">{t('form_time_1pm')}</option>
                                    <option value="14:00">{t('form_time_2pm')}</option>
                                    <option value="15:00">{t('form_time_3pm')}</option>
                                    <option value="16:00">{t('form_time_4pm')}</option>
                                    <option value="17:00">{t('form_time_5pm')}</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">{t('form_label_service')}</label>
                            <select name="service" id="service" value={formData.service} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                                <option value="">{t('form_option_select_service')}</option>
                                {services.map((service) => (
                                    <option key={service.slug} value={service.slug}>
                                        {t(service.titleKey)}
                                    </option>
                                ))}
                                <option value="contacts">{t('form_service_contacts')}</option>
                                <option value="disease">{t('form_service_disease')}</option>
                                <option value="emergency">{t('form_service_emergency')}</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">{t('form_label_notes')}</label>
                            <textarea
                                name="notes"
                                id="notes"
                                rows="4"
                                value={formData.notes}
                                onChange={handleInputChange}
                                placeholder={t('form_placeholder_notes')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-indigo-700 transition-all shadow-lg">
                            {t('form_button_submit')}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};