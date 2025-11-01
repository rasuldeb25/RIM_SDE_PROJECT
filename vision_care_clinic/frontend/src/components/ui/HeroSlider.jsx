import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { services } from '../../api/clinicData';
import { useTranslation } from 'react-i18next';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// We filter by slug, which is NOT translated
const featuredServices = services.filter(s =>
    s.slug === 'pediatric-eye-care' ||
    s.slug === 'lasik-consultation' ||
    s.slug === 'comprehensive-eye-exams'
);

// These image paths come from your 'public' folder
// You will need to re-add these images to 'frontend/public/images/'
const slideImages = {
    'pediatric-eye-care': '/images/slider_service_3_pediatric_eye_care.jpg',
    'lasik-consultation': '/images/slider_service_2_LASIK_consultation.jpg',
    'comprehensive-eye-exams': '/images/slider_service_1_comprehensive_eye_exams.jpg'
};

export default function HeroSlider() {
    const { t } = useTranslation();

    return (
        <div className="container mx-auto px-4 relative rounded-2xl overflow-hidden shadow-lg">
            <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="w-full h-[50vh] md:h-[60vh]"
            >
                {featuredServices.map(service => (
                    <SwiperSlide key={service.slug} className="relative text-white">
                        {/* Background Image with Dark Overlay */}
                        <div
                            className="absolute inset-0 w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${slideImages[service.slug]})` }}
                        ></div>
                        <div className="absolute inset-0 w-full h-full bg-black bg-opacity-50"></div>

                        {/* Left-aligned text content */}
                        <div className="relative z-10 flex flex-col justify-center items-start text-left h-full p-8 pl-8 md:pl-16 max-w-2xl">

                            {/* --- THIS IS THE TRANSLATED CODE --- */}
                            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                                {t(service.titleKey)}
                            </h1>
                            <p className="text-lg md:text-xl mb-8 opacity-90">
                                {t(service.descKey)}
                            </p>
                            {/* --- END OF TRANSLATED CODE --- */}

                            <Link
                                to={`/service/${service.slug}`}
                                className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-2xl"
                            >
                                {t('learn_more')}
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}