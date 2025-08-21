import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { MenuItem, Category, CartItem, Order, Admin } from '../types';

interface AppState {
  menuItems: MenuItem[];
  categories: Category[];
  cartItems: CartItem[];
  orders: Order[];
  currentAdmin: Admin | null;
  isAdminMode: boolean;
}

type AppAction =
  | { type: 'LOGIN_ADMIN'; payload: Admin }
  | { type: 'LOGOUT_ADMIN' }
  | { type: 'ADD_MENU_ITEM'; payload: MenuItem }
  | { type: 'UPDATE_MENU_ITEM'; payload: MenuItem }
  | { type: 'DELETE_MENU_ITEM'; payload: string }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'UPDATE_CATEGORY'; payload: Category }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'ADD_TO_CART'; payload: { item: MenuItem; quantity: number; notes?: string } }
  | { type: 'UPDATE_CART_ITEM'; payload: { id: string; quantity: number; notes?: string } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'PLACE_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { id: string; status: Order['status'] } }
  | { type: 'LOAD_DATA'; payload: Partial<AppState> };

const initialState: AppState = {
  menuItems: [],
  categories: [],
  cartItems: [],
  orders: [],
  currentAdmin: null,
  isAdminMode: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN_ADMIN':
      return {
        ...state,
        currentAdmin: action.payload,
        isAdminMode: true,
      };
    case 'LOGOUT_ADMIN':
      return {
        ...state,
        currentAdmin: null,
        isAdminMode: false,
      };
    case 'ADD_MENU_ITEM':
      return {
        ...state,
        menuItems: [...state.menuItems, action.payload],
      };
    case 'UPDATE_MENU_ITEM':
      return {
        ...state,
        menuItems: state.menuItems.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case 'DELETE_MENU_ITEM':
      return {
        ...state,
        menuItems: state.menuItems.filter(item => item.id !== action.payload),
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(cat =>
          cat.id === action.payload.id ? action.payload : cat
        ),
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(cat => cat.id !== action.payload),
      };
    case 'ADD_TO_CART':
      const existingItem = state.cartItems.find(item => item.id === action.payload.item.id);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.item.id
              ? { ...item, quantity: item.quantity + action.payload.quantity, notes: action.payload.notes }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { 
          ...action.payload.item, 
          quantity: action.payload.quantity, 
          notes: action.payload.notes 
        }],
      };
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity, notes: action.payload.notes }
            : item
        ),
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
      };
    case 'PLACE_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
        cartItems: [],
      };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id
            ? { ...order, status: action.payload.status }
            : order
        ),
      };
    case 'LOAD_DATA':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}