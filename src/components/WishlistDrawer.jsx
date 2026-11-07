import React from 'react';
import { SOAP_PRODUCTS } from '../data/soaps';

export default function WishlistDrawer({ isOpen, onClose, wishlistIds, onAddToCart, onRemoveWishlist }) {
  if (!isOpen) return null;

  const items = SOAP_PRODUCTS.filter(s => wishlistIds.includes(s.id));

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
            <span className="material-symbols-outlined text-[#173D32]">favorite</span>
            <h3 className="font-headline-sm text-lg font-bold text-[#173D32] font-serif">
              Saved Formulations ({items.length})
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
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-on-surface-variant py-12">
              <span className="material-symbols-outlined text-5xl text-[#C59A45]/40 mb-3">
                favorite_border
              </span>
              <p className="font-serif text-lg text-primary mb-1">Your wishlist is empty</p>
              <p className="text-xs text-on-surface-variant max-w-xs">
                Save your favorite botanical bars to revisit anytime.
              </p>
            </div>
          ) : (
            items.map((item) => (
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
                  <button
                    onClick={() => {
                      onAddToCart(item);
                    }}
                    className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#C59A45] hover:text-[#b08638] flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[15px]">shopping_bag</span>
                    Move to Bag
                  </button>
                </div>
                <button
                  onClick={() => onRemoveWishlist(item.id)}
                  className="text-on-surface-variant hover:text-error p-1"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
