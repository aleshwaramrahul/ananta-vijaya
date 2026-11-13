import React from 'react';
import { ASSETS } from '../data/soaps';

export default function Footer({ onSelectSoap }) {
  return (
    <footer className="w-full bg-primary-container text-surface-container py-space-xl" id="contact">
      <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <div className="flex items-center gap-4">
              <img
                alt="Ananta Vijaya Logo"
                className="h-20 sm:h-24 md:h-[104px] w-auto object-contain shrink-0 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                src={ASSETS.logo}
              />
              <div className="flex flex-col justify-center">
                <span className="font-headline-sm text-[20px] sm:text-[22px] text-surface tracking-wider uppercase font-serif font-bold leading-none">
                  Ananta Vijaya Pvt. Ltd.
                </span>
                <span className="font-label-sm text-[10px] sm:text-[11px] text-secondary-fixed-dim tracking-[0.16em] uppercase font-semibold mt-1">
                  Nature's Trust &amp; Herbal Purity
                </span>
              </div>
            </div>
            
            <p className="font-body-md text-body-md text-on-primary-container pr-space-md leading-relaxed">
              Sacred botanicals, pure plant extraction, and Ayurvedic craftsmanship distilled into ritual cleansing bars. Formulated with reverence for timeless wellness.
            </p>

            <div className="flex items-center gap-3 text-secondary-fixed-dim pt-space-xs">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-surface/5 border border-secondary/30 flex items-center justify-center hover:bg-secondary hover:text-surface transition-all duration-300 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-surface/5 border border-secondary/30 flex items-center justify-center hover:bg-secondary hover:text-surface transition-all duration-300 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-surface/5 border border-secondary/30 flex items-center justify-center hover:bg-secondary hover:text-surface transition-all duration-300 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
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
