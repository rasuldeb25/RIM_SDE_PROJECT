import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link for navigation
import { services } from '../../api/clinicData'; // 2. Import the services data from our new file

// This component now displays the list of services as links
export default function Services() {
    // 3. We NO LONGER define servicesData here. We use the imported 'services'.

    return (
        <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-600 mb-12">Our Services</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* 4. We map over the 'services' array we imported */}
                    {services.map((service, index) => (

                        // 5. The whole card is now a <Link>
                        <Link
                            to={`/service/${service.slug}`} // This creates the URL (e.g., /service/lasik-consultation)
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center block"
                        >
                            <div className="text-5xl mb-4">{service.icon}</div>
                            <h3 className="text-xl font-bold text-indigo-600 mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.desc}</p>
                        </Link>

                    ))}
                </div>
            </div>
        </section>
    );
};