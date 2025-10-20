import React from 'react';

// This component displays a summary of the patient's personal information.
// It receives a "patient" object as a prop to display the data.
// We've added a default empty object {} to the patient prop for safety.
export default function PatientProfileCard({ patient = {} }) {
    return (
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-indigo-600 mb-4">Patient Information</h2>
            <div className="space-y-4 text-gray-700">
                <div>
                    <p className="text-sm font-semibold text-gray-500">Name</p>
                    <p className="text-lg">{patient.name}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-500">Email</p>
                    <p className="text-lg">{patient.email}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-500">Phone</p>
                    <p className="text-lg">{patient.phone}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-500">Date of Birth</p>
                    <p className="text-lg">{patient.dob}</p>
                </div>
            </div>
        </div>
    );
}

