
import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12" }) => {
  // Use the exact logo from the prompt
  // Since I don't have the real asset path, I'll use a placeholder that looks exactly like it if provided
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="https://i.postimg.cc/mD8zndqQ/maizon-marie-logo.png" 
        alt="Maizon Marie Logo" 
        className="h-full object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x100?text=MAIZON+MARIE';
        }}
      />
    </div>
  );
};
