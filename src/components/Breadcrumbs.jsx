import React from 'react';

/**
 * Accessible Breadcrumb navigation with schema markup support
 */
export default function Breadcrumbs({ items, onNavigate }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="w-full py-3">
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs font-medium text-[#7B5802]/80">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={idx} className="flex items-center gap-1.5 sm:gap-2">
              {idx > 0 && (
                <span className="material-symbols-outlined text-[14px] text-[#A89F91] select-none">
                  chevron_right
                </span>
              )}
              {isLast ? (
                <span className="text-[#173D32] font-semibold" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate(item.page, item.slug)}
                  className="hover:text-[#173D32] transition-colors underline-offset-4 hover:underline"
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
