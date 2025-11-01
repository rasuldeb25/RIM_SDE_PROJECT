import React from 'react';
import { services } from '../../api/clinicData'; // The "database" file
import { Link } from 'react-router-dom'; // React Router hook
import { ArrowRightIcon } from '@heroicons/react/24/solid'; // HeroIcons
import { useTranslation } from 'react-i18next'; // Translation hook

export default function Services() {
    const { t } = useTranslation(); // Initialize the hook

    return (
        <section className="bg-gray-50 py-16 md:py-24" id="services">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center">
                  <span className="text-indigo-600 font-semibold uppercase tracking-wider">
                    {t('services_section_subtitle')}
                  </span>
                    {/* We are leaving out the main title as requested */}
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {services.map((item) => (
                        <Link
                            to={'/service/' + item.slug} // Builds the correct URL e.g., /service/lasik-consultation
                            key={item.id}
                            className="group bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl"
                        >
                            <div className="p-6 md:p-8 flex-grow">

                                {/* Icon */}
                                <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={item.icon}
                                        alt={t(item.titleKey)}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <h3 className="mt-5 text-xl font-bold text-gray-900">
                                    {t(item.titleKey)}
                                </h3>
                                <p className="mt-2 text-gray-600 text-base">
                                    {t(item.descKey)}
                                </p>
                            </div>

                            {/* Learn More Footer */}
                            <div className="bg-gray-50 p-6 md:p-8 border-t border-gray-100">
                                <span className="flex items-center font-semibold text-indigo-600">
                                  {t('learn_more')}
                                    <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}