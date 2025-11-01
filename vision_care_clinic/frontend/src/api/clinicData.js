// This file is our simple "database" for the website.

// ==================
// DOCTORS
// ==================
export const doctors = [
    {
        id: 1,
        nameKey: 'doc_1_name',
        titleKey: 'doc_1_title',
        bioKey: 'doc_1_bio',
        image: '/images/doc_1.jpg'
    },
    {
        id: 2,
        nameKey: 'doc_2_name',
        titleKey: 'doc_2_title',
        bioKey: 'doc_2_bio',
        image: '/images/doc_2.jpg'
    },
    {
        id: 3,
        nameKey: 'doc_3_name',
        titleKey: 'doc_3_title',
        bioKey: 'doc_3_bio',
        image: '/images/doc_3.jpg'
    },
    {
        id: 4,
        nameKey: 'doc_4_name',
        titleKey: 'doc_4_title',
        bioKey: 'doc_4_bio',
        image: '/images/doc_4.jpg'
    },
    {
        id: 5,
        nameKey: 'doc_5_name',
        titleKey: 'doc_5_title',
        bioKey: 'doc_5_bio',
        image: '/images/doc_5.jpg'
    },
    {
        id: 6,
        nameKey: 'doc_6_name',
        titleKey: 'doc_6_title',
        bioKey: 'doc_6_bio',
        image: '/images/doc_6.jpg'
    }
];

// ==================
// SERVICES
// ==================
export const services = [
    {
        id: 1,
        slug: 'comprehensive-eye-exams',
        icon: '/images/icon_comperhensive_eye_exams.png', // You'll need to re-add this image
        titleKey: 'service_comprehensivetitle',
        descKey: 'service_comprehensivedesc',
        doctorIds: [1, 4]
    },
    {
        id: 2,
        slug: 'lasik-consultation',
        icon: '/images/icon_lastik_consultation.png', // You'll need to re-add this image
        titleKey: 'service_lasiktitle',
        descKey: 'service_lasikdesc',
        doctorIds: [6]
    },
    {
        id: 3,
        slug: 'pediatric-eye-care',
        icon: '/images/icon_pediatric_eye_care.png', // You'll need to re-add this image
        titleKey: 'service_pediatrictitle',
        descKey: 'service_pediatricdesc',
        doctorIds: [3]
    },
    {
        id: 4,
        slug: 'corneal-transplantation',
        icon: '/images/icon_corneal_transplantation.png', // You'll need to re-add this image
        titleKey: 'service_cornealtitletitle',
        descKey: 'service_cornealdesc',
        doctorIds: [1, 6]
    },
    {
        id: 5,
        slug: 'ophthalmoplasty',
        icon: '/images/icon_ophthalmoplasty.png', // You'll need to re-add this image
        titleKey: 'service_ophthotitle',
        descKey: 'service_ophthodesc',
        doctorIds: [6]
    },
    {
        id: 6,
        slug: 'ipl-selective-phototherapy',
        icon: '/images/icon_IPL_selective_phototherapy.png', // You'll need to re-add this image
        titleKey: 'service_ipltitle',
        descKey: 'service_ipldesc',
        doctorIds: [5]
    }
];