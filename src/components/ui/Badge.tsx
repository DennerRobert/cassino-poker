import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'gold' | 'silver' | 'bronze' | 'success' | 'warning';
    className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
    const variants = {
        default: 'bg-gray-700 text-gray-200',
        gold: 'bg-gradient-to-br from-yellow-300 via-poker-gold-500 to-yellow-600 text-gray-900 shadow-glow-gold font-extrabold border border-yellow-400',
        silver: 'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 text-gray-800 font-extrabold border border-gray-300 shadow-md',
        bronze: 'bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 text-white font-extrabold border border-amber-500 shadow-md',
        success: 'bg-poker-green-600 text-white',
        warning: 'bg-yellow-600 text-gray-900',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
