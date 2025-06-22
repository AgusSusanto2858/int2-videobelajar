import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Available images for selection - Using absolute paths for Vercel deployment
const availableCardImages = [
    { id: 1, src: '/images/cards/card1.png', name: 'Card 1' },
    { id: 2, src: '/images/cards/card2.png', name: 'Card 2' },
    { id: 3, src: '/images/cards/card3.png', name: 'Card 3' },
    { id: 4, src: '/images/cards/card4.png', name: 'Card 4' },
    { id: 5, src: '/images/cards/card5.png', name: 'Card 5' },
    { id: 6, src: '/images/cards/card6.png', name: 'Card 6' },
    { id: 7, src: '/images/cards/card7.png', name: 'Card 7' },
    { id: 8, src: '/images/cards/card8.png', name: 'Card 8' },
    { id: 9, src: '/images/cards/card9.png', name: 'Card 9' }
];

const availableTutorImages = [
    { id: 1, src: '/images/tutors/tutor-card1.png', name: 'Tutor 1' },
    { id: 2, src: '/images/tutors/tutor-card2.png', name: 'Tutor 2' },
    { id: 3, src: '/images/tutors/tutor-card3.png', name: 'Tutor 3' },
    { id: 4, src: '/images/tutors/tutor-card4.png', name: 'Tutor 4' },
    { id: 5, src: '/images/tutors/tutor-card5.png', name: 'Tutor 5' },
    { id: 6, src: '/images/tutors/tutor-card6.png', name: 'Tutor 6' },
    { id: 7, src: '/images/tutors/tutor-card7.png', name: 'Tutor 7' },
    { id: 8, src: '/images/tutors/tutor-card8.png', name: 'Tutor 8' },
    { id: 9, src: '/images/tutors/tutor-card9.png', name: 'Tutor 9' }
];

