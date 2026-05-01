import React, { createContext, useContext, useState } from 'react';
import { bookings as initialBookings } from '../data/mockData';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState(initialBookings);

  const addBooking = (booking) => {
    setBookings(prev => [booking, ...prev]);
  };

  const cancelBooking = (id) => {
    setBookings(prev =>
      prev.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b)
    );
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => useContext(BookingContext);
