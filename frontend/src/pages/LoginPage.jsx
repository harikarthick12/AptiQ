import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import Logo from '../components/Logo';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            if (isLogin) {
                await login(formData.email, formData.password);
            } else {
                await signup(formData.name, formData.email, formData.password);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Authentication failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#e0e5ec] text-[#44476a] flex flex-col items-center justify-center p-6 selection:bg-indigo-100 selection:text-indigo-700">
            {/* Logo area */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <Logo className="h-14 w-auto" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[480px] nm-flat p-12 rounded-[50px]"
            >
                <div className="text-center mb-10">
                    <h2 className="heading-main mb-2">
                        {isLogin ? 'Welcome back' : 'Join AptiQ'}
                    </h2>
                    <p className="text-slate-500 text-sm">
                        {isLogin ? 'Your adaptive learning companion is ready.' : 'Start your journey to mastery with AI tutoring.'}
                    </p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl mb-6 text-xs font-medium flex gap-2 items-center"
                    >
                        <ShieldCheck className="w-4 h-4 shrink-0" />
                        {error}
                    </motion.div>
                )}

                {/* Test User Hint */}
                {isLogin && (
                    <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 p-4 rounded-xl mb-6 text-[11px] font-medium leading-relaxed">
                        <strong className="block mb-1">Local Testing Mode:</strong>
                        Use <code className="bg-white px-1 py-0.5 rounded border">test@example.com</code> and <code className="bg-white px-1 py-0.5 rounded border">password123</code>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter your name"
                                    className="w-full nm-inset rounded-2xl pl-12 pr-4 py-5 text-[#44476a] outline-none transition-all placeholder:text-slate-400 font-medium border-none focus:ring-2 focus:ring-indigo-300"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="email"
                                required
                                placeholder="name@company.com"
                                className="w-full nm-inset rounded-2xl pl-12 pr-4 py-5 text-[#44476a] outline-none transition-all placeholder:text-slate-400 font-medium border-none focus:ring-2 focus:ring-indigo-300"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="••••••••"
                                className="w-full nm-inset rounded-2xl pl-12 pr-14 py-5 text-[#44476a] outline-none transition-all placeholder:text-slate-400 font-medium border-none focus:ring-2 focus:ring-indigo-300"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <motion.button
                                type="button"
                                whileHover={{ scale: 1.1, rotate: showPassword ? 0 : 15 }}
                                whileTap={{ scale: 0.8, rotate: -15 }}
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-indigo-600 transition-colors bg-transparent border-none outline-none focus:outline-none"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={showPassword ? 'eye-off' : 'eye'}
                                        initial={{ opacity: 0, scale: 0.5, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.5, y: -10 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 10,
                                            mass: 1
                                        }}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn-primary h-16 flex items-center justify-center gap-3 group nm-on-click"
                    >
                        {isLoading ? (
                            <div className="h-6 w-6 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                        ) : (
                            <>
                                <span className="text-lg">{isLogin ? 'Login to Dashboard' : 'Create Mastery Account'}</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-10 pt-10 nm-inset rounded-[40px] px-6 py-8 text-center bg-transparent">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors"
                    >
                        {isLogin ? "Don't have an account? Start here" : "Already registered? Login here"}
                    </button>
                </div>
            </motion.div>

            <p className="mt-8 text-slate-400 text-xs flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Your data is secure and learning is personalized.
            </p>
        </div>
    );
};

export default LoginPage;
