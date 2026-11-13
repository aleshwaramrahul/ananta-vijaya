import { ROLES, INITIAL_USERS, INITIAL_ORDERS, INITIAL_INVENTORY } from '../data/roles';

const STORAGE_KEYS = {
  CURRENT_USER: 'av_current_user',
  USERS_LIST: 'av_users_list',
  ORDERS_LIST: 'av_orders_list',
  INVENTORY_LIST: 'av_inventory_list',
};

// Safe localStorage Helpers
const getItem = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const setItem = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to save ${key} to localStorage`, e);
  }
};

// Initialize default data if not present
export const initializeAuthStore = () => {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(STORAGE_KEYS.USERS_LIST)) {
    setItem(STORAGE_KEYS.USERS_LIST, INITIAL_USERS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ORDERS_LIST)) {
    setItem(STORAGE_KEYS.ORDERS_LIST, INITIAL_ORDERS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.INVENTORY_LIST)) {
    setItem(STORAGE_KEYS.INVENTORY_LIST, INITIAL_INVENTORY);
  }
};

// Get Currently Logged In User
export const getCurrentUser = () => {
  return getItem(STORAGE_KEYS.CURRENT_USER, null);
};

// Login with email (or demo role selection)
export const loginUser = (email, password) => {
  initializeAuthStore();
  const users = getItem(STORAGE_KEYS.USERS_LIST, INITIAL_USERS);
  const found = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());

  if (found) {
    setItem(STORAGE_KEYS.CURRENT_USER, found);
    return { success: true, user: found };
  }

  // If new email, automatically create as USER role
  const newUser = {
    id: `usr_${Date.now()}`,
    name: email.split('@')[0],
    email: email.trim().toLowerCase(),
    role: ROLES.USER,
    phone: '',
    createdAt: new Date().toISOString().slice(0, 10),
    status: 'Active',
  };

  const updatedUsers = [newUser, ...users];
  setItem(STORAGE_KEYS.USERS_LIST, updatedUsers);
  setItem(STORAGE_KEYS.CURRENT_USER, newUser);
  return { success: true, user: newUser };
};

// Quick 1-Click Demo Login for Testing Roles
export const loginAsDemoRole = (role) => {
  initializeAuthStore();
  const users = getItem(STORAGE_KEYS.USERS_LIST, INITIAL_USERS);
  const targetUser = users.find((u) => u.role === role) || INITIAL_USERS.find((u) => u.role === role);

  if (targetUser) {
    setItem(STORAGE_KEYS.CURRENT_USER, targetUser);
    return targetUser;
  }
  return null;
};

// Logout
export const logoutUser = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

// Get All Users (Super Admin only)
export const getAllUsers = () => {
  return getItem(STORAGE_KEYS.USERS_LIST, INITIAL_USERS);
};

// Update User Role (Super Admin only can assign SUPER_ADMIN, MANAGER, USER)
export const updateUserRole = (userId, newRole) => {
  if (![ROLES.SUPER_ADMIN, ROLES.MANAGER, ROLES.USER].includes(newRole)) {
    return { success: false, error: 'Invalid role specified.' };
  }

  const users = getItem(STORAGE_KEYS.USERS_LIST, INITIAL_USERS);
  const updated = users.map((u) => (u.id === userId ? { ...u, role: newRole } : u));
  setItem(STORAGE_KEYS.USERS_LIST, updated);

  // If currently logged in user was modified, update session
  const current = getCurrentUser();
  if (current && current.id === userId) {
    setItem(STORAGE_KEYS.CURRENT_USER, { ...current, role: newRole });
  }

  return { success: true, users: updated };
};

// Delete User (Super Admin only)
export const deleteUser = (userId) => {
  const users = getItem(STORAGE_KEYS.USERS_LIST, INITIAL_USERS);
  const updated = users.filter((u) => u.id !== userId);
  setItem(STORAGE_KEYS.USERS_LIST, updated);
  return { success: true, users: updated };
};

// Get Orders List
export const getAllOrders = () => {
  return getItem(STORAGE_KEYS.ORDERS_LIST, INITIAL_ORDERS);
};

// Add New Order from Razorpay Checkout
export const saveNewOrder = (orderData) => {
  initializeAuthStore();
  const orders = getItem(STORAGE_KEYS.ORDERS_LIST, INITIAL_ORDERS);
  const newOrder = {
    id: orderData.orderId || `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    paymentId: orderData.paymentId,
    customerName: orderData.customer?.name || 'Customer',
    customerEmail: orderData.customer?.email || '',
    customerPhone: orderData.customer?.phone || '',
    shippingAddress: orderData.customer?.address
      ? `${orderData.customer.address}, ${orderData.customer.city}, ${orderData.customer.state} - ${orderData.customer.pincode}`
      : 'Address provided at checkout',
    items: orderData.cartItems || [],
    amount: orderData.amount,
    status: 'Processing',
    date: new Date().toISOString().replace('T', ' ').slice(0, 16),
    trackingNumber: null,
  };

  const updatedOrders = [newOrder, ...orders];
  setItem(STORAGE_KEYS.ORDERS_LIST, updatedOrders);
  return newOrder;
};

// Update Order Status (Super Admin & Manager)
export const updateOrderStatus = (orderId, newStatus, trackingNumber = null) => {
  const orders = getItem(STORAGE_KEYS.ORDERS_LIST, INITIAL_ORDERS);
  const updated = orders.map((o) => {
    if (o.id === orderId) {
      return {
        ...o,
        status: newStatus,
        ...(trackingNumber ? { trackingNumber } : {}),
      };
    }
    return o;
  });
  setItem(STORAGE_KEYS.ORDERS_LIST, updated);
  return { success: true, orders: updated };
};

// Get Inventory (Super Admin & Manager)
export const getInventory = () => {
  return getItem(STORAGE_KEYS.INVENTORY_LIST, INITIAL_INVENTORY);
};

// Update Inventory Stock (Super Admin & Manager)
export const updateInventoryStock = (productId, newStock) => {
  const inventory = getItem(STORAGE_KEYS.INVENTORY_LIST, INITIAL_INVENTORY);
  const updated = inventory.map((item) =>
    item.id === productId ? { ...item, stock: Math.max(0, parseInt(newStock, 10) || 0) } : item
  );
  setItem(STORAGE_KEYS.INVENTORY_LIST, updated);
  return { success: true, inventory: updated };
};

