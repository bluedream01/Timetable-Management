import { Language } from '@/types';

export const translations = {
  en: {
    // Common
    login: 'Login',
    logout: 'Logout',
    dashboard: 'Dashboard',
    settings: 'Settings',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    approve: 'Approve',
    reject: 'Reject',
    submit: 'Submit',
    search: 'Search',
    filter: 'Filter',
    
    // Login Page
    welcomeMessage: 'Welcome to Government College Timetable Management System',
    username: 'Username',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    rememberMe: 'Remember Me',
    
    // Navigation
    inputData: 'Input Data',
    generateTimetable: 'Generate Timetable',
    viewTimetables: 'View Timetables',
    chapterManagement: 'Chapter Management',
    notifications: 'Notifications',
    
    // Dashboard
    totalClassrooms: 'Total Classrooms',
    totalFaculty: 'Total Faculty',
    totalSubjects: 'Total Subjects',
    pendingTimetables: 'Pending Timetables',
    createNewTimetable: 'Create New Timetable',
    viewExistingTimetables: 'View Existing Timetables',
    currentClass: 'Current Class',
    upcomingClass: 'Upcoming Class',
    
    // Days
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    
    // Departments
    cs: 'Computer Science',
    ece: 'Electronics & Communication',
    eee: 'Electrical & Electronics',
    
    // Status
    draft: 'Draft',
    underReview: 'Under Review',
    finalized: 'Finalized',
    
    // Language Names
    english: 'English',
    hindi: 'हिन्दी',
    nagpuri: 'नागपुरी',
    santali: 'संताली',
  },
  hi: {
    // Common
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    dashboard: 'डैशबोर्ड',
    settings: 'सेटिंग्स',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    view: 'देखें',
    approve: 'मंजूरी दें',
    reject: 'अस्वीकार करें',
    submit: 'जमा करें',
    search: 'खोजें',
    filter: 'फ़िल्टर',
    
    // Login Page
    welcomeMessage: 'सरकारी कॉलेज टाइमटेबल प्रबंधन प्रणाली में आपका स्वागत है',
    username: 'उपयोगकर्ता नाम',
    email: 'ईमेल',
    password: 'पासवर्ड',
    forgotPassword: 'पासवर्ड भूल गए?',
    rememberMe: 'मुझे याद रखें',
    
    // Navigation
    inputData: 'डेटा इनपुट',
    generateTimetable: 'टाइमटेबल बनाएं',
    viewTimetables: 'टाइमटेबल देखें',
    chapterManagement: 'अध्याय प्रबंधन',
    notifications: 'सूचनाएं',
    
    // Dashboard
    totalClassrooms: 'कुल कक्षाएं',
    totalFaculty: 'कुल शिक्षक',
    totalSubjects: 'कुल विषय',
    pendingTimetables: 'लंबित टाइमटेबल',
    createNewTimetable: 'नया टाइमटेबल बनाएं',
    viewExistingTimetables: 'मौजूदा टाइमटेबल देखें',
    currentClass: 'वर्तमान कक्षा',
    upcomingClass: 'आगामी कक्षा',
    
    // Days
    monday: 'सोमवार',
    tuesday: 'मंगलवार',
    wednesday: 'बुधवार',
    thursday: 'गुरुवार',
    friday: 'शुक्रवार',
    saturday: 'शनिवार',
    
    // Departments
    cs: 'कंप्यूटर विज्ञान',
    ece: 'इलेक्ट्रॉनिक्स और संचार',
    eee: 'इलेक्ट्रिकल और इलेक्ट्रॉनिक्स',
    
    // Status
    draft: 'ड्राफ्ट',
    underReview: 'समीक्षाधीन',
    finalized: 'अंतिम रूप',
    
    // Language Names
    english: 'English',
    hindi: 'हिन्दी',
    nagpuri: 'नागपुरी',
    santali: 'संताली',
  },
  nagpuri: {
    // Common
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    dashboard: 'डैशबोर्ड',
    settings: 'सेटिंग',
    save: 'सेव करो',
    cancel: 'रद्द करो',
    edit: 'संपादन करो',
    delete: 'मिटाओ',
    view: 'देखो',
    approve: 'मंजूर करो',
    reject: 'खारिज करो',
    submit: 'जमा करो',
    search: 'खोजो',
    filter: 'छानो',
    
    // Login Page
    welcomeMessage: 'सरकारी कॉलेज टाइमटेबल प्रबंधन में स्वागत हे',
    username: 'यूजर नाम',
    email: 'ईमेल',
    password: 'पासवर्ड',
    forgotPassword: 'पासवर्ड भूल गेला?',
    rememberMe: 'हमके याद रखो',
    
    // Navigation
    inputData: 'डेटा डालो',
    generateTimetable: 'टाइमटेबल बनाओ',
    viewTimetables: 'टाइमटेबल देखो',
    chapterManagement: 'अध्याय प्रबंधन',
    notifications: 'सूचना',
    
    // Dashboard
    totalClassrooms: 'कुल कक्षा',
    totalFaculty: 'कुल शिक्षक',
    totalSubjects: 'कुल विषय',
    pendingTimetables: 'बाकी टाइमटेबल',
    createNewTimetable: 'नया टाइमटेबल बनाओ',
    viewExistingTimetables: 'पुराना टाइमटेबल देखो',
    currentClass: 'अभी के कक्षा',
    upcomingClass: 'आगे के कक्षा',
    
    // Days
    monday: 'सोमार',
    tuesday: 'मंगल',
    wednesday: 'बुध',
    thursday: 'बिफे',
    friday: 'सुकुर',
    saturday: 'सनिचर',
    
    // Departments
    cs: 'कंप्यूटर साइंस',
    ece: 'इलेक्ट्रॉनिक्स',
    eee: 'इलेक्ट्रिकल',
    
    // Status
    draft: 'ड्राफ्ट',
    underReview: 'जांच में',
    finalized: 'फाइनल',
    
    // Language Names
    english: 'English',
    hindi: 'हिन्दी',
    nagpuri: 'नागपुरी',
    santali: 'संताली',
  },
  santali: {
    // Common - Using romanized Santali
    login: 'Bhitri Bolo',
    logout: 'Bahre Oḍok',
    dashboard: 'Ḍashboḍ',
    settings: 'Seting',
    save: 'Rukhiyaạ',
    cancel: 'Baṅ',
    edit: 'Sompadon',
    delete: 'Get́ Giḍi',
    view: 'Ńel',
    approve: 'Haŕa',
    reject: 'Baṅ Haŕa',
    submit: 'Joma',
    search: 'Sendra',
    filter: 'Chhani',
    
    // Login Page
    welcomeMessage: 'Sorkar Kolej Somoy Tạlika Bebostha re Johar',
    username: 'Beoharić Ńutum',
    email: 'Imel',
    password: 'Uku Sabeṭ',
    forgotPassword: 'Uku Sabeṭ Hiṛiń?',
    rememberMe: 'Ińaḱ Disạ',
    
    // Navigation
    inputData: 'Ḍeṭa Bhitri',
    generateTimetable: 'Somoy Tạlika Benao',
    viewTimetables: 'Somoy Tạlika Ńel',
    chapterManagement: 'Poṛhao Bebostha',
    notifications: 'Khobordar',
    
    // Dashboard
    totalClassrooms: 'Joto Kolas',
    totalFaculty: 'Joto Guru',
    totalSubjects: 'Joto Bisoy',
    pendingTimetables: 'Baḱi Somoy Tạlika',
    createNewTimetable: 'Nãwã Somoy Tạlika',
    viewExistingTimetables: 'Menaḱ Somoy Tạlika',
    currentClass: 'Nit́oḱ Kolas',
    upcomingClass: 'Hiju Kolas',
    
    // Days
    monday: 'Sombar',
    tuesday: 'Moṅgol',
    wednesday: 'Budh',
    thursday: 'Bisud',
    friday: 'Sukur',
    saturday: 'Sonicar',
    
    // Departments
    cs: 'Kompuṭor',
    ece: 'Ilekṭronik',
    eee: 'Bijli',
    
    // Status
    draft: 'Ḍrafṭ',
    underReview: 'Ńel Joṛ',
    finalized: 'Purạo',
    
    // Language Names
    english: 'English',
    hindi: 'हिन्दी',
    nagpuri: 'नागपुरी',
    santali: 'संताली',
  },
};

export const getTranslation = (key: string, language: Language): string => {
  return translations[language][key as keyof typeof translations['en']] || key;
};