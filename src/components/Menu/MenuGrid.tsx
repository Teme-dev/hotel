import React from 'react';
import { MenuCard } from './MenuCard';
import { MenuItem } from '../../types';

interface MenuGridProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem, quantity: number, notes?: string) => void;
}

export function MenuGrid({ items, onAddToCart }: MenuGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No items found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <MenuCard
          key={item.id}
          item={item}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}