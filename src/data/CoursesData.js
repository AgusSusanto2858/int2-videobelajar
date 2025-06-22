const defaultCoursesData = [
    {
        id: 1,
        courseImage: '/images/cards/card1.png',
        title: "Big 4 Auditor Financial Analyst",
        description: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan sistem pembelajaran yang mudah dipahami.",
        tutorImage: '/images/tutors/tutor-card1.png',
        tutorName: "Jenna Ortega",
        position: "Senior Accountant",
        company: "Gojek",
        rating: 4.5,
        reviewCount: 126,
        price: "300K",
        category: "Bisnis"
    },
    {
        id: 2,
        courseImage: '/images/cards/card2.png',
        title: "Digital Marketing Strategy",
        description: "Pelajari strategi pemasaran digital yang efektif untuk meningkatkan brand awareness dan konversi.",
        tutorImage: '/images/tutors/tutor-card2.png',
        tutorName: "Sarah Johnson",
        position: "Marketing Director",
        company: "Tokopedia",
        rating: 4.2,
        reviewCount: 98,
        price: "250K",
        category: "Pemasaran"
    },
    {
        id: 3,
        courseImage: '/images/cards/card3.png',
        title: "UI/UX Design Fundamentals",
        description: "Kuasai dasar-dasar desain UI/UX untuk menciptakan pengalaman pengguna yang luar biasa.",
        tutorImage: '/images/tutors/tutor-card3.png',
        tutorName: "Michael Chen",
        position: "Lead Designer",
        company: "Grab",
        rating: 4.7,
        reviewCount: 204,
        price: "400K",
        category: "Desain"
    },
    {
        id: 4,
        courseImage: '/images/cards/card4.png',
        title: "Personal Branding Mastery",
        description: "Bangun personal branding yang kuat untuk mengembangkan karir dan bisnis Anda.",
        tutorImage: '/images/tutors/tutor-card4.png',
        tutorName: "Lisa Wong",
        position: "Brand Consultant",
        company: "Freelancer",
        rating: 4.3,
        reviewCount: 87,
        price: "350K",
        category: "Pengembangan Diri"
    },
    {
        id: 5,
        courseImage: '/images/cards/card5.png',
        title: "Business Analytics with Excel",
        description: "Analisis data bisnis menggunakan Excel untuk pengambilan keputusan yang lebih baik.",
        tutorImage: '/images/tutors/tutor-card5.png',
        tutorName: "David Park",
        position: "Data Analyst",
        company: "Bukalapak",
        rating: 4.1,
        reviewCount: 156,
        price: "275K",
        category: "Bisnis"
    },
    {
        id: 6,
        courseImage: '/images/cards/card6.png',
        title: "Social Media Content Creation",
        description: "Ciptakan konten media sosial yang engaging dan viral untuk berbagai platform.",
        tutorImage: '/images/tutors/tutor-card6.png',
        tutorName: "Amanda Rivera",
        position: "Content Strategist",
        company: "TikTok",
        rating: 4.6,
        reviewCount: 189,
        price: "300K",
        category: "Pemasaran"
    },
    {
        id: 7,
        courseImage: '/images/cards/card7.png',
        title: "Graphic Design Essentials",
        description: "Pelajari teknik desain grafis dari dasar hingga mahir menggunakan tools profesional.",
        tutorImage: '/images/tutors/tutor-card7.png',
        tutorName: "Robert Kim",
        position: "Creative Director",
        company: "Adobe",
        rating: 4.4,
        reviewCount: 167,
        price: "450K",
        category: "Desain"
    },
    {
        id: 8,
        courseImage: '/images/cards/card8.png',
        title: "Leadership & Team Management",
        description: "Kembangkan kemampuan kepemimpinan dan manajemen tim untuk hasil yang optimal.",
        tutorImage: '/images/tutors/tutor-card8.png',
        tutorName: "Jennifer Taylor",
        position: "HR Director",
        company: "Google",
        rating: 4.8,
        reviewCount: 245,
        price: "500K",
        category: "Pengembangan Diri"
    },
    {
        id: 9,
        courseImage: '/images/cards/card9.png',
        title: "E-commerce Business Setup",
        description: "Panduan lengkap membangun bisnis e-commerce dari nol hingga sukses.",
        tutorImage: '/images/tutors/tutor-card9.png',
        tutorName: "Kevin Zhang",
        position: "E-commerce Manager",
        company: "Shopee",
        rating: 4.5,
        reviewCount: 178,
        price: "375K",
        category: "Bisnis"
    }
];

