
import React from 'react';
import { motion } from 'framer-motion';

const SkillRadar = ({ stats }) => {
    // stats: { aptitude: 0-100, technical: 0-100, logical: 0-100 }
    const size = 300;
    const center = size / 2;
    const radius = size * 0.4;

    const categories = [
        { name: 'Aptitude', key: 'aptitude', angle: -90 },
        { name: 'Technical', key: 'technical', angle: 30 },
        { name: 'Logical', key: 'logical', angle: 150 }
    ];

    const getPoint = (angle, value) => {
        const r = (radius * value) / 100;
        const x = center + r * Math.cos((angle * Math.PI) / 180);
        const y = center + r * Math.sin((angle * Math.PI) / 180);
        return { x, y };
    };

    const points = categories.map(cat => getPoint(cat.angle, stats[cat.key] || 10));
    const pathData = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} Z`;

    return (
        <div className="relative flex items-center justify-center p-4">
            <svg width={size} height={size} className="overflow-visible">
                {/* Background Triangles */}
                {[20, 40, 60, 80, 100].map((tick) => {
                    const p = categories.map(cat => getPoint(cat.angle, tick));
                    return (
                        <path
                            key={tick}
                            d={`M ${p[0].x} ${p[0].y} L ${p[1].x} ${p[1].y} L ${p[2].x} ${p[2].y} Z`}
                            fill="none"
                            stroke="#E2E8F0"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Axis Lines */}
                {categories.map((cat, i) => {
                    const p = getPoint(cat.angle, 100);
                    return (
                        <line
                            key={i}
                            x1={center}
                            y1={center}
                            x2={p.x}
                            y2={p.y}
                            stroke="#E2E8F0"
                            strokeWidth="2"
                        />
                    );
                })}

                {/* Data Polygon */}
                <motion.path
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    d={pathData}
                    fill="rgba(79, 70, 229, 0.2)"
                    stroke="#4F46E9"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Points */}
                {points.map((p, i) => (
                    <motion.circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        fill="#4F46E9"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                    />
                ))}

                {/* Labels */}
                {categories.map((cat, i) => {
                    const p = getPoint(cat.angle, 115);
                    return (
                        <text
                            key={i}
                            x={p.x}
                            y={p.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-[10px] font-black fill-slate-400 uppercase tracking-widest"
                        >
                            {cat.name}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
};

export default SkillRadar;
