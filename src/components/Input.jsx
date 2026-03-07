import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  icon: Icon,
  required = false,
  className = '',
  ...props 
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-300">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon size={20} />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            w-full bg-slate-800/50 border border-slate-600 rounded-xl py-3 
            ${Icon ? 'pl-12' : 'pl-4'} pr-4
            text-white placeholder-slate-500
            transition-all duration-300
            input-glow
            focus:border-accent-purple focus:ring-0
          `}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;

