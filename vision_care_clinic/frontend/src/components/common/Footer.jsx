import React from 'react';
import { useTranslation } from 'react-i18next';

// This component receives the onLoginClick function to allow opening the modal from the footer.
export default function Footer({ onLoginClick }) {
    const { t } = useTranslation();

    return (
        <footer className="bg-gray-800 text-white pt-16 pb-8" id="contact">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-center md:text-left">

                    {/* --- CONTACT SECTION --- */}
                    <div>
                        <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                            {/* You'll need to add 'footer_icon_contact_us.png' to 'frontend/public/images/' */}
                            <img src="/images/footer_icon_contact_us.png" alt={t('footer_contact')} className="h-6 w-6" />
                            <h3 className="text-lg font-semibold">{t('footer_contact')}</h3>
                        </div>
                        <p className="text-gray-400">{t('footer_address')}</p>
                        <p className="text-gray-400">{t('footer_phone')}</p>
                    </div>

                    {/* --- HOURS SECTION --- */}
                    <div>
                        <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                            {/* You'll need to add 'footer_icon_hours.png' to 'frontend/public/images/' */}
                            <img src="/images/footer_icon_hours.png" alt={t('footer_hours')} className="h-6 w-6" />
                            <h3 className="text-lg font-semibold">{t('footer_hours')}</h3>
                        </div>
                        <p className="text-gray-400">{t('footer_hours_week')}</p>
                        <p className="text-gray-400">{t('footer_hours_sat')}</p>
                    </div>

                    {/* --- QUICK LINKS SECTION --- */}
                    <div>
                        <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                            {/* You'll need to add 'footer_icon_quick_links.png' to 'frontend/public/images/' */}
                            <img src="/images/footer_icon_quick_links.png" alt={t('footer_quicklinks')} className="h-6 w-6" />
                            <h3 className="text-lg font-semibold">{t('footer_quicklinks')}</h3>
                        </div>
                        <ul>
                            <li><a href="#services" className="text-gray-400 hover:text-white">{t('services')}</a></li>
                            <li><button onClick={onLoginClick} className="text-gray-400 hover:text-white text-left bg-transparent">{t('patient_portal')}</button></li>
                        </ul>
                    </div>

                    {/* --- LOGO SECTION --- */}
                    <div className="flex items-center justify-center md:justify-start space-x-2">
                        <img src="/images/vison_care_logo.png" alt="VisionCare Logo" className="h-8 w-auto" />
                        <span className="text-2xl font-bold">VisionCare</span>
                    </div>

                </div>
                <div className="border-t border-gray-700 pt-8 text-center text-gray-500">
                    &copy; {new Date().getFullYear()} {t('footer_copyright')}
                </div>
            </div>
        </footer>
    );
};