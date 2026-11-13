import React, { useState, useEffect } from 'react';
import { ROLES, ROLE_LABELS, ROLE_PERMISSIONS } from '../data/roles';
import {
  getAllUsers,
  updateUserRole,
  getAllOrders,
  updateOrderStatus,
  getInventory,
  updateInventoryStock,
  logoutUser,
} from '../utils/auth';

export default function AdminDashboard({ currentUser, onLogout, onClose, onSwitchRole }) {
  const isSuperAdmin = currentUser?.role === ROLES.SUPER_ADMIN;
  const isManager = currentUser?.role === ROLES.MANAGER;

  // Active Tab: Super Admin gets analytics/team, Manager gets orders/inventory
  const [activeTab, setActiveTab] = useState(isSuperAdmin ? 'analytics' : 'orders');

  // Local State
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [orderFilter, setOrderFilter] = useState('All');
  const [trackingInputs, setTrackingInputs] = useState({});
  const [toast, setToast] = useState('');

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  useEffect(() => {
    setUsers(getAllUsers());
    setOrders(getAllOrders());
    setInventory(getInventory());
  }, []);

  // Handle Role Change (Super Admin Only)
  const handleRoleChange = (userId, newRole) => {
    if (!isSuperAdmin) {
      showNotification('Permission Denied: Only Super Admin can modify roles.');
      return;
    }
    const res = updateUserRole(userId, newRole);
    if (res.success) {
      setUsers(res.users);
      showNotification(`User role successfully updated to ${ROLE_LABELS[newRole]}.`);
    }
  };

  // Handle Order Status Update (Super Admin & Manager)
  const handleStatusChange = (orderId, newStatus) => {
    const tracking = trackingInputs[orderId] || null;
    const res = updateOrderStatus(orderId, newStatus, tracking);
    if (res.success) {
      setOrders(res.orders);
      showNotification(`Order ${orderId} status set to ${newStatus}.`);
    }
  };

  // Handle Inventory Stock Update (Super Admin & Manager)
  const handleStockSave = (productId, newStock) => {
    const res = updateInventoryStock(productId, newStock);
    if (res.success) {
      setInventory(res.inventory);
      showNotification(`Stock count updated for ${productId}.`);
    }
  };

  // Calculate High-Level Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'Processing').length;
  const lowStockCount = inventory.filter((i) => i.stock <= i.lowStockThreshold).length;

  const filteredOrders = orderFilter === 'All'
    ? orders
    : orders.filter((o) => o.status === orderFilter);

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#FFF8F1] max-w-5xl w-full rounded-2xl border-2 border-[#C59A45]/50 shadow-[0_25px_60px_rgba(0,39,29,0.35)] overflow-hidden flex flex-col h-[90vh]">
        
        {/* Top Portal Header */}
        <div className="bg-[#00271d] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#C59A45]/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-md ${
              isSuperAdmin ? 'bg-gradient-to-br from-[#fdcd73] to-[#C59A45] text-[#00271d]' : 'bg-[#7B5802]'
            }`}>
              <span className="material-symbols-outlined text-[24px]">
                {isSuperAdmin ? 'shield_person' : 'manage_accounts'}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-[#FFF8F1]">
                  Ananta Vijaya Portal
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                  isSuperAdmin
                    ? 'bg-[#fdcd73] text-[#00271d] border-[#fdcd73]'
                    : 'bg-[#7B5802]/80 text-white border-[#C59A45]/60'
                }`}>
                  {ROLE_LABELS[currentUser?.role] || 'Staff'}
                </span>
              </div>
              <p className="text-[11px] text-[#FAF5EB]/80">
                Logged in as <strong>{currentUser?.name || currentUser?.email}</strong>
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {onSwitchRole && (
              <button
                type="button"
                onClick={onSwitchRole}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#fdcd73] text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#C59A45]/40"
                title="Switch between Super Admin, Manager, and User"
              >
                <span className="material-symbols-outlined text-[16px]">sync_alt</span>
                <span className="hidden sm:inline">Switch Role</span>
              </button>
            )}
            <button
              type="button"
              onClick={onLogout}
              className="px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span className="hidden sm:inline">Logout</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors ml-1"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#faecd4]/80 px-4 sm:px-6 border-b border-[#E8D4B5] flex items-center gap-2 sm:gap-4 shrink-0 overflow-x-auto">
          {isSuperAdmin && (
            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`py-3 px-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'analytics'
                  ? 'border-[#00271d] text-[#00271d]'
                  : 'border-transparent text-[#414845] hover:text-[#00271d]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">query_stats</span>
              <span>Overview &amp; Revenue</span>
            </button>
          )}

          {isSuperAdmin && (
            <button
              type="button"
              onClick={() => setActiveTab('team')}
              className={`py-3 px-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'team'
                  ? 'border-[#00271d] text-[#00271d]'
                  : 'border-transparent text-[#414845] hover:text-[#00271d]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">group</span>
              <span>User &amp; Role Management</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'border-[#00271d] text-[#00271d]'
                : 'border-transparent text-[#414845] hover:text-[#00271d]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            <span>Order Fulfillment ({orders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className={`py-3 px-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'inventory'
                ? 'border-[#00271d] text-[#00271d]'
                : 'border-transparent text-[#414845] hover:text-[#00271d]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            <span>Soap Inventory</span>
            {lowStockCount > 0 && (
              <span className="ml-1 bg-amber-600 text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                {lowStockCount} low
              </span>
            )}
          </button>
        </div>

        {/* Toast Alert */}
        {toast && (
          <div className="bg-[#00271d] text-[#fdcd73] px-4 py-2 text-center text-xs font-bold shadow-md animate-fadeIn">
            {toast}
          </div>
        )}

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* TAB 1: ANALYTICS & REVENUE (SUPER ADMIN ONLY) */}
          {activeTab === 'analytics' && isSuperAdmin && (
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#E8D4B5] shadow-sm">
                  <span className="text-[11px] font-bold text-[#7B5802] uppercase tracking-wider">Gross Sales</span>
                  <p className="font-serif text-2xl font-bold text-[#00271d] mt-1">₹{totalRevenue.toLocaleString('en-IN')}</p>
                  <span className="text-[10px] text-emerald-700 font-semibold">100% Verified Razorpay</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#E8D4B5] shadow-sm">
                  <span className="text-[11px] font-bold text-[#7B5802] uppercase tracking-wider">Total Orders</span>
                  <p className="font-serif text-2xl font-bold text-[#00271d] mt-1">{totalOrders}</p>
                  <span className="text-[10px] text-[#414845]">{pendingOrders} awaiting dispatch</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#E8D4B5] shadow-sm">
                  <span className="text-[11px] font-bold text-[#7B5802] uppercase tracking-wider">Avg Order Value</span>
                  <p className="font-serif text-2xl font-bold text-[#00271d] mt-1">
                    ₹{totalOrders ? Math.round(totalRevenue / totalOrders) : 0}
                  </p>
                  <span className="text-[10px] text-emerald-700 font-semibold">Prepaid Transactions</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#E8D4B5] shadow-sm">
                  <span className="text-[11px] font-bold text-[#7B5802] uppercase tracking-wider">Registered Users</span>
                  <p className="font-serif text-2xl font-bold text-[#00271d] mt-1">{users.length}</p>
                  <span className="text-[10px] text-[#414845]">Across 3 Roles</span>
                </div>
              </div>

              {/* Roles Summary Banner */}
              <div className="bg-[#faecd4]/60 p-4 rounded-xl border border-[#C59A45]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-serif font-bold text-[#00271d] text-sm">Role-Based System Active</h4>
                  <p className="text-[#414845] mt-0.5">
                    <strong>Super Admin:</strong> Full permissions &amp; financials • <strong>Manager:</strong> Order fulfillment &amp; inventory • <strong>User:</strong> Customer buying
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('team')}
                  className="px-3 py-2 bg-[#00271d] text-[#fdcd73] rounded-lg font-bold text-xs uppercase tracking-wider shrink-0 hover:bg-[#173D32]"
                >
                  Manage User Roles &rarr;
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: USER & ROLE MANAGEMENT (SUPER ADMIN ONLY) */}
          {activeTab === 'team' && isSuperAdmin && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#00271d]">System Users &amp; Roles</h4>
                  <p className="text-xs text-[#414845]">
                    As Super Admin, you can assign, promote, or restrict users to <strong>Super Admin</strong>, <strong>Manager</strong>, or <strong>User</strong>.
                  </p>
                </div>
                <span className="text-xs font-semibold bg-[#faecd4] text-[#00271d] px-3 py-1 rounded-full border border-[#C59A45]/40">
                  {users.length} Total Users
                </span>
              </div>

              <div className="bg-white rounded-xl border border-[#E8D4B5] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#faecd4]/50 border-b border-[#E8D4B5] text-[#7B5802] uppercase tracking-wider font-bold">
                      <tr>
                        <th className="p-3.5">User</th>
                        <th className="p-3.5">Email</th>
                        <th className="p-3.5">Current Role</th>
                        <th className="p-3.5 text-center">Change Role (Super Admin Authority)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8D4B5]/60">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-[#FAF5EB]/50 transition-colors">
                          <td className="p-3.5 font-medium text-[#00271d]">
                            <div className="flex items-center gap-2">
                              <span className="w-7 h-7 rounded-full bg-[#00271d] text-white flex items-center justify-center font-bold text-xs">
                                {u.name?.charAt(0) || 'U'}
                              </span>
                              <span>{u.name}</span>
                            </div>
                          </td>
                          <td className="p-3.5 font-mono text-xs text-[#414845]">{u.email}</td>
                          <td className="p-3.5">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border inline-flex items-center gap-1 ${
                              u.role === ROLES.SUPER_ADMIN
                                ? 'bg-[#00271d] text-[#fdcd73] border-[#00271d]'
                                : u.role === ROLES.MANAGER
                                ? 'bg-[#7B5802] text-white border-[#7B5802]'
                                : 'bg-[#faecd4] text-[#173D32] border-[#C59A45]/60'
                            }`}>
                              <span className="material-symbols-outlined text-[12px]">
                                {u.role === ROLES.SUPER_ADMIN ? 'shield_person' : u.role === ROLES.MANAGER ? 'manage_accounts' : 'person'}
                              </span>
                              {ROLE_LABELS[u.role] || u.role}
                            </span>
                          </td>
                          <td className="p-3.5 text-center">
                            <div className="inline-flex rounded-lg border border-[#E8D4B5] bg-white p-0.5 shadow-xs">
                              <button
                                type="button"
                                onClick={() => handleRoleChange(u.id, ROLES.SUPER_ADMIN)}
                                className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-colors ${
                                  u.role === ROLES.SUPER_ADMIN ? 'bg-[#00271d] text-[#fdcd73]' : 'text-[#414845] hover:bg-[#faecd4]'
                                }`}
                                title="Grant full administrative power"
                              >
                                Super Admin
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRoleChange(u.id, ROLES.MANAGER)}
                                className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-colors ${
                                  u.role === ROLES.MANAGER ? 'bg-[#7B5802] text-white' : 'text-[#414845] hover:bg-[#faecd4]'
                                }`}
                                title="Grant operational order & inventory management"
                              >
                                Manager
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRoleChange(u.id, ROLES.USER)}
                                className={`px-2 py-1 rounded text-[10px] font-bold uppercase transition-colors ${
                                  u.role === ROLES.USER ? 'bg-[#173D32] text-white' : 'text-[#414845] hover:bg-[#faecd4]'
                                }`}
                                title="Standard customer purchasing account"
                              >
                                User
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ORDER FULFILLMENT (SUPER ADMIN & MANAGER) */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#00271d]">Order Fulfillment Management</h4>
                  <p className="text-xs text-[#414845]">
                    Manage order dispatch, add tracking numbers, and view Razorpay transactions.
                  </p>
                </div>

                {/* Filter buttons */}
                <div className="flex items-center gap-1.5 text-xs">
                  {['All', 'Processing', 'Dispatched', 'Delivered'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setOrderFilter(st)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                        orderFilter === st
                          ? 'bg-[#00271d] text-[#fdcd73]'
                          : 'bg-white text-[#414845] border border-[#E8D4B5] hover:bg-[#faecd4]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders List */}
              <div className="space-y-3">
                {filteredOrders.length === 0 ? (
                  <div className="bg-white p-8 rounded-xl border border-[#E8D4B5] text-center text-[#414845] text-xs">
                    No orders found matching status "{orderFilter}".
                  </div>
                ) : (
                  filteredOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white p-4 sm:p-5 rounded-xl border border-[#E8D4B5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono font-bold text-sm text-[#00271d]">{ord.id}</span>
                          <span className="text-[11px] text-[#7B5802] font-mono">({ord.paymentId})</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            ord.status === 'Delivered'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : ord.status === 'Dispatched'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}>
                            {ord.status}
                          </span>
                          <span className="text-[10px] text-[#414845]">{ord.date}</span>
                        </div>

                        <p className="text-xs text-[#173D32] font-semibold">
                          {ord.customerName} • <span className="font-normal text-[#414845]">{ord.customerPhone} ({ord.customerEmail})</span>
                        </p>
                        <p className="text-[11px] text-[#414845] truncate max-w-xl">
                          📍 {ord.shippingAddress}
                        </p>
                        <div className="text-xs text-[#7B5802]">
                          <strong>Items:</strong> {ord.items.map((i) => `${i.title} (x${i.quantity})`).join(', ')}
                        </div>
                      </div>

                      {/* Right controls */}
                      <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2 shrink-0">
                        <span className="font-serif text-lg font-bold text-[#00271d]">₹{ord.amount}</span>

                        {/* Status Change Selector */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-[#414845]">Set Status:</span>
                          <select
                            value={ord.status}
                            onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                            className="text-xs px-2.5 py-1 rounded-lg border border-[#E8D4B5] bg-[#FAF5EB] font-semibold text-[#00271d] focus:outline-none"
                          >
                            <option value="Processing">Processing</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: SOAP INVENTORY (SUPER ADMIN & MANAGER) */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-serif font-bold text-base text-[#00271d]">Sacred Soap Inventory Control</h4>
                <p className="text-xs text-[#414845]">
                  Update batch stock units. Low stock notifications trigger automatically when units fall below threshold.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {inventory.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-xl border border-[#E8D4B5] shadow-xs flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <h5 className="font-serif font-bold text-sm text-[#00271d]">{item.name}</h5>
                        <span className="font-serif font-bold text-xs text-[#7B5802]">₹{item.price}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`text-2xl font-bold font-mono ${
                          item.stock <= item.lowStockThreshold ? 'text-amber-700' : 'text-[#00271d]'
                        }`}>
                          {item.stock}
                        </span>
                        <span className="text-[11px] text-[#414845]">units in curing rack</span>
                      </div>
                      {item.stock <= item.lowStockThreshold && (
                        <p className="text-[10px] text-amber-700 font-bold mt-1">⚠️ Low Stock Warning (Threshold: {item.lowStockThreshold})</p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-[#E8D4B5] flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        defaultValue={item.stock}
                        id={`stock-${item.id}`}
                        className="w-20 px-2 py-1 text-xs border border-[#E8D4B5] rounded-lg font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById(`stock-${item.id}`);
                          if (input) handleStockSave(item.id, input.value);
                        }}
                        className="flex-1 py-1.5 px-3 bg-[#00271d] hover:bg-[#173D32] text-[#fdcd73] rounded-lg text-xs font-semibold uppercase tracking-wider"
                      >
                        Save Stock
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

