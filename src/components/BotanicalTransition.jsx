import React from 'react';

const ASSETS = {
  lotusMandala: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeOOkTHOBDGtBCE8y-JHcrA4aaTsqCKIQHAwSHN3H_ZYMBkWfm87vQE42kdXLbD5Kktt0qghSDbbI4R7-NpNPAJ3NA7eM99US9vS_fwz5l60hlP-6zAzt4kAB36mci-OyQ7lUm6yR5fHSgot3CY93dloJihwtdUNpP_0DMJm9irzARBkMMdORhS_kh5b1pto6QT9OETNVmqnsOclp8vydvzX44Cqz0cGmvOIbqGR_0RuInDz12QtqTBA",
  bilvamLeaves: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxckMUz1kSItV6wZPC8-stJnZgJnoRhY39Gy13VIbyqW5JY2oZaJF39oOQEBT-4OMB1Ym7_1nPD5CgkgrUOywgku6hvBjfSgN97xyRYIQHeGvP3bJ2Iq2kB8iDx_XqI1gL0kiFfb9nZfyDgyHRDzZUK-oDJ8NTKMDf_0Rtpvo1BmLjPRX3ok3BabTS7l3lJ168WJ5cVvzYLrBIhliq_bEBihvFZmCn2RVdMi5ZWeNW0t9mJFDajs5aTA",
  jasmineFlowers: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcYkffTcnT-o5diaTuiAhdW-53bFPKbXgt7jKLuNX6bIIUuSm3chYroIcIpufLPqI13UPWUXFJpW6chgz-eOFdRE0t00_D49rQFNXLG4wzOh6_YD4Y1KNCLwDoeyQgRcUMz0Hbagoi_tV3XuhLKVSTYOH785ft72JarwasciNLEssu5-QfAXrpu6WxaJ3eP7e0y-R-RuehfoXU3Vxct9IjpugmPkPr8HmIV6ocwXBU-sh8GWNIgumuyg",
  powderBowl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaOzDIlxFZITculeKeKlAiLFhQhlTk_c3VcVL5bF65XkOMW2qlf4Mlhq8wcMqNN_LUII0tKRAMwm5r8Q8RvZ3VRmmkCqTShw3SWjTYKH4J4FGBtvOknK8wZc5QLGtWY9sJUKvkA8KJJP2R-adD78fnsQD1xCSSHTzz-FT-k_juLCy-Yt5IJ-6T9h2d75EThGgF9R_XgMrh7TqEliYnL9ELcdfRG9QOUEZxoL4UkIuHzkNu_ltx8Ezzlg",
  pinkLotus: "https://lh3.googleusercontent.com/aida-public/AB6AXuAq1d05srPbKkjkOeA5dF4l68ih_Bx4elzDMeAmyKdR5u5mDBInUdDThCxkIiQulv7jUOXJu3O9tgIClsJ80rOUXQva8EStaJkbZlaQ9VkHzIlbboTccs-kxarqR1NuTLqP56byaQbb4lih1Eh-YG_dDj6OAhTD0oDlSXU4hAmwaRhehppRcAGHXUS3I7RZm2ZRi-KcyNiY1BhY8sj8urWd7zGvu4BA96uKWqIftRguX6p5jJIr2QK0mQ",
  rudrakshaMala: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOwgGtCtgEqUgYs1GU-y12W8GQWboRQ8W2_AYX6zMORDNwijcTx2D1viW0PopSdLjn7lgiqA2zLPhgFT7lxvSY33c8K7bmh_ikf0DbZ2ESZ45Q1e0_lRIHrZi_fJqhvrHGOoNWwTryLJ92OCWkB5uXWCWNajtIgh1NLOge1IYsElS0QGwoITkSXgSC_ncbPeknnE43XlckMErCEmJgbhz2k_TDIs8nYMHoh5r3NOdFgpcGDxDJIcQzcw"
};

