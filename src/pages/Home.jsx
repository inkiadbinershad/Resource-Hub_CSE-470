import React from 'react';
import Hero from '../components/Hero';
import ResourceCard from '../components/ResourceCard';
import { resources } from '../data/mockData';

const Home = () => {
  const featuredResources = resources.slice(0, 4);

  return (
    <div style={{ background: 'transparent' }}>
      <Hero />
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-[0.35em] text-accent-purple mb-3">Featured resources</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Browse popular resources on the home page</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mt-4">
              Check out some of our top-picked resources and reserve what you need in seconds.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {featuredResources.map((resource, index) => (
              <ResourceCard key={resource.id} resource={resource} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

