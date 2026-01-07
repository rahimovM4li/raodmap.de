import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook that scrolls to top on route change
 * Ensures smooth scroll behavior on all route transitions
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top immediately on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior
    });
  }, [pathname]);
};
