'use client';

import { useEffect, useRef } from 'react';

export function AnalyticsTracker() {
  const trackedRef = useRef(false);

  useEffect(() => {
    // 1. Track page visit (once per page load)
    if (!trackedRef.current) {
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
    }

    // 2. Track Call and Text button clicks site-wide
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href') || (target as any).href;
      if (!href || typeof href !== 'string') return;

      if (href.startsWith('tel:')) {
        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventType: 'call' }),
        }).catch(() => {});
      } else if (href.startsWith('sms:')) {
        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventType: 'text' }),
        }).catch(() => {});
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return null;
}
