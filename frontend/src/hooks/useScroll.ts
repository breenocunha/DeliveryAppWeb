import { useState, useEffect } from 'react';

export function useScroll() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [lastPosition, setLastPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      setDirection(lastPosition > position ? 'up' : 'down');
      setLastPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastPosition]);

  return { scrollPosition, direction };
} 