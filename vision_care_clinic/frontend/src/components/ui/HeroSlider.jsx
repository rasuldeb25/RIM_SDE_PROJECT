import React from 'react';
// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper modules
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { services } from '../../api/clinicData'; // We get our service data from here

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ========================================================================
// --- CHANGE 1: We now feature the 3 services you have images for. ---
// ========================================================================
const featuredServices = services.filter(s =>
    s.slug === 'pediatric-eye-care' ||
    s.slug === 'lasik-consultation' ||
    s.slug === 'comprehensive-eye-exams'
);

// ========================================================================
// --- CHANGE 2: We use your new local image paths. ---
// ========================================================================
const slideImages = {
    'pediatric-eye-care': '/images/slider_service_3_pediatric_eye_care.jpg',
    'lasik-consultation': '/images/slider_service_2_LASIK_consultation.jpg',
    'comprehensive-eye-exams': '/images/slider_service_1_comprehensive_eye_exams.jpg'
};

export default function HeroSlider() {
    return (
        <div className="pt-16"> {/* This padding avoids the fixed header */}
            <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="w-full h-[60vh] md:h-[75vh]" // This sets the slider height
            >
                {featuredServices.map(service => (
                    <SwiperSlide key={service.slug} className="relative text-white text-center">
                        {/* Background Image with Dark Overlay */}
                        <div
                            className="absolute inset-0 w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${slideImages[service.slug]})` }}
                        ></div>
                        <div className="absolute inset-0 w-full h-full bg-black bg-opacity-50"></div>

                        {/* Slide Content */}
                        <div className="relative z-10 flex flex-col justify-center items-center h-full p-8">
                            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                                {service.title}
                            </h1>
                            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90">
                                {service.desc}
                            </p>
                            <Link
                                to={`/service/${service.slug}`}
                                className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-2xl"
                            >
                                Learn More
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}