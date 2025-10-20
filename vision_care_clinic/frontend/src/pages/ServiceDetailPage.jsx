import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { services, doctors } from '../api/clinicData'; // Import our new data

// Import common components
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

// A small component for the doctor card
const DoctorCard = ({ doctor }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-full object-cover" />
        <div>
            <h3 className="text-xl font-bold text-indigo-600">{doctor.name}</h3>
            <p className="text-gray-700 font-semibold">{doctor.title}</p>
            <p className="text-gray-600 mt-2">{doctor.bio}</p>
        </div>
    </div>
);

export default function ServiceDetailPage() {
    // Get the "serviceSlug" from the URL (e.g., "lasik-consultation")
    const { serviceSlug } = useParams();

    // Find the matching service from our data
    const service = services.find(s => s.slug === serviceSlug);

    // Find the doctors for this service
    const serviceDoctors = doctors.filter(doc => service.doctorIds.includes(doc.id));

    // Handle case where service isn't found
    if (!service) {
        return (
            <div className="text-center p-10">
                <h1 className="text-3xl font-bold">Service Not Found</h1>
                <Link to="/" className="text-indigo-600 hover:underline">Go back to Home</Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* We pass empty refs and functions for now */}
            <Header onLoginClick={() => {}} onNavClick={() => {}} refs={{}} />

            <main className="flex-grow pt-20 bg-gray-50">
                <div className="container mx-auto px-4 py-16">
                    {/* Service Info */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl mb-12">
                        <div className="text-center mb-6">
                            <div className="text-6xl">{service.icon}</div>
                            <h1 className="text-4xl font-extrabold text-indigo-600 mt-4">{service.title}</h1>
                        </div>
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center">
                            {service.longDescription}
                        </p>
                    </div>

                    {/* Doctors for this Service */}
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Specialists for this Service</h2>
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