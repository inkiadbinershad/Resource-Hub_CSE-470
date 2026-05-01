import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getMyBookings, createBooking as apiCreateBooking, cancelBooking as apiCancelBooking } from '../services/api';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  // Fetch bookings from the backend
  const fetchBookings = async () => {
    if (!token) return;
    
    setIsLoading(true);
    setError(null);
    try {
const data = await getMyBookings(token);
setBookings(data.bookings);
    } catch (err) {
      setError(err.message || 'Failed to fetch bookings');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fetch bookings when token is available
  useEffect(() => {
    if (token) {
      fetchBookings();
    }
  }, [token]);

  // Add a new booking and re-fetch
  const addBooking = async (resource_id, resource_name, date, start_time, end_time) => {
    if (!token) {
      setError('You must be logged in to create a booking');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await apiCreateBooking(resource_id, resource_name, date, start_time, end_time, token);
      await fetchBookings();
    } catch (err) {
      setError(err.message || 'Failed to create booking');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel a booking and re-fetch
  const cancelBooking = async (id) => {
    if (!token) {
      setError('You must be logged in to cancel a booking');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await apiCancelBooking(id, token);
      await fetchBookings();
    } catch (err) {
      setError(err.message || 'Failed to cancel booking');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BookingContext.Provider value={{ 
      bookings, 
      addBooking, 
      cancelBooking, 
      fetchBookings,
      isLoading, 
      error 
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => useContext(BookingContext);
