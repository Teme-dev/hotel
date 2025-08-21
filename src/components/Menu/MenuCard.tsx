import React, { useState } from 'react';
import { Plus, Star, Clock } from 'lucide-react';
import { MenuItem } from '../../types';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity: number, notes?: string) => void;
}

export function MenuCard({ item, onAddToCart }: MenuCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(item, quantity, notes || undefined);
    setQuantity(1);
    setNotes('');
    setShowDetails(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {item.isRecommended && (
            <span className="bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <Star className="h-3 w-3 mr-1" />
              Recommended
            </span>
          )}
          {item.isSpecial && (
            <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              Chef's Special
            </span>
          )}
        </div>
        {!item.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Currently Unavailable</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
          <span className="text-2xl font-bold text-amber-600">${item.price}</span>
        </div>
        
        <p className="text-gray-600 mb-4">{item.description}</p>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span>{item.prepTime} min prep time</span>
        </div>

        {item.available && (
          <div>
            {!showDetails ? (
              <button
                onClick={() => setShowDetails(true)}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Notes:
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requests or dietary restrictions..."
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    rows={2}
                  />
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Add ${(item.price * quantity).toFixed(2)}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}