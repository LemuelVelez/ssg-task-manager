import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, type, className }) => {
  return (
    <button
      type={type}
      className={`py-2.5 px-2.5 w-full rounded-xl border border-solid text-sm font-bold ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
