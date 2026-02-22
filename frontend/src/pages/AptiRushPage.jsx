
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Timer,
    Zap,
    Trophy,
    XCircle,
    CheckCircle2,
    ArrowLeft,
    Sparkles,
    Brain,
    Flame,
    History
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import questionService from '../services/questionService';
import Logo from '../components/Logo';

const AptiRushPage = () => {
    const navigate = useNavigate();
    const { user, updateUser } = useAuth();

    const [gameState, setGameState] = useState('lobby'); // lobby, playing, finished
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [streak, setStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);
    const [answers, setAnswers] = useState([]); // {id, isCorrect, timeSpent}
    const [loading, setLoading] = useState(false);

    const timerRef = useRef(null);
    const lastQuestionTime = useRef(Date.now());

    const startRush = async () => {
        setLoading(true);
        try {
            const seenIds = []; // Could pull from user progress if needed
            const session = await questionService.getRandomBatch(15, seenIds);
            setQuestions(session.questions);
            setTimeLeft(session.timeLimit);
            setGameState('playing');
            lastQuestionTime.current = Date.now();

            // Start Timer
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        setGameState('finished');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswer = (option) => {
        const currentQ = questions[currentIndex];
        const isCorrect = currentQ.correctAnswer === option;
        const now = Date.now();
        const timeSpent = (now - lastQuestionTime.current) / 1000;

        // Update stats
        const newAnswers = [...answers, { id: currentQ.id, isCorrect, timeSpent }];
        setAnswers(newAnswers);

        if (isCorrect) {
            setScore(prev => prev + 1);
            const newStreak = streak + 1;
            setStreak(newStreak);
            if (newStreak > maxStreak) setMaxStreak(newStreak);
        } else {
            setStreak(0);
        }

        // Move to next
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            lastQuestionTime.current = now;
        } else {
            clearInterval(timerRef.current);
            setGameState('finished');
        }
    };

    const finishRush = async () => {
        const xpEarned = score * 5 + maxStreak * 2;
        const updatedProgress = { ...(user?.progress || {}) };

        // Track the questions seen
        questions.forEach(q => {
            const topic = q.topic || 'General';
            if (!updatedProgress[topic]) {
                updatedProgress[topic] = { seenQuestionIds: [], correctQuestionIds: [] };
            }

            // Safety check: ensure arrays exist
            const seenIds = Array.isArray(updatedProgress[topic].seenQuestionIds) ? updatedProgress[topic].seenQuestionIds : [];
            const correctIds = Array.isArray(updatedProgress[topic].correctQuestionIds) ? updatedProgress[topic].correctQuestionIds : [];

            updatedProgress[topic].seenQuestionIds = [...new Set([...seenIds, q.id])];

            const wasCorrect = answers.find(a => a.id === q.id)?.isCorrect;
            if (wasCorrect) {
                updatedProgress[topic].correctQuestionIds = [...new Set([...correctIds, q.id])];
            }
        });

        await updateUser({
            xp: (user?.xp || 0) + xpEarned,
            progress: updatedProgress
        });

        navigate('/dashboard');
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    if (gameState === 'lobby') {
        return (
            <div className="min-h-screen bg-[#e0e5ec] flex flex-col items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-xl w-full nm-flat rounded-[50px] p-12 text-center"
                >
                    <div className="w-24 h-24 nm-inset rounded-3xl flex items-center justify-center mx-auto mb-8 text-indigo-600">
                        <Zap className="w-12 h-12 fill-current" />
                    </div>
                    <h1 className="text-4xl font-black text-[#44476a] mb-4">AptiRush</h1>
                    <p className="text-slate-500 mb-10 leading-relaxed font-medium">
                        15 random questions. Mixed topics. Strictly timed. <br />
                        How many can you solve before the clock runs out?
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="nm-inset p-4 rounded-2xl">
                            <Timer className="w-5 h-5 mx-auto mb-2 text-indigo-500" />
                            <span className="text-xs font-black uppercase text-slate-400">Time Limit</span>
                            <p className="font-bold text-slate-700">225 Seconds</p>
                        </div>
                        <div className="nm-inset p-4 rounded-2xl">
                            <Brain className="w-5 h-5 mx-auto mb-2 text-purple-500" />
                            <span className="text-xs font-black uppercase text-slate-400">Quest Count</span>
                            <p className="font-bold text-slate-700">15 Mix</p>
                        </div>
                    </div>

                    <button
                        onClick={startRush}
                        disabled={loading}
                        className="btn-primary w-full h-16 text-xl flex items-center justify-center gap-3 nm-on-click"
                    >
                        {loading ? 'Preparing Pool...' : 'Enter the Rush'}
                        <Zap className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="mt-6 text-slate-400 hover:text-indigo-600 font-bold text-sm transition-colors"
                    >
                        Maybe Later
                    </button>
                </motion.div>
            </div>
        );
    }

    if (gameState === 'playing') {
        const currentQ = questions[currentIndex];
        const progress = ((currentIndex + 1) / questions.length) * 100;
        const timePercentage = (timeLeft / 225) * 100;

        return (
            <div className="min-h-screen bg-[#e0e5ec] text-[#44476a]">
                <header className="fixed top-0 inset-x-0 z-50 bg-[#e0e5ec]">
                    <div className="max-w-[900px] mx-auto px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-24 nm-inset rounded-full flex items-center justify-center gap-2">
                                <Timer className={`w-4 h-4 ${timeLeft < 20 ? 'text-red-500 animate-pulse' : 'text-indigo-600'}`} />
                                <span className="font-black tabular-nums">{timeLeft}s</span>
                            </div>
                            <div className="h-10 w-24 nm-inset rounded-full flex items-center justify-center gap-2">
                                <Flame className={`w-4 h-4 ${streak > 0 ? 'text-orange-500' : 'text-slate-300'}`} />
                                <span className="font-black">{streak}</span>
                            </div>
                        </div>

                        <div className="text-sm font-black uppercase tracking-widest text-slate-400">
                            Rush {currentIndex + 1}/{questions.length}
                        </div>

                        <Logo iconOnly className="h-8 w-8" />
                    </div>
                    {/* Visual Timer Bar */}
                    <div className="w-full h-1 bg-slate-200">
                        <motion.div
                            className={`h-full ${timeLeft < 20 ? 'bg-red-500' : 'bg-indigo-500'}`}
                            animate={{ width: `${timePercentage}%` }}
                            transition={{ duration: 1, ease: "linear" }}
                        />
                    </div>
                </header>

                <main className="max-w-[900px] mx-auto px-6 pt-32 pb-12">
                    <motion.div
                        key={currentIndex}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="space-y-8"
                    >
                        <div className="study-card nm-flat min-h-[500px] flex flex-col">
                            <div className="mb-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
                                    {currentQ.topic}
                                </span>
                            </div>
                            <h2 className="text-3xl font-black mb-12 text-[#44476a] leading-tight">
                                {currentQ.questionText}
                            </h2>

                            <div className="grid grid-cols-1 gap-5 mt-auto">
                                {currentQ.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(option)}
                                        className="p-6 rounded-[24px] text-left transition-all group flex items-center nm-flat hover:scale-[1.01] active:nm-inset"
                                    >
                                        <div className="h-10 w-10 nm-inset rounded-xl flex items-center justify-center mr-5 font-black text-sm text-slate-400 group-hover:text-indigo-600 transition-colors">
                                            {String.fromCharCode(65 + idx)}
                                        </div>
                                        <span className="text-lg font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                                            {option}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        );
    }

    if (gameState === 'finished') {
        const accuracy = Math.round((score / questions.length) * 100);
        const xpEarned = score * 5 + maxStreak * 2;

        return (
            <div className="min-h-screen bg-[#e0e5ec] flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl w-full nm-flat rounded-[50px] p-12 text-center"
                >
                    <div className="h-20 w-20 nm-inset rounded-3xl flex items-center justify-center mx-auto mb-8 text-amber-500">
                        <Trophy className="w-10 h-10" />
                    </div>

                    <h2 className="text-4xl font-black text-[#44476a] mb-2">Rush Complete!</h2>
                    <p className="text-slate-500 font-medium mb-10 uppercase tracking-widest text-xs">Performance Analysis</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                        <div className="nm-inset p-6 rounded-[32px]">
                            <p className="text-xs font-black text-slate-400 uppercase mb-2">Accuracy</p>
                            <p className="text-3xl font-black text-[#44476a]">{accuracy}%</p>
                        </div>
                        <div className="nm-inset p-6 rounded-[32px]">
                            <p className="text-xs font-black text-orange-400 uppercase mb-2">Max Streak</p>
                            <p className="text-3xl font-black text-[#44476a]">{maxStreak}</p>
                        </div>
                        <div className="nm-inset p-6 rounded-[32px]">
                            <p className="text-xs font-black text-amber-500 uppercase mb-2">XP Gained</p>
                            <p className="text-3xl font-black text-[#44476a]">+{xpEarned}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={finishRush}
                            className="btn-primary w-full h-16 text-lg flex items-center justify-center gap-3 nm-on-click"
                        >
                            Collect Rewards & Finish
                            <Sparkles className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return null;
};

export default AptiRushPage;
