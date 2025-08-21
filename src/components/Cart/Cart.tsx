import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, MapPin, Phone } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Order } from '../../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  const { state, dispatch } = useApp();
  const [customerInfo, setCustomerInfo] = useState({
    tableNumber: '',
    roomNumber: '',
    contactInfo: '',
  });
  const [showOrderForm, setShowOrderForm] = useState(false);

  const total = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalPrepTime = Math.max(...state.cartItems.map(item => item.prepTime));

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    } else {
      dispatch({ type: 'UPDATE_CART_ITEM', payload: { id: itemId, quantity: newQuantity } });
    }
  };

  const placeOrder = () => {
    if (state.cartItems.length === 0) return;

    const order: Order = {
      id: Date.now().toString(),
      items: [...state.cartItems],
      total,
      customerInfo,
      status: 'pending',
      createdAt: new Date(),
      estimatedTime: totalPrepTime,
    };

    dispatch({ type: 'PLACE_ORDER', payload: order });
    setCustomerInfo({ tableNumber: '', roomNumber: '', contactInfo: '' });
    setShowOrderForm(false);
    onClose();
    
    // Show success message
    alert('Order placed successfully! You will receive updates on the status.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full m-4 max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <ShoppingBag className="h-6 w-6 mr-2" />
              Your Order
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {state.cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <p className="text-gray-400">Add some delicious items from our menu!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-gray-600 text-sm">${item.price.toFixed(2)} each</p>
                    {item.notes && (
                      <p className="text-gray-500 text-xs mt-1">Note: {item.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {state.cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">Total: ${total.toFixed(2)}</span>
              <span className="text-gray-500">Est. {totalPrepTime} min</span>
            </div>

            {!showOrderForm ? (
              <button
                onClick={() => setShowOrderForm(true)}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Proceed to Order
              </button>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Table Number
                    </label>
                    <input
                      type="text"
                      value={customerInfo.tableNumber}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, tableNumber: e.target.value })}
                      placeholder="e.g., Table 12"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Room Number
                    </label>
                    <input
                      type="text"
                      value={customerInfo.roomNumber}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, roomNumber: e.target.value })}
                      placeholder="e.g., Room 305"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Contact Information
                  </label>
                  <input
                    type="text"
                    value={customerInfo.contactInfo}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, contactInfo: e.target.value })}
                    placeholder="Phone number or room extension"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowOrderForm(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={placeOrder}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    Place Order
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