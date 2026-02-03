
import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="https://i.postimg.cc/mD8zndqQ/maizon-marie-logo.png" 
        alt="Maizon Marie Logo" 
        className="h-full w-auto object-contain"
        style={{ filter: 'none' }} // Ensuring no accidental filters are applied
        onError={(e) => {
          // Fallback only if the main asset fails, using a descriptive text to maintain brand identity
          (e.target as HTMLImageElement).style.display = 'none';
          const parent = (e.target as HTMLImageElement).parentElement;
          if (parent) {
            parent.innerText = 'MAIZON MARIE';
            parent.style.fontFamily = 'Cormorant Garamond, serif';
            parent.style.fontWeight = '700';
            parent.style.letterSpacing = '0.3em';
            parent.style.color = '#E52E82'; // Approximate brand pink
          }
        }}
      />
    </div>
  );
};
