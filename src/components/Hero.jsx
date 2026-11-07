import React from 'react';
import { ASSETS } from '../data/soaps';

export default function Hero({ onSelectSoap }) {
  return (
    <section id="home" className="relative w-full bg-surface-container-low overflow-hidden pt-28 pb-space-xl lg:pb-32">
      {/* Subtle Architectural Arch & Radial Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-b from-secondary-fixed/40 via-surface-container to-transparent blur-3xl"></div>
        <div className="absolute top-12 left-10 w-96 h-96 rounded-full bg-primary-fixed/20 blur-2xl"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center min-h-[640px]">
          
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 flex flex-col justify-center pr-0 lg:pr-space-lg">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-space-sm mb-space-md">
              <span className="w-8 h-[1px] bg-secondary"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary font-semibold">
                Natural Handmade Soaps
              </span>
              <span className="w-8 h-[1px] bg-secondary"></span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display-lg text-display-lg text-primary leading-[1.08] tracking-tight mb-space-md font-serif">
              Nature's Tradition.<br />
              <span className="italic font-normal text-secondary">Timeless Wellness.</span>
            </h1>

            {/* Body Description */}
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-space-lg leading-relaxed">
              Experience five unique handcrafted soaps inspired by ancient Indian heritage and the sacred goodness of consecrated botanicals.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-space-md mb-space-xl">
              <a
                href="#collection"
                className="inline-flex items-center justify-center px-space-lg py-space-sm bg-primary-container text-surface-container font-label-md text-label-md uppercase tracking-widest shadow-md hover:bg-dark-brown transition-all duration-300 group rounded-sm"
              >
                <span>Discover Our Soaps</span>
                <span className="material-symbols-outlined text-[18px] ml-space-xs transition-transform group-hover:translate-x-1 text-secondary-fixed">
                  east
                </span>
              </a>
              <a
                href="#rituals"
                className="inline-flex items-center justify-center px-space-lg py-space-sm bg-surface-container text-dark-brown font-label-md text-label-md uppercase tracking-widest hover:bg-surface-container-high transition-all duration-300 shadow-sm rounded-sm"
              >
                Explore Our Story
              </a>
            </div>

            {/* Trust Badge Row */}
            <div className="pt-space-md flex flex-wrap items-center gap-space-md text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
                <span>100% Handcrafted</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary/50"></span>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[16px]">spa</span>
                <span>Devotional Pure Herbs</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary/50"></span>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[16px]">local_florist</span>
                <span>Sacred Botanicals</span>
              </div>
            </div>
          </div>

          {/* Right Column: Curated 3D Product Stage with All 5 Packaging Boxes */}
          <div className="lg:col-span-6 relative mt-space-lg lg:mt-0 flex flex-col items-center justify-center" id="hero-product-showcase">
            <div className="relative w-full max-w-[700px] flex flex-col items-center select-none">
              
              {/* Radial Golden Aura Behind Stage */}
              <div className="absolute -inset-6 bg-radial from-[#fdcd73]/25 via-[#E8D4B5]/20 to-transparent blur-3xl pointer-events-none -z-10"></div>
              
              {/* Rotating Lotus Mandala */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[380px] sm:w-[460px] h-[380px] sm:h-[460px] pointer-events-none z-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#fdcd73]/30 via-[#E8D4B5]/20 to-transparent blur-2xl"></div>
                <img
                  alt="Lotus Mandala"
                  className="w-full h-full object-contain animate-spin-slow opacity-90 drop-shadow-[0_0_30px_rgba(253,205,115,0.45)]"
                  src={ASSETS.lotusMandala}
                />
              </div>

              {/* Bilvam Leaves - Left Floating */}
              <div className="absolute -top-6 left-1 sm:left-4 w-32 sm:w-40 z-20 pointer-events-none drop-shadow-md">
                <img
                  alt="Bilvam Leaves Left"
                  className="w-full h-auto object-contain -rotate-12"
                  src={ASSETS.bilvamLeaves}
                />
              </div>

              {/* Bilvam Leaves - Right Floating */}
              <div className="absolute -top-5 right-1 sm:right-4 w-32 sm:w-40 z-20 pointer-events-none drop-shadow-md">
                <img
                  alt="Bilvam Leaves Right"
                  className="w-full h-auto object-contain rotate-45 scale-x-[-1]"
                  src={ASSETS.bilvamLeaves}
                />
              </div>

              {/* Hanging Brass Bells */}
              <div className="absolute -top-2 left-14 sm:left-24 w-16 sm:w-20 z-25 pointer-events-none drop-shadow-lg">
                <img
                  alt="Hanging Brass Bells"
                  className="w-full h-auto object-contain"
                  src={ASSETS.hangingBells}
                />
              </div>

              {/* Circular Gold Seal: The Divine Collection */}
              <div className="absolute top-0 right-4 sm:right-8 z-30">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#7b5802] via-[#fdcd73] to-[#C59A45] p-1 shadow-[0_12px_24px_rgba(57,37,29,0.35)] flex items-center justify-center border-2 border-[#ffdea6]">
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-[#fff8f1] via-[#faecd4] to-[#e5d9c1] border border-[#C59A45] flex flex-col items-center justify-center text-center p-1 shadow-inner">
                    <span className="font-label-sm text-[8px] sm:text-[9px] uppercase tracking-widest text-[#7b5802] font-semibold leading-tight">
                      The
                    </span>
                    <span className="font-headline-sm text-[11px] sm:text-[12px] font-bold text-[#173D32] tracking-wider uppercase leading-tight font-serif">
                      Divine
                    </span>
                    <span className="font-headline-sm text-[9px] sm:text-[10px] font-semibold text-[#7b5802] tracking-wider uppercase leading-tight font-serif">
                      Collection
                    </span>
                    <span className="material-symbols-outlined text-[#C59A45] text-[13px] mt-0.5">
                      local_florist
                    </span>
                  </div>
                </div>
              </div>

              {/* The 5 Standing Product Boxes Stage */}
              <div className="relative w-full mt-24 sm:mt-28 flex flex-col items-center">
                <div className="relative z-20 w-full flex items-end justify-center px-2 pb-0 -mb-10 sm:-mb-12">
                  
                  {/* 1. Vibhudi */}
                  <div 
                    onClick={() => onSelectSoap?.(3)}
                    className="w-[18%] flex flex-col items-center z-10 transition-transform duration-300 hover:-translate-y-2 group cursor-pointer"
                  >
                    <span className="font-label-sm text-[9px] sm:text-[10px] uppercase tracking-wider text-secondary font-semibold mb-1 opacity-90 group-hover:opacity-100">
                      Vibhudi
                    </span>
                    <div className="relative">
                      <img
                        alt="Vibhudi Soap Box"
                        className="w-full h-auto max-h-48 sm:max-h-60 object-contain drop-shadow-[0_14px_16px_rgba(57,37,29,0.32)]"
                        src={ASSETS.vibhudiBox}
                      />
                      <div className="absolute -bottom-2 inset-x-1 h-3 bg-[#39251D]/30 blur-sm rounded-full -z-10"></div>
                    </div>
                  </div>

                  {/* 2. Kadamba */}
                  <div 
                    onClick={() => onSelectSoap?.(1)}
                    className="w-[20%] flex flex-col items-center z-20 transition-transform duration-300 hover:-translate-y-4 group -ml-2 sm:-ml-3 cursor-pointer"
                  >
                    <span className="font-label-sm text-[9px] sm:text-[10px] uppercase tracking-wider text-secondary font-semibold mb-1 opacity-90 group-hover:opacity-100">
                      Kadamba
                    </span>
                    <div className="relative">
                      <img
                        alt="Kadamba Soap Box"
                        className="w-full h-auto max-h-52 sm:max-h-64 object-contain drop-shadow-[0_18px_20px_rgba(57,37,29,0.35)]"
                        src={ASSETS.kadambaBox}
                      />
                      <div className="absolute -bottom-2 inset-x-1 h-3 bg-[#39251D]/35 blur-sm rounded-full -z-10"></div>
                    </div>
                  </div>

                  {/* 3. Bilvam (Center Dominant) */}
                  <div 
                    onClick={() => onSelectSoap?.(0)}
                    className="w-[27%] flex flex-col items-center z-30 transition-transform duration-300 hover:-translate-y-4 group -mx-1 sm:-mx-2 cursor-pointer"
                  >
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#173d32] border border-[#fdcd73] mb-1.5 shadow-lg ring-2 ring-[#C59A45]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#fdcd73] animate-pulse shadow-[0_0_6px_#fdcd73]"></span>
                      <span className="font-label-sm text-[9px] sm:text-[10px] uppercase tracking-widest text-[#ffdea6] font-bold">
                        Consecrated Bar
                      </span>
                    </div>
                    <div className="relative">
                      <img
                        alt="Bilvam Soap Box"
                        className="w-full h-auto max-h-64 sm:max-h-80 object-contain drop-shadow-[0_28px_34px_rgba(23,61,50,0.5)] scale-105 group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                        src={ASSETS.bilvamBox}
                      />
                      <div className="absolute -bottom-3 inset-x-2 h-4 bg-[#173d32]/50 blur-md rounded-full -z-10"></div>
                    </div>
                  </div>

                  {/* 4. Kamalam */}
                  <div 
                    onClick={() => onSelectSoap?.(2)}
                    className="w-[20%] flex flex-col items-center z-20 transition-transform duration-300 hover:-translate-y-4 group -mr-2 sm:-mr-3 cursor-pointer"
                  >
                    <span className="font-label-sm text-[9px] sm:text-[10px] uppercase tracking-wider text-secondary font-semibold mb-1 opacity-90 group-hover:opacity-100">
                      Kamalam
                    </span>
                    <div className="relative">
                      <img
                        alt="Kamalam Soap Box"
                        className="w-full h-auto max-h-52 sm:max-h-64 object-contain drop-shadow-[0_18px_20px_rgba(57,37,29,0.35)]"
                        src={ASSETS.kamalamBox}
                      />
                      <div className="absolute -bottom-2 inset-x-1 h-3 bg-[#39251D]/35 blur-sm rounded-full -z-10"></div>
                    </div>
                  </div>

                  {/* 5. Rudraksha */}
                  <div 
                    onClick={() => onSelectSoap?.(4)}
                    className="w-[18%] flex flex-col items-center z-10 transition-transform duration-300 hover:-translate-y-2 group cursor-pointer"
                  >
                    <span className="font-label-sm text-[9px] sm:text-[10px] uppercase tracking-wider text-secondary font-semibold mb-1 opacity-90 group-hover:opacity-100">
                      Rudraksha
                    </span>
                    <div className="relative">
                      <img
                        alt="Rudraksha Soap Box"
                        className="w-full h-auto max-h-48 sm:max-h-60 object-contain drop-shadow-[0_14px_16px_rgba(57,37,29,0.32)]"
                        src={ASSETS.rudrakshaBox}
                      />
                      <div className="absolute -bottom-2 inset-x-1 h-3 bg-[#39251D]/30 blur-sm rounded-full -z-10"></div>
                    </div>
                  </div>
                </div>

                {/* Stone Pedestal Base Stage with Sacred Offerings */}
                <div className="relative z-25 w-full flex flex-col items-center pointer-events-none">
                  <div className="w-full px-1 relative flex items-center justify-center">
                    <img
                      alt="Stone Pedestal Stage"
                      className="w-full h-auto object-contain drop-shadow-[0_20px_28px_rgba(57,37,29,0.42)]"
                      src={ASSETS.stonePedestal}
                    />

                    {/* Left: Brass Diya Flame */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-6 w-12 sm:w-16 z-30 drop-shadow-md">
                      <img
                        alt="Brass Diya Flame"
                        className="w-full h-auto object-contain"
                        src={ASSETS.brassDiya}
                      />
                    </div>

                    {/* Golden Herbal Powder Bowl */}
                    <div className="absolute bottom-2 sm:bottom-3 left-14 sm:left-24 w-14 sm:w-20 z-30 drop-shadow-md">
                      <img
                        alt="Golden Herbal Powder Bowl"
                        className="w-full h-auto object-contain"
                        src={ASSETS.powderBowl}
                      />
                    </div>

                    {/* White Jasmine Flowers */}
                    <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 w-28 sm:w-36 z-30 drop-shadow-sm">
                      <img
                        alt="White Jasmine Flowers"
                        className="w-full h-auto object-contain"
                        src={ASSETS.jasmineFlowers}
                      />
                    </div>

                    {/* Sacred Pink Lotus */}
                    <div className="absolute bottom-3 sm:bottom-4 right-14 sm:right-24 w-16 sm:w-20 z-30 drop-shadow-md">
                      <img
                        alt="Sacred Pink Lotus"
                        className="w-full h-auto object-contain"
                        src={ASSETS.pinkLotus}
                      />
                    </div>

                    {/* Rudraksha Mala Beads */}
                    <div className="absolute bottom-2 sm:bottom-3 right-3 sm:right-6 w-14 sm:w-20 z-30 drop-shadow-md">
                      <img
                        alt="Rudraksha Mala Beads"
                        className="w-full h-auto object-contain"
                        src={ASSETS.rudrakshaMala}
                      />
                    </div>
                  </div>
                </div>

                {/* Feature Pill Row Under Stage */}
                <div className="relative z-30 w-full mt-3 px-3 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#faecd4]/95 via-[#f4e7cf] to-[#faecd4]/95 border border-[#C59A45]/60 shadow-md flex flex-wrap items-center justify-around gap-2 text-on-surface-variant font-label-sm text-[10px] sm:text-[11px] uppercase tracking-wider backdrop-blur-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#C59A45] text-[15px]">verified</span>
                    <span className="font-semibold text-primary">100% Handcrafted</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-[#C59A45]"></span>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#C59A45] text-[15px]">spa</span>
                    <span className="font-semibold text-primary">Devotional Pure Herbs</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-[#C59A45]"></span>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#C59A45] text-[15px]">local_florist</span>
                    <span className="font-semibold text-primary">Sacred Botanicals</span>
                  </div>
                </div>

                {/* Small Batch Indicator Tag */}
                <div className="w-full flex justify-end mt-2 pr-2">
                  <div className="bg-[#173d32] border-2 border-[#fdcd73] px-3.5 py-1.5 rounded-full shadow-xl inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse shadow-[0_0_6px_#4ade80]"></span>
                    <span className="font-label-sm text-[10px] text-[#ffdea6] uppercase tracking-widest font-bold">
                      Small-Batch Cold Processed
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
