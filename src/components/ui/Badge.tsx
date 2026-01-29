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
        gold: 'bg-gradient-to-r from-poker-gold-500 to-poker-gold-600 text-gray-900 shadow-glow-gold font-bold',
        silver: 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900 font-bold',
        bronze: 'bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold',
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
