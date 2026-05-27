import React from 'react';
import { SkeletonLine, SkeletonBlock } from './Skeleton';

/**
 * Skeleton loader that matches the exact layout of ProductCard.
 * Mimics: image (aspect-[4/5]), category line, title, description,
 * price row, highlight grid, and delivery row.
 */
const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-borderLight/50 shadow-sm">
      {/* Image placeholder — same aspect ratio as ProductCard */}
      <SkeletonBlock className="aspect-[4/5] rounded-none" />

      {/* Content section — mirrors the real card padding */}
      <div className="p-5 space-y-3">
        {/* Category + gender line */}
        <SkeletonLine width="w-24" height="h-2" />

        {/* Title */}
        <SkeletonLine width="w-3/4" height="h-4" />

        {/* Description (two lines) */}
        <div className="space-y-1.5">
          <SkeletonLine width="w-full" height="h-2.5" />
          <SkeletonLine width="w-2/3" height="h-2.5" />
        </div>

        {/* Price row */}
        <div className="flex items-center gap-3 pt-1">
          <SkeletonLine width="w-20" height="h-5" />
          <SkeletonLine width="w-14" height="h-3" />
        </div>

        {/* Highlights grid (4 items) */}
        <div className="grid grid-cols-2 gap-y-2 pt-3 border-t border-dashed border-borderLight/40">
          <SkeletonLine width="w-20" height="h-2" />
          <SkeletonLine width="w-24" height="h-2" />
          <SkeletonLine width="w-18" height="h-2" />
          <SkeletonLine width="w-16" height="h-2" />
        </div>

        {/* Delivery + Buy Now row */}
        <div className="flex items-center justify-between pt-2">
          <SkeletonLine width="w-24" height="h-5" className="rounded-md" />
          <SkeletonLine width="w-16" height="h-3" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
