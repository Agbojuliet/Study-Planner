import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  // Mobile-first sizing with 2x horizontal padding rule
  const sizeStyles = {
    sm: 'min-h-[40px] py-2 px-4 text-xs font-semibold rounded-lg gap-1.5',
    md: 'min-h-[48px] py-3 px-6 text-sm font-semibold rounded-xl gap-2',
    lg: 'min-h-[52px] py-3.5 px-7 text-base font-semibold rounded-xl gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#4056D6] text-white hover:bg-[#3446b8] active:bg-[#2b3a9a] focus:ring-2 focus:ring-[#4056D6] focus:ring-offset-1 border border-transparent shadow-xs',
    secondary:
      'bg-[#F2F4FC] text-[#4056D6] hover:bg-[#D5DAF6] active:bg-[#ABB5ED]/30 border border-transparent',
    outline:
      'bg-white text-[#1E293B] hover:bg-[#F8FAFC] active:bg-[#F1F5F9] border border-[#E2E8F0] focus:ring-2 focus:ring-[#4056D6]/20',
    ghost:
      'bg-transparent text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC] active:bg-[#F1F5F9]',
    danger:
      'bg-rose-50 text-rose-600 hover:bg-rose-100 active:bg-rose-200 border border-rose-200',
  };

  return (
    <button
      className={`inline-flex items-center justify-center transition-colors select-none whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
        sizeStyles[size]
      } ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="shrink-0 flex items-center">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="shrink-0 flex items-center">{rightIcon}</span>}
    </button>
  );
};
