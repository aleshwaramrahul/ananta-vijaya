import React from 'react';
import { ASSETS } from '../data/soaps';

export default function Footer({ onSelectSoap }) {
  return (
    <footer className="w-full bg-primary-container text-surface-container py-space-xl" id="contact">
      <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <div className="flex items-center gap-3.5">
              <img
                alt="Ananta Vijaya Logo"
                className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
                src={ASSETS.logo}
              />
              <div className="flex flex-col justify-center">
                <span className="font-headline-sm text-[20px] sm:text-[22px] text-surface tracking-wider uppercase font-serif font-bold leading-none">
                  Ananta Vijaya
                </span>
                <span className="font-label-sm text-[10px] sm:text-[11px] text-secondary-fixed-dim tracking-[0.25em] uppercase font-semibold mt-1">
                  Handmade Botanicals
                </span>
              </div>
            </div>
            
            <p className="font-body-md text-body-md text-on-primary-container pr-space-md leading-relaxed">
              Sacred botanicals, cold-pressed purity, and Ayurvedic craftsmanship distilled into ritual cleansing bars. Formulated with reverence for timeless wellness.
            </p>

            <div className="flex items-center gap-space-md pt-space-xs text-secondary-fixed-dim">
              <span className="material-symbols-outlined cursor-pointer hover:text-surface transition-colors">
                public
              </span>
              <span className="material-symbols-outlined cursor-pointer hover:text-surface transition-colors">
                spa
              </span>
              <span className="material-symbols-outlined cursor-pointer hover:text-surface transition-colors">
                local_florist
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 flex flex-col gap-space-sm">
            <h3 className="font-label-lg text-label-lg text-secondary-fixed tracking-wider uppercase mb-space-xs font-semibold">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-primary-container">
              <li>
                <a className="hover:text-surface transition-colors" href="#home">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-surface transition-colors" href="#rituals">
                  Our Story
                </a>
              </li>
              <li>
                <a className="hover:text-surface transition-colors" href="#rituals">
                  Rituals &amp; Doshas
                </a>
              </li>
              <li>
                <a className="hover:text-surface transition-colors" href="#ingredients">
                  Sourcing &amp; Purity
                </a>
              </li>
              <li>
                <a className="hover:text-surface transition-colors" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Our Soaps */}
          <div className="lg:col-span-3 flex flex-col gap-space-sm">
            <h3 className="font-label-lg text-label-lg text-secondary-fixed tracking-wider uppercase mb-space-xs font-semibold">
              Our Soaps
            </h3>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-primary-container">
              <li>
                <a
                  className="hover:text-surface transition-colors cursor-pointer"
                  onClick={() => onSelectSoap?.(3)}
                  href="#collection"
                >
                  Vibhudi Sacred Ash
                </a>
              </li>
              <li>
                <a
                  className="hover:text-surface transition-colors cursor-pointer"
                  onClick={() => onSelectSoap?.(0)}
                  href="#collection"
                >
                  Bilvam Holy Leaf
                </a>
              </li>
              <li>
                <a
                  className="hover:text-surface transition-colors cursor-pointer"
                  onClick={() => onSelectSoap?.(2)}
                  href="#collection"
                >
                  Kamalam Red Lotus
                </a>
              </li>
              <li>
                <a
                  className="hover:text-surface transition-colors cursor-pointer"
                  onClick={() => onSelectSoap?.(1)}
                  href="#collection"
                >
                  Kadamba Wild Flower
                </a>
              </li>
              <li>
                <a
                  className="hover:text-surface transition-colors cursor-pointer"
                  onClick={() => onSelectSoap?.(4)}
                  href="#collection"
                >
                  Rudraksha Seed &amp; Herb
                </a>
              </li>
            </ul>
          </div>

          {/* Apothecary Atelier */}
          <div className="lg:col-span-3 flex flex-col gap-space-sm">
            <h3 className="font-label-lg text-label-lg text-secondary-fixed tracking-wider uppercase mb-space-xs font-semibold">
              Apothecary Atelier
            </h3>
            <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-primary-container">
              <p>Sanctuary Estate, Old Temple Road</p>
              <p>Kerala &amp; Karnataka Botanical Orchards</p>
              <p className="text-secondary-fixed-dim pt-space-xs font-medium">care@anantavijaya.com</p>
              <p>+91 (0) 80 2847 9100</p>
            </div>
          </div>

        </div>

        {/* Bottom copyright and legal */}
        <div className="mt-space-xl pt-space-md border-t border-surface-container/20 flex flex-col sm:flex-row items-center justify-between text-on-primary-container font-label-sm text-label-sm gap-space-sm">
          <p>© 2025 ANANTA VIJAYA. All rights reserved. Handcrafted in India.</p>
          <div className="flex items-center gap-space-md">
            <a className="hover:text-surface transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-surface transition-colors" href="#">
              Terms of Ritual
            </a>
            <a className="hover:text-surface transition-colors" href="#">
              Shipping &amp; Botanical Care
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
