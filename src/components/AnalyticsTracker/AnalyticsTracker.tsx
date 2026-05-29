'use client';

import { useEffect, useRef } from 'react';

export function AnalyticsTracker() {
  const trackedRef = useRef(false);

  useEffect(() => {
    // Only run once per page load
    if (trackedRef.current) return;
    trackedRef.current = true;

    const trackVisit = async () => {
      try {
        const hasVisited = localStorage.getItem('nt_has_visited');
        const isNewVisitor = !hasVisited;
        
        if (isNewVisitor) {
          localStorage.setItem('nt_has_visited', 'true');
        }

        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isNewVisitor }),
        });
      } catch (e) {
        console.error('Analytics tracking failed', e);
      }
    };

    // Use a small timeout to not block main thread (INP optimization)
    setTimeout(() => {
      trackVisit();
    }, 2000);
  }, []);

  return null;
}
