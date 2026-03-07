import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from './Button';
import StatCard from './StatCard';
import { Calendar, CheckCircle, Zap } from 'lucide-react';
import { statistics } from '../data/mockData';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.hero-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );

      // Subtitle animation
      gsap.fromTo('.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: 'power3.out' }
      );

      // CTA buttons
      gsap.fromTo('.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.6, ease: 'power3.out' }
      );

      // Floating elements
      gsap.to('.floating-element', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Calendar, label: 'Total Resources', value: statistics.totalResources },
    { icon: CheckCircle, label: 'Total Bookings', value: statistics.totalBookings },
    { icon: Zap, label: 'Available Now', value: statistics.availableNow },
  ];

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-pattern" />
      
      {/* Floating Elements */}
      <div className="absolute top-40 left-10 floating-element opacity-20">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-purple to-accent-blue blur-xl" />
      </div>
      <div className="absolute bottom-40 right-10 floating-element opacity-20">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent-blue to-purple-600 blur-xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="hero-cta inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-sm font-medium mb-8">
            <Sparkles size={16} />
            Modern Resource Management
          </div>

          {/* Main Title */}
          <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Book Your Resources
            <span className="block gradient-text">With Ease</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Streamline your resource allocation with our intuitive booking system. 
            From meeting rooms to equipment, manage everything in one place.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onClick={() => navigate('/resources')}
              className="px-8 py-4 text-lg"
              icon={ArrowRight}
            >
              Browse Resources
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => navigate('/history')}
              className="px-8 py-4 text-lg"
            >
              View History
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={stat.label} className="card">
              <StatCard
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

