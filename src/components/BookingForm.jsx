import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import Input from './Input';
import Button from './Button';
import gsap from 'gsap';

const BookingForm = ({ resource, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    resourceName: resource?.name || '',
    date: '',
    startTime: '',
    endTime: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    // Animate success message
    gsap.fromTo('.success-message',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
  };

  if (isSubmitted) {
    return (
      <div className="bg-background-secondary rounded-2xl p-8 text-center">
        <div className="success-message w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Booking Submitted!</h3>
        <p className="text-slate-400 mb-6">
          Your booking for {formData.resourceName} has been submitted for approval.
        </p>
        <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
          <p className="text-slate-300"><span className="text-slate-500">Date:</span> {formData.date}</p>
          <p className="text-slate-300"><span className="text-slate-500">Time:</span> {formData.startTime} - {formData.endTime}</p>
        </div>
        <Button onClick={onCancel} variant="primary">
          Book Another Resource
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="bg-background-secondary rounded-2xl p-8 space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white">Book Resource</h3>
        <p className="text-slate-400 mt-1">Fill in the details to make a reservation</p>
      </div>

      <Input
        label="Resource Name"
        name="resourceName"
        value={formData.resourceName}
        onChange={handleChange}
        placeholder="Select a resource"
        icon={Calendar}
        required
      />

      <Input
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        icon={Calendar}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Start Time"
          name="startTime"
          type="time"
          value={formData.startTime}
          onChange={handleChange}
          icon={Clock}
          required
        />
        <Input
          label="End Time"
          name="endTime"
          type="time"
          value={formData.endTime}
          onChange={handleChange}
          icon={Clock}
          required
        />
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Confirm Booking'}
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;

