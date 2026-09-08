import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  caption?: string;
  options: SelectOption[];
  error?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  caption,
  options,
  error,
  className = '',
  required,
  ...props
}) => {
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      <label
        htmlFor={selectId}
        className="text-[13px] font-semibold text-[#1E293B] select-none"
      >
        {label} {required && <span className="text-[#4056D6]">*</span>}
      </label>

      <div className="relative">
        <select
          id={selectId}
          required={required}
          className={`w-full min-h-[48px] bg-white border text-[15px] text-[#1E293B] rounded-xl px-3.5 pr-10 appearance-none transition-colors focus:outline-none focus:border-[#4056D6] focus:ring-2 focus:ring-[#4056D6]/20 cursor-pointer ${
            error ? 'border-rose-400' : 'border-[#E2E8F0]'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#64748B]">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {error ? (
        <p className="text-[12px] text-rose-500 font-medium">{error}</p>
      ) : caption ? (
        <p className="text-[12px] text-[#64748B] leading-relaxed">{caption}</p>
      ) : null}
    </div>
  );
};
