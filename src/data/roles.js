/**
 * Role Definitions & Permissions for Ananta Vijaya
 * Three strictly enforced roles:
 * 1. SUPER_ADMIN: Full unrestricted administrative authority
 * 2. MANAGER: Store operations, order fulfillment & inventory control
 * 3. USER: Customer purchasing, order history & account management
 */

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  MANAGER: 'manager',
  USER: 'user',
};

export const ROLE_LABELS = {
  [ROLES.SUPER_ADMIN]: 'Super Admin',
  [ROLES.MANAGER]: 'Manager',
  [ROLES.USER]: 'User',
};

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: {
    canManageRoles: true,
    canViewAnalytics: true,
    canManageInventory: true,
    canManageOrders: true,
    canViewAllOrders: true,
    canConfigureGateways: true,
    canDeleteUsers: true,
    description: 'Complete unrestricted control over system, revenue analytics, role assignment, and inventory.',
  },
  [ROLES.MANAGER]: {
    canManageRoles: false,
    canViewAnalytics: false,
    canManageInventory: true,
    canManageOrders: true,
    canViewAllOrders: true,
    canConfigureGateways: false,
    canDeleteUsers: false,
    description: 'Operational control over order fulfillment, dispatch status, inventory stock, and customer queries.',
  },
  [ROLES.USER]: {
    canManageRoles: false,
    canViewAnalytics: false,
    canManageInventory: false,
    canManageOrders: false,
    canViewAllOrders: false,
    canConfigureGateways: false,
    canDeleteUsers: false,
    description: 'Customer purchasing, personal order history, delivery tracking, and saved addresses.',
  },
};

// Initial Pre-seeded Team & Demo Accounts for Testing
export const INITIAL_USERS = [
  {
    id: 'usr_super_admin_01',
    name: 'Srikanth Varma',
    email: 'superadmin@anantavijaya.com',
    role: ROLES.SUPER_ADMIN,
    phone: '+91 98490 12345',
    createdAt: '2026-10-01',
    status: 'Active',
  },
  {
    id: 'usr_manager_01',
    name: 'Pooja Reddy',
    email: 'manager@anantavijaya.com',
    role: ROLES.MANAGER,
    phone: '+91 98490 67890',
    createdAt: '2026-10-15',
    status: 'Active',
  },
  {
    id: 'usr_customer_01',
    name: 'Ananya Sharma',
    email: 'ananya@example.com',
    role: ROLES.USER,
    phone: '+91 98765 43210',
    createdAt: '2026-11-01',
    status: 'Active',
  },
];

// Initial Pre-seeded Orders for Dashboard
export const INITIAL_ORDERS = [
  {
    id: 'ORD-7821',
    paymentId: 'pay_Pq7a892bK109',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya@example.com',
    customerPhone: '+91 98765 43210',
    shippingAddress: 'Flat 402, Lotus Residency, HITEC City, Hyderabad, Telangana - 500081',
    items: [
      { id: 'kamalam', title: 'Kamalam Soap (100g)', quantity: 2, price: '₹150' },
      { id: 'vibhudi', title: 'Vibhudi Soap (100g)', quantity: 1, price: '₹150' },
    ],
    amount: 450,
    status: 'Delivered',
    date: '2026-11-10 14:32',
    trackingNumber: 'DEL-HYD-99120',
  },
  {
    id: 'ORD-7822',
    paymentId: 'pay_Pq9c118xM224',
    customerName: 'Vikram Joshi',
    customerEmail: 'vikram.j@gmail.com',
    customerPhone: '+91 94401 22334',
    shippingAddress: 'Plot 18, Road No. 12, Banjara Hills, Hyderabad, Telangana - 500034',
    items: [
      { id: 'divine-collection-box', title: 'The Divine Collection - 5 Soap Gift Box', quantity: 1, price: '₹699' },
    ],
    amount: 699,
    status: 'Dispatched',
    date: '2026-11-12 11:15',
    trackingNumber: 'BLUEDART-554109',
  },
  {
    id: 'ORD-7823',
    paymentId: 'pay_Pq9f881zK902',
    customerName: 'Radha Sundaram',
    customerEmail: 'radha.sundaram@outlook.com',
    customerPhone: '+91 98850 99887',
    shippingAddress: '14/2 Temple Road, T. Nagar, Chennai, Tamil Nadu - 600017',
    items: [
      { id: 'bilvam', title: 'Bilvam Soap (100g)', quantity: 2, price: '₹150' },
      { id: 'rudraksha', title: 'Rudraksha Soap (100g)', quantity: 2, price: '₹150' },
    ],
    amount: 600,
    status: 'Processing',
    date: '2026-11-13 09:40',
    trackingNumber: null,
  },
];

// Initial Soap Inventory Tracking
export const INITIAL_INVENTORY = [
  { id: 'vibhudi', name: 'Vibhudi Soap (100g)', stock: 120, lowStockThreshold: 25, price: 150 },
  { id: 'rudraksha', name: 'Rudraksha Soap (100g)', stock: 95, lowStockThreshold: 20, price: 150 },
  { id: 'bilvam', name: 'Bilvam Soap (100g)', stock: 140, lowStockThreshold: 30, price: 150 },
  { id: 'kamalam', name: 'Kamalam Soap (100g)', stock: 180, lowStockThreshold: 35, price: 150 },
  { id: 'kadamba', name: 'Kadamba Soap (100g)', stock: 85, lowStockThreshold: 20, price: 150 },
  { id: 'divine-collection-box', name: 'The Divine Collection Gift Box', stock: 65, lowStockThreshold: 15, price: 699 },
];