export default function BotanicalTransition() {
  return (
    <section className="relative w-full bg-[#FFF0D8] bg-gradient-to-b from-[#FFF0D8] via-[#FFF3E1] to-[#FFF0D8] min-h-[175px] lg:h-[185px] flex items-center justify-center overflow-hidden border-t border-b border-[#E8D4B5]/40 select-none z-20">
      
      {/* ================= LEFT SIDE BOTANICAL DECORATIONS ================= */}
      {/* Subtle Golden Mandala Pattern in Background */}
      <div className="absolute -left-12 lg:-left-16 -top-10 w-56 h-56 lg:w-64 lg:h-64 opacity-25 pointer-events-none select-none z-0">
        <img
          alt=""
          src={ASSETS.lotusMandala}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Large Botanical Leaves Extending from Left Edge */}
      <img
        alt=""
        src={ASSETS.bilvamLeaves}
        className="absolute -left-4 lg:-left-1 bottom-0 w-32 sm:w-44 lg:w-56 object-contain drop-shadow-[0_8px_14px_rgba(57,37,29,0.18)] -rotate-12 pointer-events-none select-none z-10 transition-transform duration-500"
      />

      {/* White Jasmine Flowers at Bottom-Left */}
      <img
        alt=""
        src={ASSETS.jasmineFlowers}
        className="absolute left-10 sm:left-16 lg:left-24 bottom-1 sm:bottom-2 w-18 sm:w-24 lg:w-28 object-contain drop-shadow-[0_4px_8px_rgba(57,37,29,0.15)] pointer-events-none select-none z-20"
      />

      {/* Small Traditional Brass Powder Bowl */}
      <img
        alt=""
        src={ASSETS.powderBowl}
        className="hidden xs:block absolute left-22 sm:left-32 lg:left-44 bottom-1 sm:bottom-2 w-14 sm:w-20 lg:w-24 object-contain drop-shadow-[0_6px_10px_rgba(57,37,29,0.22)] pointer-events-none select-none z-20"
      />

      {/* ================= CENTER EDITORIAL CONTENT ================= */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-4 lg:py-0 max-w-2xl mx-auto">
        
        {/* Top Golden Ornamental Divider with Lotus Line-Art */}
        <div className="flex items-center justify-center gap-3 w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[480px] mb-2">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C59A45]/70 to-[#C59A45]"></div>
          
          {/* Delicate Lotus Line-Art Icon */}
          <svg
            className="w-7 h-7 text-[#C59A45] flex-shrink-0"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 5C12.8 8.2 10.6 11.5 10.6 15C10.6 17.2 12.1 19 14 19C15.9 19 17.4 17.2 17.4 15C17.4 11.5 15.2 8.2 14 5Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 19C11.5 19 7 16.5 7 12.8C7 10 9.2 8.2 11.2 7.8"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M14 19C16.5 19 21 16.5 21 12.8C21 10 18.8 8.2 16.8 7.8"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M10 19C7.8 19 4 16.8 4 14.5"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M18 19C20.2 19 24 16.8 24 14.5"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <circle cx="14" cy="21" r="0.9" fill="currentColor" />
          </svg>
          
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C59A45]/70 to-[#C59A45]"></div>
        </div>

        {/* Main Heading */}
        <h2 className="font-serif text-[#073D30] text-2xl sm:text-3xl lg:text-[40px] font-medium tracking-tight leading-[1.18] my-1">
          The Essence of Sacred Botanicals
        </h2>

        {/* Description Paragraph */}
        <p className="font-sans text-[#554E45] text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed max-w-xl mt-0.5">
          Five unique handcrafted soaps, inspired by ancient Indian traditions and the goodness of nature.
        </p>

        {/* Bottom Golden Ornamental Divider with Floral Knot */}
        <div className="flex items-center justify-center gap-3 w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[400px] mt-2">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C59A45]/70 to-[#C59A45]"></div>
          
          {/* Floral Knot Traditional Symbol */}
          <svg
            className="w-5 h-5 text-[#C59A45] flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3C13.5 6 15.5 8 18.5 9.5C15.5 11 13.5 13 12 16C10.5 13 8.5 11 5.5 9.5C8.5 8 10.5 6 12 3Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M12 16C12.8 17.5 14 18.8 16 19.5C14 20.2 12.8 21.5 12 23C11.2 21.5 10 20.2 8 19.5C10 18.8 11.2 17.5 12 16Z"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinejoin="round"
              opacity="0.8"
            />
            <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
          </svg>
          
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C59A45]/70 to-[#C59A45]"></div>
        </div>
      </div>

      {/* ================= RIGHT SIDE BOTANICAL DECORATIONS ================= */}
      {/* Subtle Golden Mandala Pattern in Background */}
      <div className="absolute -right-12 lg:-right-16 -top-10 w-56 h-56 lg:w-64 lg:h-64 opacity-25 pointer-events-none select-none z-0">
        <img
          alt=""
          src={ASSETS.lotusMandala}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Large Botanical Leaves Extending from Right Edge */}
      <img
        alt=""
        src={ASSETS.bilvamLeaves}
        className="absolute -right-4 lg:-right-1 bottom-0 w-32 sm:w-44 lg:w-56 object-contain drop-shadow-[0_8px_14px_rgba(57,37,29,0.18)] rotate-45 scale-x-[-1] pointer-events-none select-none z-10 transition-transform duration-500"
      />

      {/* Pink Lotus Flower near Bottom-Right */}
      <img
        alt=""
        src={ASSETS.pinkLotus}
        className="absolute right-12 sm:right-20 lg:right-28 bottom-1 sm:bottom-2 w-18 sm:w-24 lg:w-28 object-contain drop-shadow-[0_6px_10px_rgba(57,37,29,0.18)] pointer-events-none select-none z-20"
      />

      {/* Rudraksha Beads Beside the Lotus */}
      <img
        alt=""
        src={ASSETS.rudrakshaMala}
        className="hidden xs:block absolute right-3 sm:right-8 lg:right-12 bottom-1 sm:bottom-2 w-14 sm:w-18 lg:w-20 object-contain drop-shadow-[0_4px_8px_rgba(57,37,29,0.2)] pointer-events-none select-none z-20"
      />

    </section>
  );
}
