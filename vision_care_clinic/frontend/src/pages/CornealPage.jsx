import React from 'react';
import { Link } from 'react-router-dom';
import { doctors } from '../api/clinicData';
import { useTranslation } from 'react-i18next';

// Import common components
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

// Doctor card component
const DoctorCard = ({ doctor }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <img src={doctor.image} alt={t(doctor.nameKey)} className="w-24 h-24 rounded-full object-cover" />
            <div>
                <h3 className="text-xl font-bold text-indigo-600">{t(doctor.nameKey)}</h3>
                <p className="text-gray-700 font-semibold">{t(doctor.titleKey)}</p>
                <p className="text-gray-600 mt-2">{t(doctor.bioKey)}</p>
            </div>
        </div>
    );
};

// --- THIS IS THE STATIC PAGE FOR CORNEAL TRANSPLANTATION ---
export default function CornealPage() {
    const { t } = useTranslation();

    // Doctors for this service (Dr. Cole and Dr. Reed)
    const serviceDoctors = doctors.filter(doc => doc.id === 1 || doc.id === 6);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header onLoginClick={() => {}} />

            <main className="flex-grow pt-20">
                <div className="container mx-auto px-4 py-12">

                    {/* Breadcrumbs */}
                    <div className="mb-4 text-gray-600">
                        <Link to="/" className="hover:text-indigo-600">{t('home')}</Link>
                        <span> / </span>
                        <span>{t('service_cornealtitletitle')}</span>
                    </div>

                    <h1 className="text-5xl font-extrabold text-gray-800 mb-8">{t('service_cornealtitletitle')}</h1>

                    {/* --- Start of Template Layout --- */}
                    <div className="space-y-8">
                        {/* Section 1: Intro */}
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <h2 className="text-3xl font-bold text-indigo-600 mb-4">{t('corneal_page_title1')}</h2>
                            <p className="text-lg text-gray-700 leading-relaxed">{t('corneal_page_desc1')}</p>
                        </div>

                        {/* Section 2: When is it Needed? */}
                        <div className="bg-white p-8 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-indigo-600 mb-4">{t('corneal_page_title2')}</h2>
                                <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
                                    <li>{t('corneal_page_item1')}</li>
                                    <li>{t('corneal_page_item2')}</li>
                                    <li>{t('corneal_page_item3')}</li>
                                    <li>{t('corneal_page_item4')}</li>
                                    <li>{t('corneal_page_item5')}</li>
                                </ul>
                            </div>
                            <div>
                                <img
                                    src="/images/service_page_corneal_transplantation.jpg"
                                    alt={t('service_cornealtitletitle')}
                                    className="rounded-lg shadow-md w-full h-auto object-cover"
                                />
                            </div>
                        </div>

                        {/* Section 3: Stages */}
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                            <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">{t('corneal_page_title3')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div className="bg-indigo-50 p-6 rounded-lg shadow-sm">
                                    <p className="text-sm font-semibold text-indigo-500">{t('corneal_page_stage1_title')}</p>
                                    <h3 className="text-lg font-bold text-gray-800 my-2">{t('corneal_page_stage1_subtitle')}</h3>
                                    <p className="text-gray-600">{t('corneal_page_stage1_desc')}</p>
                                </div>
                                <div className="bg-indigo-50 p-6 rounded-lg shadow-sm">
                                    <p className="text-sm font-semibold text-indigo-500">{t('corneal_page_stage2_title')}</p>
                                    <h3 className="text-lg font-bold text-gray-800 my-2">{t('corneal_page_stage2_subtitle')}</h3>
                                    <p className="text-gray-600">{t('corneal_page_stage2_desc')}</p>
                                </div>
                                <div className="bg-indigo-50 p-6 rounded-lg shadow-sm">
                                    <p className="text-sm font-semibold text-indigo-500">{t('corneal_page_stage3_title')}</p>
                                    <h3 className="text-lg font-bold text-gray-800 my-2">{t('corneal_page_stage3_subtitle')}</h3>
                                    <p className="text-gray-600">{t('corneal_page_stage3_desc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* --- End of Template Layout --- */}

                    {/* Doctors Section */}
                    <h2 className="text-3xl font-bold text-indigo-600 my-12 pt-8 border-t border-gray-200">
                        {t('page_specialists_title')}
                    </h2>
                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                        {serviceDoctors.map(doctor => (
                            <DoctorCard key={doctor.id} doctor={doctor} />
                        ))}
                    </div>
                </div>
            </main>

            <Footer onLoginClick={() => {}} />
        </div>
    );
}