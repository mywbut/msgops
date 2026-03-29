import React from 'react';

export default function CircularProgress({ 
    percentage = 0, 
    size = 48, 
    strokeWidth = 4, 
    color = "#25D366", 
    backgroundColor = "#F3F4F6",
    label = ""
}) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full transition-all duration-500">
                <svg className="transform -rotate-90" width={size} height={size}>
                    {/* Background circle */}
                    <circle
                        className="text-gray-200"
                        strokeWidth={strokeWidth}
                        stroke={backgroundColor}
                        fill="transparent"
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                    />
                    {/* Progress circle */}
                    <circle
                        className="transition-all duration-1000 ease-out"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        style={{ strokeDashoffset: offset }}
                        strokeLinecap="round"
                        stroke={color}
                        fill="transparent"
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                    />
                </svg>
                <div className="absolute flex flex-col items-center">
                    <span className="text-[11px] font-black text-[#0B1F2A]">{Math.round(percentage)}%</span>
                </div>
            </div>
            {label && <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>}
        </div>
    );
}
