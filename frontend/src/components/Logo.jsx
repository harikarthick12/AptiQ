import React from 'react';

const Logo = ({ className = "h-10", iconOnly = false }) => {
    return (
        <div className="flex items-center gap-3 group cursor-pointer">
            <img
                src="/logo.png"
                alt="AptiQ Logo"
                className={`${className} object-contain transition-transform group-hover:scale-105`}
            />
            {!iconOnly && (
                <span className="text-2xl font-bold tracking-tight text-[#003366] font-['Poppins']">

                </span>
            )}
        </div>
    );
};

export default Logo;
