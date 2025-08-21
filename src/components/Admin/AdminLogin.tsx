import React, { useState } from 'react';
import { Lock, User, X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { loadAdmins } from '../../utils/storage';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminLogin({ isOpen, onClose }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useApp();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const admins = loadAdmins();
    const admin = admins.find(a => a.username === username && a.password === password);

    if (admin) {
      dispatch({ type: 'LOGIN_ADMIN', payload: admin });
      setUsername('');
      setPassword('');
      onClose();
    } else {
      setError('Invalid username or password');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full m-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Lock className="h-6 w-6 mr-2" />
              Admin Login
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 inline mr-1" />
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Lock className="h-4 w-4 inline mr-1" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Login
            </button>
            
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <p className="font-medium mb-1">Demo Credentials:</p>
              <p>Username: <code className="bg-white px-1 rounded">admin</code> Password: <code className="bg-white px-1 rounded">admin123</code></p>
              <p>Username: <code className="bg-white px-1 rounded">chef</code> Password: <code className="bg-white px-1 rounded">chef123</code></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}