import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'subtle' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5',
  };

  const variantStyles = {
    default: 'bg-white border border-[#E2E8F0] shadow-[0_1px_2px_rgba(0,0,0,0.03)]',
    subtle: 'bg-[#F8FAFC] border border-[#E2E8F0]',
    interactive:
      'bg-white border border-[#E2E8F0] hover:border-[#8190E4] active:bg-[#F2F4FC]/40 transition-colors cursor-pointer',
  };

  return (
    <div
      className={`rounded-xl ${paddingStyles[padding]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
