import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HomeLayouts from '../layouts/HomeLayouts'
import Hero from '../components/molecules/Hero'
import Newsletter from '../components/molecules/Newsletter'
import CourseGrid from '../components/organisms/CourseGrid'
import { getAllCourses, getCoursesByCategory, categories } from '../data/CoursesData'

export default function Home() {
    const [activeCategory, setActiveCategory] = useState('Semua Kelas');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    
    const location = useLocation();

    // Load courses data - hanya sekali dan ketika ada perubahan storage
    useEffect(() => {
        const loadCourses = () => {
            const courses = getAllCourses();
            setAllCourses(courses);
            
            // Apply filter berdasarkan kategori aktif
            if (activeCategory === 'Semua Kelas') {
                setFilteredCourses(courses);
            } else {
                const filtered = courses.filter(course => course.category === activeCategory);
                setFilteredCourses(filtered);
            }
        };

        // Load initial data
        loadCourses();

        // Listen for storage changes (when admin adds/deletes courses)
        const handleStorageChange = (e) => {
            if (e.key === 'courses') {
                loadCourses();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        
        // Cleanup listener
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [activeCategory]); // Dependency pada activeCategory

    // Check login state from localStorage and location state
    useEffect(() => {
        // Check if user came from login/register
        if (location.state?.isLoggedIn) {
            setIsLoggedIn(true);
            setUser(location.state.user);
        } else {
            // Check localStorage for persistent login
            const storedLoginState = localStorage.getItem('isLoggedIn');
            const storedUser = localStorage.getItem('user');
            
            if (storedLoginState === 'true' && storedUser) {
                setIsLoggedIn(true);
                setUser(JSON.parse(storedUser));
            }
        }
    }, [location.state]);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        // Filter courses berdasarkan kategori yang dipilih
        if (category === 'Semua Kelas') {
            setFilteredCourses(allCourses);
        } else {
            const filtered = allCourses.filter(course => course.category === category);
            setFilteredCourses(filtered);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        // localStorage sudah di-clear oleh Navbar component
    };

    return (
        <>
            <HomeLayouts 
                isLoggedIn={isLoggedIn} 
                user={user}
                onLogout={handleLogout}
            >
                <Hero />
                
                {/* Main Content Container with consistent gaps */}
                <div className="px-4 sm:px-8 pt-4 md:pt-8 lg:pt-12">
                    <div className="flex flex-col w-full max-w-[1170px] mx-auto">
                        
                        {/* Title Section */}
                        <div className="flex flex-col gap-3">
                            <h3 className="font-semibold text-2xl md:text-3xl text-gray-800">
                                Koleksi Video Pembelajaran Unggulan
                            </h3>
                            <p className="font-medium text-base text-gray-500">
                                Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
                            </p>
                        </div>

                        {/* Dynamic Tabs */}
                        <div className="flex gap-1 overflow-x-auto">
                            {categories.map((category) => (
                                <div 
                                    key={category}
                                    className={`flex flex-col gap-2 px-9 py-3 cursor-pointer transition-colors ${
                                        activeCategory === category ? '' : ''
                                    }`}
                                    onClick={() => handleCategoryChange(category)}
                                >
                                    <button 
                                        className={`font-medium text-base whitespace-nowrap transition-colors ${
                                            activeCategory === category 
                                                ? 'text-orange-500' 
                                                : 'text-gray-500 hover:text-orange-400'
                                        }`}
                                        type="button"
                                    >
                                        {category}
                                    </button>
                                    {activeCategory === category && (
                                        <div className="w-13 h-1.5 rounded-lg bg-orange-500"></div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Course Grid with filtered courses */}
                        <CourseGrid courses={filteredCourses} />

                        {/* Course Statistics */}
                        <div className="text-center py-4">
                            <p className="text-gray-600">
                                Menampilkan {filteredCourses.length} dari {allCourses.length} kursus tersedia
                                {activeCategory !== 'Semua Kelas' && (
                                    <span className="text-orange-600 font-medium"> dalam kategori "{activeCategory}"</span>
                                )}
                            </p>
                            {filteredCourses.length === 0 && activeCategory !== 'Semua Kelas' && (
                                <p className="text-gray-500 mt-2">
                                    Tidak ada kursus untuk kategori ini.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <Newsletter />
            </HomeLayouts>
        </>
    )
}