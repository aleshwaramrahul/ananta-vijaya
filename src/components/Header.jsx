import React, { useState } from 'react';
import { ASSETS } from '../data/soaps';

export default function Header({ cartCount = 0, wishlistCount = 0, onCartClick, onWishlistClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-[0_1px_8px_rgba(57,37,29,0.06)]">
      {/* Top Notification Bar */}
      <div className="w-full bg-[#00271d] py-2.5 px-4 text-center border-b border-[#C59A45]/40 select-none">
        <p className="text-[11px] sm:text-[12px] md:text-[12.5px] text-white tracking-[0.14em] uppercase font-semibold antialiased inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#fdcd73] shadow-[0_0_8px_rgba(253,205,115,0.8)]"></span>
          <span>Free Express Shipping on Orders Above ₹499 • <span className="text-[#fdcd73] font-bold">Tradition in Every Touch</span></span>
        </p>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 sm:h-24 md:h-[96px] lg:h-[104px] bg-surface/95 backdrop-blur-md transition-all border-b border-[#E8D4B5]/60">
        <div className="max-w-[1600px] h-full mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* 1. Left: Logo Brand Group */}
          <div className="shrink-0 flex items-center">
            <a href="#" className="flex items-center gap-3 sm:gap-4 group cursor-pointer text-left py-1">
              <img
                alt="Ananta Vijaya Logo"
                className="h-14 sm:h-18 md:h-[76px] lg:h-[84px] w-auto object-contain shrink-0 drop-shadow-[0_4px_14px_rgba(123,88,2,0.25)] transition-transform duration-300 group-hover:scale-105"
                src={ASSETS.logo}
              />
              <div className="flex flex-col justify-center whitespace-nowrap">
                <span className="font-headline-sm text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18.5px] font-bold text-primary tracking-[0.06em] uppercase leading-none font-serif">
                  Ananta Vijaya Pvt. Ltd.
                </span>
                <span className="font-label-sm text-[7.5px] sm:text-[9px] md:text-[9.5px] lg:text-[10px] text-secondary tracking-[0.18em] uppercase font-semibold mt-1">
                  Nature's Trust &amp; Herbal Purity
                </span>
              </div>
            </a>
          </div>

          {/* 2. Center: Desktop Nav Links (Centered with Equal Margins) */}
          <nav className="hidden lg:flex items-center justify-center gap-7 xl:gap-9 2xl:gap-11 mx-auto whitespace-nowrap">
            <a
              href="#home"
              className="text-[12.5px] xl:text-[13px] tracking-[0.16em] uppercase font-semibold py-2 transition-all relative text-[#00271d] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C59A45]"
            >
              Home
            </a>
            <a
              href="#rituals"
              className="text-[12.5px] xl:text-[13px] tracking-[0.16em] uppercase font-semibold py-2 transition-all relative text-[#414845] hover:text-[#00271d] hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-[#C59A45]/50"
            >
              Our Story
            </a>
            <a
              href="#collection"
              className="text-[12.5px] xl:text-[13px] tracking-[0.16em] uppercase font-semibold py-2 transition-all relative text-[#414845] hover:text-[#00271d] hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-[#C59A45]/50"
            >
              Our Soaps
            </a>
            <a
              href="#divine-collection"
              className="text-[12.5px] xl:text-[13px] tracking-[0.16em] uppercase font-semibold py-2 transition-all relative text-[#414845] hover:text-[#00271d] hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-[#C59A45]/50"
            >
              Divine Collection
            </a>
            <a
              href="#faqs"
              className="text-[12.5px] xl:text-[13px] tracking-[0.16em] uppercase font-semibold py-2 transition-all relative text-[#414845] hover:text-[#00271d] hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-[#C59A45]/50"
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="text-[12.5px] xl:text-[13px] tracking-[0.16em] uppercase font-semibold py-2 transition-all relative text-[#414845] hover:text-[#00271d] hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-[#C59A45]/50"
            >
              Contact
            </a>
          </nav>

          {/* 3. Right: Header Action Icons (Search and Shopping Bag only) */}
          <div className="shrink-0 flex items-center justify-end gap-2 sm:gap-3 text-primary">
            <button
              type="button"
              aria-label="Search"
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#C59A45]/15 hover:text-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-[21px] sm:text-[23px]">search</span>
            </button>
            <button
              type="button"
              aria-label="Shopping Bag"
              onClick={onCartClick}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#C59A45]/15 hover:text-secondary transition-colors relative"
            >
              <span className="material-symbols-outlined text-[21px] sm:text-[23px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#00271d] text-[#fdcd73] border border-[#C59A45]/50 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile/Tablet Menu Button */}
            <button
              type="button"
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#C59A45]/15 hover:text-secondary transition-colors text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined text-[25px] sm:text-[26px]">
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
