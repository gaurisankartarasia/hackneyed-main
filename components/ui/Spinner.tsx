import React from 'react';
import './Spinner.css'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'; 
  color?: 'gray' | 'primary' | 'secondary'; 
  label?: string; 
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color = 'primary', label }) => {
  const spinnerSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-12 h-12' : 'w-8 h-8';

  return (
    <div className="flex items-center space-x-2"> 
      <div className={`${spinnerSize}`} />
      <div className="spinner"></div> 
       </div>
  );
};

export default Spinner;