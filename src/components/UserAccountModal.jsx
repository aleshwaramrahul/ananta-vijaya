import React, { useState, useEffect } from 'react';
import { getAllOrders } from '../utils/auth';

export default function UserAccountModal({ currentUser, isOpen, onClose, onLogout, onSwitchRole }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const allOrders = getAllOrders();
      // Match orders by customer email or return customer orders
      const userOrders = allOrders.filter(
        (o) =>
          !currentUser?.email ||
          o.customerEmail?.toLowerCase() === currentUser?.email?.toLowerCase() ||
          currentUser?.role === 'user'
      );
      setOrders(userOrders.length > 0 ? userOrders : allOrders.slice(0, 2));
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FFF8F1] max-w-lg w-full rounded-2xl border-2 border-[#C59A45]/50 shadow-[0_20px_50px_rgba(0,39,29,0.3)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#00271d] text-white p-5 flex items-center justify-between border-b border-[#C59A45]/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#fdcd73] text-[#00271d] flex items-center justify-center font-bold text-base shadow-sm">
              <span className="material-symbols-outlined text-[22px]">person</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#FFF8F1]">
                  My Account
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-[#faecd4] text-[#00271d] border border-[#C59A45]/60">
                  Role: User
                </span>
              </div>
              <p className="text-[11px] text-[#FAF5EB]/80">{currentUser?.email || 'customer@example.com'}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* User Details Card */}
          <div className="bg-white p-3.5 rounded-xl border border-[#E8D4B5] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#7B5802] font-bold uppercase tracking-wider">Customer Name</span>
              <p className="font-bold text-[#00271d] text-sm">{currentUser?.name || 'Customer'}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#7B5802] font-bold uppercase tracking-wider">Status</span>
              <p className="text-emerald-700 font-bold">Active Member</p>
            </div>
          </div>

          {/* Orders Section */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[#00271d] mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#7B5802]">receipt_long</span>
              My Orders &amp; Delivery Tracking
            </h4>

            {orders.length === 0 ? (
              <div className="bg-white p-6 rounded-xl border border-[#E8D4B5] text-center text-[#414845]">
                <p>No past orders placed yet.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {orders.map((ord) => (
                  <div key={ord.id} className="bg-white p-3.5 rounded-xl border border-[#E8D4B5] space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-[#00271d]">{ord.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        ord.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : ord.status === 'Dispatched'
                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}>
                        {ord.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#414845]">
                      <span>{ord.items.map((i) => `${i.title} (x${i.quantity})`).join(', ')}</span>
                      <span className="font-bold text-[#00271d]">₹{ord.amount}</span>
                    </div>
                    <div className="text-[10px] text-[#7B5802] pt-1 border-t border-[#E8D4B5]/60 flex justify-between">
                      <span>Razorpay: {ord.paymentId}</span>
                      <span>{ord.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-[#E8D4B5] flex flex-col gap-2">
            {onSwitchRole && (
              <button
                type="button"
                onClick={onSwitchRole}
                className="w-full py-2 bg-[#faecd4] hover:bg-[#ebd8bd] text-[#00271d] font-bold text-xs uppercase tracking-wider rounded-lg border border-[#C59A45]/50 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">sync_alt</span>
                Switch Role / Staff Portal (Super Admin • Manager • User)
              </button>
            )}

            <button
              type="button"
              onClick={onLogout}
              className="w-full py-2 bg-red-900/10 hover:bg-red-900/20 text-red-800 font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

