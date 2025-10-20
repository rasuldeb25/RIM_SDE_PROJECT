// This file is our simple "database" for the website.

// ==================
// DOCTORS
// (I've created random data for your 6 doctors)
// ==================
export const doctors = [
    {
        id: 1,
        name: 'Dr. Marcus Cole',
        title: 'Lead Optometrist, O.D.',
        bio: 'Dr. Cole has over 15 years of experience in comprehensive eye care and specializes in diagnosing complex eye diseases.',
        image: '/images/doc_1.jpg'
    },
    {
        id: 2,
        name: 'Dr. Julian Hayes',
        title: 'Emergency Eye Care Specialist',
        bio: 'Dr. Hayes is our resident expert in ocular emergencies, providing rapid diagnosis and treatment for eye injuries and sudden vision loss.',
        image: '/images/doc_2.jpg'
    },
    {
        id: 3,
        name: 'Dr. Elena Petrova',
        title: 'Pediatric Optometrist',
        bio: 'Dr. Petrova has a passion for pediatric eye care, making vision tests fun and accessible for children of all ages.',
        image: '/images/doc_3.jpg'
    },
    {
        id: 4,
        name: 'Dr. Ben Carter',
        title: 'Glaucoma & Retina Specialist',
        bio: 'Dr. Carter specializes in the management of chronic eye conditions, including glaucoma and diabetic retinopathy, using the latest technologies.',
        image: '/images/doc_4.jpg'
    },
    {
        id: 5,
        name: 'Dr. Sarah Jenkins',
        title: 'Contact Lens & Fitting Expert',
        bio: 'Dr. Jenkins excels in fitting all types of contact lenses, including complex cases for astigmatism and multifocal needs.',
        image: '/images/doc_5.jpg'
    },
    {
        id: 6,
        name: 'Dr. Evelyn Reed',
        title: 'Surgical Consultant, M.D.',
        bio: 'Dr. Reed is our chief surgical consultant, specializing in pre-operative evaluations for LASIK and cataract surgery.',
        image: '/images/doc_6.jpg'
    }
];

// ==================
// SERVICES
// (I've updated these to use your new doctor IDs)
// ==================
export const services = [
    {
        slug: 'comprehensive-eye-exams',
        icon: "🔍", //
        title: "Comprehensive Eye Exams",
        desc: "Complete vision and eye health evaluations.", //
        longDescription: "Our comprehensive eye exam goes beyond a simple vision test. We evaluate the complete health of your eyes, checking for signs of glaucoma, cataracts, macular degeneration, and other diseases. Regular exams are key to early detection and preserving your vision.",
        doctorIds: [1, 4] // Assigns Dr. Cole and Dr. Carter
    },
    {
        slug: 'contact-lens-fitting',
        icon: "👓", //
        title: "Contact Lens Fitting",
        desc: "Professional fitting for all types of contact lenses.", //
        longDescription: "Finding the right contact lens is about more than just your prescription. We measure your eye's curvature and discuss your lifestyle to find the perfect fit, whether you need daily disposables, lenses for astigmatism, or multifocal options.",
        doctorIds: [5] // Assigns Dr. Jenkins
    },
    {
        slug: 'eye-disease-treatment',
        icon: "⚕️", //
        title: "Eye Disease Treatment",
        desc: "Diagnosis and treatment of glaucoma, cataracts, etc.", //
        longDescription: "We manage and treat a wide range of eye diseases. Our clinic is equipped with state-of-the-art diagnostic tools to monitor conditions like glaucoma, macular degeneration, and diabetic retinopathy, providing treatment plans to slow progression and protect your sight.",
        doctorIds: [1, 4, 6] // Assigns Dr. Cole, Dr. Carter, and Dr. Reed
    },
    {
        slug: 'lasik-consultation',
        icon: "🥽", //
        title: "LASIK Consultation",
        desc: "Pre-surgical evaluation for laser vision correction.", //
        longDescription: "Considering LASIK? Our consultation provides a complete pre-surgical evaluation to determine if you are a good candidate. We use advanced mapping technology to analyze your cornea and discuss the potential risks and benefits with our surgical specialist.",
        doctorIds: [6] // Assigns Dr. Reed
    },
    {
        slug: 'pediatric-eye-care',
        icon: "👶", //
        title: "Pediatric Eye Care",
        desc: "Specialized eye care services for children.", //
        longDescription: "Children's vision is critical to their development. Our pediatric eye care services are designed to be child-friendly, checking for common issues like 'lazy eye' (amblyopia), strabismus (crossed eyes), and ensuring they have the visual skills needed for school.",
        doctorIds: [3] // Assigns Dr. Petrova
    },
    {
        slug: 'emergency-eye-care',
        icon: "🚨", //
        title: "Emergency Eye Care",
        desc: "Immediate treatment for urgent eye conditions.", //
        longDescription: "We offer prompt care for eye emergencies, including eye injuries, sudden vision loss, flashes or floaters, and red or painful eyes. If you have an urgent concern, please contact us immediately.",
        doctorIds: [2] // Assigns Dr. Hayes
    }
];