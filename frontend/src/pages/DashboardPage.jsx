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
    Check
} from 'lucide-react';
import api from '../api/axios';
import Logo from '../components/Logo';

const topics = [
    {
        category: 'Aptitude',
        icon: <BookOpen className="w-5 h-5" />,
        color: 'bg-blue-50 text-blue-600',
        items: ['Percentages', 'Time & Work', 'Probability']
    },
    {
        category: 'Technical',
        icon: <Code className="w-5 h-5" />,
        color: 'bg-indigo-50 text-indigo-600',
        items: ['OOPS', 'Arrays', 'Data Structures']
    },
    {
        category: 'Logical',
        icon: <Brain className="w-5 h-5" />,
        color: 'bg-emerald-50 text-emerald-600',
        items: ['Reasoning basics', 'Puzzles', 'Series']
    }
];

const DashboardPage = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [activeTopic, setActiveTopic] = useState(null);
    const [isLangUpdating, setIsLangUpdating] = useState(false);

    const changeLanguage = async (newLang) => {
        setIsLangUpdating(true);
        try {
            const res = await api.patch('/auth/update-language', { language: newLang });
            updateUser(res.data.data.user);
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
            const res = await api.post('/learn/start', {
                topic,
                level: 'Beginner'
            });
            navigate('/learn', { state: { session: res.data.data.session } });
        } catch (err) {
            console.error("Failed to start session:", err);
        } finally {
            setLoading(false);
            setActiveTopic(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-100 selection:text-indigo-700 font-['Inter']">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-[1000px] mx-auto px-6 h-20 flex justify-between items-center">
                    <Logo className="h-10 w-auto" />

                    <div className="flex items-center gap-4">
                        {/* Language Selector */}
                        <div className="hidden md:flex items-center bg-slate-50 border border-slate-100 rounded-xl p-1 gap-1">
                            {['English', 'Tamil', 'Telugu'].map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => changeLanguage(lang)}
                                    disabled={isLangUpdating}
                                    className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all ${user?.preferredLanguage === lang
                                            ? 'bg-white text-indigo-600 shadow-sm'
                                            : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>

                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{user?.preferredLanguage} Mode</p>
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

            <main className="max-w-[1000px] mx-auto px-6 py-12">
                {/* Hero Stats */}
                <section className="mb-16">
                    <div className="flex flex-col md:flex-row gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex-1 study-card flex flex-col justify-between"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mastery Level</span>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900">12%</h3>
                                <p className="text-sm text-slate-500 mt-1">Overall progress across all paths</p>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-6 overflow-hidden">
                                <div className="h-full bg-indigo-600 w-[12%] rounded-full" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex-1 study-card flex items-center gap-6"
                        >
                            <div className="h-16 w-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                                <TrendingUp className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Success Rate</p>
                                <h3 className="text-2xl font-bold text-slate-900">88%</h3>
                                <p className="text-sm text-slate-500">Last 20 questions answered correctly</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex-1 study-card flex items-center gap-6"
                        >
                            <div className="h-16 w-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                                <Award className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Series</p>
                                <h3 className="text-2xl font-bold text-slate-900">03</h3>
                                <p className="text-sm text-slate-500">Days consistent learning</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <h2 className="heading-main mb-8">Learning Paths</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {topics.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 + 0.3 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2.5 rounded-lg ${cat.color}`}>
                                    {cat.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">{cat.category}</h3>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {cat.items.map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => startLearning(item)}
                                        disabled={loading}
                                        className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 group flex justify-between items-center ${activeTopic === item
                                            ? 'bg-indigo-50 border-indigo-200'
                                            : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50/50'
                                            }`}
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-slate-800 font-semibold group-hover:text-indigo-600 transition-colors">
                                                {item}
                                            </span>
                                            <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                                                {activeTopic === item ? 'Preparing...' : 'Start Path'}
                                            </span>
                                        </div>

                                        {activeTopic === item ? (
                                            <div className="h-5 w-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transform group-hover:translate-x-1 transition-all" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Motivational Quote or Footer */}
                <footer className="mt-24 pt-12 border-t border-slate-100 text-center">
                    <p className="text-slate-400 text-sm italic font-medium">"Focus is the foundation of knowledge." — AptiQ Tutor</p>
                    <div className="mt-6 flex justify-center gap-8 opacity-50 grayscale contrast-125">
                        {/* Subtle placeholders for trust/partners or just decorative */}
                        <div className="h-4 w-24 bg-slate-200 rounded-full" />
                        <div className="h-4 w-16 bg-slate-200 rounded-full" />
                        <div className="h-4 w-20 bg-slate-200 rounded-full" />
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default DashboardPage;
