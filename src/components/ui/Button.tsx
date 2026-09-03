import React, { ButtonHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    primary: 'bg-teal-700 text-white hover:bg-teal-800',
    secondary: 'bg-orange-500 text-white hover:bg-orange-600',
    outline: 'border border-teal-700 text-teal-700 hover:bg-teal-50',
    ghost: 'hover:bg-slate-100 text-slate-700',
  };

  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-10 px-6 py-2',
    lg: 'h-12 px-8 text-lg',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

