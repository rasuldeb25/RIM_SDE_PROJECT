import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // <-- 1. IMPORT
import { services } from '../../api/clinicData'; // <-- 2. IMPORT services

// This component handles the logic and UI for the appointment booking form.
export default function AppointmentForm() {
    const { t } = useTranslation(); // <-- 3. INITIALIZE HOOK

    const initialFormState = {
        firstName: '', lastName: '', email: '', phone: '',
        date: '', time: '', service: '', notes: ''
    };
    const [formData, setFormData] = useState(initialFormState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend API
        console.log("Form Submitted:", formData);

        setSubmitted(true);
        setFormData(initialFormState); // Reset form
        setTimeout(() => setSubmitted(false), 5000); // Hide success message after 5 seconds
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-600 mb-12">{t('form_title')}</h2>
                <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-2xl shadow-xl">
                    {submitted && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md" role="alert">
                            <p className="font-bold">{t('form_alert_success_title')}</p>
                            <p>{t('form_alert_success_desc')}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('form_label_email')}</label>
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">{t('form_label_phone')}</label>
                                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"/>
                            </div>
                        </div>
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
                                {/* We now dynamically create options from clinicData.js */}
                                {services.map((service) => (
                                    <option key={service.slug} value={service.slug}>
                                        {t(service.titleKey)}
                                    </option>
                                ))}
                                {/* Add back other options if needed */}
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