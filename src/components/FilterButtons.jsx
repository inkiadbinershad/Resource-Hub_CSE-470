import React, { useRef, useEffect } from 'react';
import { Building2, Laptop, Car, BookMarked, Grid3X3 } from 'lucide-react';
import gsap from 'gsap';

const FilterButtons = ({ categories, activeCategory, onCategoryChange }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current.children,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, delay: 0.4 }
    );
  }, []);

  const getIcon = (category) => {
    switch (category) {
      case 'All': return Grid3X3;
      case 'Rooms': return Building2;
      case 'Equipment': return Laptop;
      case 'Vehicles': return Car;
      case 'Books': return BookMarked;
      default: return Grid3X3;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="flex flex-wrap gap-2"
    >
      {categories.map((category) => {
        const Icon = getIcon(category);
        const isActive = activeCategory === category;
        
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2
              ${isActive 
                ? 'bg-gradient-to-r from-accent-purple to-accent-blue text-white shadow-lg shadow-purple-500/25' 
                : 'bg-background-secondary/50 text-slate-400 hover:text-white hover:bg-slate-700/50 border border-slate-700/50'
              }
            `}
          >
            <Icon size={18} />
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default FilterButtons;

