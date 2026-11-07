import React, { useState } from 'react';

export default function PurityPromise() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const pillars = [
    {
      num: "01 • Purity",
      icon: "eco",
      title: "Natural Ingredients",
      desc: "Sourced conscientiously from native forests and organic medicinal farms without ecological disruption."
    },
    {
      num: "02 • Heritage",
      icon: "temple_hindu",
      title: "Traditional Inspiration",
      desc: "Rooted in centuries of sacred Vedic wellness, temple botanicals, and holistic Ayurvedic science."
    },
    {
      num: "03 • Patience",
      icon: "hourglass_top",
      title: "Thoughtfully Crafted",
      desc: "Small-batch cold-process curing aged six full weeks to preserve raw enzymatic and plant potency."
    },
    {
      num: "04 • Wholesome",
      icon: "health_and_safety",
      title: "Everyday Care",
      desc: "Free from synthetic fragrances, artificial foaming agents, sulfates, and harsh petroleum parabens."
    }
  ];

  return (
    <section className="w-full bg-surface py-space-xl lg:py-28 relative" id="ingredients">
      <div className="max-w-[1440px] mx-auto px-margin-mobile lg:px-margin">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-space-xl">
          <div className="flex items-center gap-space-sm mb-space-xs">
            <span className="w-6 h-[1px] bg-secondary"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary font-semibold">
              Our Guiding Pillars
            </span>
            <span className="w-6 h-[1px] bg-secondary"></span>
          </div>
          <h2 className="font-display-md text-display-md text-primary tracking-tight mb-space-xs font-serif">
            The Ananta Vijaya Purity Promise
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Conscientious craftsmanship from sacred seed to sovereign lather.
          </p>
        </div>

        {/* 4 Minimal Icon Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="bg-surface-container rounded-xl p-space-lg flex flex-col items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-md group border border-[#E8D4B5]/30"
            >
              <div className="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-surface-container transition-colors duration-300 mb-space-md">
                <span className="material-symbols-outlined text-[28px]">{pillar.icon}</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary mb-space-xs font-serif">
                {pillar.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {pillar.desc}
              </p>
              <span className="mt-space-md font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
                {pillar.num}
              </span>
            </div>
          ))}
        </div>

        {/* Botanical Dossier Newsletter / Exploration Box */}
        <div className="mt-space-xl bg-surface-container-low p-space-lg lg:p-space-xl flex flex-col md:flex-row items-center justify-between gap-space-lg rounded-2xl border border-[#E8D4B5]">
          <div className="max-w-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary font-semibold mb-space-xs block">
              Apothecary Dispatch
            </span>
            <h3 className="font-headline-lg text-headline-lg text-primary mb-space-xs font-serif">
              Receive Our Seasonal Botanical Journal
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Insights into sacred Ayurvedic bathing traditions, seasonal transitions, and new small-batch releases.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 bg-[#173D32] text-[#ffdea6] px-6 py-3.5 rounded-full shadow-md">
                <span className="material-symbols-outlined text-secondary-fixed">check_circle</span>
                <span className="font-label-md text-sm font-semibold uppercase tracking-wider">
                  Welcome to the Ananta Vijaya Circle!
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-space-xs">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-space-md py-space-sm bg-surface text-on-surface font-body-sm text-body-sm focus:outline-none min-w-[260px] shadow-sm rounded-sm border border-[#E8D4B5]"
                />
                <button
                  type="submit"
                  className="px-space-lg py-space-sm bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest hover:bg-primary-container transition-colors shadow-sm rounded-sm whitespace-nowrap"
                >
                  Join Circle
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
