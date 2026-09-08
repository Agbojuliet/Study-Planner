import React from 'react';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  caption?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  caption,
  error,
  leftIcon,
  rightIcon,
  className = '',
  required,
  ...props
}) => {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      <div className="flex items-center justify-between">
        <label
          htmlFor={inputId}
          className="text-[13px] font-semibold text-[#1E293B] select-none"
        >
          {label} {required && <span className="text-[#4056D6]">*</span>}
        </label>
      </div>

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-[#64748B]">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          required={required}
          className={`w-full min-h-[48px] bg-white border text-[15px] text-[#1E293B] rounded-xl placeholder:text-[#94A3B8] transition-colors focus:outline-none focus:border-[#4056D6] focus:ring-2 focus:ring-[#4056D6]/20 ${
            leftIcon ? 'pl-10' : 'pl-3.5'
          } ${rightIcon ? 'pr-10' : 'pr-3.5'} ${
            error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20' : 'border-[#E2E8F0]'
          } ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 flex items-center pointer-events-none text-[#64748B]">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-[12px] text-rose-500 font-medium">{error}</p>
      ) : caption ? (
        <p className="text-[12px] text-[#64748B] leading-relaxed">{caption}</p>
      ) : null}
    </div>
  );
};
