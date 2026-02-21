
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    ArrowLeft,
    Send,
    CheckCircle2,
    XCircle,
    Lightbulb,
    BookOpen,
    GraduationCap,
    Sparkles,
    Languages,
    Zap,
    Trophy,
    Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import questionService from '../services/questionService';
import Logo from '../components/Logo';

const LearningPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user, updateUser } = useAuth();

    const [session, setSession] = useState(state?.session);
    const [view, setView] = useState('explanation');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sessionCorrectIds, setSessionCorrectIds] = useState([]);
    const [xpGained, setXpGained] = useState(0);
    const [showXpPopup, setShowXpPopup] = useState(false);

    useEffect(() => {
        if (!session) {
            navigate('/dashboard');
        }
    }, [session, navigate]);

    if (!session) return null;

    const steps = [
        'explanation',
        ...(session.workedExample ? ['example'] : []),
        ...session.questions.map((_, i) => `question-${i}`)
    ];

    const currentStepIndex = view.startsWith('question')
        ? (session.workedExample ? 2 : 1) + currentQuestionIndex
        : view === 'explanation' ? 0 : 1;
    const progress = ((currentStepIndex + 1) / steps.length) * 100;

    const handleNext = () => {
        if (view === 'explanation') {
            if (session.workedExample) setView('example');
            else setView('question');
        }
        else if (view === 'example') setView('question');
    };

    const submitAnswer = async () => {
        if (!selectedOption || isSubmitting) return;

        setIsSubmitting(true);
        const currentQ = session.questions[currentQuestionIndex];

        const isCorrect = currentQ.correctAnswer.toLowerCase().trim() === selectedOption.toLowerCase().trim();

        // Mocking the backend response for explanation based on language
        const explanation = (user?.preferredLanguage === 'Tamil' && currentQ.explanation_tamil) ? currentQ.explanation_tamil :
            (user?.preferredLanguage === 'Telugu' && currentQ.explanation_telugu) ? currentQ.explanation_telugu :
                currentQ.explanation;

        if (isCorrect) {
            setSessionCorrectIds(prev => [...new Set([...prev, currentQ.id])]);
            setXpGained(prev => prev + 10);
            setShowXpPopup(true);
            setTimeout(() => setShowXpPopup(false), 2000);
        }

        setFeedback({
            isCorrect,
            correctAnswer: currentQ.correctAnswer,
            explanation: explanation
        });

        setIsSubmitting(false);
    };

    const nextQuestion = async () => {
        setFeedback(null);
        setSelectedOption(null);

        if (currentQuestionIndex < session.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setLoading(true);
            try {
                // Update progress with correct answers from this session
                const updatedProgress = { ...(user?.progress || {}) };
                const currentTopicProgress = updatedProgress[session.topic] || { seenQuestionIds: [], correctQuestionIds: [] };

                const newSeenIds = [...new Set([...(currentTopicProgress.seenQuestionIds || []), ...session.questions.map(q => q.id)])];
                const newCorrectIds = [...new Set([...(currentTopicProgress.correctQuestionIds || []), ...sessionCorrectIds])];

                updatedProgress[session.topic] = {
                    ...currentTopicProgress,
                    seenQuestionIds: newSeenIds,
                    correctQuestionIds: newCorrectIds
                };

                // Calculate Streak
                const today = new Date().toISOString().split('T')[0];
                let currentStreak = user?.streak || 0;
                let lastDate = user?.lastActiveDate;

                if (lastDate !== today) {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayStr = yesterday.toISOString().split('T')[0];

                    if (lastDate === yesterdayStr) {
                        currentStreak += 1;
                    } else if (!lastDate) {
                        currentStreak = 1;
                    } else {
                        currentStreak = 1; // Reset streak if missed a day
                    }
                }

                // Achievement System: Check for new badges
                const newBadges = [...(user?.badges || [])];
                const now = new Date();
                const hour = now.getHours();
                let earnedNewBadge = false;

                // 1. Early Bird: Completed session before 9 AM
                if (hour >= 4 && hour < 9) {
                    if (!newBadges.includes('Early Bird')) {
                        newBadges.push('Early Bird');
                        earnedNewBadge = true;
                    }
                }

                // 2. Night Owl: Completed session after 10 PM
                if (hour >= 22 || hour < 4) {
                    if (!newBadges.includes('Night Owl')) {
                        newBadges.push('Night Owl');
                        earnedNewBadge = true;
                    }
                }

                // 3. Consistency: 3+ Streak
                if (currentStreak >= 3 && !newBadges.includes('Streak Warrior')) {
                    newBadges.push('Streak Warrior');
                    earnedNewBadge = true;
                }

                // 4. Score Master: Perfect Session (no questions missed)
                const totalQuestions = session.questions.length;
                if (sessionCorrectIds.length === totalQuestions && !newBadges.includes('Mastery Badge')) {
                    newBadges.push('Mastery Badge');
                    earnedNewBadge = true;
                }

                await updateUser({
                    progress: updatedProgress,
                    xp: (user?.xp || 0) + xpGained,
                    streak: currentStreak,
                    lastActiveDate: today,
                    badges: newBadges
                });
                navigate('/dashboard', { state: { badgeEarned: earnedNewBadge } });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#e0e5ec] text-[#44476a] selection:bg-indigo-100 selection:text-indigo-700">
            {/* Header */}
            <header className="bg-[#e0e5ec] sticky top-0 z-50">
                <div className="max-w-[900px] mx-auto px-6 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-slate-500 hover:text-slate-900 flex items-center gap-2 group transition-colors text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Exit Session
                    </button>

                    <div className="flex flex-col items-center">
                        <h2 className="text-sm font-semibold text-slate-900">{session.topic}</h2>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{session.level} Level</span>
                    </div>

                    <div className="w-[84px] flex justify-end">
                        <Logo iconOnly className="h-8 w-8" />
                    </div>
                </div>

                <div className="w-full h-2 nm-inset mt-auto relative overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-indigo-500"
                    />

                    {/* XP Popup */}
                    <AnimatePresence>
                        {showXpPopup && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: -40 }}
                                exit={{ opacity: 0 }}
                                className="absolute right-6 top-0 flex items-center gap-1 text-amber-500 font-bold"
                            >
                                <Sparkles className="w-4 h-4" />
                                +10 XP
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </header>

            <main className="max-w-[900px] mx-auto px-6 py-12">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-20 space-y-6"
                        >
                            <div className="relative">
                                <div className="h-16 w-16 border-4 border-indigo-100 rounded-full"></div>
                                <div className="absolute top-0 h-16 w-16 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-slate-900">Personalizing your next steps...</h3>
                                <p className="text-slate-500">Our tutor is analyzing your performance.</p>
                            </div>
                        </motion.div>
                    ) : view === 'explanation' ? (
                        <motion.div
                            key="explanation"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="study-card nm-flat"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="h-10 w-10 nm-flat rounded-lg flex items-center justify-center text-amber-500">
                                    <Lightbulb className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-black font-['Poppins'] text-[#44476a]">Concept Overview</h3>
                                <div className="ml-auto flex items-center gap-2 px-4 py-1.5 nm-inset rounded-full">
                                    <Languages className="w-4 h-4 text-indigo-600" />
                                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest leading-none">
                                        {user?.preferredLanguage || 'English'}
                                    </span>
                                </div>
                            </div>

                            <div className="prose prose-slate max-w-none text-slate-600 text-lg leading-relaxed whitespace-pre-line">
                                {session.explanation}
                            </div>

                            <div className="mt-12 flex justify-end">
                                <button onClick={handleNext} className="btn-primary flex items-center gap-2">
                                    Continue to Example
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>

                    ) : view === 'example' ? (
                        <motion.div
                            key="example"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="study-card nm-flat"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="h-10 w-10 nm-flat rounded-lg flex items-center justify-center text-purple-500">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-black font-['Poppins'] text-[#44476a]">Practical Example</h3>
                            </div>

                            <div className="space-y-8">
                                <section>
                                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-3">The Problem</span>
                                    <div className="nm-inset rounded-2xl p-8 text-xl text-slate-800 leading-relaxed font-semibold">
                                        {session.workedExample.problem}
                                    </div>
                                </section>

                                <section>
                                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-3">Step-by-Step Solution</span>
                                    <div className="nm-flat rounded-2xl p-8 text-lg text-slate-600 whitespace-pre-line leading-relaxed italic font-medium">
                                        {session.workedExample.solution}
                                    </div>
                                </section>
                            </div>

                            <div className="mt-12 flex justify-end">
                                <button onClick={handleNext} className="btn-primary flex items-center gap-2">
                                    Start Practice Quiz
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>

                    ) : (
                        <motion.div
                            key={`question-${currentQuestionIndex}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                        >
                            <div className="flex justify-between items-center text-slate-400">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-xl nm-inset flex items-center justify-center text-[11px] font-black text-slate-500">
                                        {currentQuestionIndex + 1}
                                    </div>
                                    <span className="text-xs font-semibold uppercase tracking-wider">Question</span>
                                </div>
                                <span className="text-xs font-medium">Difficulty: {session.questions[currentQuestionIndex].difficulty}</span>
                            </div>

                            <div className="study-card nm-flat">
                                <h3 className="text-2xl font-black mb-12 text-[#44476a] leading-snug">
                                    {(user?.preferredLanguage === 'Tamil' && session.questions[currentQuestionIndex].questionText_tamil) ? session.questions[currentQuestionIndex].questionText_tamil :
                                        (user?.preferredLanguage === 'Telugu' && session.questions[currentQuestionIndex].questionText_telugu) ? session.questions[currentQuestionIndex].questionText_telugu :
                                            session.questions[currentQuestionIndex].questionText}
                                </h3>

                                <div className="grid grid-cols-1 gap-4">
                                    {session.questions[currentQuestionIndex].options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => !feedback && setSelectedOption(option)}
                                            disabled={!!feedback}
                                            className={`p-6 rounded-[24px] text-left transition-all group flex items-center nm-flat ${selectedOption === option
                                                ? 'nm-inset scale-[0.98]'
                                                : 'hover:scale-[1.01] active:nm-inset'
                                                } ${feedback && option === feedback.correctAnswer
                                                    ? '!bg-green-100/20 shadow-[inset_4px_4px_8px_#d1fae5,inset_-4px_-4px_8px_#ffffff]'
                                                    : feedback && selectedOption === option && !feedback.isCorrect
                                                        ? '!bg-red-100/20 shadow-[inset_4px_4px_8px_#fee2e2,inset_-4px_-4px_8px_#ffffff]'
                                                        : feedback ? 'opacity-40' : ''
                                                }`}
                                        >
                                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center mr-5 font-black text-sm transition-all ${selectedOption === option ? 'nm-inset text-indigo-600' : 'nm-flat text-slate-400'
                                                } ${feedback && option === feedback.correctAnswer ? '!bg-green-500 !text-white' : ''
                                                } ${feedback && selectedOption === option && !feedback.isCorrect ? '!bg-red-500 !text-white' : ''
                                                }`}>
                                                {String.fromCharCode(65 + idx)}
                                            </div>
                                            <span className={`text-lg font-bold transition-colors ${selectedOption === option ? 'text-indigo-600' : 'text-slate-600'}`}>{option}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {feedback ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`study-card nm-flat ${feedback.isCorrect ? 'bg-green-50/10' : 'bg-red-50/10'}`}
                                >
                                    <div className="flex items-start gap-5">
                                        <div className={`mt-1 h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${feedback.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                            }`}>
                                            {feedback.isCorrect ? <CheckCircle2 className="w-7 h-7" /> : <XCircle className="w-7 h-7" />}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className={`text-xl font-bold mb-3 ${feedback.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                                                {feedback.isCorrect ? 'Brilliant! Correct Answer' : 'Let\'s understand this better'}
                                            </h4>

                                            <div className="space-y-4">
                                                <div className="text-slate-700 text-lg leading-relaxed">
                                                    {feedback.explanation}
                                                </div>

                                                <div className="flex items-center gap-2 pt-6 text-indigo-600 font-bold italic nm-inset rounded-2xl px-6 py-4">
                                                    <Sparkles className="w-5 h-5" />
                                                    Tutor Tip: Don't rush into calculations, look for patterns first!
                                                </div>
                                            </div>

                                            <div className="mt-8 flex justify-end gap-3">
                                                {!feedback.isCorrect && (
                                                    <button
                                                        onClick={() => {
                                                            setFeedback(null);
                                                            setSelectedOption(null);
                                                        }}
                                                        className="px-8 h-14 rounded-2xl nm-flat text-slate-500 font-bold hover:text-indigo-600 transition-all active:nm-inset"
                                                    >
                                                        Try Again
                                                    </button>
                                                )}
                                                <button
                                                    onClick={nextQuestion}
                                                    className={`btn-primary h-14 px-12 nm-on-click ${feedback.isCorrect ? 'text-green-600 font-black' : 'text-[#44476a] font-extrabold'}`}
                                                >
                                                    {currentQuestionIndex < session.questions.length - 1 ? 'Next Challenge' : 'Finish Mastery Batch'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="flex justify-end pt-4">
                                    <button
                                        onClick={submitAnswer}
                                        disabled={!selectedOption || isSubmitting}
                                        className="btn-primary w-full md:w-auto px-14 h-16 text-xl nm-on-click"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-3">
                                                <div className="h-6 w-6 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                                                Checking...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                Final Submission <Send className="w-6 h-6" />
                                            </div>
                                        )}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default LearningPage;
