import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  type = 'button',
  disabled = false,
  icon: Icon 
}) => {
  const baseStyles = 'px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-accent-purple to-accent-blue text-white hover:shadow-lg hover:shadow-purple-500/25 btn-glow',
    secondary: 'bg-background-secondary text-white border border-slate-600 hover:border-accent-purple hover:text-accent-purple',
    outline: 'border-2 border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-white',
    ghost: 'text-slate-400 hover:text-white hover:bg-slate-800'
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${disabled ? disabledStyles : ''}
        ${className}
      `}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

export default Button;

