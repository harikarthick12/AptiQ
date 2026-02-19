import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
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
    ArrowLeft,
    Trophy,
    Zap,
    Star,
    ShieldCheck,
    Clock,
    Flame,
    Moon,
    X,
    Sparkles
} from 'lucide-react';
import questionService from '../services/questionService';
import Logo from '../components/Logo';
import SkillRadar from '../components/SkillRadar';

const BADGE_DATA = {
    'Early Bird': {
        description: 'Completed a learning session before 9:00 AM. Start your day with a sharp mind!',
        icon: <Clock className="w-5 h-5" />,
        color: 'bg-amber-100 text-amber-600'
    },
    'Night Owl': {
        description: 'Burned the midnight oil. Completed a session after 10:00 PM.',
        icon: <Moon className="w-5 h-5" />,
        color: 'bg-indigo-100 text-indigo-600'
    },
    'Streak Warrior': {
        description: 'Maintained a logic-defying consistency of 3+ days!',
        icon: <Flame className="w-5 h-5" />,
        color: 'bg-orange-100 text-orange-600'
    },
    'Mastery Badge': {
        description: 'Perfect score! Correctly answered all questions in a single session.',
        icon: <Trophy className="w-5 h-5" />,
        color: 'bg-purple-100 text-purple-600'
    }
};


const topics = [
    {
        category: 'Aptitude',
        icon: <BookOpen className="w-5 h-5" />,
        color: 'bg-blue-50 text-blue-600',
        items: [
            'Number System',
            'HCF and LCM',
            'Simplifications',
            'Percentages',
            'Profit and Loss',
            'Average',
            'Ratio and Proportion',
            'Mixture and Alligations',
            'Simple and Compound Interest',
            'Time and Work',
            'Pipes and Cisterns',
            'Time Speed and Distance',
            'Problems on Trains',
            'Boats and Streams'
        ]
    },
    {
        category: 'Technical',
        icon: <Code className="w-5 h-5" />,
        color: 'bg-indigo-50 text-indigo-600',
        items: [
            'Arrays',
            'Strings',
            'Searching',
            'Sorting',
            'Recursion',
            'Stack',
            'Queue',
            'Linked List',
            'Trees',
            'Hashing',
            'OOPS',
            'Time Complexity',
            'Functions',
            'DBMS Basics',
            'OS Basics'
        ]
    },
    {
        category: 'Logical',
        icon: <Brain className="w-5 h-5" />,
        color: 'bg-emerald-50 text-emerald-600',
        items: [
            'Number Series',
            'Alphabet Series',
            'Coding and Decoding',
            'Analogy',
            'Classification',
            'Direction Sense',
            'Blood Relations',
            'Clock and Calendar',
            'Seating Arrangement',
            'Syllogism',
            'Venn Diagrams',
            'Visual Reasoning'
        ]
    }
];

