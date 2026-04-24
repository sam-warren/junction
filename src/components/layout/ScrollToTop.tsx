// src/components/layout/ScrollToTop.tsx
import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets window scroll to top on every pathname change.
 * React Router 7 does not do this automatically; without it,
 * navigating from mid-homepage to /contact leaves the new page
 * scrolled down wherever the previous one was.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}
