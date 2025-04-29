import React, { forwardRef } from 'react';
import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={twMerge(
                    'w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500',
                    'text-gray-900 placeholder:text-gray-400',
                    'transition-all duration-200',
                    className
                )}
                {...props}
            />
        );
    }
);