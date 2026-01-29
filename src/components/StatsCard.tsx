'use client';

import React from 'react';
import { Card } from './ui/Card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: string;
        positive: boolean;
    };
    className?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, className }: StatsCardProps) {
    return (
        <Card className={cn('relative overflow-hidden', className)}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
                    <p className="text-3xl font-bold text-white">{value}</p>
                    {trend && (
                        <p className={cn(
                            'text-sm mt-2',
                            trend.positive ? 'text-poker-green-400' : 'text-red-400'
                        )}>
                            {trend.value}
                        </p>
                    )}
                </div>
                <div className="w-12 h-12 rounded-lg bg-poker-green-500/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-poker-green-400" />
                </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-poker-green-500/10 rounded-full blur-2xl" />
        </Card>
    );
}
