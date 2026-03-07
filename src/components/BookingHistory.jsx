import React, { useEffect, useRef } from 'react';
import StatusBadge from './StatusBadge';
import { Clock } from 'lucide-react';
import gsap from 'gsap';

const BookingHistory = ({ bookings }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(tableRef.current.querySelectorAll('.table-row'),
      { opacity: 0, x: -20 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.4, 
        stagger: 0.08,
        delay: 0.3,
        ease: 'power3.out'
      }
    );
  }, [bookings]);

  return (
    <div ref={tableRef} className="glass rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left py-4 px-6 text-slate-400 font-semibold text-sm uppercase tracking-wider">
                Resource Name
              </th>
              <th className="text-left py-4 px-6 text-slate-400 font-semibold text-sm uppercase tracking-wider">
                Date
              </th>
              <th className="text-left py-4 px-6 text-slate-400 font-semibold text-sm uppercase tracking-wider">
                Time Slot
              </th>
              <th className="text-left py-4 px-6 text-slate-400 font-semibold text-sm uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr 
                key={booking.id} 
                className="table-row border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors duration-200"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 flex items-center justify-center">
                      <span className="text-lg">📦</span>
                    </div>
                    <span className="text-white font-medium">{booking.resourceName}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span>{booking.date}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock size={16} className="text-slate-500" />
                    <span>{booking.startTime} - {booking.endTime}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <StatusBadge status={booking.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingHistory;