const DashboardPage = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [activeTopic, setActiveTopic] = useState(null);
    const [isLangUpdating, setIsLangUpdating] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBadge, setSelectedBadge] = useState(null);
    const location = useLocation();
    const [showEarnedPopup, setShowEarnedPopup] = useState(location.state?.badgeEarned || false);

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
            const topicProgress = (user?.progress && user.progress[topic]) ? user.progress[topic] : {};
            const seenIds = topicProgress.seenQuestionIds || [];
            const correctIds = topicProgress.correctQuestionIds || [];

            const content = await questionService.getSessionContent(topic, 'Beginner', seenIds, correctIds);

            const session = {
                _id: 'local_' + Date.now(),
                topic,
                level: content.level, // Use the level determined by the service
                explanation: (user?.preferredLanguage === 'Tamil' && content.explanation_tamil) ? content.explanation_tamil :
                    (user?.preferredLanguage === 'Telugu' && content.explanation_telugu) ? content.explanation_telugu :
                        content.explanation,
                workedExample: content.workedExample,
                questions: content.questions,
                currentStep: 'explanation'
            };

            // Update seen questions in user profile (Firestone / LocalStorage)
            const newSeenIds = [...new Set([...seenIds, ...content.questions.map(q => q.id)])];
            const updatedProgress = { ...(user?.progress || {}) };
            updatedProgress[topic] = {
                ...topicProgress,
                level: content.level,
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

    // Calculate Category Stats for Radar Chart
    const getCategoryStats = () => {
        const stats = { aptitude: 0, technical: 0, logical: 0 };
        topics.forEach(cat => {
            const totalQuestions = cat.items.length * 30;
            let correctQuestions = 0;
            cat.items.forEach(topic => {
                if (user?.progress && user.progress[topic]) {
                    correctQuestions += (user.progress[topic].correctQuestionIds?.length || 0);
                }
            });
            const percentage = totalQuestions > 0 ? (correctQuestions / totalQuestions) * 100 : 0;
            stats[cat.category.toLowerCase()] = Math.max(10, Math.round(percentage));
        });
        return stats;
    };

    const categoryStats = getCategoryStats();

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-100 selection:text-indigo-700 font-['Inter'] relative overflow-hidden">
            {/* Background Decorative Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/20 blur-[120px] rounded-full" />

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
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Side: User Summary */}
                            <div className="lg:col-span-2 space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-10 rounded-[40px] bg-white border border-slate-200 shadow-xl shadow-slate-200/40 relative overflow-hidden"
                                >
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-indigo-200">
                                                {user?.name?.charAt(0) || 'T'}
                                            </div>
                                            <div>
                                                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back, {user?.name?.split(' ')[0]}!</h1>
                                                <p className="text-slate-500 font-medium tracking-tight">You're making incredible progress this week.</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Streak</span>
                                                </div>
                                                <p className="text-2xl font-black text-slate-900">{user?.streak || 0} Days</p>
                                            </div>
                                            <div className="p-5 rounded-3xl bg-indigo-50/50 border border-indigo-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Star className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                                                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">XP points</span>
                                                </div>
                                                <p className="text-2xl font-black text-indigo-600">{user?.xp || 0}</p>
                                            </div>
                                            <div className="p-5 rounded-3xl bg-purple-50/50 border border-purple-100">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Trophy className="w-4 h-4 text-purple-600 fill-purple-600" />
                                                    <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Current Level</span>
                                                </div>
                                                <p className="text-2xl font-black text-purple-600">{Math.floor((user?.xp || 0) / 100) + 1}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Abstract background shape */}
                                    <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-indigo-50 rounded-full opacity-40 blur-3xl" />
                                </motion.div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="p-8 rounded-[32px] bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                                                <Activity className="w-6 h-6" />
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mastery</span>
                                        </div>
                                        {(() => {
                                            const totalPossible = topics.reduce((acc, cat) => acc + cat.items.length * 30, 0);
                                            let totalCorrect = 0;
                                            if (user?.progress) {
                                                Object.values(user.progress).forEach(p => {
                                                    totalCorrect += (p.correctQuestionIds?.length || 0);
                                                });
                                            }
                                            const mastery = totalPossible > 0 ? Math.round((totalCorrect / totalPossible) * 100) : 0;
                                            return (
                                                <div className="pt-2">
                                                    <h3 className="text-4xl font-black text-slate-900">{mastery}%</h3>
                                                    <div className="w-full h-2 bg-slate-100 rounded-full mt-4 overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${mastery}%` }}
                                                            className="h-full bg-emerald-500 rounded-full"
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="p-8 rounded-[32px] bg-slate-900 border border-slate-800 shadow-xl shadow-slate-900/20 flex flex-col justify-between text-white"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-white/10 rounded-2xl text-white backdrop-blur-md">
                                                <TrendingUp className="w-6 h-6" />
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Accuracy</span>
                                        </div>
                                        {(() => {
                                            let totalCorrect = 0;
                                            let totalSeen = 0;
                                            if (user?.progress) {
                                                Object.values(user.progress).forEach(p => {
                                                    totalCorrect += (p.correctQuestionIds?.length || 0);
                                                    totalSeen += (p.seenQuestionIds?.length || 0);
                                                });
                                            }
                                            const accuracy = totalSeen > 0 ? Math.round((totalCorrect / totalSeen) * 100) : 0;
                                            return (
                                                <div className="pt-2">
                                                    <h3 className="text-4xl font-black text-white">{accuracy}%</h3>
                                                    <p className="text-xs text-slate-400 mt-2 font-medium">Overall Precision Index</p>
                                                </div>
                                            );
                                        })()}
                                    </motion.div>
                                </div>
                            </div>

                            {/* Right Side: Radar Chart */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-8 rounded-[40px] bg-white border border-slate-200 shadow-xl shadow-slate-200/40 flex flex-col items-center justify-center text-center relative overflow-hidden"
                            >
                                <div className="relative z-10 w-full">
                                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-4">Skill Radar</h3>
                                    <SkillRadar stats={categoryStats} />
                                    <p className="text-xs text-slate-400 font-medium px-4 mt-4">
                                        Your proficiency profile based on recent adaptive sessions.
                                    </p>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-50/30 -z-0" />
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* Achievement Badges Section */}
                {!selectedCategory && (
                    <section className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-8 w-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Achievements</h2>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {(user?.badges || []).length > 0 ? (
                                user.badges.map((badge, idx) => {
                                    const details = BADGE_DATA[badge] || {
                                        description: 'An achievement for your hard work!',
                                        icon: <Award className="w-5 h-5" />,
                                        color: 'bg-slate-100 text-slate-600'
                                    };
                                    return (
                                        <motion.button
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            whileHover={{ y: -5 }}
                                            onClick={() => setSelectedBadge({ name: badge, ...details })}
                                            className="px-6 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4 group hover:border-indigo-200 transition-all text-left"
                                        >
                                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${details.color} group-hover:bg-indigo-600 group-hover:text-white transition-colors`}>
                                                {details.icon}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{badge}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Unlocked Achievement</p>
                                            </div>
                                        </motion.button>
                                    );
                                })
                            ) : (
                                <div className="w-full p-8 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center opacity-60">
                                    <Award className="w-12 h-12 text-slate-300 mb-2" />
                                    <p className="text-sm font-medium text-slate-500">No achievements yet. Keep learning to unlock!</p>
                                </div>
                            )}
                        </div>

                        {/* Badge Detail Overlay */}
                        <AnimatePresence>
                            {selectedBadge && (
                                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setSelectedBadge(null)}
                                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        className="relative w-full max-w-sm bg-white rounded-[40px] shadow-2xl overflow-hidden"
                                    >
                                        <div className={`h-32 flex items-center justify-center relative ${selectedBadge.color}`}>
                                            <div className="absolute top-6 right-6">
                                                <button
                                                    onClick={() => setSelectedBadge(null)}
                                                    className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors"
                                                >
                                                    <X className="w-5 h-5 text-white" />
                                                </button>
                                            </div>
                                            <div className="h-20 w-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-indigo-600 scale-125">
                                                {React.cloneElement(selectedBadge.icon, { className: 'w-10 h-10' })}
                                            </div>
                                        </div>
                                        <div className="p-10 text-center">
                                            <h3 className="text-2xl font-black text-slate-900 mb-2">{selectedBadge.name}</h3>
                                            <div className="flex justify-center mb-6">
                                                <div className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                    Official Achievement
                                                </div>
                                            </div>
                                            <p className="text-slate-500 font-medium leading-relaxed mb-8">
                                                {selectedBadge.description}
                                            </p>
                                            <button
                                                onClick={() => setSelectedBadge(null)}
                                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-colors"
                                            >
                                                Awesome!
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>

                        {/* Earned Notification Popup */}
                        <AnimatePresence>
                            {showEarnedPopup && (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[101] bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4"
                                >
                                    <div className="h-10 w-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold">New Achievement Unlocked!</p>
                                        <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">Check your collection below</p>
                                    </div>
                                    <button
                                        onClick={() => setShowEarnedPopup(false)}
                                        className="ml-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
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
