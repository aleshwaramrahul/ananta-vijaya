import React from 'react';
import { ASSETS } from '../data/soaps';

export default function BrandRitual() {
  return (
    <section className="w-full bg-surface-container-low py-space-xl lg:py-32 relative" id="rituals">
      <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          
          {/* Left Side: Visual Sanctuary Editorial Card */}
          <div className="lg:col-span-6 relative flex flex-col justify-between">
            <div className="w-full h-full min-h-[440px] relative overflow-hidden shadow-md rounded-2xl">
              <img
                className="w-full h-full object-cover"
                alt="Ayurvedic Soap Sanctuary"
                src={ASSETS.sanctuaryRitual}
              />
              
              {/* Inset Quote Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-surface/90 backdrop-blur-md p-space-md shadow-lg rounded-xl border border-[#E8D4B5]/60">
                <p className="font-headline-sm text-headline-sm text-primary italic mb-space-xs font-serif">
                  "Bathing is not merely cleansing of the body, but purification of the spirit."
                </p>
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
                  Charaka Samhita • Chapter VI
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Rich Forest Green Highlight Card */}
          <div className="lg:col-span-6 bg-primary-container p-space-lg lg:p-space-xl flex flex-col justify-center text-surface-container shadow-xl relative overflow-hidden rounded-2xl">
            
            {/* Subtle Botanical Emblem in background */}
            <div className="absolute -right-16 -bottom-16 w-80 h-80 opacity-5 pointer-events-none">
              <img
                alt="Emblem"
                className="w-full h-full object-contain"
                src={ASSETS.logo}
              />
            </div>

            <div className="relative z-10 flex flex-col items-start">
              <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary-fixed mb-space-sm font-semibold">
                The Sacred Bathing Ritual
              </span>
              <h2 className="font-display-md text-display-md text-surface tracking-tight mb-space-md leading-tight font-serif">
                Small Daily Rituals.<br />
                <span className="text-secondary-fixed italic font-normal">Big Natural Care.</span>
              </h2>
              <p className="font-body-lg text-body-lg text-on-primary-container mb-space-lg leading-relaxed max-w-lg">
                Bring nature-inspired traditions into your everyday skincare routine. Crafted slowly in small batches using time-honored artisanal saponification and consecrated Ayurvedic herbs harvested with reverence.
              </p>

              {/* Ritual Step Elements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md w-full mb-space-xl pt-space-xs">
                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-secondary-fixed text-[24px]">
                    water_drop
                  </span>
                  <div>
                    <h4 className="font-headline-sm text-[16px] text-surface font-serif font-semibold">
                      Pure Cold Infusion
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-primary-container">
                      Preserves heat-sensitive plant alkaloids.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-secondary-fixed text-[24px]">
                    self_improvement
                  </span>
                  <div>
                    <h4 className="font-headline-sm text-[16px] text-surface font-serif font-semibold">
                      Mindful Grounding
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-primary-container">
                      Scent notes composed for meditative focus.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="#collection"
                className="inline-flex items-center gap-space-sm px-space-lg py-space-sm bg-secondary-fixed hover:bg-secondary-fixed-dim text-on-secondary-fixed font-label-md text-label-md uppercase tracking-widest rounded-full transition-all duration-300 shadow-md font-semibold"
              >
                <span>Know Our Story</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
