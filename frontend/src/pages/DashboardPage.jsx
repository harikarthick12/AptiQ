
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
    BookOpen,
    Code,
    Brain,
    LogOut,
    ChevronRight,
    Target,
    Award,
    TrendingUp,
    Activity,
    Languages,
    Check,
    ArrowRight,
    ArrowLeft
} from 'lucide-react';
import questionService from '../services/questionService';
import Logo from '../components/Logo';

const topics = [
    {
        category: 'Aptitude',
        icon: <BookOpen className="w-5 h-5" />,
        color: 'bg-blue-50 text-blue-600',
        items: ['Number System', 'HCF and LCM', 'Simplifications', 'Percentage', 'Profit and Loss', 'Average', 'Ratio and Proportion', 'Mixture and Alligations']
    },
    {
        category: 'Technical',
        icon: <Code className="w-5 h-5" />,
        color: 'bg-indigo-50 text-indigo-600',
        items: ['Arrays', 'Strings', 'Searching', 'Sorting', 'Recursion', 'Stack', 'Queue', 'Linked List', 'Trees', 'Hashing', 'OOPS', 'Time Complexity', 'Functions', 'DBMS Basics', 'OS Basics']
    },
    {
        category: 'Logical',
        icon: <Brain className="w-5 h-5" />,
        color: 'bg-emerald-50 text-emerald-600',
        items: ['Number Series', 'Alphabet Series', 'Coding and Decoding', 'Analogy', 'Classification', 'Direction Sense', 'Blood Relations', 'Clock and Calendar', 'Seating Arrangement', 'Syllogism', 'Venn Diagrams', 'Visual Reasoning']
    }
];