// Cache untuk menghindari multiple localStorage reads
let coursesCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 1000; // 1 second cache

// Function to get all courses (combining default + localStorage)
const getAllCoursesData = () => {
    // Use cache if still valid
    const now = Date.now();
    if (coursesCache && (now - cacheTimestamp) < CACHE_DURATION) {
        return coursesCache;
    }

    try {
        // Check and update image paths if needed
        checkAndUpdateImagePaths();
        
        // Get courses from localStorage
        const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
        
        // If no stored courses, initialize with default data
        if (storedCourses.length === 0) {
            localStorage.setItem('courses', JSON.stringify(defaultCoursesData));
            coursesCache = defaultCoursesData;
        } else {
            // Validate image paths - if old paths detected, reset
            const hasOldPaths = storedCourses.some(course => 
                course.courseImage && course.courseImage.includes('../assets/')
            );
            
            if (hasOldPaths) {
                console.log('🔄 Detected old image paths, resetting to new paths...');
                localStorage.setItem('courses', JSON.stringify(defaultCoursesData));
                coursesCache = defaultCoursesData;
            } else {
                coursesCache = storedCourses;
            }
        }
        
        cacheTimestamp = now;
        return coursesCache;
    } catch (error) {
        console.error('Error loading courses from localStorage:', error);
        coursesCache = defaultCoursesData;
        cacheTimestamp = now;
        return defaultCoursesData;
    }
};

// Function to reset courses with new image paths
export const resetToDefaultCourses = () => {
    // Force update localStorage with new image paths
    localStorage.setItem('courses', JSON.stringify(defaultCoursesData));
    
    // Clear cache
    clearCache();
    
    console.log('✅ Default courses reset with new image paths!');
    return defaultCoursesData;
};

// Auto-reset function dengan version check
export const checkAndUpdateImagePaths = () => {
    const CURRENT_VERSION = '2.0'; // Update version number
    const storedVersion = localStorage.getItem('coursesVersion');
    
    if (storedVersion !== CURRENT_VERSION) {
        console.log('🔄 Updating courses to new image paths...');
        resetToDefaultCourses();
        localStorage.setItem('coursesVersion', CURRENT_VERSION);
        return true; // Indicate that reset occurred
    }
    
    return false; // No reset needed
};

// Clear cache when courses are updated
const clearCache = () => {
    coursesCache = null;
    cacheTimestamp = 0;
};

// Export the dynamic courses data
export const coursesData = getAllCoursesData();

// Helper functions
export const getFeaturedCourses = (limit = 6) => {
    const allCourses = getAllCoursesData();
    return allCourses.slice(0, limit);
};

export const getAllCourses = () => {
    return getAllCoursesData();
};

export const getCoursesByCategory = (category) => {
    const allCourses = getAllCoursesData();
    if (category === 'Semua Kelas') return allCourses;
    return allCourses.filter(course => course.category === category);
};

export const categories = [
    'Semua Kelas',
    'Pemasaran', 
    'Desain', 
    'Pengembangan Diri', 
    'Bisnis'
];

// Function to refresh courses data and clear cache
export const refreshCoursesData = () => {
    clearCache();
    return getAllCoursesData();
};

// Function to update courses (for admin use)
export const updateCoursesData = (newCourses) => {
    try {
        localStorage.setItem('courses', JSON.stringify(newCourses));
        clearCache();
        return true;
    } catch (error) {
        console.error('Error updating courses:', error);
        return false;
    }
};