// Image Gallery Modal Component
const ImageGalleryModal = ({ isOpen, onClose, images, onSelect, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {images.map((image) => (
                            <div
                                key={image.id}
                                className="cursor-pointer border-2 border-transparent hover:border-blue-500 rounded-lg p-2 transition-colors"
                                onClick={() => {
                                    onSelect(image.src);
                                    onClose();
                                }}
                            >
                                <img
                                    src={image.src}
                                    alt={image.name}
                                    className="w-full h-20 object-cover rounded"
                                    onError={(e) => {
                                        e.target.src = '/images/placeholder.png';
                                    }}
                                />
                                <p className="text-xs text-center mt-1 text-gray-600">{image.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Image Preview Component
const ImagePreview = ({ src, alt, onSelect, label }) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer"
                onClick={onSelect}
            >
                {src ? (
                    <div className="space-y-2">
                        <img 
                            src={src} 
                            alt={alt} 
                            className="w-20 h-20 object-cover rounded mx-auto"
                            onError={(e) => {
                                e.target.src = '/images/placeholder.png';
                            }}
                        />
                        <p className="text-sm text-gray-600">Click to change image</p>
                    </div>
                ) : (
                    <div className="py-8">
                        <div className="mx-auto w-12 h-12 text-gray-400">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Click to select image</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function Admin() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    
    // Course form state
    const [newCourse, setNewCourse] = useState({
        title: '',
        description: '',
        tutorName: '',
        position: '',
        company: '',
        rating: '',
        reviewCount: '',
        price: '',
        category: '',
        courseImage: '',
        tutorImage: ''
    });
    
    const [editCourse, setEditCourse] = useState(null);
    const [errors, setErrors] = useState({});
    
    // Image gallery states
    const [showCardGallery, setShowCardGallery] = useState(false);
    const [showTutorGallery, setShowTutorGallery] = useState(false);

    // Load data on component mount
    useEffect(() => {
        loadUsers();
        loadCourses();
    }, []);

    const loadUsers = () => {
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        setUsers(registeredUsers);
    };

    const loadCourses = () => {
        const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
        setCourses(storedCourses);
    };

    const handleDeleteUser = (user) => {
        setDeleteTarget(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (deleteTarget) {
            if (deleteTarget.type === 'user') {
                const updatedUsers = users.filter(user => user.id !== deleteTarget.id);
                setUsers(updatedUsers);
                localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
            } else if (deleteTarget.type === 'course') {
                const updatedCourses = courses.filter(course => course.id !== deleteTarget.id);
                setCourses(updatedCourses);
                localStorage.setItem('courses', JSON.stringify(updatedCourses));
            }
        }
        setShowDeleteModal(false);
        setDeleteTarget(null);
    };

    const handleResetPassword = (userId) => {
        if (newPassword.length < 6) {
            alert('Password minimal 6 karakter');
            return;
        }
        
        const updatedUsers = users.map(user => 
            user.id === userId 
                ? { ...user, password: newPassword }
                : user
        );
        
        setUsers(updatedUsers);
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
        setEditingUser(null);
        setNewPassword('');
        alert('Password berhasil direset!');
    };

    const validateCourseForm = () => {
        const newErrors = {};
        
        if (!newCourse.title.trim()) newErrors.title = 'Title wajib diisi';
        if (!newCourse.description.trim()) newErrors.description = 'Description wajib diisi';
        if (!newCourse.tutorName.trim()) newErrors.tutorName = 'Nama tutor wajib diisi';
        if (!newCourse.position.trim()) newErrors.position = 'Position wajib diisi';
        if (!newCourse.company.trim()) newErrors.company = 'Company wajib diisi';
        if (!newCourse.rating || newCourse.rating < 1 || newCourse.rating > 5) {
            newErrors.rating = 'Rating harus antara 1-5';
        }
        if (!newCourse.reviewCount || newCourse.reviewCount < 1) {
            newErrors.reviewCount = 'Review count harus lebih dari 0';
        }
        if (!newCourse.price || newCourse.price < 1) {
            newErrors.price = 'Price harus lebih dari 0';
        }
        if (!newCourse.category) newErrors.category = 'Category wajib dipilih';
        if (!newCourse.courseImage) newErrors.courseImage = 'Course image wajib dipilih';
        if (!newCourse.tutorImage) newErrors.tutorImage = 'Tutor image wajib dipilih';
        
        return newErrors;
    };

    const handleAddCourse = () => {
        const validationErrors = validateCourseForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const course = {
            id: Date.now(),
            courseImage: newCourse.courseImage,
            title: newCourse.title,
            description: newCourse.description,
            tutorImage: newCourse.tutorImage,
            tutorName: newCourse.tutorName,
            position: newCourse.position,
            company: newCourse.company,
            rating: parseFloat(newCourse.rating),
            reviewCount: parseInt(newCourse.reviewCount),
            price: newCourse.price + 'K',
            category: newCourse.category
        };

        const updatedCourses = [...courses, course];
        setCourses(updatedCourses);
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
        
        // Reset form
        setNewCourse({
            title: '',
            description: '',
            tutorName: '',
            position: '',
            company: '',
            rating: '',
            reviewCount: '',
            price: '',
            category: '',
            courseImage: '',
            tutorImage: ''
        });
        setErrors({});
        alert('Course berhasil ditambahkan!');
    };

    const handleEditCourse = (course) => {
        setEditCourse(course);
        setNewCourse({
            title: course.title,
            description: course.description,
            tutorName: course.tutorName,
            position: course.position,
            company: course.company,
            rating: course.rating.toString(),
            reviewCount: course.reviewCount.toString(),
            price: course.price.replace('K', ''),
            category: course.category,
            courseImage: course.courseImage,
            tutorImage: course.tutorImage
        });
        setActiveTab('add-course');
    };

    const handleUpdateCourse = () => {
        const validationErrors = validateCourseForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const updatedCourse = {
            ...editCourse,
            courseImage: newCourse.courseImage,
            title: newCourse.title,
            description: newCourse.description,
            tutorImage: newCourse.tutorImage,
            tutorName: newCourse.tutorName,
            position: newCourse.position,
            company: newCourse.company,
            rating: parseFloat(newCourse.rating),
            reviewCount: parseInt(newCourse.reviewCount),
            price: newCourse.price + 'K',
            category: newCourse.category
        };

        const updatedCourses = courses.map(course => 
            course.id === editCourse.id ? updatedCourse : course
        );
        
        setCourses(updatedCourses);
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
        
        // Reset form
        setEditCourse(null);
        setNewCourse({
            title: '',
            description: '',
            tutorName: '',
            position: '',
            company: '',
            rating: '',
            reviewCount: '',
            price: '',
            category: '',
            courseImage: '',
            tutorImage: ''
        });
        setErrors({});
        alert('Course berhasil diupdate!');
    };

    const handleDeleteCourse = (course) => {
        setDeleteTarget({ ...course, type: 'course' });
        setShowDeleteModal(true);
    };

    const handleCancelEdit = () => {
        setEditCourse(null);
        setNewCourse({
            title: '',
            description: '',
            tutorName: '',
            position: '',
            company: '',
            rating: '',
            reviewCount: '',
            price: '',
            category: '',
            courseImage: '',
            tutorImage: ''
        });
        setErrors({});
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/login');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const selectCardImage = (imageSrc) => {
        setNewCourse(prev => ({
            ...prev,
            courseImage: imageSrc
        }));
        if (errors.courseImage) {
            setErrors(prev => ({
                ...prev,
                courseImage: ''
            }));
        }
    };

    const selectTutorImage = (imageSrc) => {
        setNewCourse(prev => ({
            ...prev,
            tutorImage: imageSrc
        }));
        if (errors.tutorImage) {
            setErrors(prev => ({
                ...prev,
                tutorImage: ''
            }));
        }
    };

    const renderDashboard = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800">Total Users</h3>
                    <p className="text-3xl font-bold text-blue-600">{users.length}</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800">Total Courses</h3>
                    <p className="text-3xl font-bold text-green-600">{courses.length}</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-800">Categories</h3>
                    <p className="text-3xl font-bold text-yellow-600">5</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-800">Active Sessions</h3>
                    <p className="text-3xl font-bold text-purple-600">24</p>
                </div>
            </div>
        </div>
    );

    const renderUsers = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">User Management</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gender</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {user.fullName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.gender}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.phoneNumber}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    {editingUser === user.id ? (
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                placeholder="New password"
                                                className="border rounded px-2 py-1 text-xs"
                                            />
                                            <button
                                                onClick={() => handleResetPassword(user.id)}
                                                className="text-green-600 hover:text-green-900 text-xs"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditingUser(null);
                                                    setNewPassword('');
                                                }}
                                                className="text-gray-600 hover:text-gray-900 text-xs"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-x-2">
                                            <button
                                                onClick={() => setEditingUser(user.id)}
                                                className="text-blue-600 hover:text-blue-900 text-sm"
                                            >
                                                Reset Password
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser({ ...user, type: 'user' })}
                                                className="text-red-600 hover:text-red-900 text-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No users found
                    </div>
                )}
            </div>
        </div>
    );

    const renderCourses = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Course Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img 
                            src={course.courseImage} 
                            alt={course.title}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                                e.target.src = '/images/placeholder.png';
                            }}
                        />
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                            
                            <div className="flex items-center space-x-2 mb-3">
                                <img 
                                    src={course.tutorImage} 
                                    alt={course.tutorName}
                                    className="w-8 h-8 rounded-full object-cover"
                                    onError={(e) => {
                                        e.target.src = '/images/placeholder.png';
                                    }}
                                />
                                <div>
                                    <p className="text-sm font-medium">{course.tutorName}</p>
                                    <p className="text-xs text-gray-500">{course.position} at {course.company}</p>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-lg font-bold text-green-600">Rp {course.price}</span>
                                <span className="text-sm text-yellow-600">★ {course.rating} ({course.reviewCount})</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                    {course.category}
                                </span>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleEditCourse(course)}
                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCourse(course)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {courses.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No courses found
                </div>
            )}
        </div>
    );

    const renderAddCourse = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                    {editCourse ? 'Edit Course' : 'Add New Course'}
                </h2>
                {editCourse && (
                    <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Cancel Edit
                    </button>
                )}
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Course Information</h3>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={newCourse.title}
                                onChange={handleInputChange}
                                className={`w-full border rounded-md px-3 py-2 ${errors.title ? 'border-red-300' : 'border-gray-300'}`}
                                placeholder="Course title"
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                            <textarea
                                name="description"
                                value={newCourse.description}
                                onChange={handleInputChange}
                                rows={3}
                                className={`w-full border rounded-md px-3 py-2 ${errors.description ? 'border-red-300' : 'border-gray-300'}`}
                                placeholder="Course description"
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                            <select
                                name="category"
                                value={newCourse.category}
                                onChange={handleInputChange}
                                className={`w-full border rounded-md px-3 py-2 ${errors.category ? 'border-red-300' : 'border-gray-300'}`}
                            >
                                <option value="">Select Category</option>
                                <option value="Pemasaran">Pemasaran</option>
                                <option value="Desain">Desain</option>
                                <option value="Pengembangan Diri">Pengembangan Diri</option>
                                <option value="Bisnis">Bisnis</option>
                            </select>
                            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating *</label>
                                <input
                                    type="number"
                                    name="rating"
                                    value={newCourse.rating}
                                    onChange={handleInputChange}
                                    min="1"
                                    max="5"
                                    step="0.1"
                                    className={`w-full border rounded-md px-3 py-2 ${errors.rating ? 'border-red-300' : 'border-gray-300'}`}
                                    placeholder="4.5"
                                />
                                {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Review Count *</label>
                                <input
                                    type="number"
                                    name="reviewCount"
                                    value={newCourse.reviewCount}
                                    onChange={handleInputChange}
                                    min="1"
                                    className={`w-full border rounded-md px-3 py-2 ${errors.reviewCount ? 'border-red-300' : 'border-gray-300'}`}
                                    placeholder="126"
                                />
                                {errors.reviewCount && <p className="text-red-500 text-xs mt-1">{errors.reviewCount}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (K) *</label>
                            <input
                                type="number"
                                name="price"
                                value={newCourse.price}
                                onChange={handleInputChange}
                                min="1"
                                className={`w-full border rounded-md px-3 py-2 ${errors.price ? 'border-red-300' : 'border-gray-300'}`}
                                placeholder="300"
                            />
                            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                        </div>
                    </div>

                    {/* Tutor Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Tutor Information</h3>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tutor Name *</label>
                            <input
                                type="text"
                                name="tutorName"
                                value={newCourse.tutorName}
                                onChange={handleInputChange}
                                className={`w-full border rounded-md px-3 py-2 ${errors.tutorName ? 'border-red-300' : 'border-gray-300'}`}
                                placeholder="John Doe"
                            />
                            {errors.tutorName && <p className="text-red-500 text-xs mt-1">{errors.tutorName}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                            <input
                                type="text"
                                name="position"
                                value={newCourse.position}
                                onChange={handleInputChange}
                                className={`w-full border rounded-md px-3 py-2 ${errors.position ? 'border-red-300' : 'border-gray-300'}`}
                                placeholder="Senior Developer"
                            />
                            {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                            <input
                                type="text"
                                name="company"
                                value={newCourse.company}
                                onChange={handleInputChange}
                                className={`w-full border rounded-md px-3 py-2 ${errors.company ? 'border-red-300' : 'border-gray-300'}`}
                                placeholder="Tech Company"
                            />
                            {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                        </div>
                    </div>
                </div>

                {/* Image Selection */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <ImagePreview
                            src={newCourse.courseImage}
                            alt="Course Image"
                            onSelect={() => setShowCardGallery(true)}
                            label="Course Image *"
                        />
                        {errors.courseImage && <p className="text-red-500 text-xs mt-1">{errors.courseImage}</p>}
                    </div>

                    <div>
                        <ImagePreview
                            src={newCourse.tutorImage}
                            alt="Tutor Image"
                            onSelect={() => setShowTutorGallery(true)}
                            label="Tutor Image *"
                        />
                        {errors.tutorImage && <p className="text-red-500 text-xs mt-1">{errors.tutorImage}</p>}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={editCourse ? handleUpdateCourse : handleAddCourse}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                    >
                        {editCourse ? 'Update Course' : 'Add Course'}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-sm min-h-screen">
                    <nav className="p-6">
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => setActiveTab('dashboard')}
                                    className={`w-full text-left px-4 py-2 rounded ${
                                        activeTab === 'dashboard'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    Dashboard
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('users')}
                                    className={`w-full text-left px-4 py-2 rounded ${
                                        activeTab === 'users'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    Users
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('courses')}
                                    className={`w-full text-left px-4 py-2 rounded ${
                                        activeTab === 'courses'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    Courses
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        setActiveTab('add-course');
                                        if (editCourse) {
                                            handleCancelEdit();
                                        }
                                    }}
                                    className={`w-full text-left px-4 py-2 rounded ${
                                        activeTab === 'add-course'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    Add Course
                                </button>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {activeTab === 'dashboard' && renderDashboard()}
                    {activeTab === 'users' && renderUsers()}
                    {activeTab === 'courses' && renderCourses()}
                    {activeTab === 'add-course' && renderAddCourse()}
                </main>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this {deleteTarget?.type}? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Gallery Modals */}
            <ImageGalleryModal
                isOpen={showCardGallery}
                onClose={() => setShowCardGallery(false)}
                images={availableCardImages}
                onSelect={selectCardImage}
                title="Select Course Image"
            />

            <ImageGalleryModal
                isOpen={showTutorGallery}
                onClose={() => setShowTutorGallery(false)}
                images={availableTutorImages}
                onSelect={selectTutorImage}
                title="Select Tutor Image"
            />
        </div>
    );
}