const DashboardPage = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [activeTopic, setActiveTopic] = useState(null);
    const [isLangUpdating, setIsLangUpdating] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const changeLanguage = async (newLang) => {
        setIsLangUpdating(true);
        try {
            await updateUser({ preferredLanguage: newLang });
        } catch (err) {
            console.error("Failed to update language:", err);
        } finally {
            setIsLangUpdating(false);
        }
    };

    const startLearning = async (topic) => {
        setLoading(true);
        setActiveTopic(topic);
        try {
            const seenIds = (user?.progress && user.progress[topic])
                ? user.progress[topic].seenQuestionIds || []
                : [];

            const content = await questionService.getSessionContent(topic, 'Beginner', seenIds);

            const session = {
                _id: 'local_' + Date.now(),
                topic,
                level: 'Beginner',
                explanation: (user?.preferredLanguage === 'Tamil' && content.explanation_tamil) ? content.explanation_tamil :
                    (user?.preferredLanguage === 'Telugu' && content.explanation_telugu) ? content.explanation_telugu :
                        content.explanation,
                workedExample: content.workedExample,
                questions: content.questions,
                currentStep: 'explanation'
            };

            const newSeenIds = [...new Set([...seenIds, ...content.questions.map(q => q.id)])];
            const updatedProgress = { ...(user?.progress || {}) };
            updatedProgress[topic] = {
                level: 'Beginner',
                seenQuestionIds: newSeenIds
            };

            await updateUser({ progress: updatedProgress });
            navigate('/learn', { state: { session } });
        } catch (err) {
            console.error("Failed to start session:", err);
        } finally {
            setLoading(false);
            setActiveTopic(null);
        }
    };

    const currentCategoryData = selectedCategory ? topics.find(t => t.category === selectedCategory) : null;

    return (
        <div className="min-h-screen bg-[#FBFCFE] text-slate-900 selection:bg-indigo-100 selection:text-indigo-700 font-['Inter']">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-md bg-white/80">
                <div className="max-w-[1100px] mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => setSelectedCategory(null)}>
                        <Logo className="h-10 w-auto" />
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Language Selector */}
                        <div className="hidden md:flex items-center bg-slate-100/50 border border-slate-200 rounded-xl p-1 gap-1">
                            {['English', 'Tamil', 'Telugu'].map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => changeLanguage(lang)}
                                    disabled={isLangUpdating}
                                    className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all ${user?.preferredLanguage === lang
                                        ? 'bg-white text-indigo-600 shadow-sm border border-slate-200'
                                        : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>

                        <div className="text-right hidden sm:block border-l border-slate-200 pl-4 ml-2">
                            <p className="text-sm font-bold text-slate-900">{user?.name || 'Test User'}</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold tracking-tighter transform scale-90 origin-right">{user?.preferredLanguage} Mode</p>
                        </div>
                        <button
                            onClick={logout}
                            className="h-11 w-11 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all duration-300"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-[1100px] mx-auto px-6 py-12">
                {/* Hero Stats */}
                {!selectedCategory && (
                    <section className="mb-16">
                        <div className="flex flex-col md:flex-row gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex-1 p-8 rounded-[32px] bg-white border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                                    <Activity className="w-32 h-32" />
                                </div>
                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                                        <Activity className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mastery Level</span>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-4xl font-extrabold text-slate-900">12%</h3>
                                    <p className="text-sm text-slate-500 mt-1 font-medium italic">"Keep pushing forward"</p>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full mt-8 overflow-hidden relative z-10">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '12%' }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="h-full bg-indigo-600 rounded-full"
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="flex-1 p-8 rounded-[32px] bg-white border border-slate-200 shadow-sm flex items-center gap-6 relative overflow-hidden group"
                            >
                                <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:-rotate-12 transition-transform duration-700">
                                    <TrendingUp className="w-32 h-32" />
                                </div>
                                <div className="h-16 w-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0 relative z-10">
                                    <TrendingUp className="w-8 h-8" />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Accuracy</p>
                                    <h3 className="text-3xl font-extrabold text-slate-900">88%</h3>
                                    <p className="text-xs text-slate-500 font-medium">Last 20 sessions</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex-1 p-8 rounded-[32px] bg-white border border-slate-200 shadow-sm flex items-center gap-6 relative overflow-hidden group"
                            >
                                <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:-rotate-12 transition-transform duration-700">
                                    <Award className="w-32 h-32" />
                                </div>
                                <div className="h-16 w-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 shrink-0 relative z-10">
                                    <Award className="w-8 h-8" />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Streak</p>
                                    <h3 className="text-3xl font-extrabold text-slate-900">03</h3>
                                    <p className="text-xs text-slate-500 font-medium">Days consistent</p>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                )}

                {!selectedCategory ? (
                    <div className="space-y-10">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Learning Hub</h2>
                            <p className="text-slate-500 font-medium">Select a category to begin your adaptive learning journey.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {topics.map((cat, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedCategory(cat.category)}
                                    className="cursor-pointer group p-10 rounded-[40px] bg-white border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.color.replace('bg-', 'from-').replace('text-', 'to-')} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

                                    <div className={`h-24 w-24 rounded-3xl mb-8 flex items-center justify-center ${cat.color} transform group-hover:rotate-6 transition-transform duration-500 shadow-inner`}>
                                        {React.cloneElement(cat.icon, { className: 'w-10 h-10' })}
                                    </div>

                                    <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-indigo-600 transition-colors">{cat.category}</h3>
                                    <p className="text-sm text-slate-500 font-medium mb-8">
                                        {cat.items.length} specialized modules waiting for you to master.
                                    </p>

                                    <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-50 text-[11px] font-black text-slate-400 uppercase tracking-widest group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                        Explore Path <ChevronRight className="w-4 h-4" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-12"
                    >
                        <div className="flex items-center justify-between border-b border-slate-200 pb-8">
                            <div className="flex items-center gap-6">
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/10 transition-all group"
                                >
                                    <ArrowRight className="w-6 h-6 transform rotate-180 group-hover:-translate-x-1 transition-transform" />
                                </button>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className={`p-2 rounded-lg ${currentCategoryData.color} scale-75`}>
                                            {currentCategoryData.icon}
                                        </div>
                                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedCategory}</h2>
                                    </div>
                                    <p className="text-slate-500 font-medium">Choose a module to start practicing</p>
                                </div>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-2xl text-[11px] font-black text-indigo-600 uppercase tracking-widest">
                                <Target className="w-4 h-4" /> Recommended for you
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentCategoryData.items.map((item, i) => (
                                <motion.button
                                    key={i}
                                    layoutId={item}
                                    onClick={() => startLearning(item)}
                                    disabled={loading}
                                    className={`text-left p-8 rounded-[32px] border-2 transition-all duration-500 group relative overflow-hidden ${activeTopic === item
                                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl shadow-indigo-600/30 ring-4 ring-indigo-50'
                                        : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/10'
                                        }`}
                                >
                                    <div className="flex flex-col relative z-10 h-full justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-6">
                                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full ${activeTopic === item ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                    Module {i + 1}
                                                </span>
                                                {activeTopic === item && (
                                                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                )}
                                            </div>
                                            <h4 className={`text-xl font-bold mb-2 ${activeTopic === item ? 'text-white' : 'text-slate-900'} group-hover:text-indigo-600 transition-colors`}>
                                                {item}
                                            </h4>
                                            <p className={`text-sm ${activeTopic === item ? 'text-indigo-100' : 'text-slate-400'} font-medium`}>
                                                Master {item.toLowerCase()} through adaptive AI challenges.
                                            </p>
                                        </div>

                                        <div className="mt-8 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest">
                                            {activeTopic === item ? 'Preparing Session...' : 'Launch Path'}
                                            {!loading && <ChevronRight className={`w-4 h-4 transform group-hover:translate-x-1 transition-transform ${activeTopic === item ? 'text-white' : 'text-indigo-600'}`} />}
                                        </div>
                                    </div>

                                    {/* Abstract background shape for hover effect */}
                                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-50 z-0" />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Motivational Quote or Footer */}
                <footer className="mt-24 pt-12 border-t border-slate-100 text-center">
                    <p className="text-slate-400 text-sm italic font-medium tracking-tight">"The roots of education are bitter, but the fruit is sweet."</p>
                    <div className="mt-8 flex justify-center items-center gap-6 opacity-40">
                        <div className="h-0.5 w-12 bg-slate-200" />
                        <Logo iconOnly className="h-6 w-6 grayscale" />
                        <div className="h-0.5 w-12 bg-slate-200" />
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default DashboardPage;
