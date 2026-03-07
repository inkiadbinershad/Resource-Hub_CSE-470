import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Calendar, Check } from 'lucide-react';
import { resources } from '../data/mockData';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import BookingForm from '../components/BookingForm';
import gsap from 'gsap';

const ResourceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const foundResource = resources.find(r => r.id === parseInt(id));
    setResource(foundResource);
  }, [id]);

  useEffect(() => {
    if (resource && !showBookingForm) {
      const ctx = gsap.context(() => {
        // Image slide in from left
        gsap.fromTo('.resource-image',
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
        );

        // Content fade in from right
        gsap.fromTo('.resource-content',
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
        );

        // Stagger amenities
        gsap.fromTo('.amenity-item',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, delay: 0.4 }
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, [resource, showBookingForm]);

  if (!resource) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center" style={{ background: 'transparent' }}>
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-white">Resource not found</h2>
        </div>
      </div>
    );
  }

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
    <div ref={containerRef} className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8" style={{ background: 'transparent' }}>
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Resources
        </button>

        {showBookingForm ? (
          <div className="max-w-xl mx-auto">
            <BookingForm
              resource={resource}
              onSubmit={(data) => console.log('Booking submitted:', data)}
              onCancel={() => setShowBookingForm(false)}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="resource-image">
              <div className="relative bg-background-secondary rounded-2xl overflow-hidden h-96 lg:h-full min-h-[400px]">
                <div className="absolute inset-0 flex items-center justify-center text-9xl">
                  {resource.image}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-secondary/60 via-transparent to-transparent" />
                
                {/* Status overlay */}
                <div className="absolute top-4 right-4">
                  <StatusBadge status={resource.status} />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="resource-content space-y-6">
              {/* Category & Status */}
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(resource.category)}`}>
                  {resource.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-white">
                {resource.name}
              </h1>

              {/* Description */}
              <p className="text-slate-400 text-lg leading-relaxed">
                {resource.description}
              </p>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background-secondary/50 rounded-xl p-4 flex items-center gap-3">
                  <MapPin className="text-accent-purple" size={24} />
                  <div>
                    <p className="text-slate-500 text-sm">Location</p>
                    <p className="text-white font-medium">{resource.location}</p>
                  </div>
                </div>
                <div className="bg-background-secondary/50 rounded-xl p-4 flex items-center gap-3">
                  <Users className="text-accent-blue" size={24} />
                  <div>
                    <p className="text-slate-500 text-sm">Capacity</p>
                    <p className="text-white font-medium">{resource.capacity} people</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-background-secondary/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {resource.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item flex items-center gap-2 text-slate-300">
                      <Check size={16} className="text-emerald-400" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <Button
                onClick={() => setShowBookingForm(true)}
                className="w-full py-4 text-lg mt-4"
              >
                <Calendar size={20} />
                Book This Resource
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceDetails;

