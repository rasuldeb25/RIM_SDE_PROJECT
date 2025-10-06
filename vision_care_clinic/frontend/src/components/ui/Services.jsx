import React from 'react';

// This component displays the list of services offered by the clinic.
export default function Services() {
    const servicesData = [
        { icon: "🔍", title: "Comprehensive Eye Exams", desc: "Complete vision and eye health evaluations." },
        { icon: "👓", title: "Contact Lens Fitting", desc: "Professional fitting for all types of contact lenses." },
        { icon: "⚕️", title: "Eye Disease Treatment", desc: "Diagnosis and treatment of glaucoma, cataracts, etc." },
        { icon: "🥽", title: "LASIK Consultation", desc: "Pre-surgical evaluation for laser vision correction." },
        { icon: "👶", title: "Pediatric Eye Care", desc: "Specialized eye care services for children." },
        { icon: "🚨", title: "Emergency Eye Care", desc: "Immediate treatment for urgent eye conditions." },
    ];

    return (
        <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-600 mb-12">Our Services</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData.map((service, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
                            <div className="text-5xl mb-4">{service.icon}</div>
                            <h3 className="text-xl font-bold text-indigo-600 mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
