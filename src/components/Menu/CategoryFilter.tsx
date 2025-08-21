import React from 'react';
import { Category } from '../../types';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-6 py-2 rounded-full font-medium transition-all ${
          activeCategory === null
            ? 'bg-amber-600 text-white shadow-lg'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
        }`}
      >
        All Items
      </button>
      {categories
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeCategory === category.id
                ? 'bg-amber-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
    </div>
  );
}