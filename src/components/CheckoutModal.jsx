import React, { useState } from 'react';
import { openRazorpayCheckout } from '../utils/razorpay';
import { trackBeginCheckout } from '../utils/analytics';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems = [],
  onPaymentSuccess,
}) {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isOpen) return null;

  // Calculate order totals
  const subtotal = cartItems.reduce((sum, item) => {
    const priceNum = parseInt(String(item.price).replace(/[^0-9]/g, ''), 10) || 150;
    return sum + priceNum * (item.quantity || 1);
  }, 0);

  const shipping = subtotal >= 499 ? 0 : 50;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayNow = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic Validation
    if (!customer.name.trim()) {
      setErrorMessage('Please enter your full name for delivery.');
      return;
    }
    if (!customer.phone.trim() || customer.phone.replace(/[^0-9]/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number for order & delivery updates.');
      return;
    }
    if (!customer.address.trim() || !customer.pincode.trim()) {
      setErrorMessage('Please provide complete delivery address and PIN code.');
      return;
    }

    setLoading(true);
    trackBeginCheckout(cartItems, total);

    const configuredKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    // Trigger Razorpay Checkout
    const opened = await openRazorpayCheckout({
      amount: total,
      customer,
      cartItems,
      keyId: configuredKey,
      onSuccess: (paymentData) => {
        setLoading(false);
        setCompletedOrder(paymentData);
        if (onPaymentSuccess) {
          onPaymentSuccess(paymentData);
        }
      },
      onDismiss: () => {
        setLoading(false);
      },
      onError: (err) => {
        setLoading(false);
        const description = err?.description || err?.message || 'Payment could not be completed. Please try again.';
        setErrorMessage(description);
      },
    });

    if (!opened) {
      setLoading(false);
    }
  };

  // ORDER SUCCESS CONFIRMATION VIEW
  if (completedOrder) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
        <div className="bg-[#FFF8F1] max-w-lg w-full rounded-2xl border-2 border-[#C59A45]/50 shadow-[0_20px_50px_rgba(0,39,29,0.3)] overflow-hidden flex flex-col max-h-[90vh]">
          {/* Top Sacred Header */}
          <div className="bg-[#00271d] text-white p-6 text-center relative border-b border-[#C59A45]/40">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#fdcd73] text-[#00271d] flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-[32px] font-bold">check_circle</span>
            </div>
            <span className="text-[#fdcd73] text-[11px] font-semibold uppercase tracking-[0.2em]">Sacred Blessing</span>
            <h3 className="font-serif text-2xl font-bold mt-1 text-[#FFF8F1]">Order Confirmed!</h3>
            <p className="text-xs text-[#FAF5EB]/80 mt-1">Thank you for inviting Ananta Vijaya into your daily rituals.</p>
          </div>

          {/* Details Body */}
          <div className="p-6 overflow-y-auto space-y-4 text-[#173D32]">
            <div className="bg-[#faecd4]/60 p-4 rounded-xl border border-[#C59A45]/30 flex flex-col gap-1 text-xs">
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#7B5802] font-semibold">Order ID:</span>
                <span className="font-mono font-bold text-[#00271d]">{completedOrder.orderId}</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#7B5802] font-semibold">Razorpay Payment ID:</span>
                <span className="font-mono text-[11px] text-[#00271d]">{completedOrder.paymentId}</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-[#7B5802] font-semibold">Amount Paid:</span>
                <span className="font-serif font-bold text-sm text-[#00271d]">₹{completedOrder.amount}</span>
              </div>
            </div>

            {/* Delivery Recipient */}
            <div className="border border-[#E8D4B5] rounded-xl p-3.5 text-xs bg-white/70">
              <p className="font-bold text-[#00271d] uppercase tracking-wider mb-1 flex items-center gap-1.5 text-[11px]">
                <span className="material-symbols-outlined text-[16px] text-[#7B5802]">local_shipping</span>
                Shipping Address
              </p>
              <p className="font-medium text-[#173D32]">{customer.name} ({customer.phone})</p>
              <p className="text-[#414845] mt-0.5">{customer.address}, {customer.city}, {customer.state} - {customer.pincode}</p>
            </div>

            {/* Items Summary */}
            <div className="border border-[#E8D4B5] rounded-xl p-3.5 text-xs bg-white/70">
              <p className="font-bold text-[#00271d] uppercase tracking-wider mb-2 text-[11px]">Items Ordered ({cartItems.length})</p>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs py-0.5 border-b border-[#E8D4B5]/40 last:border-b-0">
                    <span className="text-[#173D32] font-medium truncate max-w-[240px]">{item.title} x {item.quantity}</span>
                    <span className="font-semibold text-[#7B5802]">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={`https://wa.me/917386759777?text=${encodeURIComponent(`Hello Ananta Vijaya team, I have placed Order ${completedOrder.orderId} (Payment ID: ${completedOrder.paymentId}) for ₹${completedOrder.amount}. Please share dispatch and tracking updates.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] hover:bg-[#1ebc59] text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Get Order Updates on WhatsApp
              </a>

              <button
                type="button"
                onClick={() => {
                  setCompletedOrder(null);
                  onClose();
                }}
                className="w-full py-2.5 border border-[#C59A45] hover:bg-[#C59A45]/10 text-[#00271d] font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CHECKOUT FORM VIEW
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FFF8F1] max-w-xl w-full rounded-2xl border-2 border-[#C59A45]/50 shadow-[0_20px_50px_rgba(0,39,29,0.3)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#00271d] text-white px-5 py-4 flex items-center justify-between border-b border-[#C59A45]/40">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#fdcd73] text-[22px]">lock</span>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#FFF8F1] leading-tight">
                Secure Razorpay Checkout
              </h3>
              <p className="text-[10px] sm:text-[11px] text-[#FAF5EB]/80">
                100% Encrypted • Official Payment Gateway
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close checkout"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePayNow} className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-300 text-red-800 text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-red-600 shrink-0">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Delivery Details */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#00271d] uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#00271d] text-[#fdcd73] text-[11px] font-bold flex items-center justify-center">1</span>
              Shipping &amp; Contact Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-[#414845] font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={customer.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E8D4B5] bg-white text-[#173D32] focus:outline-none focus:border-[#00271d] focus:ring-1 focus:ring-[#00271d]"
                />
              </div>

              <div>
                <label className="block text-[#414845] font-semibold mb-1">Mobile Number (for delivery) *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="10-digit mobile number"
                  value={customer.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E8D4B5] bg-white text-[#173D32] focus:outline-none focus:border-[#00271d] focus:ring-1 focus:ring-[#00271d]"
                />
              </div>

              <div>
                <label className="block text-[#414845] font-semibold mb-1">Email (for order invoice) *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  value={customer.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E8D4B5] bg-white text-[#173D32] focus:outline-none focus:border-[#00271d] focus:ring-1 focus:ring-[#00271d]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[#414845] font-semibold mb-1">Street Address / House No. *</label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Apartment, Street name, Landmark"
                  value={customer.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E8D4B5] bg-white text-[#173D32] focus:outline-none focus:border-[#00271d] focus:ring-1 focus:ring-[#00271d]"
                />
              </div>

              <div>
                <label className="block text-[#414845] font-semibold mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={customer.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E8D4B5] bg-white text-[#173D32] focus:outline-none focus:border-[#00271d] focus:ring-1 focus:ring-[#00271d]"
                />
              </div>

              <div>
                <label className="block text-[#414845] font-semibold mb-1">PIN Code *</label>
                <input
                  type="text"
                  name="pincode"
                  required
                  maxLength={6}
                  placeholder="6-digit PIN code"
                  value={customer.pincode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E8D4B5] bg-white text-[#173D32] focus:outline-none focus:border-[#00271d] focus:ring-1 focus:ring-[#00271d]"
                />
              </div>
            </div>
          </div>

          {/* Order Summary & Pricing */}
          <div className="border-t border-[#E8D4B5] pt-4">
            <h4 className="font-serif text-sm font-bold text-[#00271d] uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#00271d] text-[#fdcd73] text-[11px] font-bold flex items-center justify-center">2</span>
              Order Summary ({cartItems.length} items)
            </h4>

            <div className="bg-[#faecd4]/50 rounded-xl p-3.5 border border-[#C59A45]/30 space-y-2 text-xs">
              <div className="flex justify-between text-[#414845]">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-[#00271d]">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-[#414845]">
                <span>Express Courier Shipping:</span>
                <span className="font-semibold text-emerald-700">
                  {shipping === 0 ? 'FREE (Orders above ₹499)' : `₹${shipping}`}
                </span>
              </div>
              <div className="border-t border-[#C59A45]/30 pt-2 flex justify-between items-center text-sm font-bold text-[#00271d]">
                <span>Total Payable:</span>
                <span className="font-serif text-lg text-[#00271d]">₹{total}</span>
              </div>
            </div>
          </div>

          {/* Payment Gateways Supported */}
          <div className="bg-white/90 p-3 rounded-xl border border-[#E8D4B5] flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#00271d] uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#00271d]">verified_user</span>
                Powered by Razorpay
              </span>
              <span className="text-[10px] text-[#7B5802] font-semibold bg-[#faecd4] px-2 py-0.5 rounded-full">
                Zero Convenience Fee
              </span>
            </div>
            <p className="text-[10px] text-[#414845]">
              Instant checkout supporting <strong>UPI</strong> (Google Pay, PhonePe, Paytm, BHIM), <strong>Credit &amp; Debit Cards</strong> (Visa, Mastercard, RuPay), <strong>NetBanking</strong> (50+ Indian banks), and <strong>Wallets</strong>.
            </p>
          </div>

          {/* Pay Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#00271d] hover:bg-[#173D32] text-[#fdcd73] font-serif font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-2 border border-[#C59A45]/40 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-[#fdcd73] border-t-transparent rounded-full animate-spin"></span>
                <span>Connecting to Razorpay...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">lock</span>
                <span>Pay ₹{total} via Razorpay</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

