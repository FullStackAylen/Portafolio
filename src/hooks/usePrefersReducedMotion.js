import { useEffect, useState } from 'react';

/**
 * true cuando el sistema reporta prefers-reduced-motion (ANIMATION_GUIDELINES.md
 * §8). MotionConfig no desactiva los MotionValues vinculados al scroll: el
 * parallax se apaga por completo con este hook.
 */
export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
