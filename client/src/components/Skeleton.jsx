import React from 'react';

/**
 * Base skeleton element with a subtle shimmer animation.
 * Uses a gradient sweep instead of plain pulse for a more premium look.
 */
const Skeleton = ({ className = '', rounded = 'rounded-lg', ...props }) => {
  return (
    <div
      className={`skeleton-shimmer ${rounded} ${className}`}
      {...props}
    />
  );
};

/** Circular skeleton (avatar, icon placeholder) */
export const SkeletonCircle = ({ size = 'w-10 h-10', className = '' }) => (
  <Skeleton rounded="rounded-full" className={`${size} shrink-0 ${className}`} />
);

/** Text line skeleton */
export const SkeletonLine = ({ width = 'w-full', height = 'h-3', className = '' }) => (
  <Skeleton rounded="rounded-md" className={`${width} ${height} ${className}`} />
);

/** Block / image placeholder skeleton */
export const SkeletonBlock = ({ className = '' }) => (
  <Skeleton className={`w-full ${className}`} />
);

export default Skeleton;
