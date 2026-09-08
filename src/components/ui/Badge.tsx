import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'neutral' | 'accent' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const variantStyles = {
    primary: 'bg-[#F2F4FC] text-[#4056D6] border border-[#D5DAF6]',
    secondary: 'bg-[#B5FFE1]/25 text-[#0F766E] border border-[#B5FFE1]',
    neutral: 'bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]',
    accent: 'bg-[#8190E4]/15 text-[#4056D6] border border-[#8190E4]/30',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-rose-50 text-rose-600 border border-rose-200',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-semibold rounded-md',
    md: 'text-[12px] px-2.5 py-1 font-semibold rounded-lg',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap select-none font-medium leading-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
