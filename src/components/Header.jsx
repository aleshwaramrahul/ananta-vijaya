import React, { useState } from 'react';
import { ASSETS } from '../data/soaps';

export default function Header({ cartCount = 0, wishlistCount = 0, onCartClick, onWishlistClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-[0_1px_8px_rgba(57,37,29,0.06)]">
      {/* Top Notification Bar */}
      <div className="w-full bg-tertiary-container py-space-xs px-margin-mobile lg:px-margin text-center">
        <p className="font-label-sm text-label-sm text-surface-container tracking-widest uppercase">
          Discover the Beauty of Natural Handmade Soaps
        </p>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 md:h-[88px] bg-surface/95 backdrop-blur-md transition-all">
        <div className="max-w-[1440px] h-full mx-auto px-margin-mobile lg:px-margin flex items-center justify-between">
          
          {/* Logo Brand Group */}
          <a href="#" className="flex items-center gap-3 md:gap-4 group cursor-pointer">
            <img
              alt="Ananta Vijaya Logo"
              className="h-14 sm:h-16 md:h-[68px] w-auto object-contain drop-shadow-[0_2px_8px_rgba(123,88,2,0.18)] transition-transform duration-300 group-hover:scale-105"
              src={ASSETS.logo}
            />
            <div className="flex flex-col justify-center">
              <span className="font-headline-sm text-[20px] sm:text-[23px] font-bold text-primary tracking-wider uppercase leading-none font-serif">
                Ananta Vijaya
              </span>
              <span className="font-label-sm text-[10px] sm:text-[11px] text-secondary tracking-[0.25em] uppercase font-semibold mt-1">
                Natural Handmade Soaps
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 whitespace-nowrap">
            <a
              href="#home"
              className="transition-colors py-space-xs uppercase text-primary font-semibold border-b-2 border-secondary font-label-md text-label-md"
            >
              Home
            </a>
            <a
              href="#collection"
              className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:border-b-2 hover:border-secondary/60 transition-colors py-space-xs uppercase"
            >
              Our Soaps
            </a>
            <a
              href="#rituals"
              className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:border-b-2 hover:border-secondary/60 transition-colors py-space-xs uppercase"
            >
              Our Story
            </a>
            <a
              href="#ingredients"
              className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:border-b-2 hover:border-secondary/60 transition-colors py-space-xs uppercase"
            >
              Ingredients
            </a>
            <a
              href="#contact"
              className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:border-b-2 hover:border-secondary/60 transition-colors py-space-xs uppercase"
            >
              Contact
            </a>
          </nav>

          {/* Header Action Icons */}
          <div className="flex items-center gap-space-md text-primary">
            <button
              type="button"
              aria-label="Search"
              className="p-space-xs hover:text-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>
            <button
              type="button"
              aria-label="Wishlist"
              onClick={onWishlistClick}
              className="p-space-xs hover:text-secondary transition-colors relative"
            >
              <span className="material-symbols-outlined text-[22px]">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label="Shopping Bag"
              onClick={onCartClick}
              className="p-space-xs hover:text-secondary transition-colors relative"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#173D32] text-[#fdcd73] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label="User Account"
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center transition-transform hover:scale-105"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </button>

            {/* Mobile/Tablet Menu Button */}
            <button
              type="button"
              className="lg:hidden p-space-xs text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined text-[26px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface-container-high border-b border-[#E8D4B5] px-6 py-4 flex flex-col gap-3 shadow-xl">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 uppercase text-primary font-semibold text-sm"
            >
              Home
            </a>
            <a
              href="#collection"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 uppercase text-on-surface-variant font-medium text-sm"
            >
              Our Soaps
            </a>
            <a
              href="#rituals"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 uppercase text-on-surface-variant font-medium text-sm"
            >
              Our Story
            </a>
            <a
              href="#ingredients"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 uppercase text-on-surface-variant font-medium text-sm"
            >
              Ingredients
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 uppercase text-on-surface-variant font-medium text-sm"
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
