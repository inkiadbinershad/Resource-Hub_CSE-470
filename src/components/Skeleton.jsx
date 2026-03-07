import React from 'react';

const Skeleton = ({ className = '', variant = 'rect' }) => {
  const baseClasses = 'skeleton';
  
  const variants = {
    rect: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded h-4',
    card: 'rounded-xl'
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} />
  );
};

export const ResourceCardSkeleton = () => {
  return (
    <div className="bg-background-secondary rounded-xl p-6 space-y-4">
      <Skeleton variant="rect" className="w-full h-40" />
      <Skeleton variant="text" className="w-3/4 h-6" />
      <Skeleton variant="text" className="w-1/2 h-4" />
      <div className="flex gap-2">
        <Skeleton variant="text" className="w-20 h-6" />
        <Skeleton variant="text" className="w-24 h-6" />
      </div>
      <Skeleton variant="rect" className="w-full h-12" />
    </div>
  );
};

export const TableRowSkeleton = () => {
  return (
    <tr className="border-b border-slate-700/50">
      <td className="py-4 px-4"><Skeleton variant="text" className="w-32" /></td>
      <td className="py-4 px-4"><Skeleton variant="text" className="w-24" /></td>
      <td className="py-4 px-4"><Skeleton variant="text" className="w-20" /></td>
      <td className="py-4 px-4"><Skeleton variant="text" className="w-20" /></td>
    </tr>
  );
};

export default Skeleton;

