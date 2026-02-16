
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
    Languages
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
                // Determine next level or repeat
                // For now, keep it simple: stay on Beginner until user finishes bank
                const nextLevel = 'Beginner';

                const seenIds = (user?.progress && user.progress[session.topic])
                    ? user.progress[session.topic].seenQuestionIds || []
                    : [];

                const content = await questionService.getSessionContent(session.topic, nextLevel, seenIds);

                const newSession = {
                    _id: 'local_' + Date.now(),
                    topic: session.topic,
                    level: nextLevel,
                    explanation: (user?.preferredLanguage === 'Tamil' && content.explanation_tamil) ? content.explanation_tamil :
                        (user?.preferredLanguage === 'Telugu' && content.explanation_telugu) ? content.explanation_telugu :
                            content.explanation,
                    workedExample: content.workedExample,
                    questions: content.questions,
                    currentStep: 'practice'
                };

                // Update seen questions in user profile (Firestone)
                const newSeenIds = [...new Set([...seenIds, ...content.questions.map(q => q.id)])];
                const updatedProgress = { ...(user?.progress || {}) };
                updatedProgress[session.topic] = {
                    level: nextLevel,
                    seenQuestionIds: newSeenIds
                };

                await updateUser({ progress: updatedProgress });

                setSession(newSession);
                setCurrentQuestionIndex(0);
                setView('question'); // Direct to question to keep flow
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
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

                <div className="w-full h-1 bg-slate-100 mt-auto">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-indigo-500"
                    />
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
                            className="study-card"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="h-10 w-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-500">
                                    <Lightbulb className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold font-['Poppins']">Concept Overview</h3>
                                <div className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-indigo-50/50 border border-indigo-100 rounded-full">
                                    <Languages className="w-3 h-3 text-indigo-600" />
                                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest leading-none">
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
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>

                    ) : view === 'example' ? (
                        <motion.div
                            key="example"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="study-card"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="h-10 w-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-500">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold font-['Poppins']">Practical Example</h3>
                            </div>

                            <div className="space-y-8">
                                <section>
                                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-3">The Problem</span>
                                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 text-xl text-slate-800 leading-relaxed font-medium">
                                        {session.workedExample.problem}
                                    </div>
                                </section>

                                <section>
                                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-3">Step-by-Step Solution</span>
                                    <div className="bg-white border-l-4 border-indigo-200 p-6 text-lg text-slate-600 whitespace-pre-line leading-relaxed italic">
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
                                    <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                        {currentQuestionIndex + 1}
                                    </div>
                                    <span className="text-xs font-semibold uppercase tracking-wider">Question</span>
                                </div>
                                <span className="text-xs font-medium">Difficulty: {session.questions[currentQuestionIndex].difficulty}</span>
                            </div>

                            <div className="study-card">
                                <h3 className="text-2xl font-semibold mb-10 text-slate-900 leading-snug">
                                    {session.questions[currentQuestionIndex].questionText}
                                </h3>

                                <div className="grid grid-cols-1 gap-4">
                                    {session.questions[currentQuestionIndex].options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => !feedback && setSelectedOption(option)}
                                            disabled={!!feedback}
                                            className={`p-5 rounded-xl text-left border-2 transition-all group flex items-center ${selectedOption === option
                                                ? 'border-indigo-600 bg-indigo-50/50'
                                                : 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50/50'
                                                } ${feedback && option === feedback.correctAnswer
                                                    ? '!border-green-500 !bg-green-50 !text-green-900'
                                                    : feedback && selectedOption === option && !feedback.isCorrect
                                                        ? '!border-red-500 !bg-red-50 !text-red-900'
                                                        : feedback ? 'opacity-50' : ''
                                                }`}
                                        >
                                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center mr-4 font-bold text-sm transition-colors ${selectedOption === option ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                                                } ${feedback && option === feedback.correctAnswer ? '!bg-green-500 !text-white' : ''
                                                } ${feedback && selectedOption === option && !feedback.isCorrect ? '!bg-red-500 !text-white' : ''
                                                }`}>
                                                {String.fromCharCode(65 + idx)}
                                            </div>
                                            <span className="text-lg font-medium">{option}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {feedback ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`study-card overflow-hidden border-2 ${feedback.isCorrect ? 'border-green-100 bg-green-50/20' : 'border-red-100 bg-red-50/20'}`}
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

                                                <div className="flex items-center gap-2 pt-4 text-indigo-600 font-semibold italic border-t border-slate-100">
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
                                                        className="px-6 h-12 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                                                    >
                                                        Try Again
                                                    </button>
                                                )}
                                                <button
                                                    onClick={nextQuestion}
                                                    className={`btn-primary ${feedback.isCorrect ? 'bg-green-600 hover:bg-green-700 shadow-green-200' : 'bg-slate-800 hover:bg-slate-900'} px-10`}
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
                                        className="btn-primary w-full md:w-auto px-12 h-14 text-lg"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Checking...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                Final Submission <Send className="w-5 h-5" />
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
