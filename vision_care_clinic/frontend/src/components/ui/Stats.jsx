import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

export default function Stats() {
    const { t } = useTranslation();

    // This hook triggers the animation when the component scrolls into view
    const { ref, inView } = useInView({
        triggerOnce: true, // Only trigger the animation once
        threshold: 0.5, // Trigger when 50% of the component is visible
    });

    // Define the 'stats' array INSIDE the component to use the t() function
    const stats = [
        { number: 50, suffix: '+', label: t('stats_patients') },
        { number: 45, suffix: '+', label: t('stats_operations') },
        { number: 25, suffix: '+', label: t('stats_experience') }
    ];

    return (
        <section ref={ref} className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {stats.map((item, index) => (
                    // The white card with shadow
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center py-10"
                    >
                        {/* The bold, indigo number style */}
                        <h2 className="text-6xl font-extrabold text-indigo-600">
                            <CountUp
                                start={0}
                                end={inView ? item.number : 0} // Count up only when in view
                                duration={2.5}
                                suffix={item.suffix}
                            />
                        </h2>

                        {/* The label text */}
                        <p className="mt-3 text-gray-600 text-lg font-medium text-center leading-snug px-4">
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}