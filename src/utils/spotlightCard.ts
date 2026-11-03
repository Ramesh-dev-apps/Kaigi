import React from 'react';

/**
 * Tactile spotlight-follow handlers for interactive cards.
 * Tracks local cursor coordinates (--card-mouse-x, --card-mouse-y) and
 * boosts both the card's local radial illumination and the ambient cursor spotlight
 * when the pointer enters the card surface.
 */
export const spotlightCardProps = {
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--card-mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--card-mouse-y', `${e.clientY - rect.top}px`);
    e.currentTarget.setAttribute('data-spotlight-active', 'true');
    document.documentElement.setAttribute('data-card-hovered', 'true');
  },
  onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--card-mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--card-mouse-y', `${e.clientY - rect.top}px`);
  },
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.removeAttribute('data-spotlight-active');
    document.documentElement.removeAttribute('data-card-hovered');
  },
};
