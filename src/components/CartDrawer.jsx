import React from 'react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => {
    const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 480;
    return sum + priceNum * item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-surface h-full shadow-2xl flex flex-col z-10 border-l border-[#E8D4B5]">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E8D4B5] flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#173D32]">shopping_bag</span>
            <h3 className="font-headline-sm text-lg font-bold text-[#173D32] font-serif">
              Your Cleansing Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 hover:text-secondary text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-on-surface-variant py-12">
              <span className="material-symbols-outlined text-5xl text-[#C59A45]/40 mb-3">
                shopping_bag
              </span>
              <p className="font-serif text-lg text-primary mb-1">Your bag is empty</p>
              <p className="text-xs text-on-surface-variant max-w-xs">
                Select from our 5 sacred Ayurvedic handmade soaps to begin your cleansing ritual.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center gap-4 p-3 bg-surface-container rounded-xl border border-[#E8D4B5]/60 shadow-sm"
              >
                <div className="w-16 h-16 bg-surface/60 rounded-lg flex items-center justify-center p-1 shrink-0">
                  <img src={item.image} alt={item.title} className="max-h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-semibold text-sm text-[#173D32] truncate">
                    {item.title}
                  </h4>
                  <p className="text-xs text-secondary font-medium">{item.price}</p>
                  
                  {/* Quantity control */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full border border-[#C59A45] flex items-center justify-center text-xs text-[#173D32] hover:bg-[#E8D4B5]"
                    >
                      -
                    </button>
                    <span className="text-xs font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full border border-[#C59A45] flex items-center justify-center text-xs text-[#173D32] hover:bg-[#E8D4B5]"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-on-surface-variant hover:text-error p-1"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#E8D4B5] bg-surface-container-low flex flex-col gap-4">
            <div className="flex items-center justify-between text-base font-semibold text-[#173D32]">
              <span>Total:</span>
              <span className="font-serif text-xl">₹{total}</span>
            </div>
            <p className="text-xs text-[#7B5802] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#C59A45]">redeem</span>
              {total >= 1200 
                ? "Qualified for complimentary Ayurvedic Wooden Soap Dish!"
                : `Add ₹${1200 - total} more for complimentary Wooden Soap Dish`}
            </p>
            <button
              onClick={() => alert('Proceeding to checkout with Ananta Vijaya sacred soaps...')}
              className="w-full py-3.5 bg-[#C59A45] hover:bg-[#b08638] text-white font-label-md text-sm uppercase tracking-wider rounded-full shadow-md font-semibold transition-all transform active:scale-95"
            >
              Proceed to Checkout
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
