import React, { useState, useEffect, useRef, useCallback } from 'react';
import { categories } from '../data/mockData';
import SearchBar from '../components/SearchBar';
import FilterButtons from '../components/FilterButtons';
import ResourceCard from '../components/ResourceCard';
import { ResourceCardSkeleton } from '../components/Skeleton';
import { getResources } from '../services/api';
import gsap from 'gsap';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredResources, setFilteredResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const debounceRef = useRef(null);
  const totalResourcesCount = useRef(0);

  // Fetch resources from API with debounce
  const fetchResources = useCallback(async (search, category) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getResources(search, category);
      setFilteredResources(data.resources);
      totalResourcesCount.current = data.length;
    } catch (err) {
      setError(err.message || 'Failed to fetch resources');
      setFilteredResources([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchResources('', 'All');
  }, [fetchResources]);

  // Handle search and category changes with debounce
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchResources(searchQuery, activeCategory);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchQuery, activeCategory, fetchResources]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8" style={{ background: 'transparent' }}>
      <div ref={containerRef} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="gradient-text">Resources</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Browse and book from our wide range of available resources
          </p>
        {/* Search and Filter */}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search resources by name..."
          />
          <FilterButtons
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Error State */}
        {error && (
          <div className="col-span-full text-center py-12 mb-6">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Error loading resources</h3>
            <p className="text-slate-400">{error}</p>
          </div>
        )}

        {/* Results Count */}
        {!error && (
          <p className="text-slate-400 mb-6">
            {isLoading 
              ? 'Loading resources...' 
              : `Showing ${filteredResources.length} resources`
            }
          </p>
        )}

        {/* Resource Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 8 }).map((_, index) => (
              <ResourceCardSkeleton key={index} />
            ))
          ) : filteredResources.length > 0 ? (
          filteredResources.map((resource, index) => (
              <div key={resource.id} className="resource-card card">
                <ResourceCard resource={resource} index={index} />
              </div>
            ))
          ) : (
            // Empty state
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No resources found</h3>
              <p className="text-slate-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;
