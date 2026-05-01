import React, { useState, useEffect, useRef } from 'react';
import { useBookings } from '../context/BookingContext';
import BookingHistory from '../components/BookingHistory';
import { TableRowSkeleton } from '../components/Skeleton';
import gsap from 'gsap';

const BookingHistoryPage = () => {
  const { bookings, cancelBooking } = useBookings();
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const containerRef = useRef(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Filter bookings
  const filteredBookings = filter === 'All' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  useEffect(() => {
    if (!isLoading) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [isLoading, filter]);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8" style={{ background: 'transparent' }}>
      <div ref={containerRef} className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Booking <span className="gradient-text">History</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            View and manage all your resource bookings in one place
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {['All', 'Confirmed', 'Pending', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                filter === status
                  ? 'bg-gradient-to-r from-accent-purple to-accent-blue text-white shadow-lg shadow-purple-500/25'
                  : 'bg-background-secondary/50 text-slate-400 hover:text-white hover:bg-slate-700/50 border border-slate-700/50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-slate-400 mb-6">
          Showing {filteredBookings.length} of {bookings.length} bookings
        </p>

        {/* Booking History Table */}
        {isLoading ? (
          <div className="glass rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-4 px-6 text-slate-400 font-semibold text-sm uppercase">Resource</th>
                  <th className="text-left py-4 px-6 text-slate-400 font-semibold text-sm uppercase">Date</th>
                  <th className="text-left py-4 px-6 text-slate-400 font-semibold text-sm uppercase">Time</th>
                  <th className="text-left py-4 px-6 text-slate-400 font-semibold text-sm uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRowSkeleton key={i} />
                ))}
              </tbody>
            </table>
          </div>
        ) : filteredBookings.length > 0 ? (
<BookingHistory bookings={filteredBookings} onCancel={cancelBooking} />
        ) : (
          <div className="text-center py-12 glass rounded-2xl">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-white mb-2">No bookings found</h3>
            <p className="text-slate-400">
              {filter !== 'All' ? `No ${filter.toLowerCase()} bookings yet` : 'Start by booking a resource'}
            </p>
          </div>
        )}

        {/* Summary Cards */}
        {!isLoading && bookings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-background-secondary/30 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                {bookings.filter(b => b.status === 'Confirmed').length}
              </div>
              <div className="text-slate-400">Confirmed Bookings</div>
            </div>
            <div className="bg-background-secondary/30 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">
                {bookings.filter(b => b.status === 'Pending').length}
              </div>
              <div className="text-slate-400">Pending Bookings</div>
            </div>
            <div className="bg-background-secondary/30 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">
                {bookings.filter(b => b.status === 'Cancelled').length}
              </div>
              <div className="text-slate-400">Cancelled Bookings</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistoryPage;

