import React, { useState } from 'react';

// This component handles the logic and UI for the appointment booking form.
export default function AppointmentForm() {
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
                <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-600 mb-12">Book Your Appointment</h2>
                <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-2xl shadow-xl">
                    {submitted && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md" role="alert">
                            <p className="font-bold">Success!</p>
                            <p>Your request has been submitted. We'll be in touch.</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"/>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"/>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                                <input type="date" name="date" id="date" value={formData.date} onChange={handleInputChange} min={today} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                                <select name="time" id="time" value={formData.time} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                                    <option value="">Select Time</option>
                                    <option value="09:00">9:00 AM</option>
                                    <option value="10:00">10:00 AM</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Needed</label>
                            <select name="service" id="service" value={formData.service} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                                <option value="">Select Service</option>
                                <option value="exam">Comprehensive Eye Exam</option>
                                <option value="contacts">Contact Lens Fitting</option>
                                <option value="treatment">Eye Disease Treatment</option>
                                <option value="lasik">LASIK Consultation</option>
                                <option value="pediatric">Pediatric Eye Care</option>
                                <option value="emergency">Emergency Eye Care</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                            <textarea name="notes" id="notes" rows="4" value={formData.notes} onChange={handleInputChange} placeholder="Any symptoms or concerns..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-indigo-700 transition-all shadow-lg">
                            Book Appointment
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};
