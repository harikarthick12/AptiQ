import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import Logo from '../components/Logo';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 selection:bg-indigo-100 selection:text-indigo-700">
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
                className="w-full max-w-[440px] bg-white border border-slate-200 p-10 rounded-3xl shadow-xl shadow-slate-200/50"
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
                        <div className="relative">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest absolute -top-2 left-4 bg-white px-1 z-10">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter your name"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-11 pr-4 py-4 text-slate-900 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-300"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    <div className="relative">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest absolute -top-2 left-4 bg-white px-1 z-10">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="email"
                                required
                                placeholder="name@company.com"
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-11 pr-4 py-4 text-slate-900 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-300"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest absolute -top-2 left-4 bg-white px-1 z-10">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-11 pr-4 py-4 text-slate-900 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-300"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn-primary h-14 flex items-center justify-center gap-2 group"
                    >
                        {isLoading ? (
                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                {isLogin ? 'Login to Dashboard' : 'Create Mastery Account'}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-slate-50 text-center">
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
