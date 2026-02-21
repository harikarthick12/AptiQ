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
    const [showEarnedPopup, setShowEarnedPopup] = useState(false);

    // Achievement popup logic
    React.useEffect(() => {
        if (location.state?.badgeEarned) {
            setShowEarnedPopup(true);
            // Clear the state so it doesn't pop up again on refresh
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

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

    const handleTopicClick = (topic) => {
        startLearning(topic);
    };

    const currentCategoryData = selectedCategory ? topics.find(t => t.category === selectedCategory) : null;

    // Removed getCategoryStats as Skill Radar is deleted

    return (
        <div className="min-h-screen bg-[#e0e5ec] text-[#44476a] selection:bg-indigo-100 selection:text-indigo-700 font-['Inter'] relative overflow-hidden">
            {/* Background Decorative Blobs - Reduced opacity for softtone */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/10 blur-[120px] rounded-full" />

            <header className="bg-[#e0e5ec] border-b border-indigo-100/20 sticky top-0 z-40 backdrop-blur-md">
                <div className="max-w-[1100px] mx-auto px-6 h-20 flex justify-between items-center">
                    <Logo className="h-10 w-auto" onClick={() => setSelectedCategory(null)} />

                    <div className="flex items-center gap-4">
                        {/* Language Selector Slider - Improved with Drag & Click */}
                        <div className="hidden md:flex items-center nm-inset border-none rounded-2xl p-1 relative overflow-hidden h-12 w-[292px] select-none">
                            <div className="flex w-full h-full relative z-10">
                                {['English', 'Tamil', 'Telugu'].map((lang, idx) => {
                                    const isActive = user?.preferredLanguage === lang;
                                    return (
                                        <button
                                            key={lang}
                                            onClick={() => changeLanguage(lang)}
                                            disabled={isLangUpdating}
                                            className="flex-1 text-[11px] font-black uppercase tracking-widest transition-colors duration-300 flex items-center justify-center h-full outline-none focus:outline-none"
                                        >
                                            <span className={`relative z-20 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                                                {lang}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Draggable Indicator */}
                            <motion.div
                                drag="x"
                                dragConstraints={{ left: 0, right: 194 }}
                                dragElastic={0.05}
                                dragMomentum={false}
                                onDragEnd={(event, info) => {
                                    const dragX = info.offset.x + (user?.preferredLanguage === 'English' ? 0 : user?.preferredLanguage === 'Tamil' ? 97 : 194);
                                    if (dragX < 50) changeLanguage('English');
                                    else if (dragX < 145) changeLanguage('Tamil');
                                    else changeLanguage('Telugu');
                                }}
                                animate={{
                                    x: user?.preferredLanguage === 'English' ? 0 :
                                        user?.preferredLanguage === 'Tamil' ? 97 : 194
                                }}
                                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                className="absolute left-1 top-1 bottom-1 w-[95px] nm-flat rounded-xl z-0 cursor-grab active:cursor-grabbing"
                            />
                        </div>

                        <div className="text-right hidden sm:block border-l border-slate-200 pl-4 ml-2">
                            <p className="text-sm font-bold text-slate-900">{user?.name || 'Test User'}</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold tracking-tighter transform scale-90 origin-right">{user?.preferredLanguage} Mode</p>
                        </div>
                        <button
                            onClick={logout}
                            className="h-12 w-12 flex items-center justify-center rounded-2xl nm-flat text-slate-400 hover:text-red-500 transition-all duration-300 active:nm-inset"
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
                        <div className="flex flex-col gap-8">
                            {/* User Summary - Now centered and full width */}
                            <div className="lg:col-span-2 space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-10 rounded-[40px] nm-flat relative overflow-hidden w-full"
                                >
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="h-16 w-16 nm-flat rounded-2xl flex items-center justify-center text-indigo-600 text-2xl font-black">
                                                {user?.name?.charAt(0) || 'T'}
                                            </div>
                                            <div>
                                                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back, {user?.name?.split(' ')[0]}!</h1>
                                                <p className="text-slate-500 font-medium tracking-tight">You're making incredible progress this week.</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            {[
                                                { label: 'Total XP', value: user?.xp || 0, icon: <Trophy className="w-5 h-5 text-amber-500" />, sub: 'Global Rank' },
                                                { label: 'Day Streak', value: user?.streak || 0, icon: <Flame className="w-5 h-5 text-orange-500" />, sub: 'Active Days' },
                                                { label: 'Accuracy', value: '82%', icon: <Target className="w-5 h-5 text-emerald-500" />, sub: 'Performance' }
                                            ].map((stat, i) => (
                                                <div key={i} className="flex-1 p-6 rounded-3xl nm-inset">
                                                    <div className="flex items-center gap-3 mb-3 text-slate-500 uppercase tracking-widest text-[9px] font-black">
                                                        {stat.icon}
                                                        {stat.label}
                                                    </div>
                                                    <div className="text-2xl font-black text-[#44476a]">{stat.value}</div>
                                                    <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">{stat.sub}</div>
                                                </div>
                                            ))}
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
                                        className="p-8 rounded-[32px] nm-flat flex flex-col justify-between"
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
                                        className="p-8 rounded-[32px] nm-flat flex flex-col justify-between"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 nm-inset rounded-2xl text-indigo-600">
                                                <TrendingUp className="w-6 h-6" />
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accuracy</span>
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
                                                    <h3 className="text-4xl font-black text-[#44476a]">{accuracy}%</h3>
                                                    <p className="text-xs text-slate-400 mt-2 font-medium">Overall Precision Index</p>
                                                </div>
                                            );
                                        })()}
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Achievement Badges Section */}
                {!selectedCategory && (
                    <section className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-10 w-10 nm-flat rounded-xl flex items-center justify-center text-amber-600">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#44476a] tracking-tight">Achievements</h2>
                        </div>

                        <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                            {(user?.badges || []).length > 0 ? (
                                user.badges.map((badge, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.05 }}
                                        className="w-full sm:w-[240px] p-6 rounded-[32px] nm-flat flex flex-col items-center text-center group"
                                    >
                                        <div className={`w-16 h-16 rounded-2xl nm-inset flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                                            {BADGE_DATA[badge]?.icon}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-wider text-[#44476a]/80 mb-1">{badge}</span>
                                        <span className="text-[9px] text-slate-400 font-semibold leading-tight">{BADGE_DATA[badge]?.description}</span>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="w-full p-12 nm-inset rounded-[40px] text-center border border-dashed border-slate-300">
                                    <div className="w-16 h-16 nm-flat rounded-2xl mx-auto flex items-center justify-center text-slate-300 mb-4">
                                        <Trophy className="w-8 h-8 opacity-20" />
                                    </div>
                                    <p className="text-slate-400 text-sm font-medium">Complete modules to earn your first badges.</p>
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
                                        className="absolute inset-0 bg-slate-900/40"
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        className="relative w-full max-w-sm bg-[#e0e5ec] rounded-[48px] nm-flat overflow-hidden"
                                    >
                                        <div className={`h-32 flex items-center justify-center relative ${selectedBadge.color}`}>
                                            <div className="absolute top-6 right-6">
                                                <button
                                                    onClick={() => setSelectedBadge(null)}
                                                    className="p-3 bg-white/20 hover:bg-white/40 rounded-full transition-colors"
                                                >
                                                    <X className="w-5 h-5 text-white" />
                                                </button>
                                            </div>
                                            <div className="h-24 w-24 nm-flat rounded-3xl flex items-center justify-center text-indigo-600 scale-125">
                                                {React.cloneElement(selectedBadge.icon, { className: 'w-12 h-12' })}
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
                        <div className="flex flex-col gap-3">
                            <h2 className="text-4xl font-extrabold text-[#44476a] tracking-tight">Learning Hub</h2>
                            <p className="text-slate-500 font-medium">Select a category to explore specialized training modules.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {topics.map((cat, i) => (
                                <motion.button
                                    key={i}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedCategory(cat.category)}
                                    className="group relative text-left"
                                >
                                    <div className="nm-flat p-10 rounded-[50px] transition-all duration-300 group-hover:shadow-[12px_12px_24px_var(--nm-shadow-dark),-12px_-12px_24px_var(--nm-shadow-light)]">
                                        <div className={`h-16 w-16 nm-inset rounded-3xl flex items-center justify-center mb-8`}>
                                            <div className={`h-6 w-6 ${cat.color} group-hover:scale-110 transition-transform`}>
                                                {React.cloneElement(cat.icon, { className: 'w-6 h-6' })}
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-black mb-3 text-[#44476a] font-['Poppins']">{cat.category}</h3>
                                        <p className="text-slate-400 text-sm font-medium leading-relaxed">{cat.desc}</p>
                                    </div>
                                </motion.button>
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
                                    className="h-14 w-14 rounded-[20px] nm-flat flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all group active:nm-inset"
                                >
                                    <ArrowRight className="w-7 h-7 transform rotate-180 group-hover:-translate-x-1 transition-transform" />
                                </button>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className={`p-2.5 rounded-xl nm-inset ${currentCategoryData.color} scale-75`}>
                                            {currentCategoryData.icon}
                                        </div>
                                        <h2 className="text-3xl font-black text-[#44476a] tracking-tight">{selectedCategory}</h2>
                                    </div>
                                    <p className="text-slate-500 font-medium">Choose a module to start practicing</p>
                                </div>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-2xl text-[11px] font-black text-indigo-600 uppercase tracking-widest">
                                <Target className="w-4 h-4" /> Recommended for you
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentCategoryData.items.map((item, i) => (
                                <motion.button
                                    key={i}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleTopicClick(item)}
                                    className={`text-left p-10 rounded-[40px] transition-all duration-500 group relative overflow-hidden ${activeTopic === item
                                        ? 'nm-inset scale-[0.98]'
                                        : 'nm-flat hover:scale-[1.02] active:nm-inset'
                                        }`}
                                >
                                    <div className="flex flex-col relative z-10 h-full justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-6">
                                                <div className={`p-4 rounded-2xl ${activeTopic === item ? 'nm-flat' : 'nm-inset'} transition-colors`}>
                                                    <BookOpen className={`w-6 h-6 ${user?.progress && user.progress[item]?.correctQuestionIds?.length > 0 ? 'text-emerald-500' : 'text-indigo-600'}`} />
                                                </div>
                                                {(user?.progress && user.progress[item]) && (
                                                    <div className="flex items-center gap-1.5 px-3 py-1.5 nm-inset rounded-full">
                                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none">Complete</span>
                                                    </div>
                                                )}
                                            </div>
                                            <h4 className={`text-xl font-black mb-2 ${activeTopic === item ? 'text-indigo-600' : 'text-[#44476a]'} group-hover:text-indigo-600 transition-colors`}>
                                                {item}
                                            </h4>
                                            <p className={`text-sm ${activeTopic === item ? 'text-slate-500' : 'text-slate-400'} font-medium`}>
                                                Master {item.toLowerCase()} through adaptive AI challenges.
                                            </p>
                                        </div>

                                        <div className="mt-8 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-indigo-600">
                                            {activeTopic === item ? 'Preparing Session...' : 'Launch Path'}
                                            {!loading && <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />}
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-50 z-0" />
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
                        <div className="h-0.5 w-12 bg-slate-200" />
                    </div>
                </footer>
            </main>
        </div >
    );
};

export default DashboardPage;
