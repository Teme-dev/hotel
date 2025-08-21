import { MenuItem, Category, Order, Admin } from '../types';

const STORAGE_KEYS = {
  MENU_ITEMS: 'hotel_menu_items',
  CATEGORIES: 'hotel_categories',
  ORDERS: 'hotel_orders',
  ADMINS: 'hotel_admins',
};

export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to storage:', error);
  }
}

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error('Failed to load from storage:', error);
    return defaultValue;
  }
}

export function saveMenuItems(items: MenuItem[]): void {
  saveToStorage(STORAGE_KEYS.MENU_ITEMS, items);
}

export function loadMenuItems(): MenuItem[] {
  return loadFromStorage<MenuItem[]>(STORAGE_KEYS.MENU_ITEMS, []);
}

export function saveCategories(categories: Category[]): void {
  saveToStorage(STORAGE_KEYS.CATEGORIES, categories);
}

export function loadCategories(): Category[] {
  return loadFromStorage<Category[]>(STORAGE_KEYS.CATEGORIES, []);
}

export function saveOrders(orders: Order[]): void {
  saveToStorage(STORAGE_KEYS.ORDERS, orders);
}

export function loadOrders(): Order[] {
  return loadFromStorage<Order[]>(STORAGE_KEYS.ORDERS, []);
}

export function saveAdmins(admins: Admin[]): void {
  saveToStorage(STORAGE_KEYS.ADMINS, admins);
}

export function loadAdmins(): Admin[] {
  return loadFromStorage<Admin[]>(STORAGE_KEYS.ADMINS, []);
}