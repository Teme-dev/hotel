import React from 'react';
import { Clock, MapPin, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Order } from '../../types';

export function OrderManagement() {
  const { state, dispatch } = useApp();

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id: orderId, status } });
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const activeOrders = state.orders.filter(order => order.status !== 'completed');
  const completedOrders = state.orders.filter(order => order.status === 'completed');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Management</h2>

      {activeOrders.length === 0 && completedOrders.length === 0 ? (
        <div className="text-center py-12">
          <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No orders yet</p>
          <p className="text-gray-400">Orders will appear here when customers place them</p>
        </div>
      ) : (
        <div className="space-y-8">
          {activeOrders.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Active Orders ({activeOrders.length})
              </h3>
              <div className="grid gap-6">
                {activeOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">Order #{order.id}</h4>
                        <p className="text-gray-600 text-sm">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        {order.customerInfo.tableNumber && (
                          <p className="flex items-center text-gray-700">
                            <MapPin className="h-4 w-4 mr-2" />
                            Table: {order.customerInfo.tableNumber}
                          </p>
                        )}
                        {order.customerInfo.roomNumber && (
                          <p className="flex items-center text-gray-700">
                            <MapPin className="h-4 w-4 mr-2" />
                            Room: {order.customerInfo.roomNumber}
                          </p>
                        )}
                        {order.customerInfo.contactInfo && (
                          <p className="flex items-center text-gray-700">
                            <Phone className="h-4 w-4 mr-2" />
                            Contact: {order.customerInfo.contactInfo}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-gray-700">Estimated time: {order.estimatedTime} min</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-medium text-gray-900 mb-2">Items:</h5>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={`${item.id}-${order.id}`} className="flex justify-between items-center text-sm">
                            <span>{item.quantity}x {item.name}</span>
                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            {item.notes && (
                              <span className="text-gray-600 italic ml-2">({item.notes})</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Start Preparing
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Mark Ready
                        </button>
                      )}
                      {order.status === 'ready' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Complete Order
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {completedOrders.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Completed Orders ({completedOrders.length})
              </h3>
              <div className="grid gap-4">
                {completedOrders.slice(-5).map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">Order #{order.id}</h4>
                        <p className="text-gray-600 text-sm">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                        <span className="text-gray-600 text-sm">Completed</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}