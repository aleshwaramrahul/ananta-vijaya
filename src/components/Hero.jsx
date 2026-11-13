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
          <div className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-space-md">
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
                <span>Handcrafted</span>
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

          {/* Right Column: Curated 3D Product Stage with All 5 Packaging Boxes & Temple Arch (Enlarged Luxury Showcase) */}
          <div className="lg:col-span-7 relative mt-6 lg:mt-0 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[840px] aspect-[16/9.2] select-none mx-auto flex items-center justify-center overflow-visible scale-[1.03] lg:scale-[1.08] origin-center">
              
              {/* 1. Ambient Golden Radial Glow Behind Arch */}
              <div className="absolute inset-0 bg-radial from-[#fdcd73]/35 via-[#E8D4B5]/25 to-transparent blur-3xl pointer-events-none -z-10"></div>

              {/* 2. Golden Indian Carved Temple Arch Backdrop - Expanded & Grand */}
              <div className="absolute top-0 inset-x-0 bottom-[3%] w-full flex items-start justify-center pointer-events-none z-0 overflow-hidden">
                <img 
                  alt="Ornate Temple Arch" 
                  className="w-[86%] sm:w-[84%] h-auto object-contain drop-shadow-[0_14px_32px_rgba(123,88,2,0.28)]" 
                  src={ASSETS.templeArch} 
                />
              </div>

              {/* 3. Sacred Golden Line-Art Lotus Mandala Ring (Enlarged & Positioned Behind Soaps) */}
              <div className="absolute top-[4%] sm:top-[3%] left-1/2 -translate-x-1/2 w-[64%] sm:w-[62%] aspect-square pointer-events-none z-5 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#fdcd73]/50 via-[#E8D4B5]/30 to-transparent blur-3xl"></div>
                <img
                  alt="Lotus Mandala Ring"
                  className="w-full h-full object-contain animate-[spin_90s_linear_infinite] opacity-95 drop-shadow-[0_0_36px_rgba(253,205,115,0.55)]"
                  src={ASSETS.lotusMandala}
                />
              </div>


              {/* 5. Left Upper Arch: Lush Botanical Bilvam Branch Framing */}
              <div className="absolute top-[2%] left-[6%] sm:left-[7%] w-[17%] sm:w-[18%] z-20 pointer-events-none drop-shadow-md">
                <img alt="Bilvam Leaves Left" className="w-full h-auto object-contain -rotate-12" src={ASSETS.bilvamLeaves} />
              </div>

              {/* 6. Right Upper Arch: Lush Botanical Bilvam Branch Framing */}
              <div className="absolute top-[2%] right-[6%] sm:right-[7%] w-[17%] sm:w-[18%] z-20 pointer-events-none drop-shadow-md">
                <img alt="Bilvam Leaves Right" className="w-full h-auto object-contain rotate-45 scale-x-[-1]" src={ASSETS.bilvamLeaves} />
              </div>

              {/* 7. Upper Right: "THE DIVINE COLLECTION" Medallion (Hanging on Right Pillar) */}
              <div className="absolute top-[16%] sm:top-[17%] right-[6%] sm:right-[7%] z-30 pointer-events-none flex flex-col items-center">
                {/* Golden Hanging Loop */}
                <div className="w-[3px] h-3.5 sm:h-4.5 bg-gradient-to-b from-[#C59A45] via-[#fdcd73] to-[#7b5802] rounded-full shadow-sm"></div>
                <div className="relative w-18 h-18 sm:w-22 sm:h-22 lg:w-24 lg:h-24 rounded-full bg-gradient-to-tr from-[#7b5802] via-[#fdcd73] to-[#C59A45] p-[3px] shadow-[0_14px_28px_rgba(57,37,29,0.38)] flex items-center justify-center border-2 border-[#ffdea6]">
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-[#fffcf7] via-[#faecd4] to-[#f0e4cf] border border-[#C59A45]/70 flex flex-col items-center justify-center text-center p-1 sm:p-1.5 shadow-inner">
                    <span className="font-serif text-[8px] sm:text-[9.5px] lg:text-[10px] uppercase tracking-[0.24em] text-[#7b5802] font-semibold leading-tight">The</span>
                    <span className="font-serif text-[12px] sm:text-[14.5px] lg:text-[16px] font-bold text-[#173D32] tracking-wider uppercase leading-tight my-0.5">Divine</span>
                    <span className="font-serif text-[8.5px] sm:text-[10px] lg:text-[10.5px] font-semibold text-[#7b5802] tracking-wider uppercase leading-tight">Collection</span>
                    {/* Lotus Icon */}
                    <svg className="w-4 h-4 text-[#C59A45] mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3c-1.5 2.5-3 5-3 8 0 2.5 1.5 4 3 5 1.5-1 3-2.5 3-5 0-3-1.5-5.5-3-8zm-4.5 5.5C6.3 10 5 12 5 14c0 2 1.3 3.5 3 4.2-.8-1.5-1-3.2-.5-4.7.4-1.5 1.3-3.2 0-5zm9 0c-1.3 1.8-.4 3.5 0 5 .5 1.5.3 3.2-.5 4.7 1.7-.7 3-2.2 3-4.2 0-2-1.3-4-2.5-5.5z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* 8. "CONSECRATED BAR" Forest Green Ribbon Badge (Centered in Arch Opening) */}
              <div className="absolute top-[37%] left-1/2 -translate-x-1/2 z-25 pointer-events-none">
                <div className="inline-flex items-center gap-2 sm:gap-3 px-4.5 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#063426] border border-[#d4af37] shadow-[0_8px_20px_rgba(0,39,29,0.5)] ring-1 ring-[#fdcd73]/60 backdrop-blur-sm">
                  {/* Left Lotus */}
                  <svg className="w-4 sm:w-4.5 h-4 sm:h-4.5 text-[#fdcd73] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.5 2 2 6.5 2 12c4 0 7-1.5 9-4 2 2.5 5 4 9 4 0-5.5-4.5-10-10-10zm-1 9c-1.5 1.5-3.5 2.5-6 2.8 1-2.5 3-4.5 6-5.3V11zm2 0V8.5c3 .8 5 2.8 6 5.3-2.5-.3-4.5-1.3-6-2.8z"/>
                  </svg>
                  <span className="font-serif text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.25em] text-[#ffdea6] drop-shadow-sm whitespace-nowrap">
                    Consecrated Bar
                  </span>
                  {/* Right Lotus */}
                  <svg className="w-4 sm:w-4.5 h-4 sm:h-4.5 text-[#fdcd73] shrink-0 rotate-180" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.5 2 2 6.5 2 12c4 0 7-1.5 9-4 2 2.5 5 4 9 4 0-5.5-4.5-10-10-10zm-1 9c-1.5 1.5-3.5 2.5-6 2.8 1-2.5 3-4.5 6-5.3V11zm2 0V8.5c3 .8 5 2.8 6 5.3-2.5-.3-4.5-1.3-6-2.8z"/>
                  </svg>
                </div>
              </div>

              {/* 9. The 5 Soap Boxes Row (Resting on top of the stone pedestal - Moved Down) */}
              <div className="absolute bottom-[18.5%] sm:bottom-[19%] inset-x-0 w-[95%] sm:w-[93%] mx-auto flex items-end justify-center select-none z-20 pointer-events-auto">
                
                {/* Box 1: Kamalam Soap (Pink) */}
                <div 
                  className="w-[18%] sm:w-[17.5%] flex flex-col items-center z-10 transition-transform duration-300 hover:-translate-y-2 group cursor-pointer origin-bottom"
                  onClick={() => onSelectSoap?.(3)}
                >
                  <div className="relative w-full">
                    <img alt="Kamalam Soap Box" className="w-full h-auto object-contain drop-shadow-[0_16px_22px_rgba(57,37,29,0.48)]" src={ASSETS.kamalamBox} />
                    <div className="absolute -bottom-1 inset-x-2 h-3.5 bg-[#173D32]/45 blur-sm rounded-full -z-10"></div>
                  </div>
                </div>

                {/* Box 2: Rudraksha Soap (Dark Brown) */}
                <div 
                  className="w-[20%] sm:w-[19.5%] flex flex-col items-center z-15 -ml-[1.5%] transition-transform duration-300 hover:-translate-y-2 group cursor-pointer origin-bottom"
                  onClick={() => onSelectSoap?.(1)}
                >
                  <div className="relative w-full">
                    <img alt="Rudraksha Soap Box" className="w-full h-auto object-contain drop-shadow-[0_18px_24px_rgba(57,37,29,0.52)]" src={ASSETS.rudrakshaBox} />
                    <div className="absolute -bottom-1 inset-x-2 h-3.5 bg-[#173D32]/50 blur-sm rounded-full -z-10"></div>
                  </div>
                </div>

                {/* Box 3: Vibhudi Soap (Navy Blue - Center Hero) */}
                <div 
                  className="w-[27%] sm:w-[26.5%] flex flex-col items-center z-25 -ml-[1.5%] -mr-[1.5%] scale-[1.08] origin-bottom transition-transform duration-300 hover:-translate-y-2 group cursor-pointer"
                  onClick={() => onSelectSoap?.(0)}
                >
                  <div className="relative w-full">
                    <img alt="Vibhudi Soap Box" className="w-full h-auto object-contain drop-shadow-[0_24px_34px_rgba(23,61,50,0.6)]" src={ASSETS.vibhudiBox} />
                    <div className="absolute -bottom-1 inset-x-2 h-4.5 bg-[#173d32]/65 blur-md rounded-full -z-10"></div>
                  </div>
                </div>

                {/* Box 4: Bilvam Soap (Forest Green) */}
                <div 
                  className="w-[20%] sm:w-[19.5%] flex flex-col items-center z-15 transition-transform duration-300 hover:-translate-y-2 group cursor-pointer origin-bottom"
                  onClick={() => onSelectSoap?.(2)}
                >
                  <div className="relative w-full">
                    <img alt="Bilvam Soap Box" className="w-full h-auto object-contain drop-shadow-[0_18px_24px_rgba(57,37,29,0.52)]" src={ASSETS.bilvamBox} />
                    <div className="absolute -bottom-1 inset-x-2 h-3.5 bg-[#173D32]/50 blur-sm rounded-full -z-10"></div>
                  </div>
                </div>

                {/* Box 5: Kadamba Soap (Orange) */}
                <div 
                  className="w-[18%] sm:w-[17.5%] flex flex-col items-center z-10 -ml-[1.5%] transition-transform duration-300 hover:-translate-y-2 group cursor-pointer origin-bottom"
                  onClick={() => onSelectSoap?.(4)}
                >
                  <div className="relative w-full">
                    <img alt="Kadamba Soap Box" className="w-full h-auto object-contain drop-shadow-[0_16px_22px_rgba(57,37,29,0.48)]" src={ASSETS.kadambaBox} />
                    <div className="absolute -bottom-1 inset-x-2 h-3.5 bg-[#173D32]/45 blur-sm rounded-full -z-10"></div>
                  </div>
                </div>

              </div>

              {/* 10. Natural Stone Pedestal Platform (Covering Ground Pillars) */}
              <div className="absolute bottom-[-0.5%] sm:bottom-[-1%] inset-x-0 w-[100%] sm:w-[98%] mx-auto z-15 pointer-events-none flex items-center justify-center">
                <img 
                  alt="Natural Stone Pedestal Platform" 
                  className="w-full h-auto object-contain drop-shadow-[0_20px_30px_rgba(57,37,29,0.48)]" 
                  src={ASSETS.stonePedestal} 
                />
              </div>

              {/* 11. Foreground Sacred Offerings (Resting directly along the front of the stone ledge - Moved Down) */}
              <div className="absolute inset-x-0 bottom-[-4%] sm:bottom-[-5%] w-full h-[32%] pointer-events-none z-30">
                
                {/* Lit Brass Diya (Bottom Left) */}
                <div className="absolute bottom-[6%] left-[2.5%] sm:left-[3.5%] w-[13.5%] sm:w-[14.5%] drop-shadow-xl">
                  <img alt="Traditional Brass Diya Flame" className="w-full h-auto object-contain" src={ASSETS.brassDiya} />
                </div>

                {/* White Ash Powder Bowl (Beside Diya) */}
                <div className="absolute bottom-[6%] left-[16%] sm:left-[17%] w-[10.5%] sm:w-[11.5%] drop-shadow-lg">
                  <img alt="Ayurvedic Herbal Powder Bowl" className="w-full h-auto object-contain" src={ASSETS.powderBowl} />
                </div>

                {/* Fresh White Jasmine Flowers (Center Front) */}
                <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[25%] sm:w-[27%] drop-shadow-2xl z-35">
                  <img alt="White Jasmine Flowers" className="w-full h-auto object-contain" src={ASSETS.jasmineFlowers} />
                </div>

                {/* Blooming Pink Lotus (Mid Right) */}
                <div className="absolute bottom-[6%] right-[15%] sm:right-[16%] w-[14.5%] sm:w-[15.5%] drop-shadow-xl">
                  <img alt="Sacred Pink Lotus Flower" className="w-full h-auto object-contain" src={ASSETS.pinkLotus} />
                </div>

                {/* Sacred Rudraksha Beads Cluster (Far Right) */}
                <div className="absolute bottom-[6%] right-[2.5%] sm:right-[3.5%] w-[10.5%] sm:w-[11.5%] drop-shadow-lg">
                  <img alt="Sacred Rudraksha Beads" className="w-full h-auto object-contain" src={ASSETS.rudrakshaMala} />
                </div>

              </div>

            </div>
          </div>
</div>

        {/* 4-FEATURE LUXURY TRUST BAR (Inspired by Reference Design) */}
        <div className="mt-10 sm:mt-14 max-w-6xl mx-auto">
          <div className="relative bg-[#FAF5EB]/95 border border-[#E8D4B5] rounded-xl sm:rounded-2xl px-5 sm:px-8 py-5 sm:py-6 shadow-[0_4px_20px_rgba(57,37,29,0.06)]">
            {/* Ornate Corner Accents */}
            <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#C59A45]/70 rounded-tl-sm pointer-events-none"></div>
            <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#C59A45]/70 rounded-tr-sm pointer-events-none"></div>
            <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#C59A45]/70 rounded-bl-sm pointer-events-none"></div>
            <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#C59A45]/70 rounded-br-sm pointer-events-none"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center">
              {/* Feature 1 */}
              <div className="flex items-center gap-3 sm:gap-3.5 pr-2">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#faecd4] border border-[#E8D4B5] flex items-center justify-center shrink-0 text-[#7B5802] shadow-sm">
                  <span className="material-symbols-outlined text-[20px] sm:text-[22px]">eco</span>
                </div>
                <div>
                  <div className="font-serif font-bold text-xs sm:text-sm text-[#00271d] leading-tight">Handcrafted</div>
                  <div className="font-sans text-[11px] sm:text-xs text-[#576B65] leading-tight mt-0.5">Traditional small-batch process</div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3 sm:gap-3.5 pr-2">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#faecd4] border border-[#E8D4B5] flex items-center justify-center shrink-0 text-[#7B5802] shadow-sm">
                  <span className="material-symbols-outlined text-[20px] sm:text-[22px]">spa</span>
                </div>
                <div>
                  <div className="font-serif font-bold text-xs sm:text-sm text-[#00271d] leading-tight">Sacred Botanicals</div>
                  <div className="font-sans text-[11px] sm:text-xs text-[#576B65] leading-tight mt-0.5">Pure Ayurvedic ingredients</div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3 sm:gap-3.5 pr-2">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#faecd4] border border-[#E8D4B5] flex items-center justify-center shrink-0 text-[#7B5802] shadow-sm">
                  <span className="material-symbols-outlined text-[20px] sm:text-[22px]">water_drop</span>
                </div>
                <div>
                  <div className="font-serif font-bold text-xs sm:text-sm text-[#00271d] leading-tight">Virgin Plant Oils</div>
                  <div className="font-sans text-[11px] sm:text-xs text-[#576B65] leading-tight mt-0.5">Nourishing & skin-friendly</div>
                </div>
              </div>
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
