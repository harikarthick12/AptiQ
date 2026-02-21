import React from 'react';

const Logo = ({ className = "h-8", iconOnly = false, onClick }) => {
    return (
        <div className="flex items-center gap-2 group cursor-pointer" onClick={onClick}>
            <div className="p-2 nm-flat rounded-xl">
                <img
                    src="/logo.png"
                    alt="AptiQ Logo"
                    className={`${className} object-contain`}
                    style={{ mixBlendMode: 'multiply', filter: 'drop-shadow(0 2px 4px rgba(79, 70, 229, 0.1))' }}
                />
            </div>
        </div>
    );
};

export default Logo;
