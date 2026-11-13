/**
 * Razorpay Checkout Integration Helper
 * Loads the Razorpay SDK dynamically and opens the checkout payment gateway.
 */

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Trigger Razorpay Standard Checkout
 * @param {Object} params
 * @param {number} params.amount - Total amount in INR (rupees)
 * @param {Object} params.customer - { name, email, phone, address, city, state, pincode }
 * @param {Array} params.cartItems - Array of cart item objects
 * @param {string} [params.keyId] - Razorpay Key ID (optional, falls back to env)
 * @param {Function} params.onSuccess - Callback on payment success (response: { razorpay_payment_id, ... })
 * @param {Function} params.onDismiss - Callback when checkout is closed without paying
 * @param {Function} params.onError - Callback on payment error
 */
export const openRazorpayCheckout = async ({
  amount,
  customer,
  cartItems = [],
  keyId,
  onSuccess,
  onDismiss,
  onError,
}) => {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    if (onError) onError(new Error('Razorpay SDK failed to load. Please check your internet connection.'));
    return false;
  }

  // Amount in Paise (1 INR = 100 paise)
  const amountInPaise = Math.round(Number(amount) * 100);

  // Razorpay Key ID: Prioritize passed keyId, then env variable, or test fallback
  const razorpayKey =
    keyId ||
    import.meta.env.VITE_RAZORPAY_KEY_ID ||
    'rzp_test_placeholder';

  const orderDescription = cartItems.length > 0
    ? `Order for ${cartItems.map((i) => `${i.title} (x${i.quantity})`).join(', ')}`.slice(0, 255)
    : 'Ananta Vijaya Sacred Ayurvedic Soaps Order';

  const options = {
    key: razorpayKey,
    amount: amountInPaise,
    currency: 'INR',
    name: 'Ananta Vijaya Pvt. Ltd.',
    description: orderDescription,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB993sfXG98XREyGP3l0QhO-ic0V-KZI_WgZ5ASeUn17ZYjDY1LQznLiBxa31iajLzMHy-l6LQZbFyjgZPZPoZEyH16sZghNVanlWWtraxjG_usqzD9a36TW00dqeMbOVmO-_4HgHQ1hH0jRiSY6jMEsP-gDkSnslm7AH3RRvlxspeGFBnaVtvSyPJb3FrpvNZRz_Ezo_ykC4ksX7ZF6e5xKKpJDlOXxcqeBV5FWRmp8XVZiI6sVKpx_g',
    handler: function (response) {
      if (onSuccess) {
        onSuccess({
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id || `AV-${Date.now()}`,
          signature: response.razorpay_signature,
          amount,
          customer,
          cartItems,
        });
      }
    },
    prefill: {
      name: customer?.name || '',
      email: customer?.email || '',
      contact: customer?.phone || '',
    },
    notes: {
      shipping_address: customer
        ? `${customer.address || ''}, ${customer.city || ''}, ${customer.state || ''} - ${customer.pincode || ''}`
        : '',
      brand: 'Ananta Vijaya / Lotica Glow',
    },
    theme: {
      color: '#00271d', // Sacred deep forest green
    },
    modal: {
      ondismiss: function () {
        if (onDismiss) onDismiss();
      },
    },
  };

  try {
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.on('payment.failed', function (response) {
      if (onError) onError(response.error);
    });
    razorpayInstance.open();
    return true;
  } catch (err) {
    if (onError) onError(err);
    return false;
  }
};

