import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import gsap from 'gsap';

const SearchBar = ({ value, onChange, placeholder = "Search resources..." }) => {
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(searchRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, delay: 0.3 }
    );
  }, []);

  return (
    <div 
      ref={searchRef}
      className={`relative transition-all duration-300 ${isFocused ? 'w-full md:w-96' : 'w-full md:w-80'}`}
    >
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        <Search size={20} />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-background-secondary/50 backdrop-blur-sm border border-slate-600 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 transition-all duration-300 input-glow focus:border-accent-purple focus:shadow-lg focus:shadow-purple-500/20"
      />
    </div>
  );
};

export default SearchBar;

