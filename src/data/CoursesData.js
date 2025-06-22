import Card1 from '../assets/cards/card1.png'
import Card2 from '../assets/cards/card2.png'
import Card3 from '../assets/cards/card3.png'
import Card4 from '../assets/cards/card4.png'
import Card5 from '../assets/cards/card5.png'
import Card6 from '../assets/cards/card6.png'
import Card7 from '../assets/cards/card7.png'
import Card8 from '../assets/cards/card8.png'
import Card9 from '../assets/cards/card9.png'
import Tutor1 from '../assets/tutors/tutor-card1.png'
import Tutor2 from '../assets/tutors/tutor-card2.png'
import Tutor3 from '../assets/tutors/tutor-card3.png'
import Tutor4 from '../assets/tutors/tutor-card4.png'
import Tutor5 from '../assets/tutors/tutor-card5.png'
import Tutor6 from '../assets/tutors/tutor-card6.png'
import Tutor7 from '../assets/tutors/tutor-card7.png'
import Tutor8 from '../assets/tutors/tutor-card8.png'
import Tutor9 from '../assets/tutors/tutor-card9.png'

// Default courses data
const defaultCoursesData = [
    {
        id: 1,
        courseImage: Card1,
        title: "Big 4 Auditor Financial Analyst",
        description: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan sistem pembelajaran yang mudah dipahami.",
        tutorImage: Tutor1,
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
        courseImage: Card2,
        title: "Digital Marketing Strategy",
        description: "Pelajari strategi pemasaran digital yang efektif untuk meningkatkan brand awareness dan konversi.",
        tutorImage: Tutor2,
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
        courseImage: Card3,
        title: "UI/UX Design Fundamentals",
        description: "Kuasai dasar-dasar desain UI/UX untuk menciptakan pengalaman pengguna yang luar biasa.",
        tutorImage: Tutor3,
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
        courseImage: Card4,
        title: "Personal Branding Mastery",
        description: "Bangun personal branding yang kuat untuk mengembangkan karir dan bisnis Anda.",
        tutorImage: Tutor4,
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
        courseImage: Card5,
        title: "Business Analytics with Excel",
        description: "Analisis data bisnis menggunakan Excel untuk pengambilan keputusan yang lebih baik.",
        tutorImage: Tutor5,
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
        courseImage: Card6,
        title: "Social Media Content Creation",
        description: "Ciptakan konten media sosial yang engaging dan viral untuk berbagai platform.",
        tutorImage: Tutor6,
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
        courseImage: Card7,
        title: "Graphic Design Essentials",
        description: "Pelajari teknik desain grafis dari dasar hingga mahir menggunakan tools profesional.",
        tutorImage: Tutor7,
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
        courseImage: Card8,
        title: "Leadership & Team Management",
        description: "Kembangkan kemampuan kepemimpinan dan manajemen tim untuk hasil yang optimal.",
        tutorImage: Tutor8,
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
        courseImage: Card9,
        title: "E-commerce Business Setup",
        description: "Panduan lengkap membangun bisnis e-commerce dari nol hingga sukses.",
        tutorImage: Tutor9,
        tutorName: "Kevin Zhang",
        position: "E-commerce Manager",
        company: "Shopee",
        rating: 4.5,
        reviewCount: 178,
        price: "375K",
        category: "Bisnis"
    }
];

// Function to get all courses (combining default + localStorage)
const getAllCoursesData = () => {
    try {
        // Get courses from localStorage
        const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
        
        // If no stored courses, initialize with default data
        if (storedCourses.length === 0) {
            localStorage.setItem('courses', JSON.stringify(defaultCoursesData));
            return defaultCoursesData;
        }
        
        // Return stored courses (which may include admin-added courses)
        return storedCourses;
    } catch (error) {
        console.error('Error loading courses from localStorage:', error);
        return defaultCoursesData;
    }
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

// Function to refresh courses data (call this when courses are updated)
export const refreshCoursesData = () => {
    return getAllCoursesData();
};