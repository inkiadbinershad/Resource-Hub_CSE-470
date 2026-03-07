import React from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

const StatusBadge = ({ status, size = 'default' }) => {
  const getStatusConfig = () => {
    switch (status.toLowerCase()) {
      case 'available':
      case 'confirmed':
        return {
          bg: 'bg-emerald-500/20',
          text: 'text-emerald-400',
          border: 'border-emerald-500/30',
          icon: CheckCircle,
          pulse: true
        };
      case 'booked':
      case 'pending':
        return {
          bg: 'bg-amber-500/20',
          text: 'text-amber-400',
          border: 'border-amber-500/30',
          icon: Clock,
          pulse: true
        };
      case 'maintenance':
      case 'cancelled':
        return {
          bg: 'bg-red-500/20',
          text: 'text-red-400',
          border: 'border-red-500/30',
          icon: XCircle,
          pulse: false
        };
      default:
        return {
          bg: 'bg-slate-500/20',
          text: 'text-slate-400',
          border: 'border-slate-500/30',
          icon: AlertCircle,
          pulse: false
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;
  
  const sizeClasses = size === 'small' 
    ? 'px-2 py-1 text-xs gap-1' 
    : 'px-3 py-1.5 text-sm gap-1.5';

  return (
    <span className={`
      inline-flex items-center ${sizeClasses} 
      ${config.bg} ${config.text} ${config.border}
      border rounded-full font-medium
      ${config.pulse ? 'status-pulse' : ''}
    `}>
      <Icon size={size === 'small' ? 12 : 16} />
      {status}
    </span>
  );
};

export default StatusBadge;

