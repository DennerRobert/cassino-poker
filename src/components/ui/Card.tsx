import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
    return (
        <div
            className={cn(
                'glass rounded-xl p-6 shadow-lg',
                hover && 'hover:glass-strong transition-all duration-300 hover:scale-[1.02]',
                className
            )}
        >
            {children}
        </div>
    );
}
