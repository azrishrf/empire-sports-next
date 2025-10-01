"use client";

interface CollectionsToolbarProps {
  filteredProductsCount: number;
  showItems: number;
  sortBy: string;
  onShowItemsChange: (value: number) => void;
  onSortByChange: (value: string) => void;
}

export default function CollectionsToolbar({
  filteredProductsCount,
  showItems,
  sortBy,
  onShowItemsChange,
  onSortByChange,
}: CollectionsToolbarProps) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <p className="text-xs text-gray-600">
        Showing 1-{Math.min(showItems, filteredProductsCount)} of {filteredProductsCount} results
      </p>

      <div className="flex items-center gap-4">
        {/* Items per page */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Show</span>
          <select
            value={showItems}
            onChange={(e) => onShowItemsChange(parseInt(e.target.value))}
            className="rounded border border-gray-300 px-2 py-1 text-xs"
          >
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={60}>60</option>
          </select>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Default sorting</span>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="rounded border border-gray-300 px-2 py-1 text-xs"
          >
            <option value="default">Default sorting</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}
