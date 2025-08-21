import React from 'react';
import { ShoppingCart, User, Utensils } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface HeaderProps {
  onCartClick: () => void;
  onAdminClick: () => void;
}

export function Header({ onCartClick, onAdminClick }: HeaderProps) {
  const { state } = useApp();
  const cartItemsCount = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Utensils className="h-8 w-8 text-amber-600" />
            <h1 className="text-2xl font-bold text-gray-900">Grand Hotel</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {!state.isAdminMode && (
              <button
                onClick={onCartClick}
                className="relative p-2 text-gray-700 hover:text-amber-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            )}
            
            <button
              onClick={onAdminClick}
              className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-amber-600 transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">
                {state.currentAdmin ? `Welcome, ${state.currentAdmin.name}` : 'Admin'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}