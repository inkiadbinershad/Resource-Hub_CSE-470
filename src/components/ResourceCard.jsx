import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import Button from './Button';
import gsap from 'gsap';

const ResourceCard = ({ resource, index }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power3.out'
      }
    );
  }, [index]);

  const handleViewDetails = () => {
    navigate(`/resource/${resource.id}`);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Rooms': return 'bg-blue-500/20 text-blue-400';
      case 'Equipment': return 'bg-purple-500/20 text-purple-400';
      case 'Vehicles': return 'bg-green-500/20 text-green-400';
      case 'Books': return 'bg-amber-500/20 text-amber-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div
      ref={cardRef}
      className="bg-background-secondary rounded-2xl overflow-hidden card-lift group"
    >
      {/* Image Container */}
      <div className="relative h-48 bg-slate-800/50 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-500">
          {resource.image}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
            {resource.category}
          </span>
          <StatusBadge status={resource.status} size="small" />
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-purple transition-colors duration-300">
          {resource.name}
        </h3>

        {/* Location */}
        <p className="text-slate-400 text-sm mb-4">
          📍 {resource.location}
        </p>

        {/* View Details Button */}
        <Button
          variant="secondary"
          className="w-full group-hover:bg-accent-purple/20"
          onClick={handleViewDetails}
          icon={ArrowRight}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default ResourceCard;

