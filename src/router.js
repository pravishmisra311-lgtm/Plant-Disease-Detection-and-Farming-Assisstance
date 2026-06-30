/**
 * router.js — Custom Hash Router (Pure JavaScript + React)
 * ──────────────────────────────────────────────────────────
 * A lightweight client-side router built with:
 *   - window.location.hash  (e.g. "#/detect")
 *   - hashchange event listener
 *   - React useState / useEffect
 *
 * No external routing library required.
 * NOTE: Uses React.createElement instead of JSX to stay a .js file.
 *
 * Usage:
 *   const { page, navigate } = useRouter();
 *   navigate('/detect');
 */

import { createElement, useState, useEffect, useCallback } from 'react';

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Extract the path from hash, e.g. "#/detect" → "/detect" */
function getHashPath() {
  const hash = window.location.hash;
  if (!hash || hash === '#') return '/';
  const path = hash.slice(1); // strip leading '#'
  return path.startsWith('/') ? path : '/' + path;
}

/** Imperatively navigate to a route */
export function navigate(to) {
  window.location.hash = to;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

/**
 * useRouter()
 * Returns: { page, navigate }
 *   page     — current route string, e.g. "/detect"
 *   navigate — function to programmatically navigate
 */
export function useRouter() {
  const [page, setPage] = useState(() => getHashPath());

  useEffect(() => {
    const handleHashChange = () => setPage(getHashPath());

    window.addEventListener('hashchange', handleHashChange);

    // Handle direct load with no hash → redirect to "/"
    if (!window.location.hash) {
      window.location.hash = '/';
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const go = useCallback((to) => {
    window.location.hash = to;
  }, []);

  return { page, navigate: go };
}

// ── Link Component ────────────────────────────────────────────────────────────

/**
 * Link({ to, children, className, style, id, onClick })
 * A plain anchor that navigates via hash routing.
 */
export function Link({ to, children, className, style, id, onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
    if (onClick) onClick(e);
  };

  return createElement('a', {
    href: '#' + to,
    className: className || '',
    style,
    id,
    onClick: handleClick,
  }, children);
}

// ── NavLink Component ─────────────────────────────────────────────────────────

/**
 * NavLink({ to, children, className, end, style, onClick })
 * Like Link but adds active-class support.
 * className can be a function: ({ isActive }) => string
 */
export function NavLink({ to, children, className, end, style, onClick }) {
  const { page } = useRouter();

  const isActive = end
    ? page === to
    : page === to || page.startsWith(to + '/');

  const resolvedClass =
    typeof className === 'function'
      ? className({ isActive })
      : className || '';

  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
    if (onClick) onClick(e);
  };

  return createElement('a', {
    href: '#' + to,
    className: resolvedClass,
    style,
    onClick: handleClick,
  }, children);
}
