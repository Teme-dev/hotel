import React, { useState } from 'react';
import { Plus, Edit, Trash2, Star, Clock } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { MenuItem } from '../../types';

export function MenuManagement() {
  const { state, dispatch } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    isRecommended: false,
    isSpecial: false,
    available: true,
    prepTime: 15,
  });

  const handleSave = () => {
    if (!formData.name || !formData.description || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    const menuItem: MenuItem = {
      ...formData as MenuItem,
      id: editingItem?.id || Date.now().toString(),
    };

    if (editingItem) {
      dispatch({ type: 'UPDATE_MENU_ITEM', payload: menuItem });
    } else {
      dispatch({ type: 'ADD_MENU_ITEM', payload: menuItem });
    }

    resetForm();
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = (itemId: string) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      dispatch({ type: 'DELETE_MENU_ITEM', payload: itemId });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '',
      image: '',
      isRecommended: false,
      isSpecial: false,
      available: true,
      prepTime: 15,
    });
    setEditingItem(null);
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Menu Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Menu Item</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-amber-500"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-amber-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {state.categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prep Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.prepTime || ''}
                    onChange={(e) => setFormData({ ...formData, prepTime: parseInt(e.target.value) || 15 })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-amber-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isRecommended || false}
                    onChange={(e) => setFormData({ ...formData, isRecommended: e.target.checked })}
                    className="mr-2"
                  />
                  Recommended
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isSpecial || false}
                    onChange={(e) => setFormData({ ...formData, isSpecial: e.target.checked })}
                    className="mr-2"
                  />
                  Chef's Special
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.available !== false}
                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                    className="mr-2"
                  />
                  Available
                </label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex space-x-3">
              <button
                onClick={resetForm}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                {editingItem ? 'Update' : 'Add'} Item
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {state.menuItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No menu items yet</p>
            <p className="text-gray-400">Add your first menu item to get started</p>
          </div>
        ) : (
          state.menuItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={item.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        {item.name}
                        {item.isRecommended && (
                          <Star className="h-4 w-4 text-amber-500 ml-2" />
                        )}
                        {item.isSpecial && (
                          <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                            Special
                          </span>
                        )}
                        {!item.available && (
                          <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                            Unavailable
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-amber-600">${item.price}</p>
                      <p className="text-gray-500 text-sm flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.prepTime}m
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Category: {state.categories.find(c => c.id === item.category)?.name || 'Unknown'}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}