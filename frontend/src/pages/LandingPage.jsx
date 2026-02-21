import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit, BarChart3, ArrowRight, ShieldCheck } from 'lucide-react';
import Logo from '../components/Logo';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#e0e5ec] text-[#44476a] font-['Inter'] selection:bg-indigo-100 selection:text-indigo-700">
            {/* Nav */}
            <nav className="max-w-[1100px] mx-auto px-6 h-24 flex justify-between items-center bg-[#e0e5ec]/50 backdrop-blur-md sticky top-0 z-50">
                <Logo className="h-10 w-auto" />
                <div className="flex items-center gap-6">
                    <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Login</Link>
                    <Link to="/login" className="btn-primary !py-2 !px-5 text-sm">New Registration</Link>
                </div>
            </nav>

            <main className="max-w-[1000px] mx-auto px-6 py-24 flex flex-col items-center text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 nm-inset rounded-full mb-12"
                >
                    <div className="h-2 w-2 bg-indigo-500 rounded-full animate-pulse" />
                    <span className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400">Mastery v2.0 • Neumorphic UI</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-slate-900 font-['Poppins']"
                >
                    Learn better with <br />
                    <span className="text-indigo-600">AI that understands you.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-slate-500 max-w-2xl mb-16 leading-relaxed font-medium"
                >
                    A tactile AI tutor that explains things clearly, helps you practice, and builds your confidence step-by-step.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-8"
                >
                    <Link to="/login" className="btn-primary px-12 h-20 flex items-center justify-center text-xl gap-3 group nm-on-click">
                        Start Learning Now <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </motion.div>

                {/* Features Label */}
                <div className="mt-32 w-full grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        {
                            icon: <BrainCircuit className="w-6 h-6" />,
                            title: "Smart Help",
                            desc: "The AI changes how it explains things based on how you answer."
                        },
                        {
                            icon: <Sparkles className="w-6 h-6" />,
                            title: "Really Understand",
                            desc: "We don't just give you answers; we make sure you learn the logic."
                        },
                        {
                            icon: <BarChart3 className="w-6 h-6" />,
                            title: "Track Success",
                            desc: "See exactly where you are doing great and where you need more practice."
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="nm-flat p-10 rounded-[40px] text-left hover:scale-[1.02] transition-all duration-500 group"
                        >
                            <div className="h-14 w-14 nm-inset rounded-2xl flex items-center justify-center text-indigo-600 mb-8 transform group-hover:rotate-6 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-black mb-4 text-[#44476a]">{feature.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <footer className="mt-40 border-t border-slate-100 pt-10 w-full flex flex-col items-center gap-6">
                    <p className="text-slate-400 text-xs flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        Made with love by AptiQ
                    </p>
                    <div className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                        © 2026 AptiQ
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default LandingPage;
