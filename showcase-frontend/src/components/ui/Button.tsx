import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-2.5 rounded-xl font-medium transition-colors text-sm cursor-pointer";
  const variants = {
    primary: "bg-[#7C5CFC] text-white hover:bg-[#6A4CED]",
    secondary: "bg-white border border-[#E5E7EB] text-[#7C5CFC] hover:bg-gray-50",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};