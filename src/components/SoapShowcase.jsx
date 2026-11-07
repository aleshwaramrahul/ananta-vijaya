import React, { useState, useEffect } from 'react';
import { SOAP_PRODUCTS } from '../data/soaps';

export default function SoapShowcase({ selectedIndex, onSelectSoap, onAddToCart, onToggleWishlist, isWishlisted }) {
  const current = SOAP_PRODUCTS[selectedIndex] || SOAP_PRODUCTS[0];
  const [animating, setAnimating] = useState(false);

  const handleSelect = (index) => {
    if (index === selectedIndex) return;
    setAnimating(true);
    setTimeout(() => {
      onSelectSoap(index);
      setAnimating(false);
    }, 180);
  };

  const handlePrev = () => {
    const nextIdx = (selectedIndex - 1 + SOAP_PRODUCTS.length) % SOAP_PRODUCTS.length;
    handleSelect(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (selectedIndex + 1) % SOAP_PRODUCTS.length;
    handleSelect(nextIdx);
  };

  return (
    <section className="w-full bg-[#FAF5EB] py-space-xl lg:py-28 relative overflow-hidden" id="collection">
      {/* Ambient Background Ornamentation */}
      <div className="absolute -top-40 right-1/4 w-[600px] h-[600px] rounded-full bg-[#E8D4B5]/40 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#C59A45]/10 blur-2xl pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-space-sm mb-space-xs px-4 py-1 rounded-full bg-[#E8D4B5]/60 border border-[#C59A45]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C59A45]"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-[#C59A45] font-semibold">
              Sacred Botanical Showcase
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C59A45]"></span>
          </div>
          <h2 className="font-display-md text-3xl md:text-5xl text-[#173D32] tracking-tight mb-3 font-serif">
            Crafted by Nature. Consecrated for Wellness.
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
            Explore each handcrafted Ayurvedic bar in high-fidelity formulation.
          </p>
        </div>

        {/* 3-Column Luxury Interactive Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: Product Information & Add to Cart */}
          <div className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1 bg-surface/80 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-6 lg:p-0 rounded-2xl lg:rounded-none border border-[#E8D4B5]/60 lg:border-none shadow-sm lg:shadow-none">
            
            {/* Label & Badges */}
            <div className="flex items-center gap-3 mb-2">
              <span className="uppercase tracking-widest text-[#C59A45] font-semibold text-xs">
                Our Products
              </span>
              <span className="h-3 w-[1px] bg-[#C59A45]/40"></span>
              <span className="font-label-sm text-[11px] text-[#173D32]/80 bg-[#E8D4B5]/60 px-2.5 py-0.5 rounded-full font-medium">
                {current.badge}
              </span>
            </div>

            {/* Dynamic Product Title */}
            <h3 
              className={`font-headline-lg font-display-md text-3xl md:text-4xl text-[#173D32] font-bold tracking-tight mb-3 font-serif transition-opacity duration-300 ${
                animating ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {current.title}
            </h3>

            {/* Dynamic Botanical Description */}
            <p 
              className={`font-body-md text-[15px] leading-relaxed text-[#414845] mb-6 min-h-[72px] transition-opacity duration-300 ${
                animating ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {current.desc}
            </p>

            {/* 3 Key Benefits with Gold Icons */}
            <div className="flex flex-col gap-3.5 mb-7 border-y border-[#E8D4B5] py-5">
              {current.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E8D4B5]/50 flex items-center justify-center shrink-0 mt-0.5 text-[#C59A45]">
                    <span className="material-symbols-outlined text-[19px]">{b.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#173D32]">{b.title}</h4>
                    <p className="text-xs text-[#414845] leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price & Offer Note */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold text-[#173D32] font-display-md font-serif">
                  {current.price}
                </span>
                <span className="text-sm text-[#414845]/70 font-normal">
                  / {current.usdPrice}
                </span>
              </div>
              <p className="text-xs text-[#7B5802] font-medium flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#C59A45]">redeem</span>
                <span>Complimentary Ayurvedic Wooden Soap Dish on orders over ₹1200</span>
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onAddToCart?.(current)}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#C59A45] hover:bg-[#b08638] text-white font-label-md text-sm px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-95 group"
              >
                <span className="material-symbols-outlined text-[19px] transition-transform group-hover:scale-110">
                  shopping_bag
                </span>
                <span>Add to Cart</span>
              </button>
              
              <button
                type="button"
                aria-label="Add to Wishlist"
                onClick={() => onToggleWishlist?.(current.id)}
                className={`p-3.5 rounded-full border transition-colors flex items-center justify-center shadow-sm ${
                  isWishlisted?.(current.id)
                    ? 'border-[#C59A45] bg-[#C59A45]/10 text-[#C59A45]'
                    : 'border-[#E8D4B5] hover:border-[#C59A45] text-[#173D32] hover:text-[#C59A45] bg-surface'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${isWishlisted?.(current.id) ? 'fill-current' : ''}`}>
                  favorite
                </span>
              </button>
            </div>

          </div>

          {/* CENTRE COLUMN: Dominant Product Stage Presentation */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2 relative py-4">
            
            {/* Circular Halo Stage with Pedestal */}
            <div className="relative w-full max-w-[430px] aspect-[4/5] flex items-center justify-center">
              
              {/* Outer Glowing Atmospheric Ring */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#E8D4B5]/70 via-[#F5E8D0] to-[#E8D4B5]/50 blur-xl opacity-90 pointer-events-none"></div>
              
              {/* Concentric Sacred Mandala/Halos */}
              <div className="absolute inset-8 rounded-full border border-[#C59A45]/30 pointer-events-none"></div>
              <div className="absolute inset-14 rounded-full border border-[#C59A45]/20 border-dashed pointer-events-none"></div>
              <div className="absolute inset-20 rounded-full bg-gradient-to-b from-[#FFF8F1] to-[#E8D4B5]/40 shadow-inner pointer-events-none"></div>

              {/* Botanical Leaf Accents Framing Left & Right */}
              <div className="absolute -left-3 bottom-24 z-10 flex flex-col items-center pointer-events-none opacity-85">
                <span className="material-symbols-outlined text-[#173D32] text-3xl drop-shadow-sm rotate-45">eco</span>
                <span className="material-symbols-outlined text-[#FAF5EB] bg-[#C59A45] rounded-full p-1 text-sm shadow">local_florist</span>
              </div>
              <div className="absolute -right-2 bottom-28 z-10 flex flex-col items-center pointer-events-none opacity-85">
                <span className="material-symbols-outlined text-[#173D32] text-2xl drop-shadow-sm -rotate-45">spa</span>
                <span className="material-symbols-outlined text-[#C59A45] text-xl drop-shadow-sm">filter_vintage</span>
              </div>

              {/* Traditional Brass Diya Frame Accent (Right Floor) */}
              <div className="absolute right-4 bottom-14 z-20 flex items-center gap-1 bg-[#173D32]/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-[#ffdea6] shadow-md border border-[#C59A45]/40 pointer-events-none">
                <span className="material-symbols-outlined text-[#fdcd73] text-[15px] animate-pulse">local_fire_department</span>
                <span className="tracking-wider uppercase font-semibold">Devotional</span>
              </div>

              {/* Layered Natural Stone Pedestal Base */}
              <div className="absolute bottom-10 inset-x-8 h-12 bg-gradient-to-b from-[#E8D4B5] to-[#cbb28d] rounded-[50%] shadow-[0_24px_30px_rgba(57,37,29,0.22)] z-10 border-t border-white/50"></div>
              <div className="absolute bottom-6 inset-x-12 h-8 bg-gradient-to-b from-[#d9be95] to-[#bca076] rounded-[50%] shadow-[0_12px_20px_rgba(57,37,29,0.28)] z-10"></div>
              <div className="absolute bottom-2 inset-x-16 h-4 bg-[#39251D]/25 blur-md rounded-full z-0"></div>

              {/* Dominant Active Soap Packaging with Float Physics */}
              <div className="relative z-20 w-full flex items-center justify-center px-6 pb-12">
                <img
                  id="main-product-img"
                  alt={current.title}
                  className={`floating-product w-auto max-h-[360px] sm:max-h-[420px] object-contain drop-shadow-[0_28px_32px_rgba(23,61,50,0.32)] transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                    animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                  }`}
                  src={current.image}
                />
              </div>

            </div>

            {/* Carousel Dot Indicator Pills */}
            <div className="flex items-center gap-2 mt-2" id="carousel-dots">
              {SOAP_PRODUCTS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to soap product ${i + 1}`}
                  onClick={() => handleSelect(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === selectedIndex
                      ? 'w-8 h-2 bg-[#C59A45]'
                      : 'w-2 h-2 bg-[#E8D4B5] hover:bg-[#C59A45]/60'
                  }`}
                />
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: Vertical Product Selector */}
          <div className="lg:col-span-3 flex flex-col order-3">
            
            {/* Selector Header with Arrow Controls */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E8D4B5]">
              <div>
                <h4 className="font-headline-sm text-base text-[#173D32] font-semibold font-serif">
                  Select Formulation
                </h4>
                <span className="text-xs text-[#7B5802]/80">5 Sacred Varieties</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Previous product"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full border border-[#E8D4B5] hover:border-[#C59A45] hover:bg-[#E8D4B5]/40 flex items-center justify-center text-[#173D32] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">keyboard_arrow_up</span>
                </button>
                <button
                  type="button"
                  aria-label="Next product"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full border border-[#E8D4B5] hover:border-[#C59A45] hover:bg-[#E8D4B5]/40 flex items-center justify-center text-[#173D32] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                </button>
              </div>
            </div>

            {/* Vertical 5-Item Card List */}
            <div className="flex flex-col gap-2.5">
              {SOAP_PRODUCTS.map((soap, i) => {
                const isCurrent = i === selectedIndex;
                return (
                  <div
                    key={soap.id}
                    onClick={() => handleSelect(i)}
                    className={`product-item-card cursor-pointer p-2.5 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
                      isCurrent
                        ? 'bg-[#173D32] border-[#C59A45] shadow-md ring-2 ring-[#C59A45]/30'
                        : 'border-transparent hover:border-[#C59A45]/50 bg-[#E8D4B5]/60 hover:bg-[#E8D4B5]'
                    }`}
                  >
                    <div className="w-12 h-14 bg-surface/10 rounded-lg flex items-center justify-center p-1 shrink-0 overflow-hidden">
                      <img
                        alt={soap.title}
                        className="h-full w-auto object-contain drop-shadow"
                        src={soap.image}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className={`text-sm font-semibold truncate ${isCurrent ? 'text-[#FAF5EB]' : 'text-[#173D32]'}`}>
                          {soap.title}
                        </h5>
                        <span className={`text-[11px] font-medium ${isCurrent ? 'text-[#fdcd73]' : 'text-[#7B5802]'}`}>
                          {soap.price}
                        </span>
                      </div>
                      <p className={`text-[11px] truncate ${isCurrent ? 'text-[#81a899]' : 'text-[#414845]'}`}>
                        {soap.subtitle}
                      </p>
                    </div>
                    <span 
                      className={`material-symbols-outlined text-[18px] shrink-0 ${
                        isCurrent ? 'text-[#fdcd73]' : 'text-transparent'
                      }`}
                    >
                      check_circle
                    </span>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Ingredient Verification Banner */}
        <div className="mt-space-xl bg-[#FAF5EB] border border-[#E8D4B5] p-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md shadow-sm rounded-xl">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-surface-container">
              <span className="material-symbols-outlined text-[24px]">science</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-primary font-serif">
                Conscious Botanical Craft
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Cold-pressed sesame, virgin coconut, and pure unadulterated botanical elixirs.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-space-lg">
            <div className="text-center">
              <span className="block font-headline-md text-headline-md text-primary font-serif font-bold">
                45
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                Days Cured
              </span>
            </div>
            <div className="w-[1px] h-8 bg-outline-variant"></div>
            <div className="text-center">
              <span className="block font-headline-md text-headline-md text-primary font-serif font-bold">
                0%
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                Chemicals
              </span>
            </div>
            <div className="w-[1px] h-8 bg-outline-variant"></div>
            <div className="text-center">
              <span className="block font-headline-md text-headline-md text-primary font-serif font-bold">
                100%
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                Biodegradable
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
