import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const StatCard = ({ icon: Icon, label, value, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.15,
        ease: 'power3.out'
      }
    );
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className="bg-background-secondary/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 card-lift group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-accent-purple" />
        </div>
        <div className="text-3xl font-bold gradient-text">{value}</div>
      </div>
      <p className="text-slate-400 text-sm font-medium">{label}</p>
    </div>
  );
};

export default StatCard;

